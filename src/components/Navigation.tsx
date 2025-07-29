import { Button } from "./ui/button";

interface NavItem {
  key: string;
  label: string;
}

interface NavigationProps {
  navItems: NavItem[];
  selectedNav: string;
  onNavSelect: (key: string) => void;
}

export function Navigation({ navItems, selectedNav, onNavSelect }: NavigationProps) {
  return (
    <nav style={{ flex: 1, marginTop: 16 }}>
      {navItems.map(({ key, label }) => (
        <Button
          key={key}
          variant="ghost"
          colorScheme="neutral"
          onClick={() => onNavSelect(key)}
          style={{ marginTop: 32, width: "100%", alignSelf: "center" }}
        >
          {label}
        </Button>
      ))}
    </nav>
  );
} 