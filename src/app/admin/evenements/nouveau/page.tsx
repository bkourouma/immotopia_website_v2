import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminBar, EventForm, Flash, Hero } from "@/components/events/admin-ui";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/events/auth";

export const dynamic = "force-dynamic";

export default async function NewEvent({ searchParams }: { searchParams: Promise<{ ok?: string; err?: string }> }) {
  if (!verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value)) redirect("/admin/evenements");
  const sp = await searchParams;
  return (
    <>
      <AdminBar />
      <Hero lead="pb-14">
        <Link href="/admin/evenements" className="text-sm text-brand-300 hover:text-white">← Retour aux événements</Link>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Nouvel événement</h1>
        <p className="mt-2 text-sm text-white/65">Il sera créé selon le statut de publication choisi (brouillon par défaut, donc non visible).</p>
      </Hero>
      <main className="relative z-10 mx-auto -mt-8 max-w-4xl px-4 pb-16">
        <Flash ok={sp.ok} err={sp.err} />
        <EventForm />
      </main>
    </>
  );
}
