const request = require("supertest");
const app = require("../index.js");
const pkg = require("pg");

const { Client } = pkg;

const db = new Client({
  host: "db.zlvczfuzzkilcsiqdedm.supabase.co",
  user: "postgres",
  port: 5432,
  password: "YzcT1t6a3165Nz6T",
  database: "postgres",
});

db.connect();

// beforeEach(() => {
//   db.connect();
// });

// afterEach(() => {
//   db.close();
// });

function generateGuid() {
  let guid = "";
  const hexChars = "0123456789abcdef";
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    guid += hexChars[randomIndex];
    if (i === 7 || i === 11 || i === 15 || i === 19) {
      guid += "-";
    }
  }
  return guid;
}

describe("Testing", () => {
  test("Testing Jest", (done) => {
    expect(1).toBe(1);
    done();
  });
});

describe("Testing /getUserInfo/:username", () => {
  test("It should response the GET method", async () => {
    username = "j";
    const res = await request(app).get(`/getUserInfo/${username}`);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].username).toEqual(username);
    expect(res.body[0]).toHaveProperty("username");
    expect(res.body[0]).toHaveProperty("password");
    expect(res.body[0]).toHaveProperty("newuser");
    expect(res.body[0]).toHaveProperty("address1");
    expect(res.body[0]).toHaveProperty("address2");
    expect(res.body[0]).toHaveProperty("state");
    expect(res.body[0]).toHaveProperty("zipcode");
    expect(res.body[0]).toHaveProperty("newuser");
    expect(res.body[0]).toHaveProperty("neverusequota");
  });
});

describe("Testing /getHistoryOfUser/:username", () => {
  test("It should response the GET method", async () => {
    username = "j";
    const res = await request(app).get(`/getHistoryOfUser/${username}`);
    expect(res.statusCode).toBe(200);
  });
});

// /register
// /login
// /update/:username
// /submitQuota
// /updateStatus/:username

describe("Testing /register", () => {
  test("It should response the POST method", async () => {
    // Arrange
    const userToBeRegistered = {
      username: generateGuid(),
      password: "1",
    };
    // const userCreatedResponse = await request(app).post("/register").send(userToBeRegistered);

    // Act
    const res = await request(app).post("/register").send(userToBeRegistered);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.messageRegister).toEqual("Register");
  });
});

describe("Testing /login", () => {
  test("It should response the POST method", async () => {
    // Arrange
    const userToLogin = {
      username: "j",
      password: "1",
    };

    // Act
    const res = await request(app).post("/login").send(userToLogin);

    // Assert
    expect(res.statusCode).toBe(200);
  });
});

describe("Testing /update/:username", () => {
  test("It should response the PUT method", async () => {
    // Arrange

    const initialUser = {
      username: "j",
      Name: "",
      Address1: "",
      Address2: "",
      City: "",
      State: "",
      Zipcode: "",
    };

    const userToUpdate = {
      username: "j",
      Name: "ra",
      Address1: "1234",
      Address2: "1234",
      City: "1234",
      State: "1234",
      Zipcode: "1234",
    };

    // Act
    const res = await request(app)
      .put(`/update/${userToUpdate.username}`)
      .send(userToUpdate);
    await request(app).put(`/update/${initialUser.username}`).send(initialUser);

    // Assert
    expect(res.statusCode).toBe(200);
  });
});

describe("Testing /updatePassword/:username", () => {
  test("It should response the PUT method", async () => {
    // Arrange

    const initialUser = {
      username: "j",
      password: "i",
    };

    const userToUpdate = {
      username: "j",
      password: "1234",
    };

    // Act
    const res = await request(app)
      .put(`/update/${userToUpdate.username}`)
      .send(userToUpdate);
    await request(app).put(`/update/${initialUser.username}`).send(initialUser);

    // Assert
    expect(res.statusCode).toBe(200);
  });
});

describe("Testing /submitQuota", () => {
  test("It should response the POST method", async () => {
    // Arrange
    const quotaToBeSubmitted = {
      gallon_req: 4,
      delivery_add: "1421 1st Ave, Seattle",
      date: "",
      suggest_p: 10.0,
      total_amount: 40.0,
      username: "j",
    };

    // Act
    const res = await request(app)
      .post("/submitQuota")
      .send(quotaToBeSubmitted);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.messageRegister).toEqual("Success");
  });
});

describe("Testing /updateStatus/:username", () => {
  test("It should response the PUT method", async () => {
    // Arrange
    const userToUpdate = {
      username: "j",
    };

    // Act
    const res = await request(app)
      .put(`/updateStatus/${userToUpdate.username}`)
      .send(userToUpdate);

    // Assert
    expect(res.statusCode).toBe(200);
  });
});

describe("Testing invalid login /login", () => {
  test("It should response 401", async () => {
    // Arrange
    const userToLogin = {
      username: generateGuid(),
      password: generateGuid(),
    };

    // Act
    const res = await request(app).post("/login").send(userToLogin);

    // Assert
    expect(res.statusCode).toBe(401);
  });
});

describe("Testing invalid register /register", () => {
  test("It should response 401", async () => {
    // Arrange
    const userToBeRegistered = {
      username: "ninjaX172",
      password: generateGuid(),
    };

    // Act
    const res = await request(app).post("/register").send(userToBeRegistered);
    // Assert
    expect(res.body.message).toBe("Already exist username");
  });
});
