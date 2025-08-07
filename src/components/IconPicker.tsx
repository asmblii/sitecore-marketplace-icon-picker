import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import type { Icon } from "../types";

interface IconPickerProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  filteredIcons: Icon[];
  selectedIcon: string;
  onIconSelect: (icon: string) => void;
  onSave: () => Promise<void>;
  saveStatus: "idle" | "saving" | "saved" | "error";
}

export function IconPicker({
  searchInput,
  onSearchChange,
  filteredIcons,
  selectedIcon,
  onIconSelect,
  onSave,
  saveStatus,
}: IconPickerProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 p-6 flex flex-col overflow-hidden">
        <Input 
          type="search"
          placeholder="Search icons..."
          value={searchInput}
          onChange={(e) => { 
            onIconSelect("")
            onSearchChange(e.target.value)
          }}
        />

        <div className="flex-1 overflow-y-auto pr-3 pt-3">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 items-start content-start">
            
            {filteredIcons.length === 0 && (
              <p style={{ color: "#666", gridColumn: "1 / -1" }}>
                No icons match your search.
              </p>
            )}

            {filteredIcons.map((icon) => (
              <Card key={icon.name} 
                    onClick={() => onIconSelect(icon.name)}
                    className={`cursor-pointer h-28 flex flex-col items-center justify-center text-center gap-1 ${selectedIcon === icon.name ? "bg-primary/10" : ""}`}
                    style="outline"
                    elevation="base"
                    padding="sm">

                <span className={`material-icons md-48 pointer-events-none ${selectedIcon === icon.name ? "text-primary" : "text-neutral"}`}>
                  {icon.name}
                </span>
                
                <small className={`text-xs text-center leading-tight break-words hyphens-auto px-1 ${selectedIcon === icon.name ? "text-primary font-bold" : "text-neutral"}`}>
                  {icon.name.replaceAll("_", " ")}
                </small>
              </Card>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6">
          <Button
            variant="default"
            colorScheme="primary"
            onClick={onSave}
            disabled={saveStatus === "saving" || saveStatus === "saved" || !selectedIcon || selectedIcon.length === 0}
            className="max-w-[220px] mx-auto block"
          >
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
                ? "Saved!"
                : saveStatus === "error"
                  ? "Error - Try Again"
                  : "Save"}
          </Button>
        </div>
      </main>
    </div>
  );
} 