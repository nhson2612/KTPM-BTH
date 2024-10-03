const express = require("express");
const router = express.Router();
const db = require("../db");
const { isAdmin } = require("../auth");

router.get("/household/head/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM ho_khau WHERE headId = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Có lỗi xảy ra, vui lòng thử lại" });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Không tìm thấy hộ khẩu" });
    }

    res.json({
      msg: "Lấy hộ khẩu thành công",
      data: results[0],
    });
  });
});

router.get("/household/:id/members", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM nhan_khau WHERE ma_ho_khau = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Lỗi khi lấy dữ liệu", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Không tìm thấy thành viên nào" });
    }

    res.json({
      msg: "Lấy thành viên thành công",
      data: results,
    });
  });
});

router.get("/household", isAdmin, (req, res) => {
  const query = "SELECT * FROM ho_khau";

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "Có lỗi xảy ra vui lòng thử lại", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Không có dữ liệu nào" });
    }

    res.json({
      msg: "Lấy toàn bộ hộ khẩu thành công",
      data: results,
    });
  });
});

router.post("/household", isAdmin, (req, res) => {
  const { chu_ho, dia_chi, ngay_dang_ky, headId } = req.body;

  const query =
    "INSERT INTO ho_khau (chu_ho, dia_chi, ngay_dang_ky, headId) VALUES (?, ?, ?, ?)";

  db.query(query, [chu_ho, dia_chi, ngay_dang_ky, headId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "Có lỗi xảy ra vui lòng thử lại", error: err });
    }

    res.json({ msg: "Đăng ký thành công", data: results });
  });
});

router.delete("/household/:id", isAdmin, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM ho_khau WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "Có lỗi xảy ra vui lòng thử lại", error: err });
    }

    res.json({ msg: "Xóa thành công", data: results });
  });
});

module.exports = router;
