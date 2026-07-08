const TodoList = require("./todolist");
const User = require("./user");

const validUser = new User("test@gmail.com", "Dupont", "Jean", "2000-01-01");

const makeItem = (name, minutesOffset = 0) => ({
    name,
    content: "Contenu de l'item",
    createdAt: new Date(Date.now() + minutesOffset * 60 * 1000),
});

const makeEmailSender = () => ({ sendEmail: jest.fn() });

describe("TodoList", () => {
    test("ajouter un item valide", () => {
        const list = new TodoList(validUser, makeEmailSender());
        jest.spyOn(list, "save").mockImplementation(() => {});
        const item = makeItem("item1");
        list.add(item);
        expect(list.items).toHaveLength(1);
    });

    test("utilisateur invalide ne peut pas ajouter", () => {
        const invalidUser = new User("", "Dupont", "Jean", "2000-01-01");
        const list = new TodoList(invalidUser, makeEmailSender());
        jest.spyOn(list, "save").mockImplementation(() => {});
        expect(() => list.add(makeItem("item1"))).toThrow("Utilisateur invalide");
    });

    test("impossible d'ajouter plus de 10 items", () => {
        const list = new TodoList(validUser, makeEmailSender());
        jest.spyOn(list, "save").mockImplementation(() => {});
        for (let i = 0; i < 10; i++) {
            list.add(makeItem(`item${i}`, i * 31));
        }
        expect(() => list.add(makeItem("item10", 10 * 31))).toThrow("La ToDoList est pleine");
    });

    test("impossible d'ajouter deux items avec le même nom", () => {
        const list = new TodoList(validUser, makeEmailSender());
        jest.spyOn(list, "save").mockImplementation(() => {});
        list.add(makeItem("item1", 0));
        expect(() => list.add(makeItem("item1", 31))).toThrow("Un item avec ce nom existe déjà");
    });

    test("délai de 30 min non respecté", () => {
        const list = new TodoList(validUser, makeEmailSender());
        jest.spyOn(list, "save").mockImplementation(() => {});
        list.add(makeItem("item1", 0));
        expect(() => list.add(makeItem("item2", 10))).toThrow("Vous devez attendre 30 minutes");
    });

    test("délai de 30 min respecté", () => {
        const list = new TodoList(validUser, makeEmailSender());
        jest.spyOn(list, "save").mockImplementation(() => {});
        list.add(makeItem("item1", 0));
        expect(() => list.add(makeItem("item2", 31))).not.toThrow();
    });

    test("email envoyé au 8ème item avec les bons arguments", () => {
        const emailSender = makeEmailSender();
        const list = new TodoList(validUser, emailSender);
        jest.spyOn(list, "save").mockImplementation(() => {});
        for (let i = 0; i < 8; i++) {
            list.add(makeItem(`item${i}`, i * 31));
        }
        expect(emailSender.sendEmail).toHaveBeenCalledTimes(1);
        expect(emailSender.sendEmail).toHaveBeenCalledWith(
            validUser.email,
            "Votre ToDoList est presque remplie",
            expect.any(String)
        );
    });

    test("email non envoyé avant le 8ème item", () => {
        const emailSender = makeEmailSender();
        const list = new TodoList(validUser, emailSender);
        jest.spyOn(list, "save").mockImplementation(() => {});
        for (let i = 0; i < 7; i++) {
            list.add(makeItem(`item${i}`, i * 31));
        }
        expect(emailSender.sendEmail).not.toHaveBeenCalled();
    });

    test("save est appelée lors de l'ajout d'un item", () => {
        const list = new TodoList(validUser, makeEmailSender());
        const saveMock = jest.spyOn(list, "save").mockImplementation(() => {});
        const item = makeItem("item1");
        list.add(item);
        expect(saveMock).toHaveBeenCalledWith(item);
    });

    test("save lève une exception par défaut", () => {
        const list = new TodoList(validUser, makeEmailSender());
        expect(() => list.save(makeItem("item1"))).toThrow();
    });
});