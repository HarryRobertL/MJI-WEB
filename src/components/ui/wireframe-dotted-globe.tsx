import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

type Ring = [number, number][];

/** Shared across remounts so resize never refetches or regenerates dots. */
let landCache: FeatureCollection | null = null;
let dotsCache: Float64Array | null = null;
let loadPromise: Promise<void> | null = null;

function pointInPolygon(point: [number, number], polygon: Ring) {
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
}

function pointInFeature(point: [number, number], feature: Feature) {
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
}

function buildDots(land: FeatureCollection, stepSize = 1.35) {
  const pairs: number[] = [];

  for (const feature of land.features) {
    const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);
    for (let lng = minLng; lng <= maxLng; lng += stepSize) {
      for (let lat = minLat; lat <= maxLat; lat += stepSize) {
        const point: [number, number] = [lng, lat];
        if (pointInFeature(point, feature)) {
          pairs.push(lng, lat);
        }
      }
    }
  }

  return new Float64Array(pairs);
}

function ensureWorldData() {
  if (landCache && dotsCache) {
    return Promise.resolve();
  }

  if (!loadPromise) {
    loadPromise = fetch("/data/ne_110m_land.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load land data");
        }
        return response.json() as Promise<FeatureCollection>;
      })
      .then((land) => {
        landCache = land;
        dotsCache = buildDots(land);
      })
      .catch((error) => {
        loadPromise = null;
        throw error;
      });
  }

  return loadPromise;
}

export default function RotatingEarth({
  width = 480,
  height = 480,
  className = "",
}: RotatingEarthProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState(() => Math.min(width, height));
  const [ready, setReady] = useState(() => Boolean(landCache && dotsCache));

  useEffect(() => {
    const host = containerRef.current;
    if (!host) {
      return;
    }

    let frame = 0;
    const updateSize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = Math.floor(Math.min(width, height, host.clientWidth || width));
        setSize((current) => (Math.abs(current - next) < 8 ? current : next));
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(host);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = containerRef.current;
    if (!canvas || !host || size <= 0) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const containerWidth = size;
    const containerHeight = size;
    const radius = Math.min(containerWidth, containerHeight) / 2.5;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.floor(containerWidth * dpr);
    canvas.height = Math.floor(containerHeight * dpr);
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    canvas.style.touchAction = "pan-y";
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath(projection, context);
    const graticule = d3.geoGraticule()();
    const rotation: [number, number] = [0, 0];
    const rotationSpeed = 0.32;
    const frameInterval = 33;
    let cancelled = false;
    let autoRotate = !reduceMotion;
    let inView = true;
    let rotationTimer: d3.Timer | null = null;
    let lastFrame = 0;

    const render = () => {
      const land = landCache;
      const dots = dotsCache;
      if (!land || !dots) {
        return;
      }

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;
      const cx = containerWidth / 2;
      const cy = containerHeight / 2;
      const dotSize = Math.max(1.1, 1.35 * scaleFactor);

      context.fillStyle = "#F8F8F8";
      context.fillRect(0, 0, containerWidth, containerHeight);

      context.beginPath();
      context.arc(cx, cy, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#F8F8F8";
      context.fill();
      context.strokeStyle = "#C8A45D";
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();

      context.beginPath();
      path(graticule);
      context.strokeStyle = "#C8A45D";
      context.lineWidth = 1 * scaleFactor;
      context.globalAlpha = 0.35;
      context.stroke();
      context.globalAlpha = 1;

      context.beginPath();
      for (const feature of land.features) {
        path(feature);
      }
      context.fillStyle = "#0C120C";
      context.fill();
      context.strokeStyle = "#C8A45D";
      context.lineWidth = 0.75 * scaleFactor;
      context.stroke();

      context.fillStyle = "#4A554A";
      for (let i = 0; i < dots.length; i += 2) {
        const projected = projection([dots[i], dots[i + 1]]);
        if (!projected) {
          continue;
        }
        const [x, y] = projected;
        context.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
      }
    };

    const stopRotation = () => {
      rotationTimer?.stop();
      rotationTimer = null;
    };

    const startRotation = () => {
      if (reduceMotion || rotationTimer || !inView || !autoRotate || !landCache) {
        return;
      }

      lastFrame = 0;
      rotationTimer = d3.timer((elapsed) => {
        if (!autoRotate || !inView) {
          return;
        }
        if (elapsed - lastFrame < frameInterval) {
          return;
        }
        lastFrame = elapsed;
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || !landCache) {
        return;
      }

      autoRotate = false;
      stopRotation();
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotationAngles: [number, number] = [rotation[0], rotation[1]];

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const sensitivity = 0.45;
        rotation[0] = startRotationAngles[0] + (moveEvent.clientX - startX) * sensitivity;
        rotation[1] = Math.max(
          -90,
          Math.min(90, startRotationAngles[1] - (moveEvent.clientY - startY) * sensitivity),
        );
        projection.rotate(rotation);
        render();
      };

      const handlePointerUp = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        window.setTimeout(() => {
          if (!reduceMotion) {
            autoRotate = true;
            startRotation();
          }
        }, 10);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        if (inView) {
          startRotation();
        } else {
          stopRotation();
        }
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(host);

    canvas.addEventListener("pointerdown", handlePointerDown);

    void ensureWorldData()
      .then(() => {
        if (cancelled) {
          return;
        }
        setReady(true);
        render();
        if (reduceMotion) {
          return;
        }
        startRotation();
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load land map data");
        }
      });

    return () => {
      cancelled = true;
      stopRotation();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
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
      <canvas
        ref={canvasRef}
        aria-label="Rotating world map"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 220ms ease" }}
      />
    </div>
  );
}
