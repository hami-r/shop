export function SectionHeading({
  eyebrow,
  title,
  centered = false
}: {
  eyebrow?: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow ? <p className="label mb-3 text-secondary">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl font-semibold leading-tight text-primary md:text-4xl">{title}</h2>
      <div className={centered ? "mx-auto mt-4 h-1 w-12 rounded-full bg-secondary" : "mt-4 h-1 w-12 rounded-full bg-secondary"} />
    </div>
  );
}
