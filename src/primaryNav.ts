import { Briefcase, Building2, Mail, Users } from "lucide-react";
import { navItems } from "./content";
import type { TubeNavItem } from "./components/ui/tubelight-navbar";

const navIcons = {
  "#services": Briefcase,
  "#about": Building2,
  "#clients": Users,
  "#contact": Mail,
} as const;

export const primaryNav: TubeNavItem[] = navItems.map((item) => ({
  href: item.href,
  label: item.label,
  icon: navIcons[item.href],
}));
