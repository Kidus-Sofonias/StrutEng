import useScrollReveal from "../hooks/useScrollReveal";

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}) {
  const dirClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
      ? "reveal-right"
      : direction === "scale"
      ? "reveal-scale"
      : "reveal";

  const ref = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`${dirClass} ${delay ? `stagger-${delay}` : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
