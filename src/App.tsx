import { useState } from "react";
import { useMarketplaceClient } from "./utils/hooks/useMarketplaceClient";
import { Navigation } from "./components/Navigation";
import { IconPicker } from "./components/IconPicker";
import icons from "./data/icons.json";
import { ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import type { CategoryItem, Icon } from "./types";

function App() {
  const { client } = useMarketplaceClient();
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [navSelected, setNavSelected] = useState<CategoryItem>({ key: "All Icons", label: "All Icons" });
  const [searchInput, setSearchInput] = useState("");

  // Extract unique categories from icons and build navigation items
  const categories = [...new Set(icons.map((icon: Icon) => icon.category))].sort();
  const NAV_ITEMS: CategoryItem[] = [
    { key: "All Icons", label: "All Icons" },
    ...categories.map(category => ({
      key: category,
      label: category.charAt(0).toUpperCase() + category.slice(1)
    }))
  ];

  const filteredIcons: Icon[] = icons.filter((icon: Icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(searchInput.toLowerCase());
    const matchesCategory = navSelected.key === "All Icons" || icon.category === navSelected.key;
    return matchesSearch && matchesCategory;
  });

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await client?.setValue(selectedIcon, true);
      setSaveStatus("saved");
      setTimeout(() => client?.closeApp(), 1000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15}>
          <Navigation
            navItems={NAV_ITEMS}
            selectedNav={navSelected}
            onNavSelect={setNavSelected}
          />
        </ResizablePanel>
        <ResizablePanel>
          <IconPicker
            searchInput={searchInput}
            onSearchChange={setSearchInput}
            filteredIcons={filteredIcons}
            selectedIcon={selectedIcon}
            onIconSelect={setSelectedIcon}
            onSave={handleSave}
            saveStatus={saveStatus}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default App;
