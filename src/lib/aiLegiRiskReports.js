import { supabase, hasSupabaseConfig } from "@/lib/supabaseClient";

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

  const { data, error } = await supabase
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
      enterprise_blueprint_profiles (
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
        next_step_line
      )
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Error loading AI LegiRisk report:", error);
    return null;
  }

  if (!data) return null;

  const enterpriseProfile = Array.isArray(data.enterprise_blueprint_profiles)
    ? data.enterprise_blueprint_profiles[0]
    : data.enterprise_blueprint_profiles;

  if (!enterpriseProfile) return null;

  return {
    law: {
      id: data.id,
      slug: data.slug,
      law_code: data.law_code,
      law_name: data.rule_name,
      short_name: data.short_name,
      jurisdiction: data.jurisdiction,
      region: data.region,
      country: data.country,
      status: data.status,
      sector_scope: data.sector_scope,
      impact_area: data.impact_area,
      name_standard_signal: data.name_standard_signal,
      effective_date: data.effective_date,
      live_date_label: data.live_date_label,
      source_url: data.source_url,
      source_label: data.source_label,
      verified_summary: data.verified_summary,
    },

    profile: {
      enterprise_exposure_signal: enterpriseProfile.enterprise_exposure,
      primary_governance_gap: enterpriseProfile.primary_governance_gap,
      enterprise_question: enterpriseProfile.enterprise_question,
      enterprise_verdict: enterpriseProfile.operating_model_exposure,

      enterprise_signal_1: enterpriseProfile.governance_cadence_analysis,
      enterprise_signal_2: enterpriseProfile.vendor_embedded_ai_exposure,
      enterprise_signal_3: enterpriseProfile.evidentiary_record_analysis,

      enterprise_question_1: enterpriseProfile.control_visibility_question_1,
      enterprise_question_2: enterpriseProfile.control_visibility_question_2,
      enterprise_question_3: enterpriseProfile.recurring_cost_question,

      next_step_line: enterpriseProfile.next_step_line,
    },
  };
}
