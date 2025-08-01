const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const database = "./data.json";
  
const readUsers = () => {
  if (!fs.existsSync(database)) {
    fs.writeFileSync(database, "[]");
  }
  return JSON.parse(fs.readFileSync(database));
};

const writeUsers = (users) => {
  fs.writeFileSync(database, JSON.stringify(users, null, 2));
};

app.get("/users", (req, res) => {
  res.json(readUsers());
});

app.post("/users", (req, res) => {
  const users = readUsers();
  const newUser = req.body;

  
  const existingUser = users.find((user) => user.email === newUser.email);
  if (existingUser) {
    return res.status(400).json({ message: "Bu e-mail artıq istifadə olunub!" });
  }
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "İstifadəçi uğurla əlavə edildi!" });
});


app.listen(5000, () => {
  console.log("Server 5000 portunda işləyir");
});      