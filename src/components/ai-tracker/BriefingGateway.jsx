const REPORTS = [
  {
    title: "Board Executive Briefing",
    hrefPrefix: "/ai-legirisk/board",
  },
  {
    title: "Name Standard℠ Diagnostic",
    hrefPrefix: "/ai-legirisk/name-standard",
  },
  {
    title: "Enterprise Governance Analysis",
    hrefPrefix: "/ai-legirisk/enterprise",
  },
];

function getSlug(record) {
  return record?.slug || record?.law?.slug || "";
}

export default function BriefingGateway({ record }) {
  const slug = getSlug(record);

  if (!slug) return null;

  return (
    <nav className="briefing-gateway-clean" aria-label="AILegiRisk report package">
      {REPORTS.map((report) => (
        <a
          key={report.hrefPrefix}
          className="briefing-gateway-clean-card"
          href={`${report.hrefPrefix}/${slug}/`}
        >
          <span>{report.title}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17L17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </a>
      ))}

      <style>{`
        .briefing-gateway-clean {
          display: grid;
          gap: 1rem;
          margin-top: 2rem;
        }

        .briefing-gateway-clean-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          min-height: 5.5rem;
          border: 1px solid var(--lozen-tracker-table-border-strong);
          border-radius: 1rem;
          background: var(--lozen-tracker-section-bg);
          padding: 1.15rem 1.25rem;
          text-decoration: none;
          color: var(--color-base-900);
          box-shadow: var(--shadow-sm);
          transition:
            border-color 160ms ease,
            background-color 160ms ease,
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .briefing-gateway-clean-card:hover {
          border-color: var(--lozen-tracker-row-hover-accent);
          background: var(--lozen-tracker-row-hover-bg);
          box-shadow: var(--lozen-tracker-card-shadow);
          transform: translateY(-1px);
        }

        .briefing-gateway-clean-card span {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 1.6vw, 1.65rem);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .briefing-gateway-clean-card svg {
          width: 1.15rem;
          height: 1.15rem;
          flex: 0 0 auto;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          color: var(--lozen-tracker-row-hover-accent);
        }
      `}</style>
    </nav>
  );
}
