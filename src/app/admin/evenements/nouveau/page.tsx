import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EventForm, Flash } from "@/components/events/admin-ui";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/events/auth";

export const dynamic = "force-dynamic";

export default async function NewEvent({ searchParams }: { searchParams: Promise<{ ok?: string; err?: string }> }) {
  if (!verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value)) redirect("/admin/evenements");
  const sp = await searchParams;
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/admin/evenements" className="text-sm text-brand-600 hover:underline">← Événements</Link>
      <h1 className="mt-2 mb-6 font-display text-3xl font-bold">Nouvel événement</h1>
      <Flash ok={sp.ok} err={sp.err} />
      <EventForm />
    </main>
  );
}
