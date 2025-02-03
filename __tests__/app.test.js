const request = require('supertest');
const app = require('../app'); // Đường dẫn đến file app.js của bạn

describe("Todo API", () => {
    it("should return 200 for GET /todos", async () => {
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
    });
});