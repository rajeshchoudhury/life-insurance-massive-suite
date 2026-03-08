import React from "react";

type Props = React.PropsWithChildren<{ title?: string; style?: React.CSSProperties }>;

export function Card({ title, children, style }: Props) {
  return (
    <section style={{ border: "1px solid #e5e5e5", borderRadius: 16, padding: 12, ...style }}>
      {title && <h4 style={{ marginTop: 0 }}>{title}</h4>}
      {children}
    </section>
  );
}
