---
name: xagt-submit-hackathon
description: Explain that the X-Agent AI MCP Hackathon 2026 has concluded when a user asks to prepare, validate, submit, or update a competition entry. Direct users to the published winners, reward contact, or ordinary non-competition contribution process.
---

# X-Agent MCP Hackathon — submissions closed

**The X-Agent AI MCP Hackathon 2026 has concluded. Submissions are closed.**

## Handle a competition submission request

1. Tell the user that the event has ended and no new entries are accepted.
2. Do not collect submission details, package a new entry, deploy a service for entry, run submission preparation, or create, push, open, or update a PR to enter this event. Explicit authorization to submit does not reopen the concluded event.
3. Explain that `xagt-plugin submit` is disabled and creates no files. Do not suggest an older CLI version, manual packaging, or another workaround.
4. Link the [published winners and awards](https://github.com/xagentAI/xagt-plugin/blob/main/docs/mcp-hackathon-2026-winners.md). For reward claims, direct the user to **admin** on Telegram: **https://t.me/KongK0u**. Do not change awards or handle payments.

## Preserve archives and ordinary contributions

- Historical projects, winners, and awarded amounts remain unchanged. Do not modify another participant's records.
- Ordinary non-competition contributions remain welcome through the normal repository pull request process. Repository maintenance is not a hackathon entry.
- For explicitly requested maintenance of an existing archived project under `submissions/mcp-hackathon/<slug>/`, follow `AGENTS.md`, the archived `submissions/README.md` contract, and the source-retention policy. Run applicable repository checks and offline/online validation for changed archived source. Do not represent maintenance, validation, or archival as renewed eligibility or a new award.
- Preserve the existing publish-authorization boundary: push or open an ordinary contribution PR only when the user explicitly authorizes publishing.
- Never invent a URL, response, Commit, test result, ownership claim, or deployment state. Never commit secrets, credentials, private data, dependencies, or generated build output. Never execute participant source in a privileged repository workflow.
