import { EditionView } from "@/components/EditionView";
import { loadToday } from "@/lib/trends";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const edition = await loadToday();
  return <EditionView edition={edition} live />;
}
