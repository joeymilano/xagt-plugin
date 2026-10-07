export interface SubmitInput {
  name?: string;
  slug?: string;
  intro?: string;
  repo?: string;
  api?: string;
  health?: string;
  commit?: string;
}

export interface SubmitPayload {
  name: string;
  slug: string;
  intro: string;
  repo: string;
  api: string;
  health: string;
  commit: string;
}

export interface SubmitOptions {
  cliVersion: string;
  input: SubmitInput;
  submissionRepo?: string;
  outputDir?: string;
}

export const HACKATHON_CLOSED_MESSAGE =
  "The X-Agent AI MCP Hackathon 2026 has concluded. Submissions are closed. " +
  "No submission package will be created. " +
  "Final winners: https://github.com/xagentAI/xagt-plugin/blob/main/docs/mcp-hackathon-2026-winners.md. " +
  "Reward contact: admin https://t.me/KongK0u. " +
  "Ordinary non-competition contributions remain welcome through normal pull requests.";

// Keep the public entry point for older callers, but stop before prompting,
// collecting project details, or writing files. There is no override to reopen it.
export async function runSubmit(_options: SubmitOptions): Promise<never> {
  throw new Error(HACKATHON_CLOSED_MESSAGE);
}

export function renderMarkdown(payload: SubmitPayload, cliVersion: string): string {
  const submittedAt = new Date().toISOString();
  return `# ${payload.name}

**Submitted via:** \`xagt-plugin@${cliVersion}\`
**Submitted at:** ${submittedAt}

## Capability

- **One-line description:** ${payload.intro}
- **Capability boundary:** _Describe what this service does and does not do._

## Live API

- **API base URL:** ${payload.api}
- **Health-check URL:** ${payload.health}
- **Deployment proof URL:** ${new URL("/.well-known/xagent-verification.json", payload.api).toString()}
- **Authentication:** _State how reviewers receive short-lived access without committing a secret._
- **Rate limits / known limits:** _State limits, timeouts, and material restrictions._

## Source and reproducibility

- **Source repository:** ${payload.repo}
- **Review commit:** \`${payload.commit}\`
- **Source submitted in this PR:** \`source/\`
- **Run tests:** _Add the exact command._
- **Run locally:** _Add the exact command._
- **Deploy:** _Add the exact command or documented steps._
- **Version binding:** _Explain how the running API identifies this commit or build._

## Verification

- Add reproducible API evidence to \`verification/README.md\`.
- Include a health-check call, one real capability call, expected output, and one safe error case.

## Security and data handling

- **Data collected:** _Fields or none._
- **Purpose and retention:** _Why and for how long._
- **Third parties / outbound network calls:** _Services or none._
- **Known risks / restrictions:** _Anything reviewers or downstream agents must know._

## Support

- **Team / builder:** _Name_
- **Contact:** _Preferred contact channel_
- **License / rights:** _Confirm you can authorize review and deployment._
`;
}

export function renderManifest(payload: SubmitPayload, cliVersion: string): string {
  const proofUrl = new URL("/.well-known/xagent-verification.json", payload.api).toString();
  return `${JSON.stringify({
    schemaVersion: 1,
    name: payload.name,
    slug: payload.slug,
    sourceRepository: payload.repo,
    reviewCommit: payload.commit,
    apiBaseUrl: payload.api,
    healthCheckUrl: payload.health,
    deploymentProofUrl: proofUrl,
    generatedBy: `xagt-plugin@${cliVersion}`
  }, null, 2)}\n`;
}

export function renderRightsDeclaration(payload: SubmitPayload): string {
  return `# Submission rights declaration

Project: ${payload.name}
Submission slug: ${payload.slug}
Submitter: _Legal person or entity_
Date: _YYYY-MM-DD_

The submitter confirms that they own, or have sufficient authorization for, the source code, dependencies, service, data, branding, and other materials submitted in this pull request.

Subject to the official program terms, the submitter authorizes X-Agent to retain, reproduce, audit, test, archive, and publish the submitted program artifact for judging, fraud prevention, dispute handling, ecosystem submission, and post-award accountability. Closing the pull request, deleting a fork, or deleting an external repository does not revoke the official archive rights attached to an accepted and rewarded entry.

Third-party components and their licenses: _List or link_
Exceptions or restrictions: _None or explain_

This declaration must be completed before review. It is not a substitute for event terms reviewed by qualified counsel.
`;
}
