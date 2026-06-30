const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

const supabaseHeaders = {
  apikey: supabaseAnonKey || "",
  Authorization: `Bearer ${supabaseAnonKey || ""}`,
  "Content-Type": "application/json",
};

const LAW_RECORD_SELECT =
  "id,slug,law_code,rule_name,short_name,jurisdiction,region,country,status,sector_scope,impact_area,name_standard_signal,effective_date,live_date_label,source_url,source_label,verified_summary,is_published";

function buildRestUrl(table, params) {
  const url = new URL(`${supabaseUrl}/rest/v1/${table}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

async function fetchSingleRow(table, params) {
  if (!hasSupabaseConfig) {
    console.warn("Supabase config missing. AI LegiRisk report not loaded.");
    return null;
  }

  const response = await fetch(buildRestUrl(table, params), {
    method: "GET",
    headers: supabaseHeaders,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Supabase REST error for ${table}:`, response.status, errorText);
    return null;
  }

  const rows = await response.json();

  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  return rows[0];
}

async function getPublishedLawRecordBySlug(slug) {
  if (!slug) return null;

  const record = await fetchSingleRow("ai_legislation_records", {
    select: LAW_RECORD_SELECT,
    slug: `eq.${slug}`,
    is_published: "eq.true",
    limit: "1",
  });

  if (!record) {
    console.warn(`No published AI legislation record found for slug: ${slug}`);
    return null;
  }

  return record;
}

function mapLawRecord(record) {
  return {
    id: record.id,
    slug: record.slug,
    law_code: record.law_code,
    law_name: record.rule_name,
    short_name: record.short_name,
    jurisdiction: record.jurisdiction,
    region: record.region,
    country: record.country,
    status: record.status,
    sector_scope: record.sector_scope,
    impact_area: record.impact_area,
    name_standard_signal: record.name_standard_signal,
    effective_date: record.effective_date,
    live_date_label: record.live_date_label,
    source_url: record.source_url,
    source_label: record.source_label,
    verified_summary: record.verified_summary,
  };
}

export function formatJurisdiction(law) {
  return law.region || law.jurisdiction || "Jurisdiction not specified";
}

export function formatSignal(value) {
  return value || "Not specified";
}

export function compactDate(law) {
  if (law.live_date_label) return law.live_date_label;

  if (!law.effective_date) return "Not specified";

  const date = new Date(`${law.effective_date}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return law.effective_date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function getAiLegiRiskBoardSnapshotBySlug(slug) {
  const record = await getPublishedLawRecordBySlug(slug);

  if (!record) return null;

  const profile = await fetchSingleRow("board_snapshot_profiles", {
    select:
      "board_governance_signal,primary_board_issue,board_question,board_verdict,board_signal_1,board_signal_2,board_signal_3,management_question_1,management_question_2,management_question_3,next_step_line,is_published",
    legislation_record_id: `eq.${record.id}`,
    is_published: "eq.true",
    limit: "1",
  });

  if (!profile) {
    console.warn(`No published Board Snapshot profile found for slug: ${slug}`);
    return null;
  }

  return {
    law: mapLawRecord(record),

    profile: {
      board_governance_signal: profile.board_governance_signal,
      primary_board_issue: profile.primary_board_issue,
      board_question: profile.board_question,
      board_verdict: profile.board_verdict,

      board_signal_1: profile.board_signal_1,
      board_signal_2: profile.board_signal_2,
      board_signal_3: profile.board_signal_3,

      management_question_1: profile.management_question_1,
      management_question_2: profile.management_question_2,
      management_question_3: profile.management_question_3,

      next_step_line: profile.next_step_line,
    },
  };
}

export async function getAiLegiRiskAccountabilityCheckBySlug(slug) {
  const record = await getPublishedLawRecordBySlug(slug);

  if (!record) return null;

  const profile = await fetchSingleRow("accountability_exposure_profiles", {
    select:
      "accountability_exposure,primary_attribution_gap,accountability_question,accountability_verdict,name_standard_analysis,human_review_analysis,evidence_record_analysis,attribution_question_1,attribution_question_2,attribution_question_3,next_step_line,is_published",
    legislation_record_id: `eq.${record.id}`,
    is_published: "eq.true",
    limit: "1",
  });

  if (!profile) {
    console.warn(`No published Accountability Exposure profile found for slug: ${slug}`);
    return null;
  }

  return {
    law: mapLawRecord(record),

    profile: {
      accountability_exposure_signal: profile.accountability_exposure,
      primary_attribution_gap: profile.primary_attribution_gap,
      accountability_question: profile.accountability_question,
      accountability_verdict: profile.accountability_verdict,

      accountability_signal_1: profile.name_standard_analysis,
      accountability_signal_2: profile.human_review_analysis,
      accountability_signal_3: profile.evidence_record_analysis,

      attribution_question_1: profile.attribution_question_1,
      attribution_question_2: profile.attribution_question_2,
      attribution_question_3: profile.attribution_question_3,

      next_step_line: profile.next_step_line,
    },
  };
}

export async function getAiLegiRiskReportBySlug(slug) {
  const record = await getPublishedLawRecordBySlug(slug);

  if (!record) return null;

  const profile = await fetchSingleRow("enterprise_blueprint_profiles", {
    select:
      "enterprise_exposure,primary_governance_gap,enterprise_question,operating_model_exposure,governance_cadence_analysis,vendor_embedded_ai_exposure,evidentiary_record_analysis,control_visibility_question_1,control_visibility_question_2,recurring_cost_question,next_step_line,is_published",
    legislation_record_id: `eq.${record.id}`,
    is_published: "eq.true",
    limit: "1",
  });

  if (!profile) {
    console.warn(`No published Enterprise Blueprint profile found for slug: ${slug}`);
    return null;
  }

  return {
    law: mapLawRecord(record),

    profile: {
      enterprise_exposure_signal: profile.enterprise_exposure,
      primary_governance_gap: profile.primary_governance_gap,
      enterprise_question: profile.enterprise_question,
      enterprise_verdict: profile.operating_model_exposure,

      enterprise_signal_1: profile.governance_cadence_analysis,
      enterprise_signal_2: profile.vendor_embedded_ai_exposure,
      enterprise_signal_3: profile.evidentiary_record_analysis,

      enterprise_question_1: profile.control_visibility_question_1,
      enterprise_question_2: profile.control_visibility_question_2,
      enterprise_question_3: profile.recurring_cost_question,

      next_step_line: profile.next_step_line,
    },
  };
}
