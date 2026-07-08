class Calculatrice {
  add(a, b) {
    return a + b;
  }

  sub(a, b) {
    return a - b;
  }

  mul(a, b) {
    return a * b;
  }

  div(a, b) {
    if (b === 0) throw new Error("Division par zéro");
    return a / b;
  }

  avg(tab) {
    if (tab.length === 0) throw new Error("Tableau vide");
    return tab.reduce((acc, val) => acc + val, 0) / tab.length;
  }
}

module.exports = Calculatrice;