import { Button } from "./ui/button";
import type { CategoryItem } from "../types";

interface NavigationProps {
  navItems: CategoryItem[];
  selectedNav: CategoryItem;
  onNavSelect: (item: CategoryItem) => void;
}

export function Navigation({ navItems, selectedNav, onNavSelect }: NavigationProps) {
  return (
    <>
      <nav className="flex-1 mt-4 max-h-[calc(100vh-20px)] overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <Button
            key={item.key}
            variant="ghost"
            colorScheme="neutral"
            onClick={() => onNavSelect(item)}
            className={`mt-8 w-full self-center rounded-none mt-0 ${selectedNav.key === item.key ? "text-primary font-bold bg-primary/10" : "text-neutral"}`}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </>
  );
} 