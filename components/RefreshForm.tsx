"use client";

import { useFormStatus } from "react-dom";
import { refreshEdition } from "@/app/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="refresh" type="submit" disabled={pending}>
      {pending ? "Pulling trends…" : "Refresh trends"}
    </button>
  );
}

export function RefreshForm() {
  return (
    <form action={refreshEdition}>
      <Submit />
    </form>
  );
}
