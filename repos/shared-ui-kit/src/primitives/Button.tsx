import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", style, ...rest }: Props) {
  const base: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    cursor: "pointer",
    background: variant === "primary" ? "#111" : "#fff",
    color: variant === "primary" ? "#fff" : "#111"
  };
  return <button {...rest} style={{ ...base, ...style }} />;
}
