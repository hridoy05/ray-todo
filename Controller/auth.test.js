import request from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../app.js";
import { mongoConnect, mongoDisconnect } from "../db/connect.js";
describe("HTTP endpoints", () => {
  beforeAll(async () => {
    await mongoDisconnect();
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  it("should register a user", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body.user.email).toBe("johndoe@example.com");
    expect(res.body.token).toBeDefined();
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "johndoe@example.com",
      password: "password",
    });

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.user.email).toBe("johndoe@example.com");
    expect(res.body.token).toBeDefined();
  });
});
