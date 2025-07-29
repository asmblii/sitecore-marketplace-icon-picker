import { useState, useEffect } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "./utils/hooks/useMarketplaceClient";
import { Button } from "./components/ui/button";
import { Navigation } from "./components/Navigation";
import icons from "./data/icons.json";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";

const NAV_ITEMS = [
  { key: "all", label: "All Icons" },
];

function App() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<ApplicationContext>();
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [navSelected, setNavSelected] = useState("all");

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!error && isInitialized && client) {
      client
        .query("application.context")
        .then((res) => {
          setAppContext(res.data);
        })
        .catch((error) => {
          console.error("Error retrieving application.context:", error);
        });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);

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

          <div className="flex h-screen overflow-hidden">
            <main className="flex-1 p-6 flex flex-col overflow-y-auto">

              <Input 
                type="search"
                placeholder="Search icons..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              <div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(64px,64px))] gap-4 overflow-y-auto pr-3 pt-3 mb-8">
                
                {filteredIcons.length === 0 && (
                  <p style={{ color: "#666", gridColumn: "1 / -1" }}>
                    No icons match your search.
                  </p>
                )}

                {filteredIcons.map((icon) => (
                  <Card key={icon} 
                        onClick={() => setSelectedIcon(icon)}
                        style="outline"
                        elevation="base">

                    <span className="material-icons text-3xl pointer-events-none mb-1.5">
                      {icon}
                    </span>
                    
                    <small className="text-[11px] text-center">
                      {icon}
                    </small>
                  </Card>
                ))}
              </div>

              {/* Selected Icon Preview */}
              {selectedIcon && (
                <div className="mx-auto bg-gray-50 p-6 rounded-2xl shadow-xl shadow-blue-500/30 max-w-[280px] text-center text-gray-900">
                  <span className="material-icons text-[96px]">
                    {selectedIcon}
                  </span>
                  <div className="mt-4 text-[22px] font-bold select-none">
                    {selectedIcon}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <Button
                variant="default"
                colorScheme="primary"
                onClick={handleSave}
                disabled={saveStatus === "saving" || saveStatus === "saved" || !selectedIcon}
                className="mt-8 max-w-[220px] self-center"
              >
                {saveStatus === "saving"
                  ? "Saving..."
                  : saveStatus === "saved"
                    ? "Saved!"
                    : saveStatus === "error"
                      ? "Error - Try Again"
                      : "Save"}
              </Button>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

    </>
  );
}

export default App;
