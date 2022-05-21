import React from "react";

export default function Title({ children }) {
  return (
    <h1
      style={{
        fontSize: "24px",
        textTransform: "uppercase",
        margin: "8px 0",
      }}
    >
      {children}
    </h1>
  );
}
