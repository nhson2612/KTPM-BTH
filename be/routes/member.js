const express = require("express");
const router = express.Router();
const db = require("../db");
const { isHouseholdHead } = require("../auth");

router.post("/members", isHouseholdHead, (req, res) => {
  const { ho_va_ten, ngay_sinh, cccd, quan_he, cong_viec, ma_ho_khau } =
    req.body;
  const insertMemberQuery = `
    INSERT INTO nhan_khau (ho_va_ten, ngay_sinh, cccd, quan_he, cong_viec, ma_ho_khau) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertMemberQuery,
    [ho_va_ten, ngay_sinh, cccd, quan_he, cong_viec, ma_ho_khau],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Có lỗi xảy ra, vui lòng thử lại" });
      }
      res.json({ msg: "Thêm thành công", data: result });
    }
  );
});

router.get("/members/:id", isHouseholdHead, (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM nhan_khau WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Có lỗi xảy ra, vui này thử được quản lý" });
    }
    if (result.length === 0) {
      return res.status(404).json({ msg: "Không tìm thấy nhan khäu" });
    }
    res.json({ msg: "Lấy nhan khäu", data: result[0] });
  });
});

router.put("/members/:id", isHouseholdHead, (req, res) => {
  const { id } = req.params;
  const { ho_va_ten, ngay_sinh, cccd, quan_he, cong_viec } = req.body;
  const query = `
    UPDATE nhan_khau
    SET ho_va_ten = ?, ngay_sinh = ?, cccd = ?, quan_he = ?, cong_viec = ?
    WHERE id = ?
  `;
  db.query(
    query,
    [ho_va_ten, ngay_sinh, cccd, quan_he, cong_viec, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Có lỗi xảy ra, vui lại thử được quản lý" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Không tìm thấy nhan khäu" });
      }
      res.json({ msg: "Cập nhật nhan khäu thành công", data: result });
    }
  );
});

router.delete("/members/:id", isHouseholdHead, (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM nhan_khau WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Có lỗi xảy ra, vui bạn thử được quản lý" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Không tìm thấy nhan khäu" });
    }
    res.json({ msg: "Xóa nhan khäu", data: result });
  });
});

module.exports = router;
