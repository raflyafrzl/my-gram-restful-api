const request = require("supertest");
const app = require("./../app");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generatedId = uuidv4();
const user = {
  id: generatedId,
  full_name: "raflyafrzl",
  username: "rafly",
  profile_image_url: "http://testi.com/user/rafly.png",
  age: 21,
  phone_number: "+6283804178392",
  email: "comfo@gmail.com",
  password: "tes123",
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  try {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    const hashedUser = { ...user };
    hashedUser.password = bcrypt.hashSync(user.password, 10);

    await queryInterface.bulkInsert("Users", [hashedUser]);
  } catch (err) {
    console.log(err);
  }
});
const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_TOKEN
);

afterAll(async () => {
  sequelize.close();
});

describe("/users/login", () => {
  test("Should return http status code 404 when password is invalid", async () => {
    const { body } = await request(app)
      .post("/users/login")
      .send({ email: "comfo@gmail.com", password: "test" })
      .expect(404);
    expect(body).toEqual({
      status: "fail",
      message: "Email/Password does not match",
    });
  });

  test("Should return http status code 200 OK when data is valid", async () => {
    const { body } = await request(app)
      .post("/users/login")
      .send({ email: "comfo@gmail.com", password: "tes123" })
      .expect(200);
    expect(body).toEqual({
      status: "success",
      token: expect.any(String),
    });
  });
  test("Should return http status code 404 when password is invalid", async () => {
    const { body } = await request(app)
      .post("/users/login")
      .send({ email: "comfo11@gmail.com", password: "tes123" })
      .expect(404);
    expect(body).toEqual({
      status: "fail",
      message: "Data not found",
    });
  });
  test("Should return http status code 404 when user entered invalid email ", async () => {
    const { body } = await request(app)
      .post("/users/login")
      .send({ email: "icikiwir", password: "123" })
      .expect(404);
    expect(body).toEqual({
      status: "fail",
      message: "Data not found",
    });
  });

  test("Should return http status code 404 when user only entered email", async () => {
    const { body } = await request(app)
      .post("/users/login")
      .send({ email: "comfo11@gmail.com" })
      .expect(404);
    expect(body).toEqual({
      status: "fail",
      message: "Data not found",
    });
  });
});

describe("PUT /users/userId", () => {
  test("should return http status code 200 when data is successfully updated", async () => {
    const { body } = request(app)
      .put(`/users/${generatedId}`)
      .send({
        email: "comfo1@gmail.com",
        full_name: "raflyafrizalll",
        username: "raflyaff",
        profile_image_url: "htpp://local123.com/test.png",
        age: 20,
        phone_number: "+6283804178392",
      })
      .expect(200);
    console.log(body);
  });
});
