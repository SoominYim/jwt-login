var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "6431",
  database: "vuestagram",
});

connection.connect(function (err) {
  if (err) {
    console.error("mysql connetion error");
    console.error(err);
    throw err;
  }
});

/* GET users listing. */
router.get("/", function (req, res) {
  connection.query("SELECT * FROM test;", function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.post("/signup", function (req, res) {
  const user = {
    user_id: req.body.user.user_id,
    user_pw: req.body.user.user_pw,
    user_pwchk: req.body.user.user_pwchk,
    user_nm: req.body.user.user_nm,
    user_email: req.body.user.user_email,
  };
  connection.query(
    `SELECT user_id FROM test WHERE user_id = '${user.user_id}'`,
    function (err, row) {
      console.log(user.user_pwchk);
      if (row[0] === undefined) {
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(user.user_pw, salt);
        const encryptedPasswordChk = bcrypt.hashSync(user.user_pwchk, salt);
        connection.query(
          `insert into test(user_id,user_pw,user_nm,user_email) values('${user.user_id}','${encryptedPassword}','${user.user_nm}','${user.user_email}')`,
          user,
          function (err, row2) {
            if (err) throw err;
          }
        );
        // if (user.user_id == "" || user.user_pw == "" || user.user_nm == "" || user.user_email == "" || user.user_pw == req.body.user_pwchk) {
        //   alert('정보를 전부 입력해주세요.');
        // }else{
        res.json({
          success: true,
          message: "회원가입 완료했습니다.",
        });
        // };
      } else {
        res.json({
          success: false,
          message: "동일한 아이디가 존재합니다.",
        });
      }
    }
  );
});

router.post("/login", function (req, res) {
  const user = {
    user_id: req.body.user.user_id,
    user_pw: req.body.user.user_pw,
  };
  connection.query(
    `SELECT user_id,user_pw FROM test WHERE user_id = '${user.user_id}'`,
    function (err, row) {
      if (err) {
        res.json({
          success: false,
          message: "아이디 비밀번호를 확인해주세요.",
        });
      }
      if (row[0] !== undefined && row[0].user_id === user.user_id) {
        bcrypt.compare(user.user_pw, row[0].user_pw, function (err, res2) {
          if (res2) {
            res.json({
              success: true,
              message: "로그인 되었습니다",
            });
          }
        });
      } else {
        res.json({
          success: false,
          message: "아이디 또는 비밀번호가 틀렸습니다.",
        });
      }
    }
  );
});

module.exports = router;