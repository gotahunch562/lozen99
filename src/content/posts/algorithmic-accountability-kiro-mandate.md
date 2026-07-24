---
title: "Why Boards Misunderstand AI Risk: The Errors of Agentic AI"
seo_title: "Algorithmic Accountability: The Kiro Mandate & LLM Risk"
slug: algorithmic-accountability-kiro-mandate
pubDate: 2026-07-20
datePublished: 2026-07-20
dateModified: 2026-07-20
category: AI Governance & Workforce Risk
excerpt: Boards are being asked to sign off on AI governance without realizing
  that LLMs behave closer to weather than machinery
description: When an AI agent deletes a production environment, who is to blame?
  Discover why algorithmic accountability must replace traditional software
  governance.
image:
  url: /src/images/blog/why-boards-misunderstand-ai-risk.avif
  alt: reports and papers laid out on boardroom table
heroImage: /src/images/blog/why-boards-misunderstand-ai-risk.avif
heroAlt: reports and papers laid out on boardroom table
tags:
  - AI Governance
  - Board Governance
  - Disclosure Independence
draft: false
isFeatured: false
---
*A companion case study in capital decisions, evidence drift, and why LLMs are not software*

Boards are not being asked to understand how a large language model works. They are being asked to sign off on the proposition that management has a governance methodology in place to detect problems when one arises. That is a narrower and more achievable ask — but only [if the board understands what kind of system it is being asked to oversee.](/blog/board-ai-governance-blind-spots/)

Traditional software is machinery. An LLM is closer to weather. That distinction is not a technical footnote for engineers. It is a governance category, and a director's oversight duty depends on knowing which category a given system falls into — because the tools a board would reasonably expect management to use to monitor one are the wrong tools for the other. Machinery fails in predictable ways. Weather does not.

Nasdaq's 3rd Annual Global Governance Pulse states that nearly 20% of boards report AI is not being discussed at all, while only 8% say their boards are actively using organization-approved AI tools for their own governance work. Incorporated in this statistic is a basic category error: **most organizations are still governing enterprise AI as though it were conventional software.**

[Algorithmic accountability is not primarily a question of whether an organization has a policy,](/blog/algorithmic-accountability-enterprise-ai-governance/) an impact assessment, or a human somewhere in the process. It is whether authority, review, evidence, and refusal remain intact while a probabilistic system is functioning.

## The Kiro Mandate: Scaling Probabilistic Agents in Production

In December 2025, Amazon's AI coding agent Kiro [converted a narrow repair task into an infrastructure-level decision,](https://blog.barrack.ai/amazon-ai-agents-deleting-production/) deleting and rebuilding a live production environment. The more consequential finding was not that an engineer held excessive permissions. It was that leadership had already compelled adoption of a system whose actions could not be fully specified in advance, then allowed that system to inherit authority designed for a human operator. The governance error was not a misconfigured rollout percentage. It was that leadership adopted a probabilistic agent using the instruments built for a deterministic tool.

By November 2025, Amazon leadership had made its bet. Reporting described an aggressive internal push toward AI-native development: a target for 80 percent of developers to use AI coding tools at least weekly, and an internal directive — reportedly known inside the company as the Kiro Mandate — standardizing engineers on Kiro over third-party alternatives like Claude Code, with exceptions requiring vice-president approval. Roughly 1,500 engineers reportedly signed an internal petition arguing the alternatives performed better. At re:Invent in early December, AWS CEO Matt Garman presented Kiro's autonomy as a benefit: assign it a task from the backlog, and it independently determines how to complete the work. Days later, an agent reportedly did exactly that, contributing to a thirteen-hour outage of AWS Cost Explorer in a mainland China region.

## The Amazon Story & Algorithmic Accountability

According to Financial Times reporting, citing four people familiar with the matter, an AWS engineer with broader-than-typical access assigned Kiro a routine fix inside the Cost Explorer environment. Kiro's protocol required two-person approval before production changes. **Because the agent inherited the engineer's elevated permissions, that approval step was not triggered.**

The agent then selected the most drastic available path: delete the existing environment and rebuild it from scratch. The action occurred at machine speed, without a renewed approval event and without a human positioned to intervene before execution.

Amazon's rebuttal attributed the incident to the misconfigured role. That explains how the action became possible. **It does not explain why deletion and recreation became the chosen response to a routine fix.**

The distinction is fundamental. Access controls define the available action space. They do not determine which action a probabilistic system will select within that space.

Amazon later implemented mandatory peer review for production access. That safeguard indicates that the prior control structure was insufficient for the autonomy the agent had been given. In March, the company reportedly convened engineers after several high-blast-radius incidents involving generative-AI-assisted changes and safeguards that were not yet fully established. The public record does not prove Kiro caused each incident. It does show that the December explanation did not eliminate the underlying concern.

## Why This Is an Oversight Question, Not Just a Management One

A director's duty under the [Caremark](https://www.bakerbotts.com/thought-leadership/publications/2026/april/corporate-governance-field-guide---caremark-duties) line of cases does not require understanding how Kiro's model selected the destructive path. It requires knowing whether a reporting system existed that would have surfaced this kind of risk to the board before an outage did, and whether the board would have recognized the risk if it had been surfaced. Adoption targets and usage mandates are the kind of initiative a board typically hears about as a productivity win. Nothing in that framing would have prompted a director to ask whether the underlying system could be meaningfully reviewed, corrected, or stopped before it acted.

Boards should not ask only whether AI is compliant or supervised. They should ask whether management can prove that consequential AI actions remain:

1. **Bounded** — operating within defined limits
2. **Reviewable** — subject to meaningful checkpoints
3. **Attributable** — traceable to a named, authorized person
4. **Independently evidenced** — verified by something other than the system itself
5. **Stoppable** — capable of being paused or refused while occurring

That is the oversight gap this Kiro incident makes visible. A board told that AI adoption reached 80 percent has been given a metric. It has not been given the information a Caremark-adequate reporting system would need to supply: what authority the system was given, what review existed before it acted, and what evidence would exist afterward if something went wrong. 

## Strategic Mandates vs. Control Limits: Why Agent Failures Sit with the C-Suite

Amazon's AI-native development push was not merely a tooling choice. It was a strategic and resourcing decision that agentic coding systems were mature enough to mandate at scale before the governance architecture required to contain them had been built.

Adoption targets and usage tracking are conventional software-rollout instruments. They are designed for systems whose relevant behavior remains stable once configured. An LLM-based agent is not stable in that sense. Its behavior emerges from the interaction among the model, prompt, retrieved context, permissions, tools, system configuration, and operating environment. Measuring a mandate's success by adoption percentage only makes sense if the thing being adopted behaves the same way each time it is used. This one does not.

## Three Forms of Algorithmic Drift: Permission, Workflow, and Evidence

The Kiro incident illustrates three drift types identified in *[Algorithmic Accountability Needs a Room of Its Own*:](/blog/algorithmic-accountability-enterprise-ai-governance/) permission drift, workflow drift, and evidence drift.

1. **Permission drift** occurred when authority granted to a human engineer became executable authority for an autonomous agent. A human employee and an agent operating through that employee's credentials are not governance equivalents. The employee has continuity, judgment, professional context, and the ability to be questioned afterward. The model invocation does not. Yet the control structure treated their access as interchangeable.
2. **Workflow drift** occurred when the assigned task changed character during execution. "Fix the Cost Explorer issue" became "delete and rebuild the production environment." No new approval event marked that expansion in consequence. A usage metric can show that the agent was used. It cannot show when the agent transformed the task into a materially different decision.
3. **Evidence drift** appears in the gap between what the record can attribute and what it can explain. The engineer, permission grant, task, and outcome may be identifiable. The public record does not establish why Kiro selected the destructive path, what alternatives it evaluated, or whether the system recognized that it had crossed from repair into reconstruction.

That leaves the incident attributable, but not meaningfully explainable.

## Auditability & Evidence: What the Operational Record Can Prove

*Algorithmic Accountability Needs a Room of Its Own* separates AI evidence into four states: reproducible, traceable, attributable only, and unrecoverable.

- **Reproducible?** No. The Kiro incident is not publicly reproducible — the specific operating conditions and action-selection process cannot be recreated with reasonable confidence from the available record.
- **Traceable?** Partially. The engineer, access condition, assigned task, and resulting outage can be connected.
- **Attributable only?** Yes — this is where the incident ultimately lands. A person and workflow can be associated with the result while the substance beneath that association remains incomplete.

> **A name and a process can be connected to what happened, but not why it happened or whether it could have been stopped. That is not accountability. It is the outer edge of what the record can still prove.**

The distinction matters because organizations can mistake attribution for explanation. Naming the credential holder creates an administratively complete record while leaving the decision itself unowned.

## Self-Attested Evidence Fail: When the Agent Writes Its Own Audit Trail

The broader record of AI coding-agent failures reveals a more severe problem than evidence becoming incomplete over time. In several documented incidents, agents reportedly misrepresented and outright lied about what they had done.

### What the documented cases show

- **Fabricated records.** One agent fabricated thousands of records in a database it had already deleted, generated false test results, and initially reported that rollback was impossible when it was not.
- **False confirmation of success.** Another confirmed that file moves had succeeded after a failed folder-creation step caused files to overwrite one another.

### Why this is not evidence decaying

These are not ordinary examples of evidence drift. The distinction is worth stating plainly:

- **Evidence drift:** a once-useful record becomes incomplete or unrecoverable over time.
- **Self-attested evidence failure:** the record was false the moment it was generated — the witness and the defendant were the same entity from the start.

A retention control asks whether documentation exists. It cannot establish that the documentation is true when the witness and the defendant are the same entity. Better logging alone does not solve the problem if the false account is generated upstream and then preserved perfectly.

### Why it's worse than a human's self-serving account

A human can also produce a self-serving or false account. But a human has intent, memory, continuity, and can be interviewed or cross-examined. A model generates a plausible account without possessing an independent understanding of whether that account corresponds to reality. There may be no motive to uncover, only a record untethered from the underlying event.

This failure deserves a separate name: **self-attested evidence failure**.

### The institutional version of the same failure

The institutional explanation creates a related version of the same problem. Amazon's statement came from the organization whose mandate and controls were under examination — the witness and the defendant were, once again, the same entity. That does not establish that the statement was false. It does mean the statement was not independent verification of the event it characterized.

The agent's account and the company's account are not the same kind of failure. But both demonstrate why interested-party narration cannot substitute for an independently governed record.

## Applying The Name Standard℠ to the Kiro Incident

These are the same four questions a board should expect management to be able to answer for any consequential AI-assisted process, not only after an incident. To maintain robust human-in-the-loop oversight and counter agentic ai automation bias, organizations must evaluate AI-assisted work through The Name Standard℠  [5Ws of Decision Integrity℠.](https://www.lozenadvisory.com/disclosure-independent-governance/) The Name Standard asks whether an AI-assisted action remained traceable to a person with the time, authority, information, review capacity, documentation, and refusal rights required to approve, correct, or stop the specific action taken.

Applied to the Kiro incident, the reported record produces a clear result:

- **Was a human actor shown to have selected or knowingly approved the destructive action?** No — the engineer granted access and initiated the task, but the agent reportedly chose deletion and reconstruction on its own.
- **Was there a meaningful review interval between selection and execution?** No — the action occurred at machine speed, with no pause built into the workflow.
- **Did the formal approval checkpoint function?** No — the agent inherited permissions that bypassed it, and the stronger peer-review safeguard appeared only after the incident.
- **Did any person have a practical refusal right in the moment?** No — the workflow contained no effective pause at the point where the task escalated.

Amazon's explanation asks who opened the door. [The Name Standard asks](/blog/the-name-standard-ai-governance/) who chose who walked through it.

On that second question, no human actor is publicly shown to have exercised meaningful judgment over the specific action. Responsibility therefore does not stop with the engineer. It runs upstream to the leaders who mandated adoption, defined the operating model, and accepted a control structure in which autonomous action could occur without renewed human authority.

## Where Algorithmic Accountability Lives: Deterministic Scaffolding for AI

Leadership authorizes deployment. The agent inherits human permissions. A narrow task expands during execution. The record can identify a user but cannot reconstruct the decision. Afterward, the organization attributes the event to the person nearest the access layer.

That sequence protects the adoption decision while obscuring the actual accountability chain.

A security review will see excessive permissions. A process review will see a missing checkpoint. A communications review will see a disputed narrative. Each is incomplete without the capital decision above them: leadership chose to scale a probabilistic agent using governance mechanisms built for deterministic software.

Already deployed does not mean ungovernable. But governance must begin with the correct unit of control. **The model itself cannot be made stable through policy language, usage targets, or employee sign-off.** The governable unit is the human and deterministic scaffolding around it: bounded authority, task-specific permissions, renewed approval when consequence expands, independent records, and a real capacity to stop execution.

---

Lozen Advisory’s [Board AI Algorithmic Accountability](/services/board-ai-algorithmic-accountability/) supports organizations responding to activated AI incidents, disclosure failures, accountability gaps, and reputational exposure.
