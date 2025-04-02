import { describe, it } from "node:test";
import assert from "node:assert";

class MinStack<TValue> {
  private stack: TValue[] = [];
  private minStack: TValue[] = [];

  push(value: TValue): void {
    this.stack.push(value);

    const min = this.minStack.at(-1);

    if (!min || value <= min) {
      this.minStack.push(value);
    }
  }

  pop(): TValue | null {
    const value = this.stack.pop();

    if (!value) {
      return null;
    }

    const min = this.minStack.at(-1);

    if (min === value) {
      this.minStack.pop();
    }

    return value;
  }

  min(): TValue | null {
    return this.minStack.at(-1) || null;
  }
}

describe("MinStack", () => {
  it("should push elements and return correct min", () => {
    const stack = new MinStack();
    stack.push(3);
    stack.push(2);
    stack.push(5);

    assert.strictEqual(stack.min(), 2);
  });

  it("should handle pop and update min correctly", () => {
    const stack = new MinStack();
    stack.push(3);
    stack.push(2);
    stack.push(5);
    stack.pop();

    assert.strictEqual(stack.min(), 2);
  });

  it("should return null when popping empty stack", () => {
    const stack = new MinStack();
    assert.strictEqual(stack.pop(), null);
  });

  it("should return null for min on empty stack", () => {
    const stack = new MinStack();
    assert.strictEqual(stack.min(), null);
  });

  it("should handle duplicate minima correctly", () => {
    const stack = new MinStack();
    stack.push(2);
    stack.push(2);
    stack.push(3);
    stack.pop();

    assert.strictEqual(stack.min(), 2);
    stack.pop();
    assert.strictEqual(stack.min(), 2);
  });

  it("should handle negative numbers", () => {
    const stack = new MinStack();
    stack.push(-1);
    stack.push(0);
    stack.push(-2);

    assert.strictEqual(stack.min(), -2);
    stack.pop();
    assert.strictEqual(stack.min(), -1);
  });
});
