import request from "supertest";
import app from "../app.js";
import { mongoConnect, mongoDisconnect } from "../db/connect.js";
// import { createTask } from "../repository/task.repository.js";
// jest.mock("../repository/task.repository.js");

// describe("Tasks API", () => {
//   beforeAll(async () => {
//     await mongoDisconnect();
//     await mongoConnect();
//   });
//   afterAll(async () => {
//     await mongoDisconnect();
//   });
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("POST /api/v1/tasks/create", () => {
//     it("should create a new task", async () => {
//       const taskData = {
//         name: "Task 1",
//         time: "12.30",
//         type: "Work",
//         day: "2022-05-01",
//       };
//       const userId = 1;
//       const savedTask = { id: 1, userId, ...taskData };
//       createTask.mockResolvedValueOnce(savedTask);
//       var agent = request.agent(app);
//       const res = await agent
//         .post("/api/tasks")
//         .send(taskData)
//         .set(
//           "Authorization",
//           `Bearer heyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlNzE2MjVjMTc1ZTg4MjFlZDZiYzEiLCJpYXQiOjE2ODI4NjI0MzQsImV4cCI6MTY4NTQ1NDQzNH0.6vyb4voFFZCilqSXBsARSp3uwddMUB99sayiXbxmEZA`
//         )
//         .expect(201);

//       expect(res.body).toEqual({ task: savedTask });
//     });
//   });
// });
test("check", () => {
  console.log("checked");
});
