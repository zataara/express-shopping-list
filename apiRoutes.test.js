process.env.NODE_ENV = "test";
const request = require("supertest");
const Item = require("./item")
const app = require("./app");
let items = require("./fakeDb");
const { ExpectationFailed } = require("http-errors");

let strawberries = new Item('strawberries', 7.75);

beforeEach(function() {
    items.push(strawberries);
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({...items})
    });
});

describe("GET /items/:name", () => {
    test("get a single item by name", async () => {
        const res = await request(app).get(`/items/${strawberries.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: strawberries})
    });
    test("return a status code of 404 for an item that does not exist", async () => {
        const res = await request(app).get(`/items/acfeqadfhg`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({error: "Item not found"})
    });
});

describe("POST /items", () => {
    test("Creating a new item", async () => {
        const res = await request(app).post("/items").send({
            name: "blackberries", price: 9.50
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({item: {name: "blackberries", price: 9.50}});
    });
    test("Responds with a 400 if name is missing", async () => {
        const res = await request(app).post("/items").send({});
        expect(res.statusCode).toBe(400);
    });
});

describe("PATCH /items/:name", () => {
    test("Updating an item", async () => {
        const res = await request(app).patch(`/items/${strawberries.name}`).send({name: "rasberries", price: 8.85});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: {name: "rasberries", price: 8.85}});
    });
    test("Responds with 404 for invalid name", async () => {
        const res = await request(app).patch('/items/adsfasdf').send({name: "aardvark", price: 10})
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete(`/items/${strawberries.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Item Deleted'})
    });
    test("Responds with 404 for deleting an invalid item", async () => {
        const res = await request(app).delete("/items/asdfasdf");
        expect(res.statusCode).toBe(404);
    });
});
