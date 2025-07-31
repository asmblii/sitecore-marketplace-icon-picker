import { useState } from "react";
import { useMarketplaceClient } from "./utils/hooks/useMarketplaceClient";
import { Navigation } from "./components/Navigation";
import { IconPicker } from "./components/IconPicker";
import icons from "./data/icons.json";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

const NAV_ITEMS = [
  { key: "all", label: "All Icons" },
];

function App() {
  const { client } = useMarketplaceClient();
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [navSelected, setNavSelected] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  const filteredIcons = icons.filter((icon) =>
    icon.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await client?.setValue(JSON.stringify({ icon: selectedIcon }), true);
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
        <ResizableHandle withHandle />
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
