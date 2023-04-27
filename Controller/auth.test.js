import request from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../app.js";

describe("HTTP endpoints", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body.user.email).toBe("johndoe@example.com");
    expect(res.body.token).toBeDefined();
  });

  it("should login a user", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "password",
    });

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.user.email).toBe("johndoe@example.com");
    expect(res.body.token).toBeDefined();
  });
});
