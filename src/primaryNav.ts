import { Briefcase, Building2, Mail, Users } from "lucide-react";
import { navItems } from "./content";
import type { TubeNavItem } from "./components/ui/tubelight-navbar";

const navIcons = {
  "#services": Briefcase,
  "#about": Building2,
  "#clients": Users,
  "#contact": Mail,
} as const;

const pillOrder = ["#about", "#services", "#contact", "#clients"] as const;

export const primaryNav: TubeNavItem[] = pillOrder.map((href) => {
  const item = navItems.find((entry) => entry.href === href);
  if (!item) {
    throw new Error(`Missing nav item ${href}`);
  }
  return {
    href: item.href,
    label: item.label,
    icon: navIcons[item.href],
  };
});
