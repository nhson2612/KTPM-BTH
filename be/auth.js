const db = require("./db");
const jwt = require("jsonwebtoken");

const isHouseholdHead = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Vui lý đăng nhập để tiếp tụcs" });
  }

  const decoded = await verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ msg: "Vui lý đăng nhập để tiếp tục" });
  }
  console.log("decoded", decoded);

  const query = "SELECT * FROM users WHERE id = ? AND role = ?";
  db.query(query, [decoded.id, "household_head"], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(401).json({ msg: "Vui lý đăng nhập để tiếp tục" });
    }
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Vui lý đăng nhập để tiếp tục" });
  }

  const decoded = await verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ msg: "Vui lý đăng nhập để tiếp tục" });
  }

  const query = "SELECT * FROM users WHERE id = ? AND role = ?";
  db.query(query, [decoded.id, "admin"], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(401).json({ msg: "Vui lý đăng nhập để tiếp tục" });
    }
    next();
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "nguyenhuyhieu", (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

module.exports = { isHouseholdHead, isAdmin };
