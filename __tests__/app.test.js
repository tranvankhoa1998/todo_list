const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'mysecret';
const token = jwt.sign({ id: 1, role: "admin" }, SECRET_KEY, { expiresIn: "1h" });

describe("Todo API", () => {
    it("should return 200 for GET /todos", async () => {
        const res = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
        });
    });