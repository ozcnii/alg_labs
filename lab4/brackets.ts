import { it } from "node:test";
import assert from "node:assert";

function isValidParentheses(str: string) {
  let count = 0;

  for (const char of str) {
    if (char == "(") {
      count++;
    } else if (char == ")") {
      count--;
      if (count < 0) {
        return false;
      }
    }
  }

  return count == 0;
}

function isValidBrackets(str: string): boolean {
  const bracketsMap = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  const stack: (keyof typeof bracketsMap)[] = [];
  const leftBrackets = Object.keys(bracketsMap);
  const rightBrackets = Object.values(bracketsMap);

  const clearStr = str
    .split("")
    .filter(
      (char) => rightBrackets.includes(char) || leftBrackets.includes(char)
    );

  for (const char of clearStr) {
    if (leftBrackets.includes(char)) {
      stack.push(char as keyof typeof bracketsMap);
      continue;
    }

    if (bracketsMap[stack.pop()!] !== char) {
      return false;
    }
  }

  return stack.length === 0;
}

it("isValidParentheses", () => {
  assert.equal(isValidParentheses("))((()"), false);
  assert.equal(isValidParentheses("()"), true);
  assert.equal(isValidParentheses("()[]"), true);
  assert.equal(isValidParentheses("(){}"), true);
  assert.equal(isValidParentheses("(){}[]"), true);
  assert.equal(isValidParentheses("(()"), false);
  assert.equal(isValidParentheses("())"), false);
  assert.equal(isValidParentheses("(([()]))"), true);
  assert.equal(isValidParentheses("a(b(c[d(e)f]g)1)23"), true);
  assert.equal(isValidParentheses("(([())])"), true);
});

it("isValidBrackets", () => {
  assert.equal(isValidBrackets("))((()"), false);
  assert.equal(isValidBrackets("()"), true);
  assert.equal(isValidBrackets("()[]"), true);
  assert.equal(isValidBrackets("(){}"), true);
  assert.equal(isValidBrackets("(){}[]"), true);
  assert.equal(isValidBrackets("(){}["), false);
  assert.equal(isValidBrackets("(){}]"), false);
  assert.equal(isValidBrackets("(([()]))"), true);
  assert.equal(isValidBrackets("a(b(c[d(e)f]g)1)23"), true);
  assert.equal(isValidBrackets("(([())])"), false);
});
