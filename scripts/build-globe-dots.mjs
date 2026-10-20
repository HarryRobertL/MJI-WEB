import fs from "node:fs";
import * as d3 from "d3";

const land = JSON.parse(fs.readFileSync("public/data/ne_110m_land.json", "utf8"));
// ~15k dots: slightly denser than the original 1.28 (~13k).
const step = Number(process.argv[2] || 1.20);

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

const pairs = [];
for (const feature of land.features) {
  const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);
  for (let lng = minLng; lng <= maxLng; lng += step) {
    for (let lat = minLat; lat <= maxLat; lat += step) {
      const point = [lng, lat];
      if (pointInFeature(point, feature)) {
        pairs.push(Number(lng.toFixed(3)), Number(lat.toFixed(3)));
      }
    }
  }
}

fs.writeFileSync("public/data/globe-dots.json", JSON.stringify(pairs));
console.log(`Wrote ${pairs.length / 2} dots (${fs.statSync("public/data/globe-dots.json").size} bytes)`);
