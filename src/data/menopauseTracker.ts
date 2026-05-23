export const CLUSTER_LINKS: Record<string, string> = {
  "Dashboard Delay": "/invisible-attrition/dashboard-delay",
  "Tacere": "/invisible-attrition/structural-silence",
};
export const IA_LINK = "/invisible-attrition";
/* ── Shared types ── */
export interface LegislationRow {
  jurisdiction: string;
  bill: string;
  focus: string;
  status: string;
  assumes: string;
  cannotMeasure: string;
  classification: string;
  notes: string;
  url?: string;
}

export interface FailedRow {
  jurisdiction: string;
  bill: string;
  focus: string;
  status: string;
  assumed: string;
  failureConfirms: string;
  notes: string;
  url?: string;
}

export interface AdvisoryRow {
  jurisdiction: string;
  instrument: string;
  focus: string;
  status: string;
  structuralRole: string;
  classification: string;
  notes: string;
  url?: string;
}

/* ── Data ── */
export const FEDERAL: LegislationRow[] = [
  {
    jurisdiction: "Federal",
    bill: "H.R. 219 \u2014 Improving Menopause Care for Veterans Act",
    focus: "Veteran Care",
    status: "In Committee",
    assumes: "A study will produce clinical improvement",
    cannotMeasure: "H.R. 219 names the veteran population as the reason for the study. The study then produces findings on a timeline that absorbs the delay. The women named in the legislative intent are excluded from relief by the gap between study, findings, and clinical implementation.",
    classification: "Dashboard Delay",
    notes: "H.R. 219 names veterans experiencing menopause as the population the study was written to serve. The study then produces findings on a timeline that absorbs the delay between vote, findings, and clinical implementation. The population named in the intent is excluded from relief by the gap the study cannot close.",
    url: "https://www.congress.gov/bill/119th-congress/house-bill/219",
  },
  {
    jurisdiction: "Federal",
    bill: "S.1320 \u2014 Servicewomen and Veterans Menopause Research Act",
    focus: "Military / Veteran",
    status: "On Senate Calendar",
    assumes: "Research produces actionable findings",
    cannotMeasure: "S.1320 names servicewomen experiencing menopause as the population requiring research. The findings then require implementation before they reach the women named. The delay between vote, findings, and care is not measured. The population absorbs it.",
    classification: "Invisible Attrition",
    notes: "S.1320 names servicewomen experiencing menopause as the population requiring research. The findings then require implementation before they reach the women named. The delay compounds across stages: vote, findings, implementation. The population absorbs the full gap.",
    url: "https://www.congress.gov/bill/119th-congress/senate-bill/1320",
  },
  {
    jurisdiction: "Federal",
    bill: "S.4503 (Murray) — Advancing Menopause Care and Mid-Life Women's Health Act",
    focus: "Omnibus / Research",
    status: "Introduced May 12, 2026. Referred to Senate HELP Committee. 16 cosponsors. Bipartisan.",
    assumes: "Federal investment across six mechanisms — NIH research grants, CDC public health research, public health promotion grants, national awareness program, provider training grants, and Centers of Excellence — totaling $275M over five years will address structural gaps in menopause care at scale",
    cannotMeasure: "S.4503 names the population experiencing menopause as the reason for $275 million in federal investment. Every mechanism it funds produces findings, materials, training programs, and coordination structures. None produce clinical change at the individual level until they travel through the full implementation pipeline. The woman experiencing perimenopause today absorbs the gap between authorization, appropriation, grant award, research completion, dissemination, and clinical behavior change. The bill creates a public data dashboard drawing from surveillance and clinical records. The dashboard will see what those systems recorded.",
    classification: "Dashboard Delay",
    notes: "Four provisions are analytically significant. First, Section 2(d) mandates occupational health research on workplace stressors related to menopausal symptoms — the only federal bill in this tracker that names the workplace as a specific research domain. Second, the NIH dashboard requirement creates permanent federal data infrastructure, but draws from surveillance and clinical entry points. Third, the awareness program explicitly includes first responders as a target audience — no other bill in this tracker names emergency medical service providers. Fourth, this bill was introduced in the 118th Congress and did not advance. Reintroduction with 16 cosponsors does not resolve the prior session failure.",
    url: "https://www.congress.gov/bill/119th-congress/senate-bill/4503",
  },
];
export const ENACTED: LegislationRow[] = [
  {
    jurisdiction: "Rhode Island",
    bill: "S0361 \u2014 Workplace Accommodation",
    focus: "Workplace",
    status: "Enacted 2025",
    assumes: "Employees will request accommodation",
    cannotMeasure: "Rhode Island named these women as the population the law was written to protect. The law then activates only when they enter the accommodation system. The women who have calculated that disclosure carries more professional risk than it returns are named in the intent and excluded by the design.",
    classification: "Tacere",
    notes: "S0361 requires two steps to activate: notification of the condition and a formal accommodation request. Both steps require the employee to name what she is managing. The law was written for the woman who will not take either step. That woman is identified in the legislative record and excluded by the activation design.",
    url: "https://webserver.rilegislature.gov/BillText/BillText25/SenateText25/S0361.pdf",
  },
  {
    jurisdiction: "Virginia",
    bill: "SB258 / HB1173 \u2014 Protected Characteristic + Accommodation",
    focus: "Workplace",
    status: "Returned with substitute (study mandate) April 2026",
    assumes: "Additional study is required before protection is enacted",
    cannotMeasure: "Legislature passed protection. Governor substituted a study. A DOLI study was already underway. The record now contains two studies. Both instruments measure the population that engages with formal systems. The population that does not disclose does not appear in either dataset.",
    classification: "Dashboard Delay",
    notes: "Protection framework passed by legislature. Substitute replaces enforcement with a second study report due by July 1, 2028. Despite an existing Department of Labor & Industry study already in process.",
    url: "https://lis.virginia.gov/bill-details/20261/SB258",
  },
  {
    jurisdiction: "Virginia",
    bill: "SB790 \u2014 Insurance Coverage",
    focus: "Insurance",
    status: "Signed April 2026",
    assumes: "Coverage removes barriers to care",
    cannotMeasure: "Coverage applies when a woman seeks treatment under her name. Women managing symptoms without clinical disclosure remain outside the coverage record. The bill named them as the population requiring coverage and the coverage record excludes them by the same condition.",
    classification: "Dashboard Delay",
    notes: "Signed April 13, 2026. Effective July 1, 2026. Coverage applies to policies issued or renewed on or after January 1, 2027. The statutory record is complete. The coverage record begins only when a woman enters the clinical system under her name. The date the law takes effect is not the date the population named in the intent gains access.",
    url: "https://lis.virginia.gov/bill-details/20261/SB790",
  },
  {
    jurisdiction: "New Jersey",
    bill: "A5278 \u2014 Menopause Coverage Act",
    focus: "Insurance",
    status: "Signed January 2026",
    assumes: "Broad coverage resolves access",
    cannotMeasure: "A5278 names women experiencing perimenopause and menopause as the population requiring coverage. Coverage then requires a diagnosis and a clinical record to activate. Women managing symptoms without formal clinical engagement are named in the intent and excluded from the utilization data the coverage produces.",
    classification: "Dashboard Delay",
    notes: "A5278 requires a diagnosis and a clinical record to activate coverage. Women managing symptoms outside the clinical system are named in the legislative intent and excluded from the utilization data the coverage produces. The collection condition was never met because the clinical encounter never occurred.",
    url: "https://njleg.gov/bill-search/2024/A5278/bill-text?f=A5500&n=5278_E2",
  },
];

export const ACTIVE: LegislationRow[] = [
  {
    jurisdiction: "Maryland",
    bill: "HB536 \u2014 Temporary Disability / Accommodation",
    focus: "Workplace",
    status: "Passed House; in Senate",
    assumes: "Legal classification enables protection",
    cannotMeasure: "Menopause is not temporary. Framing it as temporary disability misclassifies the condition and undercounts the population experiencing career-stage impact. Women managing a biological transition are excluded by a framework built for short-term conditions.",
    classification: "Invisible Attrition",
    notes: "HB536 frames menopause as a temporary disability to activate accommodation protections. Menopause is not temporary. The framing misclassifies the condition and excludes women who do not present with a temporary disability claim. Protection activates only at the point of formal request, and only for a condition the framework has already misclassified.",
    url: "https://mgaleg.maryland.gov/2026RS/bills/hb/hb0536f.pdf",
  },
  {
    jurisdiction: "Ohio",
    bill: "HB767 \u2014 Insurance Coverage",
    focus: "Insurance",
    status: "In Committee",
    assumes: "Coverage determined by prescriber removes barriers",
    cannotMeasure: "Hormone levels fluctuate significantly during perimenopause. FSH tests can return falsely normal results. A woman with active symptoms may not qualify under a test-dependent threshold. The instrument used to define coverage excludes the population the coverage was designed to reach.",
    classification: "Dashboard Delay",
    notes: "HB767 coverage activates at the point of prescription. A prescription requires a clinical encounter and a diagnosis. Hormone levels fluctuate significantly during perimenopause and FSH tests can return falsely normal results. The woman with active symptoms may not qualify under the test-dependent threshold the coverage requires. She is named in the intent and excluded by the clinical instrument.",
    url: "https://www.legislature.ohio.gov/legislation/136/hb767",
  },
  {
    jurisdiction: "Missouri",
    bill: "SB1569 \u2014 Drug Coverage",
    focus: "Insurance",
    status: "In Committee",
    assumes: "Drug coverage resolves treatment access",
    cannotMeasure: "Symptom coverage does not address long-term bone density, cardiovascular, and neurological risk. The coverage boundary misclassifies the scope of the condition. Women experiencing the full arc of menopause-related health impact are named in the legislative intent and excluded by a coverage definition that stops at symptoms.",
    classification: "Dashboard Delay",
    notes: "Coverage boundary is the pharmacy counter. Bone density loss, cardiovascular risk, and neurological effects of the menopause transition are outside the coverage scope. A woman managing the full clinical arc of menopause is named in the legislative intent and served only at the symptom layer. The long-term health cost accumulates outside the record the coverage creates.",
    url: "https://www.senate.mo.gov/BillTracking/Bills/BillInformation?year=2026&billid=1584504",
  },
  {
    jurisdiction: "Louisiana",
    bill: "HB944 \u2014 Women's Health Consortium",
    focus: "Omnibus",
    status: "In Committee",
    assumes: "Coordination produces system change",
    cannotMeasure: "HB944 names women experiencing menopause as the population requiring coordinated health system response. The coordination mechanism then produces recommendations. Policy without an enforcement mechanism is a recommendation. The gap between legislative intent and clinical behavior change is not tracked.",
    classification: "Dashboard Delay",
    notes: "HB944 creates a Women's Health Consortium to coordinate a system response to menopause care. Coordination produces recommendations. Recommendations require implementation to produce change. The gap between legislative intent and clinical behavior change is not measured, not enforced, and not tracked. The recommendation is the output. Whether it executes is a separate question the bill cannot answer.",
    url: "https://www.legis.la.gov/legis/BillInfo.aspx?i=250918",
  },
  {
    jurisdiction: "Colorado",
    bill: "HB26-1122 \u2014 HRT Coverage",
    focus: "Insurance",
    status: "In Committee",
    assumes: "Mandatory coverage removes cost barriers",
    cannotMeasure: "Most women experiencing perimenopause are initially misdiagnosed with anxiety, depression, or other conditions. Mandatory coverage does not accelerate accurate diagnosis. Women named in the legislative intent are excluded by a misdiagnosis that precedes the coverage they were promised.",
    classification: "Dashboard Delay",
    notes: "HB26-1122 mandates coverage but does not address the diagnostic gap that precedes coverage. Most women experiencing perimenopause are initially misdiagnosed with anxiety, depression, or other conditions. Mandatory coverage does not accelerate accurate diagnosis. A woman named in the legislative intent is excluded by a misdiagnosis that precedes the coverage she was promised.",
    url: "https://leg.colorado.gov/bills/HB26-1122",
  },
  {
    jurisdiction: "Connecticut",
    bill: "HB05389 \u2014 Provider Toolkit",
    focus: "Education",
    status: "In Committee",
    assumes: "Clinical tools improve practice",
    cannotMeasure: "Informational materials reach the provider. A 15-minute appointment window does not provide time to act on new information. The material reaches the woman but not the clinical conversation. The women named in the legislative intent are excluded by the structural constraint the bill did not address.",
    classification: "Dashboard Delay",
    notes: "HB05389 creates a provider toolkit for menopause education. The toolkit reaches the provider. A standard clinical appointment does not provide sufficient time to act on new information. The material reaches the provider's desk. Whether it reaches the clinical conversation is a separate question the bill cannot answer. Distribution is not adoption.",
    url: "https://www.cga.ct.gov/asp/cgabillstatus/cgabillstatus.asp?bill_num=HB05389&selBillType=Bill&which_year=2026",
  },
  {
    jurisdiction: "Massachusetts",
    bill: "H2499 \u2014 Omnibus",
    focus: "Omnibus",
    status: "In Committee",
    assumes: "Multi-system approach resolves the issue",
    cannotMeasure: "Training is voluntary for currently practicing providers. The gap between a training mandate and actual behavioral change in clinical practice is not measured. Women named in the legislative findings are excluded by the implementation gap between what the bill requires and what providers do.",
    classification: "Dashboard Delay",
    notes: "H2499 is an omnibus bill combining education, coverage, and accommodation provisions. Volume does not remove the activation condition. Each provision in the omnibus requires a separate initiating act — a disclosure, a request, a claim, an enrollment. The women named in the legislative findings are excluded by the same activation condition across every provision in the bill.",
    url: "https://malegislature.gov/Bills/194/H2499",
  },
  {
    jurisdiction: "Pennsylvania",
    bill: "HB2135 \u2014 Workplace Protections",
    focus: "Workplace",
    status: "In Committee",
    assumes: "Accommodation rights create access",
    cannotMeasure: "Workplace accommodations for menopause are framed primarily as physical: uniforms, HVAC, cooling spaces. Cognitive symptoms \u2013 difficulty concentrating, memory lapses, decision latency \u2013 are not addressable through physical accommodation and do not appear in the accommodation record. The women most affected by the condition this bill acknowledges are excluded by its scope.",
    classification: "Tacere",
    notes: "HB2135 creates workplace accommodation rights for menopause. The right activates when a woman files a request. Cognitive symptoms — difficulty concentrating, memory lapses, decision latency — are not addressable through the physical accommodation framework the bill establishes. Women most affected by the condition HB2135 acknowledges are excluded by its scope before they file anything.",
    url: "https://www.palegis.us/legislation/bills/2025/hb2135",
  },
  {
    jurisdiction: "Oregon",
    bill: "HB3064 \u2014 Insurance",
    focus: "Insurance",
    status: "Active",
    assumes: "Coverage ensures care",
    cannotMeasure: "HB3064 names women experiencing menopause as the population requiring coverage parity. Parity then applies where providers exist. Women in areas without qualified menopause care providers are named in the coverage intent and excluded by the infrastructure gap. Coverage does not create access where the clinical infrastructure does not exist.",
    classification: "Outside Scope",
    notes: "HB3064 mandates coverage parity for menopause care. Parity applies where qualified providers exist. Women in areas without trained menopause care providers are named in the coverage intent and excluded by the infrastructure gap. Coverage does not create access where the clinical infrastructure does not exist. The bill names the population and the geography limits the reach.",
    url: "https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB3064",
  },
  {
    jurisdiction: "Illinois",
    bill: "HB5284 \u2014 Menopause Equity and Care Act",
    focus: "Omnibus",
    status: "Passed House April 21, 2026; in Senate",
    assumes: "Education, coverage, and accommodation rights resolve access",
    cannotMeasure: "HB5284 names women experiencing menopause as the population the law was written to protect. The IHRA amendment activates on an employee request for accommodation. Insurance coverage activates January 1, 2028, and only when treatment is sought under a clinical record. The DPH education provision is permissive: the Department may make materials available. Provider participation is entirely voluntary and carries no licensure consequence. The women performing through symptoms without requesting accommodation and without a clinical record are named in the legislative findings and excluded by every activation condition the bill creates.",
    classification: "Tacere",
    notes: "Three provisions are analytically significant in the engrossed text. First, the mandatory 5-hour CME requirement in the introduced version was removed entirely. The engrossed bill replaces it with a permissive DPH education provision: participation is voluntary and not required for licensure or certification. The training gap the introduced bill attempted to close is not addressed in the engrossed version. Second, the IHRA accommodation provision (Section J-1) explicitly names vasomotor symptoms, sleep disruption, cognitive or mood changes, and osteoporosis-related changes as covered conditions \u2014 the most specific symptom definition in any workplace bill in this tracker. Cognitive and mood changes are named. Whether an employee requests accommodation for them is a separate question the bill cannot answer. Third, the insurance section allows insurers to voluntarily report menopause-related claims to the Department of Insurance. Voluntary reporting means the utilization record will be structurally incomplete. The data the Department receives will reflect only the carriers who chose to report.",
    url: "https://www.ilga.gov/Legislation/BillStatus/FullText?GAID=18&DocNum=5284&DocTypeID=HB&LegId=167006&SessionID=114",
  },
];

export const DID_NOT_PASS: FailedRow[] = [
  {
    jurisdiction: "Florida",
    bill: "HB161 \u2014 Education",
    focus: "Education",
    status: "Died in Committee",
    assumed: "Information produces change",
    failureConfirms: "No system change occurs",
    notes: "Education bills addressing menopause have failed to advance in Florida across multiple sessions. The failure is not anomalous. It is a pattern. The absence of a legislative record does not mean the absence of the condition.",
    url: "https://www.flsenate.gov/Session/Bill/2026/161",
  },
  {
    jurisdiction: "Arizona",
    bill: "HB2734 \u2014 Education",
    focus: "Education",
    status: "Died in Committee",
    assumed: "Education prepares the population",
    failureConfirms: "Access depends on provider interaction",
    notes: "HB2734 died in committee without a floor vote. Education frameworks that require provider interaction to activate face the same structural constraint as accommodation frameworks: the population must initiate contact with a system to benefit from what the system offers.",
    url: "https://www.azleg.gov/legtext/57leg/1r/bills/hb2734p.htm",
  },
  {
    jurisdiction: "Wisconsin",
    bill: "SB356 \u2014 Perimenopause and Menopause Education",
    focus: "Education",
    status: "Failed March 2026",
    assumed: "Education partnerships produce informed populations",
    failureConfirms: "No system activation occurs without legislative passage",
    notes: "Passed committee unanimously. Failed pursuant to Senate Joint Resolution 1.",
    url: "https://docs.legis.wisconsin.gov/2025/proposals/reg/sen/bill/sb356",
  },
  {
    jurisdiction: "California",
    bill: "AB1940 — Menopause Added to Sex-Based Protections",
    focus: "Workplace",
    status: "Withdrawn by author April 13, 2026",
    assumed: "Legal protection enables disclosure",
    failureConfirms: "Passed Labor and Employment Committee 7-0 on March 18. Hearing canceled at author's request April 13. Voluntary withdrawal after unanimous committee passage.",
    notes: "AB1940 passed the Labor and Employment Committee 7-0 on March 18, 2026. The author withdrew the bill on April 13, 2026. Near-unanimous committee support followed by voluntary withdrawal is analytically significant. The bill named the population. The author withdrew before the design could exclude them. Classification: Tacere — the population named in the findings never had the opportunity to be excluded by the activation condition because the bill did not become law.",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1940",
  },
];

export const ADVISORY: AdvisoryRow[] = [
  {
    jurisdiction: "Michigan",
    instrument: "Women's Commission Memorandum & Public Meeting",
    focus: "Advisory",
    status: "Active",
    structuralRole: "Signals issue presence",
    classification: "Dashboard Delay",
    notes: "No system activation occurs for an advisory instrument. The Michigan data is the most analytically significant state-level record in the tracker. Its central finding was not low impact. It was low disclosure: fewer than one in five women disclosed their menopause status at work. The study encountered the boundary condition before it could measure past it. The memorandum documents the gap. It cannot close it.",
    url: "https://www.michigan.gov/mwc",
  },
];

