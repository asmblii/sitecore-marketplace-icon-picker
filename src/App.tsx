// src/App.tsx

import { useState, useEffect } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "./utils/hooks/useMarketplaceClient";
import { Button } from "./components/ui/button";

function App() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<ApplicationContext>();
  const [textValue, setTextValue] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (!error && isInitialized && client) {
      console.log("Marketplace client initialized successfully.");

      // Make a query to retrieve the application context
      client.query("application.context")
        .then((res) => {
          console.log("Success retrieving application.context:", res.data);
          setAppContext(res.data);
        })
        .catch((error) => {
          console.error("Error retrieving application.context:", error);
        });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);

  const handleSave = async () => {
    console.log("Save button clicked with value:", textValue);
    setSaveStatus("saving");
    
    try {
      await client?.setValue(textValue, true);
      setSaveStatus("saved");
      setTimeout(() => {
        client?.closeApp();
      }, 1000);
    } catch {
      setSaveStatus("error");
      // Reset error status after 3 seconds
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    }
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving...";
      case "saved":
        return "Saved!";
      case "error":
        return "Error - Try Again";
      default:
        return "Save";
    }
  };

  const getSaveStatusMessage = () => {
    switch (saveStatus) {
      case "saving":
        return <p style={{ color: "blue", margin: "5px 0" }}>Saving your changes...</p>;
      case "saved":
        return <p style={{ color: "green", margin: "5px 0" }}>✓ Successfully saved!</p>;
      case "error":
        return <p style={{ color: "red", margin: "5px 0" }}>✗ Failed to save. Please try again.</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Welcome to {appContext?.name}</h1>
      <div>
        <input
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Enter text here..."
          disabled={saveStatus === "saving"}
        />
        <Button className="blue-500 text-white"
          onClick={handleSave}
          disabled={saveStatus === "saving" || saveStatus === "saved"}
        >
          {getSaveButtonText()}
        </Button>
        {getSaveStatusMessage()}
      </div>
    </>
  );
}

export default App;
