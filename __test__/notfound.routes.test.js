const request = require("supertest");
const app = require("./../app");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

describe("GET /invalidroutepath", () => {
  test("Shoud return 404 when no route is found", async () => {
    const { body } = await request(app).get("/lahbocahngapaya").expect(404);
    expect(body).toEqual({
      status: "fail",
      message: "Route not found",
    });
  });
});
