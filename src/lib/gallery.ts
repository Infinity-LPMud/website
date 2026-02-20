import data from "../data/user-images.json";

interface User {
  name: string;
  location: string;
}

interface GalleryImage {
  slug: string;
  filename: string;
  caption: string;
  users: string[];
}

interface LocationInfo {
  name: string;
  slug: string;
}

const users: Record<string, User> = data.users;
const images: GalleryImage[] = data.images;

function locationSlug(location: string): string {
  return location
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/\s+/g, "-");
}

export function getAllImages(): GalleryImage[] {
  return images;
}

export function getImageBySlug(slug: string): GalleryImage | undefined {
  return images.find((img) => img.slug === slug);
}

export function getAllUsers(): Record<string, User> {
  return users;
}

export function getUser(username: string): User | undefined {
  return users[username];
}

export function getAllLocations(): LocationInfo[] {
  const locationSet = new Set<string>();
  for (const user of Object.values(users)) {
    locationSet.add(user.location);
  }
  return [...locationSet]
    .sort()
    .map((name) => ({ name, slug: locationSlug(name) }));
}

export function getImagesByLocation(locSlug: string): GalleryImage[] {
  const usersInLocation = new Set<string>();
  for (const [username, user] of Object.entries(users)) {
    if (locationSlug(user.location) === locSlug) {
      usersInLocation.add(username);
    }
  }
  return images.filter((img) =>
    img.users.some((u) => usersInLocation.has(u))
  );
}

export function getImagesByUser(username: string): GalleryImage[] {
  return images.filter((img) => img.users.includes(username));
}

export function getUsersByLocation(
  locSlug: string
): { username: string; user: User; image: GalleryImage }[] {
  const result: { username: string; user: User; image: GalleryImage }[] = [];
  for (const [username, user] of Object.entries(users)) {
    if (locationSlug(user.location) !== locSlug) continue;
    const img = images.find((i) => i.users.includes(username));
    if (img) result.push({ username, user, image: img });
  }
  return result.sort((a, b) => a.username.localeCompare(b.username));
}

export function getLocationBySlug(locSlug: string): LocationInfo | undefined {
  return getAllLocations().find((l) => l.slug === locSlug);
}

export { locationSlug };
export type { User, GalleryImage, LocationInfo };
