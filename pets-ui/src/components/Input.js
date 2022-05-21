import React from "react";

export default function Input({
  labelText,
  type,
  onChange,
  defaultValue = "",
}) {
  return (
    <div className="input-container">
      <label>{labelText}:</label>
      <input
        onChange={(e) => onChange(e.target.value)}
        className="input"
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  );
}
