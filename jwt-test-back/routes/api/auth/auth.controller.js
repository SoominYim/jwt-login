const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

/*
==========================================
    POST /api/auth/register
    {
        username,
        password
    }
==========================================    
*/

// 회원 가입 처리를 담당하는 함수
exports.register = (req, res) => {
    const { username, password } = req.body;
    let newUser = null;

    // 사용자가 이미 존재하는지 확인하고, 존재하지 않으면 새로운 사용자를 생성
    const create = (user) => {
        if (user) {
            throw new Error("이미 존재하는 사용자명입니다.");
        } else {
            return User.create(username, password);
        }
    };

    // 사용자 수를 카운트
    const count = (user) => {
        newUser = user;
        return User.count({}).exec();
    };

    // 사용자 수가 1이면 관리자 권한을 부여
    const assign = (count) => {
        if (count === 1) {
            return newUser.assignAdmin();
        } else {
            // 1이 아닌 경우, false를 반환하는 프로미스를 반환
            return Promise.resolve(false);
        }
    };

    // 클라이언트에 응답
    const respond = (isAdmin) => {
        res.json({
            message: "회원 가입에 성공하였습니다.",
            admin: isAdmin ? true : false,
        });
    };

    // 에러 발생 시 처리 (이미 존재하는 사용자명인 경우)
    const onError = (error) => {
        res.status(409).json({
            message: error.message,
        });
    };

    // 사용자명 중복을 확인
    User.findOneByUsername(username).then(create).then(count).then(assign).then(respond).catch(onError);
};

/*
==========================================
    POST /api/auth/login
    {
        username,
        password
    }
==========================================    
*/

// 로그인 처리를 담당하는 함수
exports.login = (req, res) => {
    const { username, password } = req.body;
    const secret = req.app.get("jwt-secret");

    // 사용자 정보를 확인하고 JWT를 생성
    const check = (user) => {
        if (!user) {
            // 사용자가 존재하지 않을 때
            throw new Error("로그인에 실패했습니다.");
        } else {
            // 사용자가 존재할 때, 비밀번호를 확인
            if (user.verify(password)) {
                // 비동기적으로 JWT를 생성하는 프로미스를 만듦
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            username: user.username,
                            admin: user.admin,
                        },
                        secret,
                        {
                            expiresIn: "7d",
                            issuer: "velopert.com",
                            subject: "userInfo",
                        },
                        (err, token) => {
                            if (err) reject(err);
                            resolve(token);
                        }
                    );
                });
                return p;
            } else {
                throw new Error("로그인에 실패했습니다.");
            }
        }
    };

    // 응답에 토큰을 담습니다.
    const respond = (token) => {
        res.json({
            message: "로그인에 성공하였습니다.",
            token,
        });
    };

    // 에러 발생 시 처리합니다.
    const onError = (error) => {
        res.status(403).json({
            message: error.message,
        });
    };

    // 사용자를 찾습니다.
    User.findOneByUsername(username).then(check).then(respond).catch(onError);
};

/*
==========================================
    GET /api/auth/check
==========================================    
*/

// 로그인 여부를 확인하는 함수
exports.check = (req, res) => {
    // 헤더나 URL에서 토큰을 읽어옴
    res.json({
        success: true,
        info: req.decoded,
    });
};
