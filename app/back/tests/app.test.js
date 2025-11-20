const request = require("supertest");
const app = require("../index"); // ton Express app

describe("API health", () => {
  it("should return status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });
});
