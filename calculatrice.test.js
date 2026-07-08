const Calculatrice = require("./calculatrice");

const calc = new Calculatrice();

describe("Calculatrice", () => {
  test("add(2, 3) retourne 5", () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test("sub(10, 4) retourne 6", () => {
    expect(calc.sub(10, 4)).toBe(6);
  });

  test("mul(3, 4) retourne 12", () => {
    expect(calc.mul(3, 4)).toBe(12);
  });

  test("div(10, 2) retourne 5", () => {
    expect(calc.div(10, 2)).toBe(5);
  });

  test("div par zéro lance une erreur", () => {
    expect(() => calc.div(5, 0)).toThrow("Division par zéro");
  });

  test("avg([1, 2, 3, 4]) retourne 2.5", () => {
    expect(calc.avg([1, 2, 3, 4])).toBe(2.5);
  });

  test("avg tableau vide lance une erreur", () => {
    expect(() => calc.avg([])).toThrow("Tableau vide");
  });
});