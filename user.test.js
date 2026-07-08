const User = require("./user");

describe("User", () => {
  test("user valide", () => {
    const u = new User("test@gmail.com", "Dupont", "Jean", "2000-01-01");
    expect(u.isValid()).toBe(true);
  });

  test("email manquant", () => {
    const u = new User("", "Dupont", "Jean", "2000-01-01");
    expect(u.isValid()).toBe(false);
  });

  test("email mauvais format", () => {
    const u = new User("pasunemail", "Dupont", "Jean", "2000-01-01");
    expect(u.isValid()).toBe(false);
  });

  test("nom manquant", () => {
    const u = new User("test@gmail.com", "", "Jean", "2000-01-01");
    expect(u.isValid()).toBe(false);
  });

  test("moins de 13 ans", () => {
    const u = new User("test@gmail.com", "Dupont", "Jean", "2015-01-01");
    expect(u.isValid()).toBe(false);
  });
});