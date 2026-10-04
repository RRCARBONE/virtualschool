import type { Metadata } from "next";
import { AreaCard } from "@/components/catalog/area-card";
import { getAreas } from "@/lib/data";

export const metadata: Metadata = {
  title: "Profissões",
  description: "Explore áreas e profissões para descobrir sua próxima formação.",
};

export default async function ProfissoesPage() {
  const areas = await getAreas();
  return (
    <div className="container-app py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Explore profissões</h1>
        <p className="mt-3 text-muted">
          Navegue por área, escolha uma profissão e encontre a formação certa para chegar lá. Novas
          áreas e profissões são adicionadas continuamente pela nossa equipe.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {areas.map((area) => (
          <AreaCard key={area.id} area={area} />
        ))}
      </div>
    </div>
  );
}
