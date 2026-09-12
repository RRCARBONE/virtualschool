import {
  Cpu, BrainCircuit, Briefcase, Landmark, Megaphone, PenTool, HeartPulse, Cog,
  HardHat, ChefHat, Plane, GraduationCap, TrendingUp, Truck, Car, Wrench, Zap,
  Camera, Clapperboard, Gamepad2, Dumbbell, Sparkles, Wheat, Rocket, Languages,
  FlaskConical, Leaf, type LucideIcon, HelpCircle,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Cpu, BrainCircuit, Briefcase, Landmark, Megaphone, PenTool, HeartPulse, Cog,
  HardHat, ChefHat, Plane, GraduationCap, TrendingUp, Truck, Car, Wrench, Zap,
  Camera, Clapperboard, Gamepad2, Dumbbell, Sparkles, Wheat, Rocket, Languages,
  FlaskConical, Leaf,
};

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? HelpCircle;
  return <Icon className={className} aria-hidden />;
}
