export default class Calculator {
  constructor() {
    this.current = "";
    this.history = [];
  }

  append(value) {
    // prevent multiple decimals in same number
    const parts = this.current.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];

    if (value === "." && lastPart.includes(".")) {
      return;
    }

    this.current += value;
  }

  clear() {
    this.current = "";
  }

  calculate() {
    try {
      const tokens = this.current.match(/\d+\.?\d*|[+\-*/]/g);
      // handle * and /
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === "*" || tokens[i] === "/") {
          const left = Number(tokens[i - 1]);
          const right = Number(tokens[i + 1]);

          let result;

          if (tokens[i] === "*") {
            result = left * right;
          } else {
            if (right === 0) {
              throw new Error("Divide by zero");
            }

            result = left / right;
          }

          tokens.splice(i - 1, 3, result.toString());

          i--;
        }
      }

      // handle + and -
      let result = Number(tokens[0]);

      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const value = Number(tokens[i + 1]);

        if (operator === "+") {
          result += value;
        } else {
          result -= value;
        }
      }
      result = Number(result.toFixed(12));
      this.history = [...this.history, `${this.current}=${result}`];
      this.current = result;
      return result;
    } catch (error) {
      this.history = [...this.history, `${this.current}=Error`];
      this.current = "Error";
      return "Error";
    }
  }

  getDisplay() {
    return this.current;
  }

  getHistory() {
    return this.history;
  }
}
