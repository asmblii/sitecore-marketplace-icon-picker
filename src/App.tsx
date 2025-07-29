import { useState, useEffect } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "./utils/hooks/useMarketplaceClient";
import { Button } from "./components/ui/button";
import { Navigation } from "./components/Navigation";
import icons from "./data/icons.json";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

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
          <div>
            <h1>Main Content</h1>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            backgroundColor: "#ffffff",
          }}
        >
          <h1 style={{ marginBottom: 24, color: "#1a1a1a" }}>
            Welcome to {appContext?.name || "Marketplace App"}
          </h1>

          {/* Search bar for filtering icons */}
          <input
            type="search"
            placeholder="Search icons..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              fontSize: 16,
              padding: "10px 14px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              marginBottom: 20,
              backgroundColor: "#ffffff",
              color: "#1a1a1a",
              boxShadow: "inset 0 0 3px rgba(0,0,0,0.1)",
              transition: "box-shadow 0.3s ease",
              outline: "none",
              width: 320,
              maxWidth: "100%",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 3px rgba(0,0,0,0.1)")}
          />

          {/* Icon Grid */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
              gap: 16,
              overflowY: "auto",
              paddingRight: 12,
              marginBottom: 32,
            }}
          >
            {filteredIcons.length === 0 && (
              <p style={{ color: "#666", gridColumn: "1 / -1" }}>
                No icons match your search.
              </p>
            )}

            {filteredIcons.map((icon) => (
              <div
                key={icon}
                title={icon}
                onClick={() => setSelectedIcon(icon)}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedIcon === icon ? "#2563eb" : "#f8f9fa",
                  color: selectedIcon === icon ? "#fff" : "#374151",
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  boxShadow:
                    selectedIcon === icon
                      ? "0 0 10px 2px #2563ebaa"
                      : "0 1px 3px rgba(0,0,0,0.1)",
                  transition: "background-color 0.3s, box-shadow 0.3s, color 0.3s",
                  userSelect: "none",
                }}
                aria-pressed={selectedIcon === icon}
                role="button"
              >
                <span
                  className="material-icons"
                  style={{ fontSize: 32, pointerEvents: "none" }}
                >
                  {icon}
                </span>
                <small
                  style={{
                    marginTop: 6,
                    fontSize: 11,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                    textAlign: "center",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {icon}
                </small>
              </div>
            ))}
          </div>

          {/* Selected Icon Preview */}
          {selectedIcon && (
            <div
              style={{
                margin: "auto",
                backgroundColor: "#f8f9fa",
                padding: 24,
                borderRadius: 16,
                boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)",
                maxWidth: 280,
                textAlign: "center",
                color: "#1a1a1a",
              }}
            >
              <span className="material-icons" style={{ fontSize: 96 }}>
                {selectedIcon}
              </span>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 22,
                  fontWeight: "bold",
                  userSelect: "none",
                }}
              >
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
            style={{ marginTop: 32, maxWidth: 220, alignSelf: "center" }}
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
    </>
  );
}

export default App;
