import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseLine, parseQuestions, CATEGORIES } from "./parse.js";

describe("parse.js", () => {
  describe("parseQuestions", () => {
    it("skilar 'test' (stub)", () => {
      const result = parseQuestions();
      assert.equal(result, "test");
    });
  });

  describe("CATEGORIES", () => {
    it("inniheldur 7 flokka og rétt heiti fyrir nokkra", () => {
      assert.equal(Object.keys(CATEGORIES).length, 7);
      assert.equal(CATEGORIES[1], "Almenn kunnátta");
      assert.equal(CATEGORIES[2], "Náttúra og vísindi");
      assert.equal(CATEGORIES[7], "Íþróttir og tómstundir");
    });
  });

  describe("parseLine", () => {
    it("skilar null fyrir tóma strenginn", () => {
      assert.equal(parseLine(""), null);
    });

    it("skilar null ef fjöldi gilda er ekki 6 (of fá)", () => {
      assert.equal(parseLine("1,2,3"), null);
    });

    it("skilar null ef fjöldi gilda er ekki 6 (of mörg)", () => {
      assert.equal(parseLine("1,2,3,4,5,6,7"), null);
    });

    it("parse-ar gilda línu og setur rétt í object", () => {
      const input = "4,,3,2,q,a";
      const output = parseLine(input);

      assert.ok(output);
      assert.equal(output.categoryNumber, "4");
      assert.equal(output.subCategory, "");
      assert.equal(output.difficulty, "3");
      assert.equal(output.quality, "2");
      assert.equal(output.question, "q");
      assert.equal(output.answer, "a");
    });
  });
});
