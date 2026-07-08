const { test, expect } = require("@playwright/test");
const path = require("path");

const url = "file://" + path.resolve(__dirname, "../index.html");

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("ajouter un item", async ({ page }) => {
  await page.fill("#itemName", "Courses");
  await page.click(".add-btn");
  await expect(page.locator("#list li")).toHaveCount(1);
  await expect(page.locator("#list li span")).toHaveText("Courses");
});

test("supprimer un item", async ({ page }) => {
  await page.fill("#itemName", "Courses");
  await page.click(".add-btn");
  await page.click(".delete-btn");
  await expect(page.locator("#list li")).toHaveCount(0);
});

test("ajouter plusieurs items", async ({ page }) => {
  await page.fill("#itemName", "Item 1");
  await page.click(".add-btn");
  await page.fill("#itemName", "Item 2");
  await page.click(".add-btn");
  await expect(page.locator("#list li")).toHaveCount(2);
});

test("nom vide affiche une erreur", async ({ page }) => {
  await page.click(".add-btn");
  await expect(page.locator("#error")).toHaveText("Le nom ne peut pas être vide");
  await expect(page.locator("#list li")).toHaveCount(0);
});

test("nom en double affiche une erreur", async ({ page }) => {
  await page.fill("#itemName", "Courses");
  await page.click(".add-btn");
  await page.fill("#itemName", "Courses");
  await page.click(".add-btn");
  await expect(page.locator("#error")).toHaveText("Un item avec ce nom existe déjà");
  await expect(page.locator("#list li")).toHaveCount(1);
});