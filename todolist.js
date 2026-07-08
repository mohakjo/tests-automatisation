const THIRTY_MINUTES = 30 * 60 * 1000;
const MAX_ITEMS = 10;

class TodoList {
    constructor(user, emailSenderService) {
        this.user = user;
        this.items = [];
        this.emailSenderService = emailSenderService;
    }

    add(item) {
        if (!this.user.isValid()) {
            throw new Error("Utilisateur invalide");
        }

        if (this.items.length >= MAX_ITEMS) {
            throw new Error("La ToDoList est pleine (maximum 10 items)");
        }

        if (this.items.find(i => i.name === item.name)) {
            throw new Error("Un item avec ce nom existe déjà");
        }

        if (this.items.length > 0) {
            const lastItem = this.items[this.items.length - 1];
            const diff = new Date(item.createdAt) - new Date(lastItem.createdAt);
            if (diff < THIRTY_MINUTES) {
                throw new Error("Vous devez attendre 30 minutes entre deux ajouts");
            }
        }

        this.items.push(item);

        if (this.items.length === 8) {
            this.emailSenderService.sendEmail(
                this.user.email,
                "Votre ToDoList est presque remplie",
                "Vous avez atteint 8 items sur 10. Il ne vous reste plus que 2 emplacements."
            );
        }

        this.save(item);
    }

    save(item) {
        throw new Error("Not implemented");
    }
}

module.exports = TodoList;