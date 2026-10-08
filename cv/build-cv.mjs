import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import { PDFDocument } from "pdf-lib";

const CV_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(CV_DIR, "..");
const FILE_NAMES = { en: "Mauro-Gerardi-CV-EN.pdf", es: "Mauro-Gerardi-CV-ES.pdf" };
const AUTHOR = "Mauro Alejandro Gerardi";
const SIZE_BUDGET_BYTES = 120 * 1024;
const PAGE_CONTENT_HEIGHT_PX = ((297 - 2 * 14) * 96) / 25.4;

const args = parseArgs(process.argv.slice(2));
const langs = args.lang ? [String(args.lang)] : Object.keys(FILE_NAMES);
const outDir = path.resolve(process.cwd(), String(args.out ?? path.join(ROOT, "public")));

for (const lang of langs) {
  if (!FILE_NAMES[lang]) {
    console.error(`Unknown language "${lang}". Use one of: ${Object.keys(FILE_NAMES).join(", ")}.`);
    process.exit(2);
  }
}

const browser = await launchBrowser();
let failed = false;

try {
  await mkdir(outDir, { recursive: true });
  const context = await browser.newContext({ viewport: { width: 794, height: 1123 } });

  for (const lang of langs) {
    try {
      const result = await buildOne(context, lang);
      console.log(
        `${lang.toUpperCase()} → ${path.relative(process.cwd(), result.file) || result.file} · ` +
          `${result.pages} page · ${(result.bytes / 1024).toFixed(1)} KB · content fills ${result.fill}% of the page`,
      );
      if (result.bytes > SIZE_BUDGET_BYTES) {
        console.warn(`  warning: ${result.bytes} bytes exceeds the ${SIZE_BUDGET_BYTES} byte budget`);
      }
    } catch (error) {
      failed = true;
      console.error(`${lang.toUpperCase()} FAILED: ${error.message}`);
    }
  }
} finally {
  await browser.close();
}

process.exit(failed ? 1 : 0);

async function buildOne(context, lang) {
  const data = JSON.parse(await readFile(path.join(CV_DIR, `data.${lang}.json`), "utf8"));
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  try {
    await page.goto(pathToFileURL(path.join(CV_DIR, "template.html")).href, { waitUntil: "load" });
    await page.evaluate((cv) => window.renderCv(cv), data);
    if (args["body-size"]) {
      await page.evaluate((size) => document.documentElement.style.setProperty("--body-size", size), String(args["body-size"]));
    }
    await page.evaluate(() => document.fonts.ready);

    if (pageErrors.length) throw new Error(`template error: ${pageErrors.join("; ")}`);

    const fontStatuses = await page.evaluate(() =>
      Array.from(document.fonts)
        .filter((face) => face.family.replace(/["']/g, "") === "Sora")
        .map((face) => face.status),
    );
    if (!fontStatuses.includes("loaded")) {
      throw new Error(`Sora did not load (font statuses: ${fontStatuses.join(", ") || "none"})`);
    }

    const text = await page.evaluate(() => document.body.innerText);
    const placeholder = text.match(/\[(confirm|provide|metric|todo|tbd|add )[^\]]*\]/i);
    if (placeholder) throw new Error(`placeholder left in the content: "${placeholder[0]}"`);

    await page.emulateMedia({ media: "print" });
    const contentHeight = await page.evaluate(() => document.body.getBoundingClientRect().height);
    const fill = Math.round((contentHeight / PAGE_CONTENT_HEIGHT_PX) * 100);

    const printed = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      tagged: true,
    });

    const pdf = await PDFDocument.load(printed, { updateMetadata: false });
    const pages = pdf.getPageCount();
    if (pages !== 1) {
      throw new Error(`renders to ${pages} pages (content height ≈ ${fill}% of one page). Trim the copy or lower --body-size.`);
    }

    const now = new Date();
    pdf.setTitle(data.meta.title, { showInWindowTitleBar: true });
    pdf.setAuthor(AUTHOR);
    pdf.setSubject(data.meta.subject);
    pdf.setKeywords([data.meta.keywords.join(", ")]);
    pdf.setLanguage(data.meta.language);
    pdf.setCreator(AUTHOR);
    pdf.setProducer("Chromium + pdf-lib (cv/build-cv.mjs)");
    pdf.setCreationDate(now);
    pdf.setModificationDate(now);

    const bytes = await pdf.save();
    const file = path.join(outDir, FILE_NAMES[lang]);
    await writeFile(file, bytes);
    return { file, pages, bytes: bytes.byteLength, fill };
  } finally {
    await page.close();
  }
}

async function launchBrowser() {
  const attempts = [
    { name: "Google Chrome (channel: chrome)", options: { channel: "chrome" } },
    process.env.CV_BROWSER_PATH && {
      name: `CV_BROWSER_PATH (${process.env.CV_BROWSER_PATH})`,
      options: { executablePath: process.env.CV_BROWSER_PATH },
    },
    { name: "Playwright Chromium cache", options: {} },
  ].filter(Boolean);

  const errors = [];
  for (const attempt of attempts) {
    try {
      return await chromium.launch(attempt.options);
    } catch (error) {
      errors.push(`- ${attempt.name}: ${String(error.message).split("\n")[0]}`);
    }
  }
  console.error(
    "Could not launch a Chromium-based browser. Install Google Chrome, or point CV_BROWSER_PATH " +
      "at a Chromium executable.\n" + errors.join("\n"),
  );
  process.exit(1);
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const [key, inlineValue] = arg.slice(2).split("=");
    const next = argv[i + 1];
    if (inlineValue !== undefined) {
      parsed[key] = inlineValue;
    } else if (next !== undefined && !next.startsWith("--")) {
      parsed[key] = next;
      i += 1;
    } else {
      parsed[key] = true;
    }
  }
  return parsed;
}
