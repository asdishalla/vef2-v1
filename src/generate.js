// Þetta er comment test
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

  const qualityHistoryQuestions = questions
    .filter((q) => q && q.categoryNumber === "4" && q.quality === "3")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  // TODO ítra gegnum alla flokka og búa til

  const questionsHtml = qualityHistoryQuestions
    .map(generateQuestionHtml)
    .join("\n");

  const output = generateQuestionCategoryHtml("Saga", questionsHtml);

  const path = "./dist/saga.html";

  await fs.writeFile(path, output, "utf-8");

  // TODO búa til alla hina flokkana

  // TODO búa til index
  const indexHtml = generateIndexHtml();

  await fs.writeFile('./dist/index.html', indexHtml, "utf-8");
}

main().catch((error) => {
  console.error("error generating", error);
});
