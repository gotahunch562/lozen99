create table if not exists public.board_snapshot_profiles (
  id uuid primary key default gen_random_uuid(),
  legislation_record_id uuid not null references public.ai_legislation_records(id) on delete cascade,
  board_governance_signal text,
  primary_board_issue text,
  board_question text,
  board_verdict text,
  board_signal_1 text,
  board_signal_2 text,
  board_signal_3 text,
  management_question_1 text,
  management_question_2 text,
  management_question_3 text,
  next_step_line text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint board_snapshot_profiles_legislation_record_id_key unique (legislation_record_id)
);

create table if not exists public.accountability_exposure_profiles (
  id uuid primary key default gen_random_uuid(),
  legislation_record_id uuid not null references public.ai_legislation_records(id) on delete cascade,
  accountability_exposure text,
  primary_attribution_gap text,
  accountability_question text,
  accountability_verdict text,
  name_standard_analysis text,
  human_review_analysis text,
  evidence_record_analysis text,
  attribution_question_1 text,
  attribution_question_2 text,
  attribution_question_3 text,
  next_step_line text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint accountability_exposure_profiles_legislation_record_id_key unique (legislation_record_id)
);

alter table public.board_snapshot_profiles enable row level security;
alter table public.accountability_exposure_profiles enable row level security;

drop policy if exists "Published board snapshots are publicly readable" on public.board_snapshot_profiles;
create policy "Published board snapshots are publicly readable"
  on public.board_snapshot_profiles
  for select
  using (is_published = true);

drop policy if exists "Published accountability checks are publicly readable" on public.accountability_exposure_profiles;
create policy "Published accountability checks are publicly readable"
  on public.accountability_exposure_profiles
  for select
  using (is_published = true);

insert into public.board_snapshot_profiles (
  legislation_record_id,
  board_governance_signal,
  primary_board_issue,
  board_question,
  board_verdict,
  board_signal_1,
  board_signal_2,
  board_signal_3,
  management_question_1,
  management_question_2,
  management_question_3,
  next_step_line,
  is_published
) values (
  'a2ddb8cd-fdd6-46d8-8848-f51f6042bb00',
  'Board oversight signal: automated decision systems affecting consumers will require documented governance attention before the 2027 effective date.',
  'Colorado SB 26-189 creates a board-level governance signal because automated decision-making cannot be treated only as a technical, compliance, or vendor-management issue when consumer impact, human review, and reconsideration rights are implicated.',
  'Can management show where automated decision systems are used, who is accountable for review, and how the company will evidence compliance before the effective date?',
  'The board does not need a technical inventory only. It needs an accountable governance view of where automated decision systems affect consumers, what review rights exist, and where management has assigned responsibility.',
  'The law creates a timing signal because the operative date gives companies a defined window to identify covered systems and prepare governance evidence.',
  'The law creates an accountability signal because human review and reconsideration mechanisms cannot function without clear ownership.',
  'The law creates a board evidence signal because management will need more than policy language; it will need records showing how automated decision systems are governed in practice.',
  'Which automated decision systems could fall within the Colorado scope?',
  'Who owns review, reconsideration, documentation, and escalation for those systems?',
  'What evidence will management provide to show that the governance process is operational before January 1, 2027?',
  'Use the Governance Readiness Briefing to convert the snapshot into a board-ready oversight record and management question set.',
  true
)
on conflict (legislation_record_id) do update set
  board_governance_signal = excluded.board_governance_signal,
  primary_board_issue = excluded.primary_board_issue,
  board_question = excluded.board_question,
  board_verdict = excluded.board_verdict,
  board_signal_1 = excluded.board_signal_1,
  board_signal_2 = excluded.board_signal_2,
  board_signal_3 = excluded.board_signal_3,
  management_question_1 = excluded.management_question_1,
  management_question_2 = excluded.management_question_2,
  management_question_3 = excluded.management_question_3,
  next_step_line = excluded.next_step_line,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.accountability_exposure_profiles (
  legislation_record_id,
  accountability_exposure,
  primary_attribution_gap,
  accountability_question,
  accountability_verdict,
  name_standard_analysis,
  human_review_analysis,
  evidence_record_analysis,
  attribution_question_1,
  attribution_question_2,
  attribution_question_3,
  next_step_line,
  is_published
) values (
  'a2ddb8cd-fdd6-46d8-8848-f51f6042bb00',
  'Name Standard℠ Signal: Human attribution',
  'Colorado SB 26-189 creates a human review and reconsideration signal, but the enterprise exposure remains whether the company can name the responsible human or institutional actor behind the review process.',
  'When an automated decision is challenged, who is actually responsible for review, reconsideration, documentation, and final accountability?',
  'The law points toward human accountability, but the company still has to operationalize attribution. A reconsideration channel without named responsibility can become procedural compliance rather than accountable governance.',
  'The Name Standard℠ issue is not whether the law mentions human review. The issue is whether the organization can identify the person, office, or accountable function responsible for the decision pathway.',
  'Human review should not be treated as a generic safeguard. It must be connected to authority, competence, documentation, escalation, and a clear decision record.',
  'The evidence question is whether the company can produce a record showing who reviewed the decision, what they reviewed, what authority they had, and how the final outcome was reached.',
  'Who is named as responsible when an automated decision is reviewed or reconsidered?',
  'Does the reviewer have authority to change the outcome, or only to confirm the system output?',
  'What record will show that human review was substantive rather than symbolic?',
  'Use the Governance Readiness Briefing to test whether the company’s AI accountability process satisfies the Name Standard℠ rather than relying on generic human-review language.',
  true
)
on conflict (legislation_record_id) do update set
  accountability_exposure = excluded.accountability_exposure,
  primary_attribution_gap = excluded.primary_attribution_gap,
  accountability_question = excluded.accountability_question,
  accountability_verdict = excluded.accountability_verdict,
  name_standard_analysis = excluded.name_standard_analysis,
  human_review_analysis = excluded.human_review_analysis,
  evidence_record_analysis = excluded.evidence_record_analysis,
  attribution_question_1 = excluded.attribution_question_1,
  attribution_question_2 = excluded.attribution_question_2,
  attribution_question_3 = excluded.attribution_question_3,
  next_step_line = excluded.next_step_line,
  is_published = excluded.is_published,
  updated_at = now();
