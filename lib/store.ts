import fs from "fs/promises";
import path from "path";
import { isDateKey } from "@/lib/format";
import type { Edition } from "@/lib/types";

const DIR = path.join(process.cwd(), "data", "editions");

function fileFor(date: string): string {
  if (!isDateKey(date)) throw new Error("Invalid edition date.");
  return path.join(DIR, `${date}.json`);
}

export async function writeEdition(edition: Edition): Promise<void> {
  try {
    await fs.mkdir(DIR, { recursive: true });
    await fs.writeFile(fileFor(edition.date), JSON.stringify(edition, null, 2), "utf8");
  } catch (error) {
    console.error("Could not save the edition.", error);
  }
}

export async function readEdition(date: string): Promise<Edition | null> {
  if (!isDateKey(date)) return null;
  try {
    const raw = await fs.readFile(fileFor(date), "utf8");
    return JSON.parse(raw) as Edition;
  } catch {
    return null;
  }
}

export async function listEditions(): Promise<Edition[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(DIR);
  } catch {
    return [];
  }

  const editions = await Promise.all(
    files
      .filter((file) => /^\d{4}-\d{2}-\d{2}\.json$/.test(file))
      .map((file) => readEdition(file.replace(/\.json$/, ""))),
  );

  return editions
    .filter((edition): edition is Edition => edition !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
