import { ReactElement } from "react";
import { UserIcon, UsersIcon, SettingsIcon, ShoppingCartIcon } from "lucide-react";

type RoleLinks = { [key: string]: Record<string, { link: string; icon: ReactElement }> };

export const roleLinks: RoleLinks = {
  SELLER: {
    employees: {
      link: "/employees",
      icon: <UsersIcon />,
    },
    teams: {
      link: "/teams",
      icon: <UsersIcon />,
    },
    orders: {
      link: "/orders",
      icon: <ShoppingCartIcon />,
    },
    settings: {
      link: "/settings",
      icon: <SettingsIcon />,
    },
  },
  BUYER: {
    orders: {
      link: "/orders",
      icon: <ShoppingCartIcon />,
    },
    settings: {
      link: "/settings",
      icon: <SettingsIcon />,
    },
  },
  ADMIN: {
    accounts: {
      link: "/accounts",
      icon: <UserIcon />,
    },
    teams: {
      link: "/teams",
      icon: <UsersIcon />,
    },
    orders: {
      link: "/orders",
      icon: <ShoppingCartIcon />,
    },
  },
};
