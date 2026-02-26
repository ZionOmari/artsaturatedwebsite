type Props = {
  href: string;
  label?: string;
};

export default function BuyPrintButton({ href, label = "Buy this print" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition hover:opacity-90"
      style={{ border: "1px solid rgba(255,255,255,0.2)" }}
    >
      {label} →
    </a>
  );
}
