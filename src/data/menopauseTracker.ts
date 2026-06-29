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
    notes: "H.R. 219 has not moved past committee referral. Cosponsor additions continued through March 2026, which means the bill is generating political support while producing no legislative movement. S.1320, its Senate companion, has already cleared committee and reached the floor calendar. The asymmetry between the two bills is itself a data point: momentum in one chamber does not transfer to the other.",
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
    notes: "S.1320 passed committee and reached the Senate floor calendar without a House companion bill at the same stage. Three sequential gaps compound: the gap between calendar placement and a scheduled vote; the gap between an enacted mandate and completed findings; and the gap between published findings and changed clinical practice. Each stage is measured in years. Each is absorbed individually.",
    url: "https://www.congress.gov/bill/119th-congress/senate-bill/1320",
  },
  {
    jurisdiction: "Federal",
    bill: "S.4503 \u2014 Advancing Menopause Care and Mid-Life Women\u2019s Health Act",
    focus: "Omnibus / Research",
    status: "Introduced May 12, 2026. Referred to Senate HELP Committee. 16 cosponsors. Bipartisan.",
    assumes: "Federal investment across six mechanisms: NIH research grants, CDC public health research, public health promotion grants, national awareness program, provider training grants, and Centers of Excellence, totaling $275M over five years will address structural gaps in menopause care at scale",
    cannotMeasure: "S.4503 names the population experiencing menopause as the reason for $275 million in federal investment. Every mechanism it funds produces findings, materials, training programs, and coordination structures. None produce clinical change at the individual level until they travel through the full implementation pipeline. The woman experiencing perimenopause today absorbs the gap between authorization, appropriation, grant award, research completion, dissemination, and clinical behavior change. The bill creates a public data dashboard drawing from surveillance and clinical records. The dashboard will see what those systems recorded.",
    classification: "Dashboard Delay",
    notes: "Four provisions are analytically significant. First, Section 2(d) mandates occupational health research on workplace stressors related to menopausal symptoms, the only federal bill in this tracker that names the workplace as a specific research domain. Second, the NIH dashboard requirement creates permanent federal data infrastructure, but draws from surveillance and clinical entry points. Third, the awareness program explicitly includes first responders as a target audience. No other bill in this tracker names emergency medical service providers. Fourth, this bill was introduced in the 118th Congress and did not advance. Reintroduction with 16 cosponsors does not resolve the prior session failure.",
    url: "https://www.congress.gov/bill/119th-congress/senate-bill/4503",
  },
  {
    jurisdiction: "Federal",
    bill: "H.R. 9090 — Advancing Menopause Care and Mid-Life Women's Health Act",
    url: "https://www.congress.gov/bill/119th-congress/house-bill/9090",
    focus: "Education",
    status: "Introduced June 2, 2026. Referred to House Committee on Energy and Commerce.",
    assumes: "That NIH research coordination, provider training grants, and federally designated Centers of Excellence will translate into measurable improvements in clinical recognition and workplace accommodation — without any mechanism to capture women who never reach a clinician or never file an accommodation request.",
    cannotMeasure: "Women who leave the workforce, are misdiagnosed, or are passed over for advancement before any of the bill's research, training, or awareness infrastructure is built, funded, and operational. The bill's dashboard provision (§310C(c)) will track menopause data collected through formal health surveillance — it will not capture the occupational and career harm that occurs outside the clinical system.",
    classification: "Dashboard Delay",
    notes: "This is the third introduction of this legislation by Rep. Yvette D. Clarke (D-NY-9). It was previously introduced in the 118th Congress as H.R. 8223 (2024) and H.R. 6749, the Menopause Research and Equity Act (2023), neither of which advanced beyond committee. The bill is the House companion to S.4503, which has 16 bipartisan cosponsors and stronger momentum. The asymmetry between Senate and House progress mirrors the pattern of H.R. 219 vs. S.1320 on the veterans' menopause bills — Senate advances, House stalls. Referral to Energy and Commerce under current House leadership is a significant structural obstacle. The bill authorizes $25M per year (FY2027–2031) for NIH and CDC research under §§404P and 310C, $10M per year for public health promotion (§399PP), $10M per year for provider training grants (§758), and open-ended sums for Centers of Excellence (§399PP–2). The occupational health research provision in §310C(d) — directing the Secretary to study workplace stressors related to menopausal symptoms, including traumatic stress, anxiety, and depression — is the section with the most direct relevance to future failure-to-accommodate and constructive dismissal litigation. Once those findings publish, they become expert evidence in pending and future cases regardless of whether the broader bill is enacted. The AI oversight provision in §399PP(f)(2), directing assessment of the safety and effectiveness of diagnostic tools that use artificial intelligence, is the first federal menopause bill provision to name AI-based diagnostics explicitly — a forward indicator of where clinical liability is heading. The three-time introduction without passage establishes a sustained legislative intent record that plaintiff attorneys can use in FEHA, ADA, and state civil rights cases even if the bill never becomes law. The bill is disclosure-dependent at every activation point: research, training, awareness, and the dashboard all operate through the formal clinical system. The occupational harm that precedes clinical entry is outside every mechanism in the bill.",
  },
];
export const ENACTED: LegislationRow[] = [
  {
    jurisdiction: "Rhode Island",
    bill: "S0361 \u2014 Workplace Accommodation",
    focus: "Workplace",
    status: "Enacted 2025",
    assumes: "Employees will request accommodation",
    cannotMeasure: "Rhode Island named these women as the population the law was written to serve. The law then activates only when they enter the accommodation system. The women who have calculated that disclosure carries more professional risk than it returns are named in the intent and excluded by the design.",
    classification: "Tacere",
    notes: "S0361 requires two steps to activate: notification of the condition and a formal accommodation request. Both steps require the employee to name what she is managing. The law was written for the woman who will not take either step. That woman is identified in the legislative record and excluded by the activation design.",
    url: "https://webserver.rilegislature.gov/BillText/BillText25/SenateText25/S0361.pdf",
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
  {
    jurisdiction: "Maryland",
    bill: "SB0892 / HB1365 \u2014 Health Occupations, Public Health, and Insurance \u2014 Menopause \u2014 Provider Training, Coverage, and Access",
    focus: "Omnibus",
    status: "Signed by Governor Wes Moore May 26, 2026. SB0892 Chapter 605, HB1365 Chapter 606. Effective October 1, 2026 (most provisions) and January 1, 2027 (insurance coverage).",
    assumes: "CME credit incentives, mandatory insurance coverage, advisory council representation, and two state agency action plans will improve provider preparedness and patient access to menopause care",
    cannotMeasure: "SB0892 / HB1365 names women experiencing menopause as the population requiring improved care. The CME mechanism offers double credit to providers who complete training voluntarily. It does not require any provider to complete it. The insurance coverage activates on evaluation and management under a clinical record. Women managing symptoms without clinical engagement are named in the legislative intent and excluded by the coverage trigger. The two MDH action plans and the Commission for Women report are due October 1, 2027. Each produces a document. None produces access.",
    classification: "Dashboard Delay",
    notes: "Four provisions are analytically significant from the bill text. First, the CME credit multiplier applies only to licensees who already evaluate and manage menopause within their scope of practice. Section 1-231(A) states this explicitly. The providers most likely to miss a menopause presentation are outside the multiplier incentive by definition. Second, the Department must identify at least one training program in consultation with professional associations including the Menopause Society. Identification is not adoption. Third, Section 4 requires the Maryland Department of Health, in consultation with the State Community Health Worker Advisory Committee, to develop an action plan to increase access through community health worker outreach. That is the only provision in any enacted bill in this tracker that names a community-level access infrastructure mechanism. It produces a report due October 1, 2027. The report is not the action plan. The action plan is not the access. Fourth, the Maryland Commission for Women must evaluate policy opportunities and report by October 1, 2027. The report follows a two-stage gap: evaluation produces findings, findings produce recommendations. Neither stage produces access.",
    url: "https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/SB0892/?ys=2026RS",
  },
  {
    jurisdiction: "Louisiana",
    bill: "HB392 \u2014 Menopausal Care Coverage Act",
    focus: "Insurance",
    status: "Enacted 2024. Became law without the Governor's signature. Act 784. Effective August 1, 2024.",
    assumes: "Mandatory insurance coverage and Medicaid coverage for medically necessary menopause and perimenopause care removes the financial barrier to treatment. Prior authorization for HRT is prohibited.",
    cannotMeasure: "HB392 names women experiencing menopause and perimenopause as the population requiring coverage. Coverage activates when a licensed healthcare provider certifies medical necessity. Women managing symptoms without formal clinical engagement are named in the intent and excluded by the certification requirement. The prior authorization prohibition is meaningful for women already in the treatment pipeline. It has no reach before the first clinical encounter.",
    notes: "Louisiana enacted insurance coverage and Medicaid coverage for menopause care in 2024, ahead of most states in this tracker. The Medicaid provision extends coverage to lower-income women, but eligibility requires enrollment in the Louisiana Medicaid program and a licensed provider certification of medical necessity. Two gatekeeping conditions precede the coverage. The prior authorization prohibition removes a third barrier for women already past both.",
    classification: "Dashboard Delay",
    url: "https://legis.la.gov/legis/BillInfo.aspx?i=246077",
  },
];

export const ACTIVE: LegislationRow[] = [
  {
    jurisdiction: "Maryland",
    bill: "HB536 \u2014 Temporary Disability / Accommodation",
    focus: "Workplace",
    status: "Passed House; in Senate",
    assumes: "Legal classification enables access",
    cannotMeasure: "Menopause is not temporary. Framing it as temporary disability misclassifies the condition and undercounts the population experiencing career-stage impact. Women managing a biological transition are excluded by a framework built for short-term conditions.",
    classification: "Invisible Attrition",
    notes: "HB536 frames menopause as a temporary disability to activate accommodation rights. Menopause is not temporary. The framing misclassifies the condition and excludes women who do not present with a temporary disability claim. Access activates only at the point of formal request, and only for a condition the framework has already misclassified.",
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
    bill: "HB944 — Women's Health Consortium",
    focus: "Omnibus",
    status: "Passed Senate May 29, 2026; ordered returned to House",
    assumes: "A formal consortium, interagency agenda, funding-priority program, workforce-impact review, and annual reporting structure will produce system change",
    cannotMeasure: "HB944 names women experiencing perimenopause, menopause, and postmenopause as populations requiring coordinated health system response. The consortium can identify barriers, evaluate training, assess workforce impact, share data, coordinate resources, and issue annual reports. Those functions create a governance structure. They do not create a treatment pathway, enforcement mechanism, employer obligation, or clinical access point for the woman managing symptoms now.",
    classification: "Dashboard Delay",
    notes: "HB944 passed the Senate on May 29, 2026, with Senate floor amendments adopted, and was ordered returned to the House. The reengrossed text creates the Louisiana Women's Health Consortium inside the Louisiana Department of Health. The consortium must develop a Funding Priority Program for Women's Health Initiatives, an Interagency Women's Health Agenda, evaluate training in care delivery, evaluate workforce impacts, ensure information and data sharing, coordinate an evidence-based online clearinghouse, and submit an annual written report by December 31 each year. The bill is stronger than a general recommendation framework because it creates a standing state structure. The gap remains execution: agenda, funding priority, reporting, and data sharing do not themselves create access.",
    url: "https://www.legis.la.gov/legis/BillInfo.aspx?i=250918",
  },
  {
    jurisdiction: "California",
    bill: "2026–27 May Revision Trailer Bill Language — Menopause Coverage",
    focus: "Omnibus",
    status: "Proposed trailer bill language in 2026–27 May Revision",
    assumes: "Coverage mandates, provider continuing-education incentives, plan notices, annual assessments, utilization-review standards, reimbursement policies, and Medi-Cal coverage will move menopause care into formal health system records",
    cannotMeasure: "California’s trailer bill language creates a more concrete coverage and utilization-review pathway than a general education bill. Still, the record it can produce begins only when a woman is enrolled in a covered plan or Medi-Cal, receives a notice or assessment, enters primary care or obstetrician-gynecologist care, seeks treatment, triggers medical necessity review, or generates a claim. Women managing symptoms outside covered insurance, outside clinical care, after opting out of assessments or notices, or before any claim or encounter remain outside what the proposal is able to measure.",
    classification: "Dashboard Delay",
    notes: "Proposed 2026–27 May Revision trailer bill language from the Department of Managed Health Care and the Department of Health Care Services. The proposal adds continuing-education credit incentives beginning July 1, 2027 for qualifying nurse practitioners, physicians and surgeons, and osteopathic physicians and surgeons. It requires health care service plans and insurers to cover FDA-approved treatments used to treat menopausal symptoms, excluding GLP-1 drugs used solely for weight loss; create access programs; provide menopause information to contracted primary-care providers; maintain reimbursement policies identifying CPT codes; provide annual menopause assessments for enrollees or insured individuals age 40 and older during primary care and obstetrician-gynecologist appointments; send notices describing menopause and covered services; and maintain policies to contract with or incentivize menopause-credentialed providers. It also requires utilization-review criteria to follow generally accepted menopause-care standards and extends Medi-Cal coverage for FDA-approved treatments, subject to medical necessity, federal approvals, and federal financial participation. The analytical significance is the route: after vetoing standalone menopause coverage legislation, the administration has placed a narrower, FDA- and medical-necessity-bounded, plan-administered version inside budget trailer bill language. The mechanism is stronger than advisory guidance, but it remains proposed and still measures participation in plan, clinical, assessment, utilization-review, and claims pathways.",
    url: "https://trailerbill.dof.ca.gov/public/trailerBill/pdf/1385",
  },
  {
    jurisdiction: "Colorado",
    bill: "HB26-1122 \u2014 HRT Coverage",
    focus: "Insurance",
    status: "In Committee",
    assumes: "Mandatory coverage removes cost barriers",
    cannotMeasure: "Most women experiencing perimenopause are initially misdiagnosed with anxiety, depression, or other conditions. Mandatory coverage does not accelerate accurate diagnosis. Women named in the legislative intent are excluded by a misdiagnosis that precedes the coverage they were promised.",
    classification: "Dashboard Delay",
    notes: "HB26-1122 prohibits prior authorization for HRT prescriptions and extends coverage to Medicaid beginning July 1, 2027. The prior authorization prohibition is a meaningful gain for women already in the treatment pipeline. It does not move the population who has not yet arrived at a prescription. The bill is also subject to a referendum petition period through August 12, 2026, meaning the coverage mandate could be overturned by popular vote before it takes effect.",
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
  bill: "H5303 — An Act Expanding Access to Perimenopause and Menopause Care (formerly H2499/H4838)",
  focus: "Omnibus",
  status: "Reported favorably by Public Health 3/26/2026; referred to Health Care Financing; reporting date extended to December 31, 2026.",
  assumes: "That closing the formulary-restriction loophole in existing insurance law, combined with a civil rights amendment, a one-time provider training requirement, and a legislative study commission, resolves the access gap — without requiring anyone to confirm whether the new mandate is honored in practice.",
  cannotMeasure: "Massachusetts has required HRT coverage 'under the same terms and conditions' as other outpatient services and prescription drugs since 2002, under four parallel statutes — Chapter 175 §47W, Chapter 176A §8W, Chapter 176B §4W, and Chapter 176G §4O. All four explicitly permit closed or restricted formularies. None require any insurer or agency to report utilization, denial, or formulary-restriction rates for HRT. A 2017 amendment to the same four statutes built real data infrastructure — an expedited grievance process, a no-cost-sharing requirement, audit-able medical management limits — but scoped it entirely to contraceptive coverage; none of it touches the adjacent HRT clause. H5303 closes the formulary loophole by inserting new, absolute-coverage sections beside the unrepealed originals, but adds no reporting requirement of its own. The bill's only data mechanism is the Section 1 legislative commission, a one-time study due December 31, 2027 — not a recurring audit of compliance with the new mandate. Twenty-four years into the original coverage requirement, the first dataset describing actual reach came from an unrelated federal source: an FDA drug-safety review (February 12, 2026) reporting that of roughly 41 million U.S. women ages 45–64 in 2020, only about 2 million ages 46–65 received a hormone-therapy prescription that year. The one-time CME requirement for physicians, PAs, RNs, and LPNs is mandatory under H5303 but scoped only to providers who self-identify as serving perimenopausal and menopausal populations, with no recurring or assessed component.",
  classification: "Dashboard Delay",
  notes: "H2499 and H4838 — filed independently, six months apart in their committee hearings, by different sponsors — were consolidated into H5303 on March 26, 2026, jumping from a Public Health to a Health Care Financing referral. H5303 amends Chapter 151B, the state's core civil rights statute, adding perimenopause and menopause alongside pregnancy as protected conditions, with a reasonable accommodation framework and a universal written-notice requirement (Section 12(d)) distributed to all employees, not only those who disclose — a stronger and more proactive design than most states in this tracker. The insurance provisions (Sections 14–17) mandate coverage across the GIC, MassHealth, and four private insurance chapters with a parity clause barring utilization controls stricter than those applied to any other clinically appropriate hormonal drug. That parity clause exists specifically because the 2002 statutes governing the same four chapters explicitly permitted the formulary restriction H5303 now bans — Massachusetts is closing a loophole in its own twenty-four-year-old law, not creating a new right from nothing. The old sections remain unrepealed, sitting beside the new ones in the same statutory family. Whether the closed loophole produces measurable change is a separate, currently unanswered question: no provision in H5303 requires insurers to report HRT-specific utilization or denial data, and the commission's findings will not arrive until after the bill's substantive provisions are already in force. This is among the most thoroughly evidenced Dashboard Delay entries in the tracker — the population gap is independently confirmed by a federal regulator, not inferred from statutory structure alone.",
  url: "https://malegislature.gov/Bills/194/H5303",
  },
  {
    jurisdiction: "Pennsylvania",
    bill: "HB2135 \u2014 Workplace Protections",
    focus: "Workplace",
    status: "In Committee",
    assumes: "Accommodation rights create access",
    cannotMeasure: "HB2135 names women experiencing menopause as the population requiring accommodation. The right to accommodation activates when a woman files a request. The woman who has calculated that filing a request carries more professional risk than the accommodation returns is named in the legislative intent and excluded by the activation condition.",
    classification: "Tacere",
    notes: "HB2135 creates workplace accommodation rights for menopause. The right activates when a woman files a request. Cognitive symptoms, including difficulty concentrating, memory lapses, and decision latency, are not addressable through the physical accommodation framework the bill establishes. Women most affected by the condition HB2135 acknowledges are excluded by its scope before they file anything.",
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
    notes: "HB3064 is the only bill in this tracker where the primary gap is geographic rather than disclosure-dependent. The infrastructure problem applies most acutely to rural Oregon, where a woman may have insurance that covers menopause treatment and no qualified provider within a viable distance. Coverage parity is a meaningful gain where the clinical infrastructure exists. Where it does not, coverage is a right with no mechanism of delivery.",
    url: "https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB3064",
  },
  {
    jurisdiction: "Illinois",
    bill: "HB5284 \u2014 Menopause Equity and Care Act",
    focus: "Omnibus",
    status: "Passed Both Houses May 28, 2026; awaiting governor action",
    assumes: "Education, insurance coverage, pregnancy-accommodation notice language, and voluntary insurer reporting will improve access and workplace recognition",
    cannotMeasure: "HB5284 names menopause and perimenopause as conditions requiring public education, insurance coverage, and workplace notice recognition. The final version does not create a standalone menopause discrimination claim or a standalone menopause accommodation right. Coverage activates only when treatment is recommended by a qualified health care provider and prescribed under evidence-based guidelines. Workplace recognition is routed through pregnancy-accommodation notice language. Women managing symptoms without clinical engagement, without a request, or without a usable workplace disclosure pathway remain outside the bill’s formal measurement architecture.",
    classification: "Tacere",
    notes: "HB5284 passed both houses on May 28, 2026 after the House concurred in Senate Floor Amendment No. 4. The amendment materially narrowed the workplace framework. Earlier language made it a civil rights violation to discriminate or refuse accommodation because of a menopause-related condition. The final amendment removed menopause-related conditions from the definition of unlawful discrimination and removed the standalone civil-rights violation language. The final bill instead requires notice language related to pregnancy accommodations to include information about the right to reasonable accommodations for menopause-related conditions. The insurance provisions remain significant: coverage must include medically necessary hormonal and non-hormonal therapy for menopausal and perimenopausal symptoms or conditions when recommended by a qualified health care provider, proven safe and effective in peer-reviewed scientific studies, and prescribed under current evidence-based guidelines. Coverage must include FDA-approved modalities of hormonal and non-hormonal administration, medications for menopause-related osteoporosis, and non-hormonal therapies for vasomotor symptoms. The analytical significance is the narrowing: the bill moved from explicit menopause workplace protection toward coverage, education, and notice-mediated accommodation. That preserves the disclosure problem rather than resolving it.",
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
    assumed: "Legal clarity enables disclosure",
    failureConfirms: "Passed Labor and Employment Committee 7-0 on March 18. Hearing canceled at author's request April 13. Voluntary withdrawal after unanimous committee passage.",
    notes: "AB1940 passed the Labor and Employment Committee 7-0 on March 18, 2026. The author withdrew the bill on April 13, 2026. Near-unanimous committee support followed by voluntary withdrawal is analytically significant. The bill named the population. The author withdrew before the design could exclude them. Classification: Tacere. The population named in the findings never had the opportunity to be excluded by the activation condition because the bill did not become law.",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1940",
  },
  {
    jurisdiction: "Virginia",
    bill: "SB258 / HB1173 — Protected Characteristic + Accommodation",
    focus: "Workplace",
    status: "Vetoed by Governor, May 19, 2026",
    assumed: "Existing age- and gender-based protections under the Virginia Human Rights Act already cover menopause and perimenopause discrimination, making an explicit named category unnecessary without further study",
    failureConfirms: "The General Assembly rejected the Governor's April substitute — which would have replaced the civil rights amendment with a study mandate — and re-passed the original bill in full. The Governor then vetoed it outright on May 19, 2026, stating that existing age and gender protections already cover this population. The veto rationale is itself the data point: a government official asserting implicit coverage exists for a population that has never been explicitly named, measured, or given a defined accommodation pathway. The DOLI study already underway prior to this bill continues on its own, unconnected timeline. The study this bill would have mandated — due July 1, 2028 — no longer exists in any form. No explicit framework. No bill-specific study. The only thing the veto adds to the record is the claim that none of this was necessary.",
    notes: "This is the strongest version of the implicit-coverage pattern in the tracker. Washington's EO 26-01 and the California AB1940 withdrawal both involve a government actor asserting or implying that existing law already covers menopause-related discrimination. Virginia is the first instance of a sitting governor vetoing an explicit framework on those grounds, in the same action that also kills the fallback study. The legislature attempted the strongest available response — rejecting the substitute and forcing the original bill back to her desk — and the veto still held. There is no override vote on record at the reconvene session; the bill is dead for this session absent reintroduction.",
    url: "https://lis.virginia.gov/bill-details/20261/SB258",
  },
];

export const ADVISORY: AdvisoryRow[] = [
  {
    jurisdiction: "Michigan",
    instrument: "Michigan Women\u2019s Commission, Menopause Memorandum",
    focus: "Advisory",
    status: "Released March 26, 2026",
    structuralRole: "Signals issue presence; generates voluntary employer recommendations",
    classification: "Dashboard Delay",
    notes: "March 26, 2026. No system activation occurs for an advisory instrument. The Michigan data is the most analytically significant state-level record in the tracker. Its central finding was not low impact. It was low disclosure: fewer than one in five women disclosed their menopause status at work. The study encountered the boundary condition before it could measure past it. The memorandum documents the gap. It cannot close it.",
    url: "https://www.michigan.gov/mwc",
  },
  {
    jurisdiction: "Michigan",
    instrument: "Michigan LEO Press Release and MCDA Workforce Report",
    focus: "Advisory",
    status: "Active May 28, 2026",
    structuralRole: "Pushes Memorandum findings into active employer engagement; surfaces measurement gap between advisory data and formal workforce record",
    classification: "Dashboard Delay",
    notes: "May 28, 2026. Michigan Department of Labor and Economic Opportunity issued a press release pushing Memorandum findings into active employer and legislative engagement. The employer recommendations are voluntary: educate all employees about perimenopause and menopause; provide trusted information and resources; update workplace policies with a midlife health lens; offer low-cost accommodations; provide basic menopause awareness training for supervisors and HR staff. No mechanism activates without employer election. No recommendation generates a data point. The Michigan Center for Data and Analytics published the 2026 Women in the Michigan Workforce Report the same month. That report documents the wage gap, labor force participation by parental status, industry concentration, and 10-year employment projections. Menopause does not appear in it. The 16,500 women the Memorandum counted are not a variable in the MCDA dataset. Both reports came from the same department.",
    url: "https://www.michigan.gov/leo/news/2026/05/28/state-leaders-push-policy-solutions-for-women-in-midlife-provide-recommendations-for-employers",
  },
  {
    jurisdiction: "Washington",
    instrument: "Executive Order 26-01 — Menopause Workplace Accommodations",
    url: "https://governor.wa.gov/news/2026/governor-ferguson-signs-executive-order-support-women-workplace-experiencing-perimenopause-and",
    focus: "Workplace",
    status: "Signed June 1, 2026. Effective immediately. Progress report due April 30, 2027.",
    structuralRole:
      "Invokes existing WLAD civil rights obligation; directs state agencies to operationalize accommodations already required by law; creates model policy guidance for private employers; establishes provider licensing-credit review across six health profession boards.",
    classification: "Tacere",
    notes:
      "EO 26-01 is analytically distinct from every other entry in this tracker. It does not create a new legal right. It acknowledges that the Washington Law Against Discrimination already requires reasonable accommodation for medically cognizable impairments — and directs state agencies to implement what existing law already obligated. That acknowledgment is the record. The order's whereas clauses state that 34% of people with menopause symptoms are not diagnosed, naming the undiagnosed population as the reason for the order while building a system that still activates on employee initiation and formal request. The liability carve-out in the order's final section — 'not intended to confer and does not confer any legal right or entitlement and shall not be used as a basis for legal challenges' — applies to government actors. Private employers in Washington carry no equivalent carve-out. The Governor's documented interpretation that menopause symptoms can constitute a medically cognizable impairment under the WLAD is now in the official state record, available as evidence of legislative intent in failure-to-accommodate claims against private employers. Section 5 of the order directs a review of professional licensing credits for menopause education across medicine, osteopathy, nursing, naturopathy, psychology, and surgery boards, with recommendations due to the Governor within twelve months. Once those recommendations publish, Washington will have a documented standard of care for provider training that feeds directly into misdiagnosis and clinical-instrument liability theories. The women the order was written for are identified in the whereas clauses and excluded by the activation condition. The liability carve-out insulates the state. It does not extend to private employers.",
  },
];
