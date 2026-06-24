import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  colorSchemeLightCold,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const lozenGridTheme = themeQuartz
  .withPart(colorSchemeLightCold)
  .withParams({
    accentColor: "#0f172a",
    backgroundColor: "#ffffff",
    borderColor: "rgba(71, 85, 105, 0.3)",
    browserColorScheme: "light",
    columnBorder: true,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    foregroundColor: "#0f172a",
    headerBackgroundColor: "#f8fafc",
    headerFontSize: 12,
    headerFontWeight: 800,
    headerTextColor: "#0f172a",
    oddRowBackgroundColor: "#ffffff",
    rowBorder: true,
    rowHoverColor: "#f8fafc",
    selectedRowBackgroundColor: "#eef2f7",
    spacing: 8,
    wrapperBorder: false,
    wrapperBorderRadius: 0,
  });

const formalRightOfRefusalNote =
  "Formal Right of Refusal is not established by the legislation unless the rule expressly gives a named human reviewer authority to halt, escalate, refuse, or document non-compliant AI-assisted work without internal reprisal.";

const trackerRows = [
  {
    "id": "regulation-eu-2024-1689-ai-act",
    "ruleName": "Regulation (EU) 2024/1689 (AI Act)",
    "region": "European Union",
    "status": "Signed into law (Rollout 2025–2027)",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "To improve the functioning of the internal market, promote a human-centric and trustworthy AI approach, ensure a high-level of protection against harmful effects of AI systems, and support innovation",
    "nameStandardSignal": "Human oversight mentioned but undefined",
    "liveDate": "Aug 1, 2024 (entry)",
    "sourceUrl": "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
  },
  {
    "id": "colorado-sb-26-189-admt",
    "ruleName": "Colorado SB 26-189 (ADMT)",
    "region": "Colorado, USA",
    "status": "Signed into law (On hold due to court)",
    "sectorScope": "Private",
    "impactArea": "To regulate automated decision-making technology (ADMT) that materially influences consequential decisions",
    "nameStandardSignal": "Explicit human review required; Human reconsideration right",
    "liveDate": "Jan 1, 2027",
    "sourceUrl": "https://leg.colorado.gov/bills/sb26-189"
  },
  {
    "id": "canada-directive-on-automated-decision-making",
    "ruleName": "Canada Directive on Automated Decision-Making",
    "region": "Canada (Federal)",
    "status": "Already in effect",
    "sectorScope": "Public",
    "impactArea": "To ensure that departments are transparent, accountable and fair in automated decision-making",
    "nameStandardSignal": "Explicit human review required",
    "liveDate": "June 24, 2025 (latest)",
    "sourceUrl": "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592"
  },
  {
    "id": "japan-act-no-53-of-2025-ai-promotion-act",
    "ruleName": "Japan Act No. 53 of 2025 (AI Promotion Act)",
    "region": "Japan",
    "status": "Signed into law (Starting Sept 2025)",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "To encourage voluntary and proactive efforts by all AI-related actors for the appropriate conduct of AI research, development, and utilization",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Sep 1, 2025",
    "sourceUrl": "https://www.gov-online.go.jp/en/assets/hj_november_2025_p24-25.pdf"
  },
  {
    "id": "oecd-recommendation-on-ai",
    "ruleName": "OECD Recommendation on AI",
    "region": "47 Countries",
    "status": "Voluntary standard",
    "sectorScope": "Public",
    "impactArea": "promotes a human-centric approach to trustworthy AI, fosters research, and preserves economic incentives to innovate",
    "nameStandardSignal": "Human oversight mentioned but undefined",
    "liveDate": "May 3, 2024 (revised)",
    "sourceUrl": "https://legalinstruments.oecd.org/en/instruments/oecd-legal-0449"
  },
  {
    "id": "california-sb-53-frontier-ai-act",
    "ruleName": "California SB 53 (Frontier AI Act)",
    "region": "California, USA",
    "status": "Signed into law (Starting Jan 2026)",
    "sectorScope": "Private",
    "impactArea": "To establish and maintain a reasonable internal process through which a covered employee... may anonymously submit a report... of a specific and substantial danger to the public health or safety",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jan 1, 2026",
    "sourceUrl": "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53"
  },
  {
    "id": "illinois-hb-3773-employment-discrimination",
    "ruleName": "Illinois HB 3773 (Employment Discrimination)",
    "region": "Illinois, USA",
    "status": "Signed into law (in effect since Jan 1, 2026)",
    "sectorScope": "Private",
    "impactArea": "To prohibit an employer from using artificial intelligence in a manner that has the effect of subjecting employees to unlawful discrimination... without prior notice",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jan 1, 2026",
    "sourceUrl": "https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804"
  },
  {
    "id": "indiana-hb-1271-health-claims",
    "ruleName": "Indiana HB 1271 (Health Claims)",
    "region": "Indiana, USA",
    "status": "Signed into law (Starting July 2026)",
    "sectorScope": "Private",
    "impactArea": "Prohibits health insurers from using solely automated AI algorithms to downcode or deny reimbursement claims without clinical justification and manual medical record review",
    "nameStandardSignal": "Licensed professional review required",
    "liveDate": "Jul 1, 2026",
    "sourceUrl": "https://iga.in.gov/legislative/2026/bills/house/1271"
  },
  {
    "id": "maryland-hb-895-dynamic-pricing",
    "ruleName": "Maryland HB 895 (Dynamic Pricing)",
    "region": "Maryland, USA",
    "status": "Signed into law (Starting Oct 2026)",
    "sectorScope": "Private",
    "impactArea": "prohibiting a food retailer and a third–party food delivery service provider from engaging in the practice of dynamic pricing or using consumer surveillance personal data to set a price",
    "nameStandardSignal": "No human accountability mechanism found",
    "liveDate": "Oct 1, 2026",
    "sourceUrl": "https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb0895"
  },
  {
    "id": "california-ccpa-regulations-on-admt",
    "ruleName": "California CCPA Regulations on ADMT",
    "region": "California, USA",
    "status": "Final regulations adopted (Sept 2025); ADMT compliance required by Jan 1, 2027",
    "sectorScope": "Private",
    "impactArea": "To make rules about access and opt-out rights relating to businesses’ use of automated decisionmaking technology (ADMT)",
    "nameStandardSignal": "Explicit human review required",
    "liveDate": "Jan 1, 2027 (target)",
    "sourceUrl": "https://cppa.ca.gov/announcements/2025/20250923.html"
  },
  {
    "id": "utah-ai-policy-act-sb-149",
    "ruleName": "Utah AI Policy Act (SB 149)",
    "region": "Utah, USA",
    "status": "Already in effect",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "To create the Office of Artificial Intelligence Policy... and to provide requirements for generative artificial intelligence",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "May 1, 2024",
    "sourceUrl": "https://le.utah.gov/~2024/bills/static/SB0149.html"
  },
  {
    "id": "nyc-local-law-144-hiring-tools",
    "ruleName": "NYC Local Law 144 (Hiring Tools)",
    "region": "NYC, USA",
    "status": "Already in effect",
    "sectorScope": "Private",
    "impactArea": "regulating the use of automated employment decision tools",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jul 5, 2023",
    "sourceUrl": "https://rules.cityofnewyork.us/rule/automated-employment-decision-tools-2/"
  },
  {
    "id": "texas-traiga-hb-149",
    "ruleName": "Texas TRAIGA (HB 149)",
    "region": "Texas, USA",
    "status": "Signed into law (Starting Jan 2026)",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "prohibits the development or deployment of AI systems for restricted purposes while offering affirmative defenses for NIST AI Risk Management Framework compliance",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jan 1, 2026",
    "sourceUrl": "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149"
  },
  {
    "id": "voluntary-ai-safety-standard",
    "ruleName": "Voluntary AI Safety Standard",
    "region": "Australia",
    "status": "Voluntary standard",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "Outlines voluntary guardrails for organizations across the AI supply chain to manage risks, protect data, and ensure human oversight",
    "nameStandardSignal": "Human oversight mentioned but undefined",
    "liveDate": "Sep 2024",
    "sourceUrl": "https://www.industry.gov.au/publications/voluntary-ai-safety-standard"
  },
  {
    "id": "connecticut-sb-5-airt-act",
    "ruleName": "Connecticut SB 5 (AIRT Act)",
    "region": "Connecticut, USA",
    "status": "Signed into law (Starting Oct 2026)",
    "sectorScope": "Private",
    "impactArea": "establishing a reasonable internal process through which (A) a covered employee of such large frontier developer may anonymously submit a report... of catastrophic risk",
    "nameStandardSignal": "Explicit human review required; Licensed professional review required",
    "liveDate": "Oct 1, 2026",
    "sourceUrl": "https://www.cga.ct.gov/2026/ACT/PA/PDF/2026PA-00015-R00SB-00005-PA.PDF"
  },
  {
    "id": "take-it-down-act",
    "ruleName": "TAKE IT DOWN Act",
    "region": "USA (Federal)",
    "status": "Already in effect",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "prohibiting the nonconsensual online distribution of intimate deepfakes and requiring covered platforms to establish a 48-hour removal mechanism",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "May 19, 2025",
    "sourceUrl": "https://www.congress.gov/bill/119th-congress/senate-bill/146"
  },
  {
    "id": "georgia-sb-444-health-insurance",
    "ruleName": "Georgia SB 444 (Health Insurance)",
    "region": "Georgia, USA",
    "status": "Signed into law (Starting Jan 2027)",
    "sectorScope": "Private",
    "impactArea": "systems shall not issue an adverse determination to a patient until a natural person... conducts a utilization review in which a clinical peer participates",
    "nameStandardSignal": "Explicit human review required",
    "liveDate": "Jan 1, 2027",
    "sourceUrl": "https://www.legis.ga.gov/api/legislation/document/20252026/247655"
  },
  {
    "id": "illinois-sb-315-ai-safety-measures",
    "ruleName": "Illinois SB 315 (AI Safety Measures)",
    "region": "Illinois, USA",
    "status": "Sent to Governor (Wait for final signature)",
    "sectorScope": "Private",
    "impactArea": "To establish a safety framework for large frontier AI developers... addressing catastrophic risks, governance, and cybersecurity",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jan 1, 2027",
    "sourceUrl": "https://www.ilga.gov/documents/legislation/104/SB/PDF/10400SB0315lv.pdf"
  },
  {
    "id": "california-ab-2013-data-transparency",
    "ruleName": "California AB 2013 (Data Transparency)",
    "region": "California, USA",
    "status": "Signed into law (Starting Jan 2026)",
    "sectorScope": "Private",
    "impactArea": "mandating that developers of generative AI systems publish a high-level summary of the training datasets",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jan 1, 2026",
    "sourceUrl": "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2013"
  },
  {
    "id": "tennessee-elvis-act",
    "ruleName": "Tennessee ELVIS Act",
    "region": "Tennessee, USA",
    "status": "Already in effect",
    "sectorScope": "Private",
    "impactArea": "expanding the state's right of publicity law to protect individuals' voices against unauthorized AI-generated replicas",
    "nameStandardSignal": "No human accountability mechanism found",
    "liveDate": "July 1, 2024",
    "sourceUrl": "https://wapp.capitol.tn.gov/apps/BillInfo/Default.aspx?BillNumber=HB2091"
  },
  {
    "id": "washington-ssb-5886-likeness",
    "ruleName": "Washington SSB 5886 (Likeness)",
    "region": "Washington, USA",
    "status": "Already in effect",
    "sectorScope": "Private",
    "impactArea": "creating digital-likeness rights to prevent unauthorized AI voice and likeness reproduction",
    "nameStandardSignal": "No human accountability mechanism found",
    "liveDate": "June 11, 2026",
    "sourceUrl": "https://app.leg.wa.gov/billsummary?BillNumber=5886&Year=2025"
  },
  {
    "id": "arizona-sb-1359-deepfakes",
    "ruleName": "Arizona SB 1359 (Deepfakes)",
    "region": "Arizona, USA",
    "status": "Already in effect",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "prohibiting creating or distributing fraudulent deepfakes of political candidates within 90 days of an election unless AI use is clearly disclosed",
    "nameStandardSignal": "No human accountability mechanism found",
    "liveDate": "June 4, 2024",
    "sourceUrl": "https://www.azleg.gov/legtext/56leg/2R/bills/SB1359P.pdf"
  },
  {
    "id": "alabama-hb-172-elections",
    "ruleName": "Alabama HB 172 (Elections)",
    "region": "Alabama, USA",
    "status": "Already in effect",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "prohibiting the distribution of materially deceptive AI-generated media depicting political candidates intended to influence an election without disclosure",
    "nameStandardSignal": "No human accountability mechanism found",
    "liveDate": "Oct 1, 2024",
    "sourceUrl": "https://alison.legislature.state.al.us/bill-history?relevantBill=HB172"
  },
  {
    "id": "michigan-hb-5141-ad-disclaimers",
    "ruleName": "Michigan HB 5141 (Ad Disclaimers)",
    "region": "Michigan, USA",
    "status": "Already in effect",
    "sectorScope": "Dual / Shared Sector Scope",
    "impactArea": "requiring disclaimers on AI-generated political advertisements",
    "nameStandardSignal": "No human accountability mechanism found",
    "liveDate": "Feb 13, 2024",
    "sourceUrl": "http://www.legislature.mi.gov/mileg.aspx?page=getobject&objectname=2023-HB-5141"
  },
  {
    "id": "california-sb-243-companion-bots",
    "ruleName": "California SB 243 (Companion Bots)",
    "region": "California, USA",
    "status": "Signed into law (Starting Jan 2026)",
    "sectorScope": "Private",
    "impactArea": "imposing disclosure and safety standards on operators of companion chatbots",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jan 1, 2026",
    "sourceUrl": "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243"
  },
  {
    "id": "california-ab-489-healthcare-disclosures",
    "ruleName": "California AB 489 (Healthcare Disclosures)",
    "region": "California, USA",
    "status": "Signed into law (Starting Jan 2026)",
    "sectorScope": "Private",
    "impactArea": "prohibiting AI technology providers from falsely claiming healthcare licenses and mandating disclosures when AI tools generate clinical communications",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jan 1, 2026",
    "sourceUrl": "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB489"
  },
  {
    "id": "georgia-sb-540-chatbot-safety",
    "ruleName": "Georgia SB 540 (Chatbot Safety)",
    "region": "Georgia, USA",
    "status": "Signed into law (Starting July 2027)",
    "sectorScope": "Private",
    "impactArea": "requiring chatbot operators to notify users of AI interaction, implement protections for minors, and follow crisis response protocols",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "July 1, 2027",
    "sourceUrl": "https://www.legis.ga.gov/legislation/68903"
  },
  {
    "id": "omb-memorandum-m-24-10",
    "ruleName": "OMB Memorandum M-24-10",
    "region": "USA (Federal)",
    "status": "Already in effect",
    "sectorScope": "Public",
    "impactArea": "Advancing Governance, Innovation, and Risk Management for Agency Use of Artificial Intelligence",
    "nameStandardSignal": "Explicit human review required",
    "liveDate": "March 28, 2024",
    "sourceUrl": "https://www.whitehouse.gov/wp-content/uploads/2024/03/M-24-10-Advancing-Governance-Innovation-and-Risk-Management-for-Agency-Use-of-Artificial-Intelligence.pdf"
  },
  {
    "id": "new-york-raise-act-a06453",
    "ruleName": "New York RAISE Act (A06453)",
    "region": "New York, USA",
    "status": "Signed into law (Starting Jan 2027)",
    "sectorScope": "Private",
    "impactArea": "Requires large frontier AI developers to publish safety plans, report critical incidents within 72 hours, and refrain from releasing models that fail testing.",
    "nameStandardSignal": "Documentation / record retention only",
    "liveDate": "Jan 1, 2027",
    "sourceUrl": "https://nyassembly.gov/leg/?bn=A06453"
  },
  {
    "id": "arkansas-hb-1958-public-entities",
    "ruleName": "Arkansas HB 1958 (Public Entities)",
    "region": "Arkansas, USA",
    "status": "Already in effect",
    "sectorScope": "Public",
    "impactArea": "Requires public entities in Arkansas to develop comprehensive policies regarding the authorized use of AI and automated decision-making technology.",
    "nameStandardSignal": "Not applicable",
    "liveDate": "August 3, 2025",
    "sourceUrl": "https://www.arkleg.state.ar.us/Bills/Detail?id=HB1958"
  },
  {
    "id": "illinois-video-interview-act-hb-2557",
    "ruleName": "Illinois Video Interview Act (HB 2557)",
    "region": "Illinois, USA",
    "status": "Already in effect",
    "sectorScope": "Private",
    "impactArea": "Requires employers using AI to analyze job applicant video interviews to provide notice, obtain consent, and follow data destruction timelines.",
    "nameStandardSignal": "Not applicable",
    "liveDate": "Jan 1, 2020",
    "sourceUrl": "https://www.ilga.gov/legislation/BillStatus.asp?DocNum=2557&GAID=15&GA=101&DocTypeID=HB"
  }
];

const reportPathways = [
  {
    id: "board",
    name: "Board Executive Briefing",
    description: "What should the board be prepared to see, ask, and evidence?",
  },
  {
    id: "name-standard",
    name: "Name Standard℠ Diagnostic",
    description: "Does the rule create real individual accountability or only procedural oversight?",
  },
  {
    id: "enterprise",
    name: "Enterprise Governance Analysis",
    description: "What must be built, documented, maintained, or evidenced?",
  },
];

function getSourceHost(sourceUrl) {
  if (!sourceUrl) return "Source";

  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, "");
  } catch {
    return "Source";
  }
}

function SourceCellRenderer({ data }) {
  if (!data?.sourceUrl) {
    return <span className="source-pending">Source pending</span>;
  }

  return (
    <a
      className="source-link"
      href={data.sourceUrl}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => event.stopPropagation()}
    >
      {getSourceHost(data.sourceUrl)}
    </a>
  );
}

function RuleNameCellRenderer({ value }) {
  return <span className="rule-name-cell">{value}</span>;
}

export default function AILegislationWorkflow() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [sheetStep, setSheetStep] = useState("closed");
  const [popupOffset, setPopupOffset] = useState({ x: 0, y: 0 });
  const [popupDrag, setPopupDrag] = useState(null);

  const activeReport = useMemo(() => {
    return reportPathways.find((report) => report.id === selectedReport) ?? null;
  }, [selectedReport]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      floatingFilter: true,
      minWidth: 130,
      resizable: true,
      sortable: true,
      suppressHeaderMenuButton: false,
      wrapHeaderText: true,
    }),
    [],
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Rule Name",
        field: "ruleName",
        cellRenderer: RuleNameCellRenderer,
        flex: 2.1,
        minWidth: 280,
        tooltipField: "ruleName",
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "Region",
        field: "region",
        flex: 0.85,
        minWidth: 155,
      },
      {
        headerName: "Status",
        field: "status",
        flex: 1,
        minWidth: 210,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "Sector Scope",
        field: "sectorScope",
        flex: 0.9,
        minWidth: 170,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "Name Standard℠ Signal",
        field: "nameStandardSignal",
        flex: 1.25,
        minWidth: 260,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "Live Date",
        field: "liveDate",
        flex: 0.8,
        minWidth: 155,
      },
      {
        headerName: "Source",
        field: "sourceUrl",
        cellRenderer: SourceCellRenderer,
        flex: 0.9,
        minWidth: 165,
        sortable: false,
      },
    ],
    [],
  );

  function openRow(row) {
    setSelectedRow(row);
    setSelectedReport(null);
    setSheetStep("report-selection");
    setPopupOffset({ x: 0, y: 0 });
    setPopupDrag(null);
  }

  function closeSheet() {
    setSelectedRow(null);
    setSelectedReport(null);
    setSheetStep("closed");
    setPopupOffset({ x: 0, y: 0 });
    setPopupDrag(null);
  }

  function chooseReport(reportId) {
    setSelectedReport(reportId);
    setSheetStep("view-data");
  }

  function returnToReports() {
    setSelectedReport(null);
    setSheetStep("report-selection");
  }

  function handlePopupPointerDown(event) {
    if (event.button !== 0) return;

    const eventTarget = event.target instanceof Element ? event.target : event.currentTarget;
    const interactiveElement = eventTarget.closest(
      "a, button, input, select, textarea, [role='button']",
    );

    if (interactiveElement) return;

    event.currentTarget.setPointerCapture?.(event.pointerId);

    setPopupDrag({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: popupOffset.x,
      originY: popupOffset.y,
    });
  }

  function handlePopupPointerMove(event) {
    if (!popupDrag || popupDrag.pointerId !== event.pointerId) return;

    setPopupOffset({
      x: popupDrag.originX + event.clientX - popupDrag.startX,
      y: popupDrag.originY + event.clientY - popupDrag.startY,
    });
  }

  function handlePopupPointerEnd(event) {
    if (popupDrag?.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
      setPopupDrag(null);
    }
  }

  function handleRowClicked(event) {
    if (event?.data) {
      openRow(event.data);
    }
  }

  return (
    <div className="ai-legislation-workflow">
      <div className="grid-shell" aria-label="AI legislation index">
        <AgGridReact
          theme={lozenGridTheme}
          rowData={trackerRows}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          domLayout="normal"
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          rowSelection={{ mode: "singleRow" }}
          suppressCellFocus={false}
          tooltipShowDelay={250}
          onRowClicked={handleRowClicked}
          getRowId={(params) => params.data.id}
        />
      </div>

      {selectedRow && sheetStep !== "closed" ? (
        <div
          className="bottom-sheet-shell"
          role="dialog"
          aria-modal="false"
          aria-labelledby="bottom-sheet-title"
        >
          <div
            className={`bottom-sheet ${popupDrag ? "is-dragging" : ""}`}
            style={{
              "--popup-x": `${popupOffset.x}px`,
              "--popup-y": `${popupOffset.y}px`,
            }}
          >
            {sheetStep === "report-selection" ? (
              <>
                <div
                  className="popup-panel-header"
                  onPointerDown={handlePopupPointerDown}
                  onPointerMove={handlePopupPointerMove}
                  onPointerUp={handlePopupPointerEnd}
                  onPointerCancel={handlePopupPointerEnd}
                >
                  <div className="popup-drag-handle" aria-hidden="true" />

                  <button type="button" className="bottom-sheet-close" onClick={closeSheet}>
                    Close
                  </button>

                  <div className="popup-rule-header">
                    <h3 id="bottom-sheet-title">{selectedRow.ruleName}</h3>

                    <p className="popup-rule-meta">
                      {selectedRow.region} · {selectedRow.status} · {selectedRow.liveDate}
                    </p>

     <div className="popup-facts" aria-label="Selected rule details">
  <p>
    <span>Sector Scope:</span> {selectedRow.sectorScope}
  </p>

  <p>
    <span>Name Standard℠ Signal:</span> {selectedRow.nameStandardSignal}
  </p>

{selectedRow.updateNote ? (
  <div>
    <dt>Update Note</dt>
    <dd>{selectedRow.updateNote}</dd>
  </div>
) : null}

  <p>
    <span>Source:</span>{" "}
    {selectedRow.sourceUrl ? (
      <a
        className="source-link"
        href={selectedRow.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        {getSourceHost(selectedRow.sourceUrl)}
      </a>
    ) : (
      "Source pending"
    )}
  </p>
</div>
                  </div>
                </div>

                <div className="popup-report-section">
                  <p className="popup-section-title">Choose a report</p>

                  <div className="report-pathway-grid">
                    {reportPathways.map((report) => (
                      <button
                        key={report.id}
                        type="button"
                        className="report-pathway-card"
                        onClick={() => chooseReport(report.id)}
                      >
                        <strong>{report.name}</strong>
                        <small>{report.description}</small>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : null}

            {sheetStep === "view-data" && activeReport ? (
              <div className="popup-report-view">
                <div
                  className="popup-panel-header popup-panel-header-report"
                  onPointerDown={handlePopupPointerDown}
                  onPointerMove={handlePopupPointerMove}
                  onPointerUp={handlePopupPointerEnd}
                  onPointerCancel={handlePopupPointerEnd}
                >
                  <div className="popup-drag-handle" aria-hidden="true" />

                  <div className="popup-panel-actions">
                    <button type="button" className="back-button" onClick={returnToReports}>
                      Back
                    </button>

                    <button type="button" className="bottom-sheet-close" onClick={closeSheet}>
                      Close
                    </button>
                  </div>

                  <div className="popup-rule-header popup-rule-header-compact">
                    <p className="popup-section-title">{activeReport.name}</p>

                    <h3 id="bottom-sheet-title">{selectedRow.ruleName}</h3>

                    <p className="popup-rule-meta">
                      {selectedRow.region} · {selectedRow.status} · {selectedRow.liveDate}
                    </p>
                  </div>
                </div>

                <div className="report-preview-grid">
                  <div>
                    <dt>Sector Scope</dt>
                    <dd>{selectedRow.sectorScope}</dd>
                  </div>

                  <div>
                    <dt>Name Standard℠ Signal</dt>
                    <dd>{selectedRow.nameStandardSignal}</dd>
                  </div>

                  {activeReport.id === "name-standard" ? (
                    <div>
                      <dt>Formal Right of Refusal</dt>
                      <dd>{formalRightOfRefusalNote}</dd>
                    </div>
                  ) : null}

                  <div>
                    <dt>Source</dt>
                    <dd>
                      {selectedRow.sourceUrl ? (
                        <a
                          className="source-link"
                          href={selectedRow.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {getSourceHost(selectedRow.sourceUrl)}
                        </a>
                      ) : (
                        "Source pending"
                      )}
                    </dd>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

   <style>{`
        .ai-legislation-workflow {
          position: relative;
          min-height: 640px;
          background: #ffffff;
        }

        .grid-shell {
          height: 640px;
          width: 100%;
          background: #ffffff;
        }

        .rule-name-cell {
          display: block;
          color: #0f172a;
          font-weight: 700;
          line-height: 1.4;
          white-space: normal;
        }

        .source-link {
          color: #0f172a;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 0.2em;
          word-break: break-word;
        }

        .source-link:hover {
          color: rgba(15, 23, 42, 0.68);
        }

        .source-link-inverse {
          color: #ffffff;
        }

        .source-link-inverse:hover {
          color: rgba(255, 255, 255, 0.72);
        }

        .source-pending {
          color: rgba(15, 23, 42, 0.5);
          font-size: 0.82rem;
        }

        .ag-root-wrapper {
          border: 0;
        }

        .ag-header-cell-label {
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .ag-row {
          cursor: pointer;
        }

        .ag-cell {
          display: flex;
          align-items: center;
          line-height: 1.45;
        }

        .bottom-sheet-shell {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          pointer-events: none;
        }

        .bottom-sheet {
          position: relative;
          width: min(1120px, calc(100vw - 2rem));
          max-height: min(76vh, 720px);
          overflow-y: auto;
          border: 1px solid rgba(15, 23, 42, 0.16);
          border-top: 6px solid #f2d300;
          border-radius: 1.35rem;
          background: #ffffff;
          box-shadow:
            0 30px 100px rgba(15, 23, 42, 0.28),
            0 14px 38px rgba(15, 23, 42, 0.16),
            0 0 0 1px rgba(15, 23, 42, 0.06),
            0 0 0 4px rgba(242, 211, 0, 0.12);
          color: #0f172a;
          padding: 0;
          pointer-events: auto;
          transform: translate3d(var(--popup-x, 0), var(--popup-y, 0), 0);
        }

        .bottom-sheet.is-dragging {
          box-shadow:
            0 34px 110px rgba(15, 23, 42, 0.32),
            0 16px 44px rgba(15, 23, 42, 0.18),
            0 0 0 1px rgba(15, 23, 42, 0.08),
            0 0 0 4px rgba(242, 211, 0, 0.16);
        }

        .popup-panel-header {
          position: relative;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.035), rgba(15, 23, 42, 0));
          border-bottom: 1px solid rgba(15, 23, 42, 0.12);
          cursor: grab;
          padding: 1.35rem 1.35rem 1.25rem;
          user-select: none;
        }

        .popup-panel-header.is-dragging,
        .bottom-sheet.is-dragging .popup-panel-header {
          cursor: grabbing;
        }

        .popup-panel-header-report {
          display: grid;
          gap: 0.95rem;
        }

        .popup-drag-handle {
          width: 3rem;
          height: 0.25rem;
          margin: 0 auto 1rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.2);
        }

        .popup-panel-actions {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .bottom-sheet-close,
        .back-button {
          border: 1px solid rgba(15, 23, 42, 0.16);
          border-radius: 999px;
          background: #ffffff;
          color: #0f172a;
          cursor: pointer;
          font: inherit;
          font-size: 0.84rem;
          font-weight: 800;
          line-height: 1;
          padding: 0.7rem 0.95rem;
          white-space: nowrap;
        }

        .bottom-sheet-close {
          position: absolute;
          top: 1.35rem;
          right: 1.35rem;
        }

        .popup-panel-header-report .bottom-sheet-close {
          position: static;
        }

        .bottom-sheet-close:hover,
        .back-button:hover {
          background: #f8fafc;
          border-color: rgba(15, 23, 42, 0.28);
        }

        .popup-rule-header {
          padding-right: 5.25rem;
        }

        .popup-rule-header-compact {
          padding-right: 0;
        }

        .popup-rule-header h3 {
          margin: 0;
          max-width: 860px;
          color: #0f172a;
          font-size: clamp(1.3rem, 2vw, 1.9rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.1;
        }

        .popup-rule-meta {
          margin: 0.55rem 0 0;
          color: rgba(15, 23, 42, 0.66);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .popup-facts {
          display: grid;
          gap: 0.35rem;
          margin-top: 1rem;
          max-width: 820px;
          color: #0f172a;
          font-size: 0.92rem;
          line-height: 1.55;
        }

        .popup-facts p {
          margin: 0;
        }

        .popup-facts span,
        .popup-section-title,
        .report-preview-grid dt {
          color: rgba(15, 23, 42, 0.58);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .popup-report-section {
          padding: 1.25rem 1.35rem 1.35rem;
        }

        .popup-section-title {
          margin: 0;
        }

        .report-pathway-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.85rem;
          margin-top: 0.8rem;
        }

        .report-pathway-card {
          display: grid;
          align-content: start;
          gap: 0.7rem;
          min-height: 132px;
          border: 1px solid rgba(15, 23, 42, 0.12);
          border-left: 3px solid #f2d300;
          border-radius: 1rem;
          background: linear-gradient(180deg, #ffffff 0%, #fbfbfc 100%);
          color: #0f172a;
          cursor: pointer;
          font: inherit;
          padding: 1rem;
          text-align: left;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 1px 2px rgba(15, 23, 42, 0.04),
            0 10px 24px rgba(15, 23, 42, 0.07);
          transition:
            background 160ms ease,
            border-color 160ms ease,
            box-shadow 160ms ease,
            transform 160ms ease;
        }

       .report-pathway-card:hover {
        border-color: rgba(13, 148, 136, 0.35);
         border-left-color: #d9bc00;
         background: linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%);
         box-shadow:
         inset 0 1px 0 rgba(255, 255, 255, 1),
          0 2px 4px rgba(13, 148, 136, 0.1),
          0 18px 38px rgba(13, 148, 136, 0.18);
         transform: translateY(-3px);
      }

        .report-pathway-card:active {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 1px 2px rgba(15, 23, 42, 0.05);
          transform: translateY(0);
        }

        .report-pathway-card strong {
          color: #0f172a;
          font-size: 1rem;
          line-height: 1.2;
        }

        .report-pathway-card small {
          color: rgba(15, 23, 42, 0.66);
          font-size: 0.9rem;
          line-height: 1.55;
        }

        .popup-report-view {
          display: grid;
        }

        .report-preview-grid {
          display: grid;
          gap: 0.9rem;
          max-width: 860px;
          padding: 1.25rem 1.35rem 1.35rem;
        }

        .report-preview-grid div {
          display: grid;
          gap: 0.25rem;
        }

        .report-preview-grid dd {
          margin: 0;
          color: #0f172a;
          font-size: 0.95rem;
          line-height: 1.55;
        }

        @media (max-width: 820px) {
          .grid-shell {
            height: 680px;
          }

          .bottom-sheet-shell {
            align-items: end;
            padding: 0;
          }

          .bottom-sheet {
            width: 100%;
            max-height: 78vh;
            border-right: 0;
            border-bottom: 0;
            border-left: 0;
            border-radius: 1.25rem 1.25rem 0 0;
            transform: none;
          }

          .popup-panel-header {
            padding: 1.1rem;
          }

          .bottom-sheet-close {
            position: static;
            justify-self: end;
            margin-left: auto;
          }

          .popup-rule-header {
            padding-right: 0;
          }

          .popup-report-section,
          .report-preview-grid {
            padding: 1.1rem;
          }

          .report-pathway-grid {
            grid-template-columns: 1fr;
          }
        }

      `}</style>
    </div>
  );
}
