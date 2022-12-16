const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;

//data user
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

//data photo
const generatedIdPhoto = uuidv4();
const defaultPhoto = {
  id: generatedIdPhoto,
  title: "Photo Testing",
  caption: "Default Photo caption",
  poster_image_url: "http://image.com/testing.png",
  UserId: generatedId,
  createdAt: new Date(),
  updatedAt: new Date(),
};

//data comment
const generatedIdComment = uuidv4();
const dataComment = {
  id: generatedIdComment,
  UserId: generatedId,
  PhotoId: generatedIdPhoto,
  comment: "Interesting",
  createdAt: new Date(),
  updatedAt: new Date(),
};
const idComment2 = uuidv4();
const dataComment2 = {
  id: idComment2,
  UserId: generatedId,
  PhotoId: generatedIdPhoto,
  comment: "Comment 2",
  createdAt: new Date(),
  updatedAt: new Date(),
};
const idComment3 = uuidv4();
const dataComment3 = {
  id: idComment3,
  UserId: generatedId,
  PhotoId: generatedIdPhoto,
  comment: "Comment 3",
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
    await queryInterface.bulkDelete("Photos", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    await queryInterface.bulkDelete("Comments", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    const hashedUser = { ...user };
    hashedUser.password = bcrypt.hashSync(user.password, 10);
    await queryInterface.bulkInsert("Users", [hashedUser]);
    await queryInterface.bulkInsert("Photos", [defaultPhoto]);
    await queryInterface.bulkInsert("Comments", [
      dataComment,
      dataComment2,
      dataComment3,
    ]);
  } catch (err) {
    console.log(err);
  }
});
const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_TOKEN
);

afterAll(() => {
  sequelize.close();
});

describe("GET /comments", () => {
  test("Should return HTTP status 200 OK when comment is valid (1)", async () => {
    const { body } = await request(app)
      .get("/comments")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.comment[0]).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      comment: "Interesting",
      PhotoId: expect.any(String),
      User: expect.any(Object),
      Photo: expect.any(Object),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
  test("Should return HTTP status 200 OK when comment is valid (2)", async () => {
    const { body } = await request(app)
      .get("/comments")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.comment[1]).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      comment: "Comment 2",
      PhotoId: expect.any(String),
      User: expect.any(Object),
      Photo: expect.any(Object),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Should return HTTP status 200 OK when comment is valid (3)", async () => {
    const { body } = await request(app)
      .get("/comments")
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.data.comment[2]).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      comment: "Comment 3",
      PhotoId: expect.any(String),
      User: expect.any(Object),
      Photo: expect.any(Object),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Should return HTTP status 400 Unauthorized when token is not provided", async () => {
    const { body } = await request(app)
      .get("/comments")

      .expect(401);
    expect(body.message).toMatch(/Invalid token/i);
  });

  test("Should return HTTP status 400 Unauthorized when token is not provided", async () => {
    const { body } = await request(app)
      .get("/comments")
      .set("x-access-token", `Beadd ${token}`)
      .expect(401);
    expect(body.message).toMatch(/Invalid type of token/i);
  });
});

describe("POST /comments", () => {
  test("should return HTTP status 201 Created when data is successfully inserted", async () => {
    const { body } = await request(app)
      .post("/comments")
      .set("x-access-token", `Bearer ${token}`)
      .send({
        comment: "Ini komentar",
        PhotoId: generatedIdPhoto,
      })
      .expect(201);

    expect(body.data.comment).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      comment: "Ini komentar",
      PhotoId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("should return HTTP status 201 Created when data is successfully inserted (2)", async () => {
    const { body } = await request(app)
      .post("/comments")
      .set("x-access-token", `Bearer ${token}`)
      .send({
        comment: "Ini komentar kedua",
        PhotoId: generatedIdPhoto,
      })
      .expect(201);

    expect(body.data.comment).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      comment: "Ini komentar kedua",
      PhotoId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("should return HTTP status 201 Created when data is successfully inserted (3)", async () => {
    const { body } = await request(app)
      .post("/comments")
      .set("x-access-token", `Bearer ${token}`)
      .send({
        comment: "Ini komentar ketiga",
        PhotoId: generatedIdPhoto,
      })
      .expect(201);

    expect(body.data.comment).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      comment: "Ini komentar ketiga",
      PhotoId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Should return HTTP status 401 Unauthorized when token is not provided", async () => {
    const { body } = await request(app)
      .post("/comments")
      .send({
        comment: "test",
        PhotoId: generatedIdPhoto,
      })

      .expect(401);
    expect(body.message).toMatch(/Invalid token/i);
  });

  test("Should return HTTP status 400 Bad request when comment property is not provided", async () => {
    const { body } = await request(app)
      .post("/comments")
      .set("x-access-token", `Bearer ${token}`)
      .send({
        PhotoId: generatedIdPhoto,
      })

      .expect(400);
  });
});

describe("PUT /comments", () => {
  test("Should return http status code 200 OK when data successfully updated", async () => {
    const { body } = await request(app)
      .put(`/comments/${idComment2}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        comment: "komentar keubah",
      })
      .expect(200);
    expect(body.data.comment).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      PhotoId: expect.any(String),
      comment: "komentar keubah",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
  test("Should return http status code 200 OK when data successfully updated (2)", async () => {
    const { body } = await request(app)
      .put(`/comments/${idComment3}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        comment: "komentar keubah tapi id nya beda",
      })
      .expect(200);
    expect(body.data.comment).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      PhotoId: expect.any(String),
      comment: "komentar keubah tapi id nya beda",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
  test("Should return http status code 200 OK when data successfully updated (3)", async () => {
    const { body } = await request(app)
      .put(`/comments/${generatedIdComment}`)
      .set("x-access-token", `Bearer ${token}`)
      .send({
        comment: "ini juga id pada parameternya beda",
      })
      .expect(200);
    expect(body.data.comment).toEqual({
      id: expect.any(String),
      UserId: expect.any(String),
      PhotoId: expect.any(String),
      comment: "ini juga id pada parameternya beda",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
  test("Should return http status code 401 Unauthorized when token is not provided", async () => {
    const { body } = await request(app)
      .put(`/comments/${generatedIdComment}`)

      .send({
        comment: "komentar gagal karena gak ada JWT",
      })
      .expect(401);
    expect(body.message).toMatch(/Invalid Token/i);
  });
  test("Should return http status code 200 OK when data successfully updated (3)", async () => {
    const { body } = await request(app)
      .put(`/comments/${generatedIdComment}`)
      .set("x-access-token", `Bearer ${token}`)

      .expect(400);
    expect(body.message).toEqual("Payload cannot be null");
  });
});

describe("DELETE /comments", () => {
  test("Should return 200 OK when data successfully deleted", async () => {
    const { body } = await request(app)
      .delete(`/comments/${idComment2}`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);

    expect(body.message).toEqual("Data has been deleted successfully");
  });
  test("Should return 200 OK when data successfully deleted (2)", async () => {
    const { body } = await request(app)
      .delete(`/comments/${idComment3}`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);
    expect(body.message).toEqual("Data has been deleted successfully");
  });

  test("Should return 200 OK when data successfully deleted (3)", async () => {
    const { body } = await request(app)
      .delete(`/comments/${generatedIdComment}`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(200);
    expect(body.message).toEqual("Data has been deleted successfully");
  });

  test("Should return 401 Unauthorized when token is not provided", async () => {
    const { body } = await request(app)
      .delete(`/comments/${idComment3}`)

      .expect(401);
    expect(body.message).toMatch(/Invalid Token/i);
  });

  test("Should return 404 Not Found when ID parameter is invalid ", async () => {
    const { body } = await request(app)
      .delete(`/comments/icikiwirr`)
      .set("x-access-token", `Bearer ${token}`)
      .expect(404);
    expect(body.message).toMatch(/not valid/i);
  });
});
