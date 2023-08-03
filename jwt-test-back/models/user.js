const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const config = require("../config");

// 유저 정보를 담을 스키마 정의
const User = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false,
    },
});

// create 메소드는 새 유저를 생성 원래는 이 메소드처럼 비밀번호를
// 그대로 문자열 형태로 저장하면 보안적으로 매우 나쁨.
// 포스트의 후반부에서는 비밀번호를 해시하여 저장
User.statics.create = function (username, password) {
    const encrypted = crypto.createHmac("sha1", config.secret).update(password).digest("base64");

    const user = new this({
        username,
        password: encrypted,
    });

    // return the Promise
    return user.save();
};

// findOneByUsername 메소드는 username 값을 사용하여 유저 찾기
User.statics.findOneByUsername = function (username) {
    return this.findOne({
        username,
    }).exec();
};

// verify 메소드는 비밀번호가 정확한지 확인
// 포스트 후반부에서는 해시를 확인하여 결과를 반환
User.methods.verify = function (password) {
    const encrypted = crypto.createHmac("sha1", config.secret).update(password).digest("base64");

    return this.password === encrypted;
};

// assignAdmin 메소드는 유저를 관리자 계정으로 설정
// 가장 처음으로 가입한 사람과, 관리자가 나중에 API 를 사용하여 지정한 사람이 관리자 권한을 부여 받음
User.methods.assignAdmin = function () {
    this.admin = true;
    return this.save();
};

// User 모델을 생성하여 외부에서 사용할 수 있도록 내보냄
module.exports = mongoose.model("User", User);

// 이하는 Express 애플리케이션의 라우터 설정 부분

app.post("/auth/login", (req, res) => {
    // 로그인 인증
    User.user_id = req.body.id;
    User.user_pwd = req.body.pwd;
    let jwt_secret = "DinnerKang";
    console.log(req.body.id);
    if (User.user_id) {
        // 데이터베이스에서 사용자 정보를 조회
        connection.query(`SELECT user_pwd, user_role FROM user WHERE user_id = "${User.user_id}"`, function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            console.log(results);

            // 요청된 비밀번호를 해시하여 데이터베이스에 저장된 비밀번호와 비교
            const hash = crypto.createHmac("sha256", secret).update(req.body.pwd).digest("base64");
            User.user_role = results[0].user_role;
            if (hash == results[0].user_pwd) {
                // 비밀번호가 일치하면 JWT 토큰을 생성
                const getToken = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            id: User.user_id,
                            role: User.user_role,
                        },
                        jwt_secret,
                        {
                            expiresIn: "7d",
                            issuer: "Dinner",
                            subject: "userInfo",
                        },
                        (err, token) => {
                            if (err) reject(err);
                            resolve(token);
                        }
                    );
                });

                getToken.then((token) => {
                    res.status(200).json({
                        status: 200,
                        msg: "로그인 성공",
                        token,
                    });
                });
            } else {
                res.status(400).json({
                    status: 400,
                    msg: "비밀번호가 틀립니다.",
                });
            }
        });
    } else {
        res.status(400).json({
            status: 400,
            msg: "id값이 없습니다.",
        });
    }
});
