import React, { useState } from "react";
import icons from "../data/icons.json";

type IconPickerProps = {
  selectedIcon: string;
  onSelect: (icon: string) => void;
};

export function IconPicker({ selectedIcon, onSelect }: IconPickerProps) {
  const [input, setInput] = useState("");

  const filteredIcons = icons.filter(icon =>
    icon.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div style={{ margin: "16px 0" }}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search icons (e.g. star, home, email)"
        style={{
          padding: 8,
          width: "100%",
          marginBottom: 16,
          borderRadius: 4,
          border: "1px solid #ccc"
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
          gap: "12px"
        }}
      >
        {filteredIcons.map(icon => ( 
          <div
            key={icon}
            onClick={() => onSelect(icon)}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 8,
              borderRadius: 6,
              backgroundColor:
                selectedIcon === icon ? "rgba(37, 99, 235, 0.1)" : "transparent",
              border:
                selectedIcon === icon ? "2px solid #2563eb" : "1px solid #eee"
            }}
          >
            <span className="material-icons" style={{ fontSize: 32 }}>
              {icon}
            </span>
            <small>{icon}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
