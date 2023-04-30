const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
jest.mock("../repository/task.repository.js");

describe("Tasks API", () => {
  beforeAll(async () => {
    await mongoDisconnect();
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const taskData = {
        name: "Task 1",
        time: "12.30",
        type: "Work",
        day: "2022-05-01",
      };
      const userId = 1;
      const savedTask = { id: 1, userId, ...taskData };
      createTask.mockResolvedValueOnce(savedTask);

      const res = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .set("Authorization", `Bearer ${process.env.ACCESS_TOKEN}`)
        .expect(201);

      expect(res.body).toEqual({ task: savedTask });
    });
  });
});
