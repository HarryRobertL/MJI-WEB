import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

type Ring = [number, number][];

export default function RotatingEarth({
  width = 480,
  height = 480,
  className = "",
}: RotatingEarthProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState(() => Math.min(width, height));

  useEffect(() => {
    const host = containerRef.current;
    if (!host) {
      return;
    }

    const updateSize = () => {
      const next = Math.floor(Math.min(width, height, host.clientWidth || width));
      setSize((current) => (current === next ? current : next));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(host);
    return () => observer.disconnect();
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size <= 0) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const containerWidth = size;
    const containerHeight = size;
    const radius = Math.min(containerWidth, containerHeight) / 2.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath(projection, context);

    const pointInPolygon = (point: [number, number], polygon: Ring) => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }

      return inside;
    };

    const pointInFeature = (point: [number, number], feature: Feature) => {
      const geometry = feature.geometry;
      if (!geometry) {
        return false;
      }

      if (geometry.type === "Polygon") {
        const coordinates = (geometry as Polygon).coordinates as Ring[];
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        return !coordinates.slice(1).some((ring) => pointInPolygon(point, ring));
      }

      if (geometry.type === "MultiPolygon") {
        return (geometry as MultiPolygon).coordinates.some((polygon) => {
          const rings = polygon as Ring[];
          if (!pointInPolygon(point, rings[0])) {
            return false;
          }
          return !rings.slice(1).some((ring) => pointInPolygon(point, ring));
        });
      }

      return false;
    };

    const generateDotsInPolygon = (feature: Feature, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);
      const stepSize = dotSpacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }

      return dots;
    };

    const allDots: { lng: number; lat: number }[] = [];
    let landFeatures: FeatureCollection | null = null;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#0C120C";
      context.fill();
      context.strokeStyle = "#C8A45D";
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();

      if (!landFeatures) {
        return;
      }

      const graticule = d3.geoGraticule();
      context.beginPath();
      path(graticule());
      context.strokeStyle = "#56667A";
      context.lineWidth = 1 * scaleFactor;
      context.globalAlpha = 0.45;
      context.stroke();
      context.globalAlpha = 1;

      context.beginPath();
      landFeatures.features.forEach((feature) => {
        path(feature);
      });
      context.strokeStyle = "#C8A45D";
      context.lineWidth = 1 * scaleFactor;
      context.stroke();

      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat]);
        if (
          projected &&
          projected[0] >= 0 &&
          projected[0] <= containerWidth &&
          projected[1] >= 0 &&
          projected[1] <= containerHeight
        ) {
          context.beginPath();
          context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
          context.fillStyle = "#C8A45D";
          context.fill();
        }
      });
    };

    let cancelled = false;

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        );
        if (!response.ok) {
          throw new Error("Failed to load land data");
        }

        landFeatures = (await response.json()) as FeatureCollection;
        if (cancelled) {
          return;
        }

        landFeatures.features.forEach((feature) => {
          generateDotsInPolygon(feature, 16).forEach(([lng, lat]) => {
            allDots.push({ lng, lat });
          });
        });

        render();
      } catch {
        if (!cancelled) {
          setError("Failed to load land map data");
        }
      }
    };

    const rotation: [number, number] = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.5;

    const rotationTimer = d3.timer(() => {
      if (!autoRotate) {
        return;
      }
      rotation[0] += rotationSpeed;
      projection.rotate(rotation);
      render();
    });

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number] = [rotation[0], rotation[1]];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5;
        rotation[0] = startRotation[0] + (moveEvent.clientX - startX) * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - (moveEvent.clientY - startY) * sensitivity));
        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        window.setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    void loadWorldData();

    return () => {
      cancelled = true;
      rotationTimer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [size]);

  if (error) {
    return (
      <div className={className}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`globe ${className}`}
      style={{ width: "100%", maxWidth: width }}
    >
      <canvas ref={canvasRef} aria-label="Rotating world map" />
    </div>
  );
}
