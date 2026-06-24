import { supabase, hasSupabaseConfig } from "./supabaseClient";

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

export async function getAiLegiRiskReportBySlug(slug) {
  if (!slug) return null;

  if (!hasSupabaseConfig) {
    console.warn("Supabase config missing. AI LegiRisk report not loaded.");
    return null;
  }

  const { data: record, error: recordError } = await supabase
    .from("ai_legislation_records")
    .select(`
      id,
      slug,
      law_code,
      rule_name,
      short_name,
      jurisdiction,
      region,
      country,
      status,
      sector_scope,
      impact_area,
      name_standard_signal,
      effective_date,
      live_date_label,
      source_url,
      source_label,
      verified_summary,
      is_published
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (recordError) {
    console.error("Error loading AI legislation record:", recordError);
    return null;
  }

  if (!record) {
    console.warn(`No published AI legislation record found for slug: ${slug}`);
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("enterprise_blueprint_profiles")
    .select(`
      enterprise_exposure,
      primary_governance_gap,
      enterprise_question,
      operating_model_exposure,
      governance_cadence_analysis,
      vendor_embedded_ai_exposure,
      evidentiary_record_analysis,
      control_visibility_question_1,
      control_visibility_question_2,
      recurring_cost_question,
      next_step_line,
      is_published
    `)
    .eq("legislation_record_id", record.id)
    .eq("is_published", true)
    .maybeSingle();

  if (profileError) {
    console.error("Error loading Enterprise Blueprint profile:", profileError);
    return null;
  }

  if (!profile) {
    console.warn(`No published Enterprise Blueprint profile found for slug: ${slug}`);
    return null;
  }

  return {
    law: {
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
    },

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
