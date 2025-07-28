import React, { useState, useEffect } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "./utils/hooks/useMarketplaceClient";
import { Button } from "./components/ui/button";
import icons from "./data/icons.json";

const NAV_ITEMS = [
  { key: "all", label: "All Icons" },
];

function App() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<ApplicationContext>();
  const [textValue, setTextValue] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // Sidebar collapsed state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // For navigation filter, currently only "all"
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
      await client?.setValue(JSON.stringify({ text: textValue, icon: selectedIcon }), true);
      setSaveStatus("saved");
      setTimeout(() => client?.closeApp(), 1000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return (
    <>
      {/* Global dark mode styles */}
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #121212;
            color: #e0e0e0;
          }
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          .material-icons {
            user-select: none;
          }
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          input, button {
            font-family: inherit;
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            backgroundColor: "#1e1e1e",
            width: sidebarOpen ? 240 : 56,
            transition: "width 0.3s ease",
            boxShadow: "2px 0 10px rgba(0,0,0,0.7)",
            color: "#bbb",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Toggle Button */}
          <button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#ccc",
              cursor: "pointer",
              fontSize: 24,
              padding: 12,
              alignSelf: sidebarOpen ? "flex-end" : "center",
            }}
            title="Toggle sidebar"
          >
            {sidebarOpen ? "⬅️" : "➡️"}
          </button>

          {/* Navigation */}
          <nav style={{ flex: 1, marginTop: 16 }}>
            {NAV_ITEMS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setNavSelected(key)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  textAlign: sidebarOpen ? "left" : "center",
                  backgroundColor: navSelected === key ? "#2563eb" : "transparent",
                  border: "none",
                  color: navSelected === key ? "#fff" : "#bbb",
                  cursor: "pointer",
                  fontWeight: navSelected === key ? "bold" : "normal",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  borderRadius: 4,
                  marginBottom: 8,
                  transition: "background-color 0.2s",
                }}
                title={label}
              >
                {sidebarOpen ? label : label.charAt(0)}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            backgroundColor: "#181818",
          }}
        >
          <h1 style={{ marginBottom: 24, color: "#eee" }}>
            Welcome to {appContext?.name || "Marketplace App"}
          </h1>

          {/* Text Input */}
          <input
            type="text"
            placeholder="Enter text here..."
            value={textValue}
            disabled={saveStatus === "saving"}
            onChange={(e) => setTextValue(e.target.value)}
            style={{
              fontSize: 16,
              padding: "12px 16px",
              borderRadius: 6,
              border: "none",
              marginBottom: 24,
              backgroundColor: "#222",
              color: "#eee",
              boxShadow: "inset 0 0 5px #000",
            }}
          />

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
              border: "none",
              marginBottom: 20,
              backgroundColor: "#222",
              color: "#eee",
              boxShadow: "inset 0 0 5px #000",
              transition: "box-shadow 0.3s ease",
              outline: "none",
              width: 320,
              maxWidth: "100%",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "inset 0 0 8px #2563eb")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 5px #000")}
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
              <p style={{ color: "#888", gridColumn: "1 / -1" }}>
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
                  backgroundColor: selectedIcon === icon ? "#2563eb" : "#222",
                  color: selectedIcon === icon ? "#fff" : "#bbb",
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  boxShadow:
                    selectedIcon === icon
                      ? "0 0 10px 2px #2563ebaa"
                      : "0 0 4px 0 #000 inset",
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
                backgroundColor: "#222",
                padding: 24,
                borderRadius: 16,
                boxShadow: "0 0 20px #2563eb",
                maxWidth: 280,
                textAlign: "center",
                color: "#eee",
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
