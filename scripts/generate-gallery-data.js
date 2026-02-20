#!/usr/bin/env node
/**
 * One-time script to merge images_index.json + user_locations.txt
 * into src/data/user-images.json.
 *
 * Usage: node scripts/generate-gallery-data.js [path-to-old-data]
 * Default path: ~/Desktop/html/user_images.old/
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const oldDataDir =
  process.argv[2] ||
  join(process.env.HOME, "Desktop", "html", "user_images.old");

// Read source files
const imagesIndex = JSON.parse(
  readFileSync(join(oldDataDir, "images_index.json"), "utf-8")
);
const locationsRaw = readFileSync(
  join(oldDataDir, "user_locations.txt"),
  "utf-8"
);

// Parse user locations
const users = {};
for (const line of locationsRaw.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed) continue;
  const [username, location] = trimmed.split(":").map((s) => s.trim());
  if (username && location) {
    // Capitalize first letter of username for display name
    const name = username.charAt(0).toUpperCase() + username.slice(1);
    users[username.toLowerCase()] = { name, location };
  }
}

// Build images array with slugs and thumbnails
const slugCounts = {};
const images = imagesIndex.map((img) => {
  const baseName = img.filename.replace(/\.[^.]+$/, "");
  let slug = baseName.toLowerCase();
  // Handle duplicate slugs (e.g. jyd.jpg and jyd.png)
  if (slugCounts[slug] !== undefined) {
    slugCounts[slug]++;
    slug = slug + "-" + slugCounts[slug];
  } else {
    slugCounts[slug] = 0;
  }
  return {
    slug,
    filename: img.filename,
    thumbnail: baseName + ".png",
    caption: img.caption,
    users: img.users.map((u) => u.toLowerCase()),
  };
});

// Sort images alphabetically by slug
images.sort((a, b) => a.slug.localeCompare(b.slug));

const output = { users, images };
const outPath = join(__dirname, "..", "src", "data", "user-images.json");
writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");

console.log(
  `Generated ${outPath}\n  ${Object.keys(users).length} users, ${images.length} images`
);
