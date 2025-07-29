import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface IconPickerProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  filteredIcons: string[];
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
      <main className="flex-1 p-6 flex flex-col overflow-y-auto">
        <Input 
          type="search"
          placeholder="Search icons..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 overflow-y-auto pr-3 pt-3 mb-8">
          
          {filteredIcons.length === 0 && (
            <p style={{ color: "#666", gridColumn: "1 / -1" }}>
              No icons match your search.
            </p>
          )}

          {filteredIcons.map((icon) => (
            <Card key={icon} 
                  onClick={() => onIconSelect(icon)}
                  className="cursor-pointer h-28 flex flex-col items-center justify-center text-center gap-1"
                  style="outline"
                  elevation="base"
                  padding="sm">

              <span className="material-icons md-48 pointer-events-none">
                {icon}
              </span>
              
              <small className="text-xs text-center leading-tight break-words hyphens-auto px-1">
                {icon.replaceAll("_", " ")}
              </small>
            </Card>
          ))}
        </div>

        {/* Selected Icon Preview */}
        {selectedIcon && (
          <div className="mx-auto bg-gray-50 p-6 rounded-2xl shadow-xl shadow-blue-500/30 max-w-[280px] text-center text-gray-900">
            <span className="material-icons md-48 pointer-events-none">
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
          onClick={onSave}
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
  );
} 