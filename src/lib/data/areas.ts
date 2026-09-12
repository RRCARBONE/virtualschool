import type { Area } from "@/lib/types";

// "icon" referencia nomes de ícones do pacote lucide-react (ver
// src/components/ui/dynamic-icon.tsx). Cores usadas em gradientes dos cards.
export const areas: Area[] = [
  { id: "tecnologia", slug: "tecnologia", name: "Tecnologia", description: "Software, redes, dados e infraestrutura que movem o mundo digital.", icon: "Cpu", colorFrom: "#5b3df0", colorTo: "#8b6cf7" },
  { id: "inteligencia-artificial", slug: "inteligencia-artificial", name: "Inteligência Artificial", description: "Modelos, automação e sistemas inteligentes aplicados a negócios reais.", icon: "BrainCircuit", colorFrom: "#7c3aed", colorTo: "#c026d3" },
  { id: "administracao", slug: "administracao", name: "Administração", description: "Gestão de pessoas, processos e estratégia para organizações de todo porte.", icon: "Briefcase", colorFrom: "#0f766e", colorTo: "#14b8a6" },
  { id: "financas", slug: "financas", name: "Finanças", description: "Planejamento financeiro, investimentos e controle de resultados.", icon: "Landmark", colorFrom: "#0369a1", colorTo: "#0ea5e9" },
  { id: "marketing", slug: "marketing", name: "Marketing", description: "Marcas, campanhas e dados para conquistar e reter clientes.", icon: "Megaphone", colorFrom: "#db2777", colorTo: "#f472b6" },
  { id: "design", slug: "design", name: "Design", description: "Interfaces, identidade visual e experiências centradas em pessoas.", icon: "PenTool", colorFrom: "#9333ea", colorTo: "#c084fc" },
  { id: "saude", slug: "saude", name: "Saúde", description: "Cuidado, prevenção e bem-estar para pessoas e comunidades.", icon: "HeartPulse", colorFrom: "#dc2626", colorTo: "#f87171" },
  { id: "engenharia", slug: "engenharia", name: "Engenharia", description: "Projetos técnicos que constroem infraestrutura e produtos.", icon: "Cog", colorFrom: "#374151", colorTo: "#6b7280" },
  { id: "construcao", slug: "construcao", name: "Construção", description: "Obras, reformas e gestão de projetos civis.", icon: "HardHat", colorFrom: "#b45309", colorTo: "#f59e0b" },
  { id: "gastronomia", slug: "gastronomia", name: "Gastronomia", description: "Técnicas de cozinha, gestão de cozinhas e empreendedorismo gastronômico.", icon: "ChefHat", colorFrom: "#ea580c", colorTo: "#fb923c" },
  { id: "turismo", slug: "turismo", name: "Turismo", description: "Viagens, hospitalidade e experiências para viajantes.", icon: "Plane", colorFrom: "#0891b2", colorTo: "#67e8f9" },
  { id: "educacao", slug: "educacao", name: "Educação", description: "Ensino, pedagogia e formação de outras pessoas.", icon: "GraduationCap", colorFrom: "#4338ca", colorTo: "#818cf8" },
  { id: "vendas", slug: "vendas", name: "Vendas", description: "Prospecção, negociação e relacionamento com clientes.", icon: "TrendingUp", colorFrom: "#15803d", colorTo: "#4ade80" },
  { id: "logistica", slug: "logistica", name: "Logística", description: "Cadeia de suprimentos, transporte e armazenagem.", icon: "Truck", colorFrom: "#1d4ed8", colorTo: "#60a5fa" },
  { id: "automoveis", slug: "automoveis", name: "Automóveis", description: "Comercialização, avaliação e serviços do universo automotivo.", icon: "Car", colorFrom: "#57534e", colorTo: "#a8a29e" },
  { id: "mecanica", slug: "mecanica", name: "Mecânica", description: "Manutenção, reparo e montagem de máquinas e veículos.", icon: "Wrench", colorFrom: "#475569", colorTo: "#94a3b8" },
  { id: "eletrica", slug: "eletrica", name: "Elétrica", description: "Instalações, automação e segurança em sistemas elétricos.", icon: "Zap", colorFrom: "#ca8a04", colorTo: "#fde047" },
  { id: "fotografia", slug: "fotografia", name: "Fotografia", description: "Técnica fotográfica, composição e edição de imagens.", icon: "Camera", colorFrom: "#1e293b", colorTo: "#475569" },
  { id: "audiovisual", slug: "audiovisual", name: "Audiovisual", description: "Produção de vídeo, roteiro e edição para todas as telas.", icon: "Clapperboard", colorFrom: "#7c2d12", colorTo: "#ea580c" },
  { id: "games", slug: "games", name: "Games", description: "Desenvolvimento, design e produção de jogos digitais.", icon: "Gamepad2", colorFrom: "#6d28d9", colorTo: "#a78bfa" },
  { id: "esportes", slug: "esportes", name: "Esportes", description: "Treinamento, performance e gestão esportiva.", icon: "Dumbbell", colorFrom: "#b91c1c", colorTo: "#fb7185" },
  { id: "beleza", slug: "beleza", name: "Beleza", description: "Estética, cuidados pessoais e tendências de beleza.", icon: "Sparkles", colorFrom: "#be185d", colorTo: "#f9a8d4" },
  { id: "agronegocio", slug: "agronegocio", name: "Agronegócio", description: "Produção agropecuária, gestão rural e sustentabilidade.", icon: "Wheat", colorFrom: "#65a30d", colorTo: "#a3e635" },
  { id: "empreendedorismo", slug: "empreendedorismo", name: "Empreendedorismo", description: "Criação, validação e crescimento de novos negócios.", icon: "Rocket", colorFrom: "#c2410c", colorTo: "#fbbf24" },
  { id: "idiomas", slug: "idiomas", name: "Idiomas", description: "Novos idiomas para estudar, trabalhar e viajar pelo mundo.", icon: "Languages", colorFrom: "#0d9488", colorTo: "#5eead4" },
  { id: "ciencia", slug: "ciencia", name: "Ciência", description: "Pesquisa, método científico e descobertas aplicadas.", icon: "FlaskConical", colorFrom: "#4f46e5", colorTo: "#818cf8" },
  { id: "meio-ambiente", slug: "meio-ambiente", name: "Meio Ambiente", description: "Sustentabilidade, gestão ambiental e economia verde.", icon: "Leaf", colorFrom: "#15803d", colorTo: "#86efac" },
];

export function getAreaBySlug(slug: string) {
  return areas.find((a) => a.slug === slug);
}
