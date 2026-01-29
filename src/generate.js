import fs from "node:fs/promises";
import { parseLine } from "./lib/parse.js";
import {
  generateIndexHtml,
  generateQuestionCategoryHtml,
  generateQuestionHtml,
} from "./lib/html.js";

const MAX_QUESTIONS_PER_CATEGORY = 100;

async function main() {
  // Búa til dist möppu ef ekki til
  const distPath = "./dist";
  await fs.mkdir(distPath);

  const content = await fs.readFile("./questions.csv", "utf-8");

  const lines = content.split("\n");

  const questions = lines.map(parseLine);

  const qualityGeneralQuestions = questions
    .filter((q) => q && q.categoryNumber === "1" && q.quality === "3")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  const qualityNatureQuestions = questions
    .filter((q) => q && q.categoryNumber === "2" && q.quality === "3")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  const qualityLiteratureQuestions = questions
    .filter((q) => q && q.categoryNumber === "3" && q.quality === "3")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  const qualityHistoryQuestions = questions
    .filter((q) => q && q.categoryNumber === "4" && q.quality === "3")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  const qualityGeographyQuestions = questions
    .filter((q) => q && q.categoryNumber === "5" && q.quality === "3")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  const qualityEntertainmentQuestions = questions
    .filter((q) => q && q.categoryNumber === "6" && q.quality === "3")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  const qualitySportsQuestions = questions
    .filter((q) => q && q.categoryNumber === "7" && q.quality === "3")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  // Eitthvað stuff --------------------------------
  const generalHtml = qualityGeneralQuestions
    .map(generateQuestionHtml)
    .join("\n");
  const generalOutput = generateQuestionCategoryHtml(
    "Almenn kunnátta",
    generalHtml,
  );
  const generalPath = "./dist/almenn_kunnatta.html";
  await fs.writeFile(generalPath, generalOutput, "utf-8");

  const natureHtml = qualityNatureQuestions
    .map(generateQuestionHtml)
    .join("\n");
  const natureOutput = generateQuestionCategoryHtml(
    "Náttúra og vísindi",
    natureHtml,
  );
  const naturePath = "./dist/nattura.html";
  await fs.writeFile(naturePath, natureOutput, "utf-8");

  const literatureHtml = qualityLiteratureQuestions
    .map(generateQuestionHtml)
    .join("\n");
  const literatureOutput = generateQuestionCategoryHtml(
    "Bókmenntir og listir",
    literatureHtml,
  );
  const literaturePath = "./dist/bokmenntir.html";
  await fs.writeFile(literaturePath, literatureOutput, "utf-8");

  const historyHtml = qualityHistoryQuestions
    .map(generateQuestionHtml)
    .join("\n");
  const historyOutput = generateQuestionCategoryHtml("Saga", historyHtml);
  const historyPath = "./dist/saga.html";
  await fs.writeFile(historyPath, historyOutput, "utf-8");

  const geographyHtml = qualityGeographyQuestions
    .map(generateQuestionHtml)
    .join("\n");
  const geographyOutput = generateQuestionCategoryHtml(
    "Landafræði",
    geographyHtml,
  );
  const geographyPath = "./dist/landafraedi.html";
  await fs.writeFile(geographyPath, geographyOutput, "utf-8");

  const entertainmentHtml = qualityEntertainmentQuestions
    .map(generateQuestionHtml)
    .join("\n");
  const entertainmentOutput = generateQuestionCategoryHtml(
    "Skemmtun og afþreying",
    entertainmentHtml,
  );
  const entertainmentPath = "./dist/skemmtun.html";
  await fs.writeFile(entertainmentPath, entertainmentOutput, "utf-8");

  const sportsHtml = qualitySportsQuestions
    .map(generateQuestionHtml)
    .join("\n");
  const sportsOutput = generateQuestionCategoryHtml(
    "Íþróttir og tómstundir",
    sportsHtml,
  );
  const sportsPath = "./dist/ithrottir.html";
  await fs.writeFile(sportsPath, sportsOutput, "utf-8");

  // index
  const indexHtml = generateIndexHtml();
  await fs.writeFile("./dist/index.html", indexHtml, "utf-8");
}

main().catch((error) => {
  console.error("error generating", error);
});
