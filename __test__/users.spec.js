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
const generatedId2 = uuidv4();
const user2 = {
  id: generatedId2,
  full_name: "fulanganteng",
  username: "fulanfulani",
  profile_image_url: "http://fulankece.com/user/fulankece.png",
  age: 21,
  phone_number: "+6282391238128",
  email: "fulanicikiwir@gmail.com",
  password: "icikiwir123",
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
    const hashedUser2 = { ...user2 };
    hashedUser.password = bcrypt.hashSync(user.password, 10);
    hashedUser2.password = bcrypt.hashSync(user2.password, 10);
    await queryInterface.bulkInsert("Users", [hashedUser, hashedUser2]);
  } catch (err) {
    console.log(err);
  }
});
const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_TOKEN
);
const token2 = jwt.sign(
  { id: user2.id, email: user2.email },
  process.env.JWT_TOKEN
);

afterAll(async () => {
  sequelize.close();
});

//NEW TEST
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

//NEW TEST
describe("PUT /users/userId", () => {
  test("should return http status code 400 Bad Request when usename is an empty string", async () => {
    const { body } = await request(app)
      .put(`/users/${generatedId}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        full_name: "raflyafrzl",
        username: "",
        profile_image_url: "http://testi.com/user/rafly.png",
        age: 21,
        phone_number: "+6283804178392",
        email: "comfo@gmail.com",
      })

      .expect(400);
    expect(body).toEqual({
      status: "fail",
      message: expect.any(String),
    });
  });

  test("should return http status code 400 Bad Request when URL is invalid", async () => {
    const { body } = await request(app)
      .put(`/users/${generatedId}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        full_name: "raflyafrzl",
        username: "rafly",
        profile_image_url: "httpzzz://testi.com/user/rafly.png",
        age: 21,
        phone_number: "+6283804178392",
        email: "comfo@gmail.com",
      })

      .expect(400);
    expect(body.message).toMatch(/Url is not valid/i);
  });

  test("should return http status code 401 Unauthorized when no token provided", async () => {
    const { body } = await request(app)
      .put(`/users/${generatedId}`)
      .send({
        full_name: "raflyafrzl",
        username: "rafly",
        profile_image_url: "http://testi.com/user/rafly.png",
        age: 21,
        phone_number: "+6283804178392",
        email: "comfo@gmail.com",
      })

      .expect(401);
    expect(body).toEqual({
      status: "fail",
      message: "Invalid Token. Please check the token again",
    });
  });

  test("should return http status code 200 OK when data is valid", async () => {
    const { body } = await request(app)
      .put(`/users/${user.id}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        email: "comfo1@gmail.com",
        full_name: "fathur",
        username: "fathurkeren",
        profile_image_url: "http://localhebat.com/test.png",
        age: 20,
        phone_number: "+6281398396748",
      })
      .expect(200);
    expect(body.data.user).toEqual({
      full_name: "fathur",
      email: "comfo1@gmail.com",
      username: "fathurkeren",
      profile_image_url: "http://localhebat.com/test.png",
      age: 20,
      phone_number: "+6281398396748",
    });
  });

  test("should return http status code 200 OK when data is valid", async () => {
    const { body } = await request(app)
      .put(`/users/${user.id}`)

      .send({
        email: "comfo1@gmail.com",
        full_name: "raflyafrizalll",
        username: "raflyaff",
        profile_image_url: "http://localhebat.com/test.png",
        age: 20,
        phone_number: "+6283804178392",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);
    expect(body.data.user).toEqual({
      full_name: "raflyafrizalll",
      email: "comfo1@gmail.com",
      username: "raflyaff",
      profile_image_url: "http://localhebat.com/test.png",
      age: 20,
      phone_number: "+6283804178392",
    });
  });
});

describe("PUT /user/deleteID", () => {
  test("Should return HTTP Status 200 OK when data is successfully updated", async () => {
    const { body } = await request(app)
      .put(`/users/${generatedId2}`)
      .set("x-access-token", `Bearer ${token2}`)
      .send({
        email: "hebat2@gmail.com",
        full_name: "hebat2banget",
        username: "hebati2cikiwir",
        profile_image_url: "http://icikiwir2.com/hebat.jpg",
        age: 23,
        phone_number: "+628324551234",
      });
    expect(200);
    expect(body.data.user).toEqual({
      full_name: "hebat2banget",
      email: "hebat2@gmail.com",
      username: "hebati2cikiwir",
      profile_image_url: "http://icikiwir2.com/hebat.jpg",
      age: 23,
      phone_number: "+628324551234",
    });
  });

  test("Should return HTTP Status 400 Bad Request when Email is invalid", async () => {
    const { body } = await request(app)
      .put(`/users/${generatedId}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        email: "hebatcom",
        full_name: "hebatbanget",
        username: "hebaticikiwir",
        profile_image_url: "icikiwr",
        age: 23,
        phone_number: "+62838041234",
      });
    expect(400);
    expect(body.message).toMatch(/Email address is not valid/i);
  });

  test("Should return HTTP Status 400 Bad Request when URL is invalid", async () => {
    const { body } = await request(app)
      .put(`/users/${generatedId}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        email: "hebat@gmail.com",
        full_name: "hebatbanget",
        username: "hebaticikiwir",
        profile_image_url: "icikiwr",
        age: 23,
        phone_number: "+62838041234",
      });
    expect(400);
    expect(body.message).toMatch(/Url is not valid/i);
  });

  test("Should return HTTP Status 200 OK when data is updated", async () => {
    const { body } = await request(app)
      .put(`/users/${generatedId}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        email: "hebat@gmail.com",
        full_name: "hebatbanget",
        username: "hebaticikiwir",
        profile_image_url: "http://hebatbanget.com/test.png",
        age: 23,
        phone_number: "+62838041234",
      })

      .expect(200);
    expect(body.data.user).toEqual({
      full_name: "hebatbanget",
      email: "hebat@gmail.com",
      username: "hebaticikiwir",
      profile_image_url: "http://hebatbanget.com/test.png",
      age: 23,
      phone_number: "+62838041234",
    });
  });
  test("Should return HTTP Status 401 Unauthorized when no token provided", async () => {
    const { body } = await request(app)
      .put(`/users/${generatedId}`)

      .send({
        email: "hebat@gmail.com",
        full_name: "hebatbanget",
        username: "hebaticikiwir",
        profile_image_url: "http://hebatbanget.com/test.png",
        age: 23,
        phone_number: "+62838041234",
      })

      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });
});

describe("DELETE /users/userId", () => {
  test("Should return 200 OK when data is successfully deleted", async () => {
    const { body } = await request(app)
      .delete(`/users/${generatedId}`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.message).toMatch(/deleted/i);
  });

  test("Should return 401 Unauthorized when no token provided", async () => {
    const { body } = await request(app)
      .delete(`/users/${generatedId}`)
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test("Should return 400 Bad Request when user give invalid parameter", async () => {
    const { body } = await request(app)
      .delete(`/users/invalidID`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(400);
    expect(body.message).toMatch(/invalid data/i);

    // expect(body.message).toMatch(/deleted/i);
  });

  test("Should return 200 OK When data is successfully deleted", async () => {
    const { body } = await request(app)
      .delete(`/users/${generatedId2}`)
      .set("x-access-token", `Bearer ${token2}`)
      .expect(200);
    expect(body.message).toMatch(/deleted/i);
  });
  test("Should return 401 Unauthorized when user has invalid type of token", async () => {
    const { body } = await request(app)
      .delete(`/users/${generatedId}`)
      .set("x-access-token", `Brzzz ${token}`)
      .expect(401);

    expect(body.message).toEqual("Invalid type of token");
  });
});
