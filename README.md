## Ray Todo Application

The Ray-Todo project is an web-based application for creating and managing to-do lists. The application allows users to create, edit, and delete tasks, filter todo based on days , types and track progress. In this document, we will provide an overview of the project, its features, and how to set up and use the application.

## Installation

clone project from github

```bash
 git clone https://github.com/hridoy05/ray-todo.git
```

You have the installed node in pc. Otherwise install node 16 from https://nodejs.org/en

install backend dependencies via npm

```bash
npm install
```

install frontend dependencies. Frontend part is in the client folder.

```bash
cd client
npm install
```

Start the client server

```bash
cd client
npm start
```

Start the node server

```bash
npm start
```

## Environment Variables

To run this project, you will need to add a file in your root folder and name it .env . Following environment variables in .env file. You can also set MONGO_URL with your local database. By default you get access the mongo atlas database using below steps.
Important-note: this MONGO_URL link only for testing purpose.

`MONGO_URL=mongodb+srv://mernUser:7DWiQR58R0uzBsuY@cluster0.uerym.mongodb.net/todo?retryWrites=true&w=majority`

`JWT_SECRET=893489OIF3H8439RJOP4JHUPKLFDJKGLJDL`

`JWT_LIFETIME=30d`

## Screenshots
![ray-todo](https://user-images.githubusercontent.com/24815591/235359637-6ef24cc5-216d-4221-9679-21a8ffffc54b.jpg)

![ray-todo-create](https://user-images.githubusercontent.com/24815591/235359650-108eeff8-4125-4e6d-89c8-3cef183cb837.jpg)

![ray-todo-login](https://user-images.githubusercontent.com/24815591/235359659-fdf06881-b2c8-4428-b93a-694e901c4904.jpg)

![ray-todo-edit](https://user-images.githubusercontent.com/24815591/235359673-b6191d59-e97b-44b1-ad5a-e8c4c1c6c18d.jpg)


## API Reference

### User Authentication

#### Create a new user account.

```http
    POST /api/v1/auth/register

```

| Parameter  | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | **Required**. Name of the user     |
| `email`    | `string` | **Required**. email of the user    |
| `password` | `string` | **Required**. password of the user |

#### Response

On successful registration, returns the user object and a JWT token.

```
  HTTP/1.1 201 Created
  {
    "user": {
        "_id": "615036a80de57637f7e8c331",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "createdAt": "2021-09-26T15:37:28.836Z",
        "updatedAt": "2021-09-26T15:37:28.836Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }

```

#### Login a User

```http
    POST /api/v1/auth/login

```

| Parameter  | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `email`    | `string` | **Required**. email of the user    |
| `password` | `string` | **Required**. password of the user |

#### Response

On successful registration, returns the user object and a JWT token.

```
  HTTP/1.1 201 Created
  {
    "user": {
        "_id": "644e71625c175e8821ed6bc1",
        "name": "hridoy2",
        "email": "hridoy2@gmail.com",
        "createdAt": "2023-04-30T13:47:14.382Z",
        "updatedAt": "2023-04-30T13:47:14.382Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlNzE2MjVjMTc1ZTg4MjFlZDZiYzEiLCJpYXQiOjE2ODI4NjI1NzksImV4cCI6MTY4NTQ1NDU3OX0.

```
