import fs from "node:fs";
import * as d3 from "d3";

const land = JSON.parse(fs.readFileSync("public/data/ne_110m_land.json", "utf8"));
// Honeycomb lattice (~15k). Column pitch `step`, row pitch step * √3/2.
const step = Number(process.argv[2] || 1.28);
const rowStep = step * Math.sqrt(3) / 2;

function pointInPolygon(point, polygon) {
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

function pointInFeature(point, feature) {
  const geometry = feature.geometry;
  if (!geometry) return false;
  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates;
    if (!pointInPolygon(point, coordinates[0])) return false;
    return !coordinates.slice(1).some((ring) => pointInPolygon(point, ring));
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((polygon) => {
      if (!pointInPolygon(point, polygon[0])) return false;
      return !polygon.slice(1).some((ring) => pointInPolygon(point, ring));
    });
  }
  return false;
}

function unitNoise(x, y, salt) {
  const n = Math.sin(x * 127.1 + y * 311.7 + salt * 74.7) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

const jitter = step * 0.04;
const pairs = [];
for (const feature of land.features) {
  const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);
  let latIndex = 0;
  for (let lat = minLat; lat <= maxLat; lat += rowStep, latIndex++) {
    const rowOffset = (latIndex % 2) * step * 0.5;
    for (let lng = minLng + rowOffset; lng <= maxLng; lng += step) {
      const point = [
        lng + unitNoise(lng, lat, 1) * jitter,
        lat + unitNoise(lng, lat, 2) * jitter,
      ];
      if (pointInFeature(point, feature)) {
        pairs.push(Number(point[0].toFixed(3)), Number(point[1].toFixed(3)));
      }
    }
  }
}

fs.writeFileSync("public/data/globe-dots.json", JSON.stringify(pairs));
console.log(`Wrote ${pairs.length / 2} dots (${fs.statSync("public/data/globe-dots.json").size} bytes)`);
