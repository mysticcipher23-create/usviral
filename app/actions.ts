"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildEdition } from "@/lib/trends";

export async function refreshEdition() {
  await buildEdition();
  revalidatePath("/", "layout");
  revalidatePath("/archive");
  redirect("/");
}
