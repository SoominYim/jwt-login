const jwt = require("jsonwebtoken");

// 인증 미들웨어 함수를 정의
const authMiddleware = (req, res, next) => {
    // 헤더나 URL로부터 토큰을 읽어오기
    const token = req.headers["x-access-token"] || req.query.token;

    // 토큰이 존재하지 않으면 로그인하지 않은 상태로 간주하여 403 Forbidden 상태로 응답
    if (!token) {
        return res.status(403).json({
            success: false,
            message: "로그인하지 않았습니다.",
        });
    }

    // 토큰을 복호화하는 promise를 생성합니다.
    const p = new Promise((resolve, reject) => {
        // jwt.verify 함수를 사용하여 토큰을 복호화합니다.
        jwt.verify(token, req.app.get("jwt-secret"), (err, decoded) => {
            if (err) reject(err); // 복호화에 실패하면 에러를 반환
            resolve(decoded); // 복호화에 성공하면 복호화된 정보를 반환
        });
    });

    // 복호화에 실패한 경우 에러 메시지를 처리하는 함수를 정의
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message,
        });
    };

    // promise를 처리
    p.then((decoded) => {
        req.decoded = decoded; // 복호화된 정보를 요청 객체에 저장
        next(); // 다음 미들웨어로 넘어가기
    }).catch(onError);
};

module.exports = authMiddleware;
