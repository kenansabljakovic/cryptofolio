"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "../icons/HomeIcon";
import { PortfolioIcon } from "../icons/PortfolioIcon";

type StyledNavbarLinkProps = {
  href: string;
  children: string;
  icon?: "home" | "portfolio";
};

export default function StyledNavbarLink({
  href,
  children,
  icon,
}: StyledNavbarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseStyle = "hidden sm:inline md:text-sm lg:text-base font-medium";
  const activeStyle = "dark:text-white text-[#353570]";
  const inactiveStyle = "dark:text-white opacity-50";

  return (
    <Link
      href={href}
      className={`link ${isActive ? activeStyle : inactiveStyle} ${baseStyle}`}
    >
      <div className="flex items-center gap-2">
        {icon === "home" && <HomeIcon isActive={isActive} />}
        {icon === "portfolio" && <PortfolioIcon isActive={isActive} />}
        {children}
      </div>
    </Link>
  );
}
