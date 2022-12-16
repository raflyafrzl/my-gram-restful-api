const request = require("supertest");
const app = require("./../app");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;

let generatedId = uuidv4();
let generatedIdSosmed = uuidv4();

const user = {
  id: generatedId,
  full_name: "sukab",
  email: "sukab@gmail.com",
  username: "sukab",
  password: "12345",
  profile_image_url: "https://social_media.jpg",
  age: 21,
  phone_number: "0847573947",
  createdAt: new Date(),
  updatedAt: new Date(),
};
let token = "";

const social_media = {
  id: generatedIdSosmed,
  name: "aku",
  social_media_url: "https://instagram.com/sosmedku",
  UserId: generatedId,
  createdAt: new Date(),
  updatedAt: new Date(),
};

generatedIdSosmed = uuidv4();
const social_media1 = {
  id: generatedIdSosmed,
  name: "aku1",
  social_media_url: "https://instagram.com/sosmedku1",
  UserId: generatedId,
  createdAt: new Date(),
  updatedAt: new Date(),
};

generatedIdSosmed = uuidv4();
const social_media2 = {
  id: generatedIdSosmed,
  name: "aku2",
  social_media_url: "https://instagram.com/sosmedku2",
  UserId: generatedId,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  try {
    await queryInterface.bulkDelete("Social_Media", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    const hashedUser = { ...user };
    hashedUser.password = bcrypt.hashSync(user.password, 10);

    await queryInterface.bulkInsert("Users", [hashedUser]);
    await queryInterface.bulkInsert("Social_Media", [
      social_media,
      social_media1,
      social_media2,
    ]);
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  sequelize.close();
});

token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_TOKEN);
describe("POST /socialmedias", () => {
  // SUCSESS
  test("HTTP status code 201 (create social media success 1)", async () => {
    const { body } = await request(app)
      .post("/socialmedias")
      .send({
        id: generatedId,
        name: "tingky",
        social_media_url: "https://instagram.com/sosmedkutingky",
        UserId: generatedId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(201);
  });

  test("HTTP status code 201 (create social media success 2)", async () => {
    const { body } = await request(app)
      .post("/socialmedias")
      .send({
        id: generatedId,
        name: "wingky",
        social_media_url: "https://instagram.com/sosmedkuwingky",
        UserId: generatedId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(201);
  });

  test("HTTP status code 201 (create social media success 3)", async () => {
    const { body } = await request(app)
      .post("/socialmedias")
      .send({
        id: generatedId,
        name: "dipsy",
        social_media_url: "https://instagram.com/sosmedkudipsy",
        UserId: generatedId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(201);
  });

  test("HTTP status code 201 (create social media success 4)", async () => {
    const { body } = await request(app)
      .post("/socialmedias")
      .send({
        id: generatedId,
        name: "lala",
        social_media_url: "https://instagram.com/sosmedkulala",
        UserId: generatedId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(201);
  });
  test("should return http status code 401 when token has invalid 'Bearer' word ", async () => {
    const { body } = await request(app)
      .post("/socialmedias")
      .send({
        id: generatedId,
        name: "lala",
        social_media_url: "https://instagram.com/sosmedkulala",
        UserId: generatedId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("x-access-token", `berarr ${token}`)
      .expect(401);

    expect(body).toEqual({
      status: "fail",
      message: "Invalid type of token",
    });
  });

  test("Should return  HTTP status code 400(Bad request) because field is nothing", async () => {
    const { body } = await request(app)
      .post("/socialmedias")
      .send({
        name: "",
        social_media_url: "",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(400);
    expect(body.message).toMatch(/cannot be empty/i);
  });
});

describe("GET /socialmedias", () => {
  // SUCCESS
  test("HTTP status code 200 get social media 1", async () => {
    const { body } = await request(app)
      .get("/socialmedias")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.social_media).toEqual(expect.any(Array));
  });

  test("HTTP status code 200 get social media 2", async () => {
    const { body } = await request(app)
      .get("/socialmedias")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.social_media[1]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      social_media_url: expect.any(String),
      UserId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      User: expect.any(Object),
    });
  });
  test("HTTP status code 200 get social media 3", async () => {
    const { body } = await request(app)
      .get("/socialmedias")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.social_media[2]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      social_media_url: expect.any(String),
      UserId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      User: expect.any(Object),
    });
  });

  // // ERROR
  test("should return http status code 401 when token has invalid 'Bearer' word ", async () => {
    const { body } = await request(app)
      .get("/socialmedias")
      .set("x-access-token", `berarr ${token}`)
      .expect(401);

    expect(body).toEqual({
      status: "fail",
      message: "Invalid type of token",
    });
  });

  test("HTTP status code 401 Unauthorized because no token provided ", async () => {
    const { body } = await request(app).get("/socialmedias").expect(401);
    expect(body.message).toMatch(/Invalid token/i);
  });
});

describe("PUT /socialmedias/:sosId", () => {
  // SUCCESS
  test("Should return HTTP status code 200 when socialmedias is updated 1", async () => {
    const { body } = await request(app)
      .put(`/socialmedias/${generatedIdSosmed}`)
      .send({
        name: "Muhammad Ali",
        social_media_url: "https://instagram.com/muhammadali",
      })
      .set("x-access-token", `Bearer ${token}`)

      .expect(200);

    expect(body.data.social_media).toEqual({
      id: generatedIdSosmed,
      name: "Muhammad Ali",
      social_media_url: "https://instagram.com/muhammadali",
      UserId: generatedId,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Should return HTTP status code 200 when socialmedias is updated 2", async () => {
    const { body } = await request(app)
      .put(`/socialmedias/${generatedIdSosmed}`)
      .send({
        name: "Muhammad Beckham",
        social_media_url: "https://instagram.com/muhammadbeckham",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.social_media).toEqual({
      id: generatedIdSosmed,
      name: "Muhammad Beckham",
      social_media_url: "https://instagram.com/muhammadbeckham",
      UserId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  // ERROR
  test("Should return HTTP status code 401 when token is invalid", async () => {
    const { body } = await request(app)
      .put(`/socialmedias/${generatedIdSosmed}`)
      .send({
        name: "yuhuu",
      })
      .set("x-access-token", `Bearer invalidToken`)
      .expect(401);
    expect(body.message).toMatch(/jwt malformed/i);
  });

  test("Should return HTTP status code 401 when no token provided", async () => {
    const { body } = await request(app)
      .put(`/socialmedias/${generatedIdSosmed}`)
      .send({
        name: "yuhuu",
      })
      .expect(401);
    expect(body.message).toMatch(/Invalid token/i);
  });
  test("Should return HTTP status code 400 ID is not valid", async () => {
    const invalidID = "icikiwir";
    const { body } = await request(app)
      .put(`/socialmedias/${invalidID}`)
      .send({
        name: "bagus",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(404);

    expect(body.message).toEqual(
      `ID(${invalidID}) is not valid. please check again`
    );
  });
});

describe("DELETE /socialmedias/sosId", () => {
  // SUCCESS
  test("should return http status code 200 when data is successfully deleted", async () => {
    const { body } = await request(app)
      .delete(`/socialmedias/${generatedIdSosmed}`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);
    expect(body).toEqual({
      status: "success",
      message: "Your social media has been successfully deleted",
    });
  });

  test("should return http status code 404 when user input invalid ID", async () => {
    const { body } = await request(app)
      .delete(`/socialmedias/${generatedIdSosmed}`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(404);
    expect(body.message).toEqual(expect.any(String));
  });

  // // ERROR
  test("Should return http status 401 when no token provided", async () => {
    const { body } = await request(app)
      .delete(`/socialmedias/${generatedIdSosmed}`)
      .expect(401);
    expect(body).toEqual({
      status: "fail",
      message: "Invalid Token. Please check the token again",
    });
  });

  test("Should return HTTP status code 401 when token is invalid", async () => {
    const { body } = await request(app)
      .delete(`/socialmedias/${generatedIdSosmed}`)
      .set("x-access-token", `Bearer invalidToken`)
      .expect(401);
    expect(body).toEqual({
      status: "fail",
      message: "jwt malformed",
    });
  });
});
