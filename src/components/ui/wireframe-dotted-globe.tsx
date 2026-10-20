import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { FeatureCollection } from "geojson";

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

type WorldPayload = {
  land: FeatureCollection;
  dots: Float64Array;
};

/**
 * Same draw pipeline as the original smooth onyx globe:
 * sphere fill → gold rim → graticule → land STROKE only → dots.
 * White ocean + dark dots for the current look; no land fill (that caused the lag).
 */
let worldCache: WorldPayload | null = null;
let worldPromise: Promise<WorldPayload> | null = null;

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    worldCache = null;
    worldPromise = null;
  });
}

function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\//, "")}`;
}

function ensureWorldData() {
  if (worldCache) {
    return Promise.resolve(worldCache);
  }

  if (!worldPromise) {
    worldPromise = Promise.all([
      fetch(assetUrl("data/ne_110m_land.json"), { cache: "force-cache" }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Land map HTTP ${response.status}`);
        }
        return response.json() as Promise<FeatureCollection>;
      }),
      fetch(assetUrl("data/globe-dots.json"), { cache: "force-cache" }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Dots HTTP ${response.status}`);
        }
        const pairs = (await response.json()) as number[];
        if (!pairs.length) {
          throw new Error("Dots JSON is empty");
        }
        return new Float64Array(pairs);
      }),
    ])
      .then(([land, dots]) => {
        if (!land?.features?.length) {
          throw new Error("Land map JSON is empty");
        }
        worldCache = { land, dots };
        return worldCache;
      })
      .catch((error) => {
        worldPromise = null;
        throw error;
      });
  }

  return worldPromise;
}

export default function RotatingEarth({
  width = 480,
  height = 480,
  className = "",
}: RotatingEarthProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  // Start at 0 so the draw effect mounts once at the measured size (avoids 480→378 remount thrash).
  const [size, setSize] = useState(0);
  const [ready, setReady] = useState(() => Boolean(worldCache));

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
        setSize((current) => (current === 0 || Math.abs(current - next) >= 8 ? next : current));
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

    // alpha: true so corners outside the sphere stay transparent (not an onyx square).
    const context = canvas.getContext("2d", { alpha: true });
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
    // Same graticule density as the original smooth globe.
    const graticule = d3.geoGraticule()();
    const rotation: [number, number] = [0, 0];
    const degreesPerSecond = 14;
    const scratch: [number, number] = [0, 0];
    const deg = Math.PI / 180;
    let backXY = new Float32Array(0);
    let frontXY = new Float32Array(0);

    let cancelled = false;
    let autoRotate = !reduceMotion;
    let inView = true;
    let rafId = 0;
    let lastTimestamp = 0;
    let world: WorldPayload | null = worldCache;

    const render = () => {
      if (!world) {
        return;
      }

      const { land, dots } = world;
      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;
      const cx = containerWidth / 2;
      const cy = containerHeight / 2;

      if (backXY.length < dots.length) {
        backXY = new Float32Array(dots.length);
        frontXY = new Float32Array(dots.length);
      }

      context.clearRect(0, 0, containerWidth, containerHeight);

      // Current styling: paper-white ocean (was onyx). Same cheap solid fill.
      context.beginPath();
      context.arc(cx, cy, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#F8F8F8";
      context.fill();
      context.strokeStyle = "#C8A45D";
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();

      const rotate = d3.geoRotation(projection.rotate());
      const dotRadius = 1.2 * scaleFactor;
      const dotSize = Math.max(1.2, dotRadius * 2);
      const dotOffset = dotSize / 2;
      let backCount = 0;
      let frontCount = 0;

      projection.clipAngle(180);
      for (let i = 0; i < dots.length; i += 2) {
        scratch[0] = dots[i];
        scratch[1] = dots[i + 1];
        const projected = projection(scratch);
        if (!projected) {
          continue;
        }
        const rotated = rotate(scratch);
        if (!rotated) {
          continue;
        }
        const z = Math.cos(rotated[1] * deg) * Math.cos(rotated[0] * deg);
        if (z < 0) {
          backXY[backCount] = projected[0];
          backXY[backCount + 1] = projected[1];
          backCount += 2;
        } else {
          frontXY[frontCount] = projected[0];
          frontXY[frontCount + 1] = projected[1];
          frontCount += 2;
        }
      }

      context.fillStyle = "#0C120C";
      context.globalAlpha = 0.22;
      for (let i = 0; i < backCount; i += 2) {
        context.fillRect(backXY[i] - dotOffset, backXY[i + 1] - dotOffset, dotSize, dotSize);
      }

      projection.clipAngle(90);
      context.globalAlpha = 0.45;
      context.beginPath();
      path(graticule);
      context.strokeStyle = "#C8A45D";
      context.lineWidth = 1 * scaleFactor;
      context.stroke();

      context.globalAlpha = 1;
      context.beginPath();
      path(land);
      context.strokeStyle = "#C8A45D";
      context.lineWidth = 1 * scaleFactor;
      context.stroke();

      context.fillStyle = "#0C120C";
      for (let i = 0; i < frontCount; i += 2) {
        context.fillRect(frontXY[i] - dotOffset, frontXY[i + 1] - dotOffset, dotSize, dotSize);
      }
    };

    const stopRotation = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastTimestamp = 0;
    };

    const tick = (timestamp: number) => {
      rafId = 0;
      if (!autoRotate || !inView || cancelled || !world) {
        return;
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const deltaSeconds = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;

      rotation[0] += degreesPerSecond * deltaSeconds;
      projection.rotate(rotation);
      render();

      rafId = requestAnimationFrame(tick);
    };

    const startRotation = () => {
      if (reduceMotion || rafId || !inView || !autoRotate || !world) {
        return;
      }
      lastTimestamp = 0;
      rafId = requestAnimationFrame(tick);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || !world) {
        return;
      }

      autoRotate = false;
      stopRotation();
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotationAngles: [number, number] = [rotation[0], rotation[1]];
      let dragRaf = 0;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const sensitivity = 0.5;
        rotation[0] = startRotationAngles[0] + (moveEvent.clientX - startX) * sensitivity;
        rotation[1] = Math.max(
          -90,
          Math.min(90, startRotationAngles[1] - (moveEvent.clientY - startY) * sensitivity),
        );
        projection.rotate(rotation);
        if (dragRaf) {
          return;
        }
        dragRaf = requestAnimationFrame(() => {
          dragRaf = 0;
          if (!cancelled) {
            render();
          }
        });
      };

      const handlePointerUp = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        if (dragRaf) {
          cancelAnimationFrame(dragRaf);
          dragRaf = 0;
        }
        render();
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
      .then((payload) => {
        if (cancelled) {
          return;
        }
        world = payload;
        setError(null);
        setReady(true);
        render();
        if (!reduceMotion) {
          startRotation();
        }
      })
      .catch((loadError) => {
        if (!cancelled) {
          console.error(loadError);
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
        style={{ opacity: ready ? 1 : 0, transition: "opacity 180ms ease" }}
      />
    </div>
  );
}
