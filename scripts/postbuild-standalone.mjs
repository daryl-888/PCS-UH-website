// Copies the static assets Next.js' standalone output doesn't include on
// its own (.next/static and public/) into .next/standalone, so the
// standalone server can serve them without the full project checkout.
// Required by Azure Static Web Apps' hybrid Next.js deploy; harmless
// no-op on hosts (Vercel) that ignore .next/standalone entirely.
import { cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const standaloneDir = path.join(root, ".next", "standalone");

if (!existsSync(standaloneDir)) {
  process.exit(0);
}

cpSync(path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static"), {
  recursive: true,
});
cpSync(path.join(root, "public"), path.join(standaloneDir, "public"), {
  recursive: true,
});
