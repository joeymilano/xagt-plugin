import { describe, expect, it, vi } from "vitest";
import { mkdtemp, readdir, rm, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseArgs, runCli } from "../src/cli.js";
import { renderManifest, renderMarkdown, renderRightsDeclaration, runSubmit } from "../src/submit.js";

const payload = {
  name: "Useful capability",
  slug: "team-useful-capability",
  intro: "Completes a real task through a live API.",
  repo: "https://github.com/example/useful-capability",
  api: "https://api.example.com/v1",
  health: "https://api.example.com/health",
  commit: "a".repeat(40)
};

describe("MCP Hackathon submission", () => {
  it("parses live API and source-verification flags", () => {
    expect(
      parseArgs([
        "submit", "--name", payload.name, "--slug", payload.slug, "--intro", payload.intro,
        "--repo", payload.repo, "--api", payload.api, "--health", payload.health, "--commit", payload.commit
      ])
    ).toEqual({ command: "submit", ...payload });
  });

  it("renders the source, API, commit, and verification contract", () => {
    const markdown = renderMarkdown(payload, "0.4.0");
    expect(markdown).toContain("**API base URL:** https://api.example.com/v1");
    expect(markdown).toContain("**Review commit:** `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`");
    expect(markdown).toContain("`source/`");
    expect(markdown).toContain("`verification/README.md`");
  });

  it("renders a machine-readable deployment proof contract", () => {
    const manifest = JSON.parse(renderManifest(payload, "0.4.0"));
    expect(manifest).toMatchObject({
      schemaVersion: 1,
      slug: payload.slug,
      reviewCommit: payload.commit,
      healthCheckUrl: payload.health,
      deploymentProofUrl: "https://api.example.com/.well-known/xagent-verification.json"
    });
  });

  it("renders the retention rights declaration required before reward", () => {
    const rights = renderRightsDeclaration(payload);
    expect(rights).toContain("does not revoke the official archive rights");
    expect(rights).toContain(payload.slug);
  });

  it.each([{}, payload])("rejects packaging before prompts or file writes", async (input) => {
    const outputDir = await mkdtemp(join(tmpdir(), "xagt-submit-output-"));
    try {
      const existing = `submission-${payload.slug}.md`;
      await writeFile(join(outputDir, existing), "preserved draft");
      await expect(runSubmit({ cliVersion: "0.5.0", input, outputDir })).rejects.toThrow(/Submissions are closed/);
      expect(await readdir(outputDir)).toEqual([existing]);
      expect(await readFile(join(outputDir, existing), "utf8")).toBe("preserved draft");
    } finally {
      await rm(outputDir, { recursive: true, force: true });
    }
  });

  it.each([{ flags: [] }, { flags: ["--name", payload.name, "--slug", payload.slug, "--intro", payload.intro,
    "--repo", payload.repo, "--api", payload.api, "--health", payload.health, "--commit", payload.commit] }])(
    "rejects CLI submission with no packaging or PR guidance", async ({ flags }) => {
      const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
      try {
        await expect(runCli(["submit", ...flags])).rejects.toThrow(/admin https:\/\/t.me\/KongK0u/);
        expect(stdout).not.toHaveBeenCalled();
      } finally {
        stdout.mockRestore();
      }
    }
  );

  it("keeps ordinary commands in help and announces closure", async () => {
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    try {
      expect(await runCli(["help"])).toBe(0);
      const help = stdout.mock.calls.map(([text]) => text).join("");
      expect(help).toContain("Submissions are closed");
      expect(help).toContain("mcp-hackathon-2026-winners.md");
      expect(help).toContain("https://t.me/KongK0u");
      for (const command of ["setup", "login", "install", "report", "doctor"]) {
        expect(help).toContain(`xagt-plugin ${command}`);
      }
      expect(help).not.toMatch(/generate a manifest|Hackathon flow|submit source/);
    } finally {
      stdout.mockRestore();
    }
  });
});
