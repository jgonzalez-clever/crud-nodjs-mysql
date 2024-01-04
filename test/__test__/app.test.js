import app from '../../src/app'
import request from 'supertest'

describe("GET /", () => {
    test("respond", async () => {
        const response = await request(app).get("/").send();
        console.log(response);
    });

    test("404 no found", async () => {
        const response = await request(app).get("/asdfgh").send();
        expect(response.statusCode).toBe(404);
    });

    test("statusCode", async () => {
        const response = await request(app).get("/").send();
        expect(response.statusCode).toBe(200);
    });

    test("statusCode", async () => {
        const response = await request(app).get("/").send();
        expect(response.body).toEqual(expect.arrayContaining([]));
    });

    test("statusCode", async () => {
        const response = await request(app).get("/").send({
            name: "Steve",
            address: "Marruecos",
            phone: "123456",
        });
        expect(response.body).toEqual(expect.arrayContaining([]));
    });

});

