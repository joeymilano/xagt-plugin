# X-Agent MCP Hackathon: archived program and review rules

**The 2026 event has concluded. Submissions are closed.** See the [final winners and reward contact instructions](./mcp-hackathon-2026-winners.md). The rules below are retained as an event record.

## Purpose

The program discovers real agent capabilities, verifies that they can be operated and maintained, standardizes selected capabilities as MCP tools, and assists their submission to the OKX Agent ecosystem.

This document records the September–October 2026 program. The May 2026 X-Agent × OKX Agentic Wallet Hackathon is closed and preserved in the [`historical activity archive`](./archive/2026-xagent-okx-agentic-wallet-hackathon.md).

## Who can participate

The event was open to builders and teams developing capabilities that agents can call to complete real tasks. The two tracks were Open Innovation and the OlaXBT × X-Agent Trading Challenge; see the [archived event rules](../README.md#archived-event-rules-and-submission-reference-x-agent-ai-mcp-hackathon-2026) for their requirements.

Entries were submitted under `submissions/mcp-hackathon/<team>-<project>/`. Historical submission directories are read-only program records and were not valid entry points for this activity.

## Hard acceptance gates

An entry must have a reachable, deployed API; a public health check; a standard deployment-proof endpoint; complete source in the official submission PR; a pinned commit; reproducible instructions; and enough API, security, and data-handling information to verify the work safely.

An entry is blocked when the API cannot be exercised, source is incomplete, the service cannot be linked to the submitted commit, reproducibility is materially insufficient, or there is malicious code, secret exposure, unauthorized access, undisclosed data transfer, or another serious safety concern.

## Review sequence

```text
Submission PR
  → trusted automated scope and secret checks
  → public source commit verification
  → API / health / deployment-proof verification
  → source and reproducibility review
  → safety and data review
  → two-reviewer quality scorecard
  → pass | conditional pass | not accepted
  → MCP standardization for selected projects
  → OKX-facing submission package with the project team
```

The review validates the submitted artifact only. It is not a security certification, legal review, regulatory approval, or a promise of marketplace listing or commercial return.

## Submission integrity

- Submitters must own or be authorized to submit the code, service, dependencies, and data used by the entry.
- The service must remain reviewable during the announced review window. Private access is provided through an approved private channel with short-lived credentials.
- The declared commit is the review baseline. Changes that affect functionality, security, data handling, or dependencies must be disclosed in a follow-up PR and may require re-review.
- Reviewers may reject an entry that is deceptive, unsafe, unlawful, non-functional, or impossible to verify.
- Submission code is untrusted. It is not automatically installed, built, or executed by this repository's CI; any runtime validation uses an isolated review environment.
- Reviewers may issue a fresh-commit or live-operation challenge. Plagiarism, fake deployment evidence, false ownership, identity manipulation, or coordinated scoring abuse results in rejection.
- A validated PR commit is copied into an official archive ref. An award is not paid until the complete source is merged and published with its integrity receipt in an immutable acceptance release.
- New pushes are allowed before acceptance, but each push creates another archive ref, reruns verification, and invalidates stale approval. Post-award changes require a new PR and release.

## MCP handoff

After a pass, X-Agent works with the team to define tool boundaries, input/output schema, authorization, error semantics, timeouts, limits, observability, and an acceptance test. X-Agent owns the adapter and submission package; the submitting team owns the truthfulness, operation, and maintenance of its underlying capability.

## Program changes

Dates, reward terms, repository targets, and the final OKX process are communicated through the official program notice. The submission contract is retained for reference and does not reopen the concluded event.
