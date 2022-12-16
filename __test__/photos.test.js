const request = require("supertest");
const app = require("./../app");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let generatedId = uuidv4();
let generatedIdPhoto = uuidv4();

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
let token = "";

const defaultPhoto = {
  id: generatedIdPhoto,
  title: "Photo Testing",
  caption: "Default Photo caption",
  poster_image_url: "http://image.com/testing.png",
  UserId: generatedId,
  createdAt: new Date(),
  updatedAt: new Date(),
};
generatedIdPhoto = uuidv4();
const defaultPhoto2 = {
  id: generatedIdPhoto,
  title: "Photo Testing2",
  caption: "Default Photo caption2",
  poster_image_url: "http://image.com/testing.png",
  UserId: generatedId,
  createdAt: new Date(),
  updatedAt: new Date(),
};
generatedIdPhoto = uuidv4();
const defaultPhoto3 = {
  id: generatedIdPhoto,
  title: "Photo Testing3",
  caption: "Default Photo caption3",
  poster_image_url: "http://image.com/testing.png",
  UserId: generatedId,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  try {
    await queryInterface.bulkDelete("Photos", null, {
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
    await queryInterface.bulkInsert("Photos", [
      defaultPhoto,
      defaultPhoto2,
      defaultPhoto3,
    ]);
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  sequelize.close();
});
token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_TOKEN);
describe("GET /photos", () => {
  test("Should return http status code 200", async () => {
    const { body } = await request(app)
      .get("/photos")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);
    expect(body.data.photo[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      caption: expect.any(String),
      poster_image_url: expect.any(String),
      UserId: expect.any(String),
      User: expect.any(Object),
      Comments: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Should return http status 401 when no token provided", async () => {
    const { body } = await request(app).get("/photos").expect(401);
    expect(body).toEqual({
      status: "fail",
      message: "Invalid Token. Please check the token again",
    });
  });

  test("should return http status code 401 when token has invalid 'Bearer' word ", async () => {
    const { body } = await request(app)
      .get("/photos")
      .set("x-access-token", `berarr ${token}`)
      .expect(401);

    expect(body).toEqual({
      status: "fail",
      message: "Invalid type of token",
    });
  });

  test("Should return http status code 200", async () => {
    const { body } = await request(app)
      .get("/photos")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.photo[1]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      caption: expect.any(String),
      poster_image_url: expect.any(String),
      UserId: expect.any(String),
      User: expect.any(Object),
      Comments: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Should return http status code 200", async () => {
    const { body } = await request(app)
      .get("/photos")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.photo[2]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      caption: expect.any(String),
      poster_image_url: expect.any(String),
      UserId: expect.any(String),
      User: expect.any(Object),
      Comments: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

describe("POST /photos", () => {
  test("Should return  HTTP status code 201 when photo is created", async () => {
    const { body } = await request(app)
      .post("/photos")
      .send({
        title: "POST photos",
        poster_image_url: "http://localhost.com/icikiwir.png",
        caption: "caption post",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(201);
  });

  test("should return http status code 401 when token has invalid 'Bearer' word ", async () => {
    const { body } = await request(app)
      .post("/photos")
      .send({
        title: "FAILED photo",
        poster_image_url: "http://fotoasal.com/icikiwir.png",
        caption: "caption post",
      })
      .set("x-access-token", `berarr ${token}`)
      .expect(401);

    expect(body).toEqual({
      status: "fail",
      message: "Invalid type of token",
    });
  });

  test("Should return  HTTP status code 400(Bad request) when photo title is null", async () => {
    const { body } = await request(app)
      .post("/photos")
      .send({
        poster_image_url: "http://localhost.com/icikiasdasdwir.png",
        caption: "caption post",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(400);
    expect(body.message).toMatch(/cannot be null/i);
  });

  test("Should return  HTTP status code 201 when photo is created", async () => {
    const { body } = await request(app)
      .post("/photos")
      .send({
        title: "POST photos2",
        poster_image_url: "http://localhost.com/icsadasdasdikiwir.png",
        caption: "caption post",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(201);
    expect(body.data.photo).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      poster_image_url: "http://localhost.com/icsadasdasdikiwir.png",
      title: "POST photos2",
      caption: "caption post",
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });
  test("Should return  HTTP status code 201 when photo is created", async () => {
    const { body } = await request(app)
      .post("/photos")
      .send({
        title: "POST photos3",
        poster_image_url: "http://localhost.com/icikasdiwir.png",
        caption: "caption post",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(201);
  });
});

describe("PUT /photos/:photosId", () => {
  test("Should return HTTP status code 200 when photo is updated", async () => {
    const { body } = await request(app)
      .put(`/photos/${generatedIdPhoto}`)
      .send({
        title: "Lah diubah?",
        caption: "caption nya diubah",
        poster_image_url: "http://lahdiubah.com/diubah.png",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);
    expect(body.data.photo).toEqual({
      id: generatedIdPhoto,
      title: "Lah diubah?",
      caption: "caption nya diubah",
      poster_image_url: "http://lahdiubah.com/diubah.png",
      UserId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Should return HTTP status code 200 when photo is updated", async () => {
    const { body } = await request(app)
      .put(`/photos/${generatedIdPhoto}`)
      .send({
        title: "Ini success tapi beda test",
        caption: "caption nya diubah",
        poster_image_url: "http://lahdiubah.com/diubah.png",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);
    expect(body.data.photo).toEqual({
      id: generatedIdPhoto,
      title: "Ini success tapi beda test",
      caption: "caption nya diubah",
      poster_image_url: "http://lahdiubah.com/diubah.png",
      UserId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Should return HTTP status code 401 when token is invalid", async () => {
    const { body } = await request(app)
      .put(`/photos/${generatedIdPhoto}`)
      .send({
        title: "Lah diubah?",
        caption: "caption nya diubah",
        poster_image_url: "http://lahdiubah.com/diubah.png",
      })
      .set("x-access-token", `Bearer invalidToken`)
      .expect(401);
  });

  test("Should return HTTP status code 401 when no token provided", async () => {
    const { body } = await request(app)
      .put(`/photos/${generatedIdPhoto}`)
      .send({
        title: "Lah diubah?",
        caption: "caption nya diubah",
        poster_image_url: "http://lahdiubah.com/diubah.png",
      })
      .expect(401);
  });
  test("Should return HTTP status code 400 when URL is not valid", async () => {
    const { body } = await request(app)
      .put(`/photos/${generatedIdPhoto}`)
      .send({
        title: "Lah diubah?",
        caption: "caption nya diubah",
        poster_image_url: "http://lahdiubahasdasd",
      })
      .set("x-access-token", `Bearer ${token}`)
      .expect(400);
  });
});

describe("DELETE /photos", () => {
  test("should return http status code 200 when data is successfully deleted", async () => {
    const { body } = await request(app)
      .delete(`/photos/${generatedIdPhoto}`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);
    expect(body).toEqual({
      status: "success",
      message: "Your photo has been successfully deleted",
    });
  });

  test("Should return http status 401 when no token provided", async () => {
    const { body } = await request(app)
      .delete(`/photos/${generatedIdPhoto}`)
      .expect(401);
    expect(body).toEqual({
      status: "fail",
      message: "Invalid Token. Please check the token again",
    });
  });

  test("Should return http status 401 when no token provided", async () => {
    const invalidID = "asdasdasd";
    const { body } = await request(app)
      .delete(`/photos/${invalidID}`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(404);
    expect(body).toEqual({
      status: "fail",
      message: expect.any(String),
    });
  });

  test("Should return HTTP status code 401 when token is invalid", async () => {
    const { body } = await request(app)
      .delete(`/photos/${generatedIdPhoto}`)
      .set("x-access-token", `Bearer invalidToken`)
      .expect(401);
    expect(body).toEqual({
      status: "fail",
      message: "jwt malformed",
    });
  });

  test("Should return HTTP status code 401 when token is invalid", async () => {
    const { body } = await request(app)
      .delete(`/photos/${generatedIdPhoto}`)
      .set("x-access-token", `icikiwir invalidToken`)
      .expect(401);
    expect(body).toEqual({
      status: "fail",
      message: "Invalid type of token",
    });
  });
});
