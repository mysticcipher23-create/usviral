import { notFound } from "next/navigation";
import { EditionView } from "@/components/EditionView";
import { isDateKey } from "@/lib/format";
import { loadEdition } from "@/lib/trends";

export const dynamic = "force-dynamic";

export default async function ArchiveEditionPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  if (!isDateKey(date)) notFound();
  const edition = await loadEdition(date);
  if (!edition) notFound();
  return <EditionView edition={edition} />;
}
