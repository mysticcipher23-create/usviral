"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildEdition } from "@/lib/trends";

export async function refreshEdition() {
  try {
    await buildEdition();
  } catch (error) {
    console.error("Could not refresh the edition.", error);
  }
  revalidatePath("/", "layout");
  revalidatePath("/archive");
  redirect("/");
}
