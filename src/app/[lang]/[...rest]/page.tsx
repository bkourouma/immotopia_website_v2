import { notFound } from "next/navigation";

// Toute adresse inconnue affiche la page 404 dans la langue de l'adresse.
export default function CatchAll() {
  notFound();
}
