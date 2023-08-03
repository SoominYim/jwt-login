const User = require("../../../models/user");

/* 
================================
    GET /api/user/list
================================
*/

// 관리자만 접근할 수 있는 사용자 목록 조회
exports.list = (req, res) => {
    // 관리자가 아닌 경우 거부
    if (!req.decoded.admin) {
        return res.status(403).json({
            message: "관리자 권한이 아닙니다.",
        });
    }
    // 모든 사용자를 조회하여 응답
    User.find({}).then((users) => {
        res.json({
            users,
        });
    });
};

/*
======================================================
    POST /api/user/assign-admin/:username
======================================================    
*/

// 사용자를 관리자로 지정하는 함수
exports.assignAdmin = (req, res) => {
    // 관리자가 아닌 경우 거부
    if (!req.decoded.admin) {
        return res.status(403).json({
            message: "관리자 권한이 아닙니다.",
        });
    }

    // 주어진 사용자명으로 사용자를 조회하고, 관리자로 지정
    User.findOneByUsername(req.params.username)
        .then((user) => user.assignAdmin())
        .then(
            res.json({
                success: true,
            })
        );
};
