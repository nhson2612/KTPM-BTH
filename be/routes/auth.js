const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

router.post("/auth/register", (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Mật khẩu không khớp" });
  }

  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.status(400).json({ msg: "Người dùng đã tồn tại" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;

      const insertUserQuery =
        "INSERT INTO users (username, password) VALUES (?, ?)";
      db.query(insertUserQuery, [username, hash], (err, result) => {
        if (err) throw err;
        res.json({ msg: "Đăng ký thành công" });
      });
    });
  });
});

router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(400).json({ msg: "Người dùng không tồn tại" });
    }

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ msg: "Sai mật khẩu" });
      }
      const token = createToken(user);
      createCookie(res, token);

      res.json({
        msg: "Đăng nhập thành công",
        data: {
          ...user,
          password: undefined,
        },
      });
    });
  });
});

router.post("/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Đăng xóa thanh cong" });
});

const createToken = (user, expire = "1h") => {
  console.log("user", user);
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    "nguyenhuyhieu",
    {
      expiresIn: expire,
    }
  );
};

const createCookie = (res, token, tokenName = "token") => {
  res.cookie(tokenName, token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: true,
  });
};

module.exports = router;
