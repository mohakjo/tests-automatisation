class User {
  constructor(email, nom, prenom, dateNaissance) {
    this.email = email;
    this.nom = nom;
    this.prenom = prenom;
    this.dateNaissance = dateNaissance;
  }

  isValid() {
    if (!this.email || !this.nom || !this.prenom) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) return false;

    const age = new Date().getFullYear() - new Date(this.dateNaissance).getFullYear();
    if (age < 13) return false;

    return true;
  }
}

module.exports = User;