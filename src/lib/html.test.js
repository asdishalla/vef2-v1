import test from "node:test";
import assert from "node:assert/strict";

import {
  generateIndexHtml,
  generateQuestionHtml,
  generateQuestionCategoryHtml,
} from "./html.js";

test("generateIndexHtml skilar HTML með titli og linkum", () => {
  const html = generateIndexHtml();

  assert.equal(typeof html, "string");
  assert.ok(html.includes("<h1>Spurningaleikur!</h1>"));
  assert.ok(html.includes('href="almenn_kunnatta.html"'));
  assert.ok(html.includes('href="nattura.html"'));
  assert.ok(html.includes('href="bokmenntir.html"'));
  assert.ok(html.includes('href="saga.html"'));
  assert.ok(html.includes('href="landafraedi.html"'));
  assert.ok(html.includes('href="skemmtun.html"'));
  assert.ok(html.includes('href="ithrottir.html"'));
});

test("generateQuestionHtml býr til spurningu með hidden svari og tökkum", () => {
  const q = { question: "Hvað er 2+2?", answer: "4" };
  const html = generateQuestionHtml(q);

  assert.ok(html.includes(q.question));
  assert.ok(html.includes(q.answer));
  assert.ok(html.includes("button-show"));
  assert.ok(html.includes("button-correct"));
  assert.ok(html.includes("button-incorrect"));
});

test("generateQuestionCategoryHtml setur inn title og spurningar", () => {
  const title = "Saga";
  const questionsHtml = "<section>Test</section>";
  const html = generateQuestionCategoryHtml(title, questionsHtml);

  assert.ok(html.includes(title));
  assert.ok(html.includes(questionsHtml));
  assert.ok(html.includes("Til baka"));
  assert.ok(html.includes('class="counter"'));
});
