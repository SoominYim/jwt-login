const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
router.use(express.json())

let memberList = [{
        id: "testid1",
        password: "testpwd1",
        name: "홍길동",
        refreshToken: "",
    },
    {
        id: "testid2",
        password: "testpwd2",
        name: "김철수",
        refreshToken: "",
    },
    {
        id: "testid3",
        password: "testpwd3",
        name: "이영희",
        refreshToken: "",
    },
    {
        id: 1,
        password: 1,
        name: 1,
        refreshToken: "",
    }
];

var text = btoa("abcd");
console.log("btoa : " + text);
text = atob(text);
console.log("atob : " + text);

var text = escape("ab 홍길동 cd");
console.log("escape : " + text);
text = btoa(text);
console.log("btoa : " + text);
text = atob(text);
console.log("atob : " + text);
text = unescape(text);
console.log("unescape : " + text);

var text = encodeURIComponent("ab 홍길동 cd");
console.log("encodeURIComponent : " + text);
text = btoa(text);
console.log("btoa : " + text);
text = atob(text);
console.log("atob : " + text);
text = decodeURIComponent(text);
console.log("decodeURIComponent : " + text)

// Access-Token 복호화
//var base64Payload = this.$store.state.loginStore.accessToken.split('.')[1];
var base64Payload = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6InRlc3RpZDEiLCJtZW1iZXJOYW1lIjoi7ZmN6ri464-ZIiwiaWF0IjoxNjM0NDcxMDEwLCJleHAiOjE2MzQ1NTc0MTB9.OgLNeQPVm6j86sqQp4sMs_VVnaiQjHAn0G94PzorNNM";
base64Payload = base64Payload.split('.')[1];
console.log(base64Payload);

// URL과 호환되지 않는 문자를 base64 표준 문자로 교체
base64Payload = base64Payload.replace(/-/g, '+').replace(/_/g, '/');

// Base64는 4로 나누어진다. 그래서 길이를 4로 나눈 나머지 길이 만큼 "="가 추가되어야 한다.
//var pad = base64Payload.length % 4;
//if (pad > 0) {
//	base64Payload += new Array(5 - pad).join('=');
//	console.log(base64Payload);
//}

base64Payload = atob(base64Payload);
console.log("atob : " + base64Payload);

var payloadObject = JSON.parse(base64Payload);
console.log(payloadObject);

console.log("decodeURIComponent : " + decodeURIComponent(payloadObject.memberName));

// ASCII(아스키) 문자를 유니코드 형식으로 변환
console.log("escape : " + escape(payloadObject.memberName));

// 문자열에서 encoding 된 URI를 decoding 한다.
var memberName = decodeURIComponent(escape(payloadObject.memberName));
console.log("memberName : " + memberName);

// Access-Token의 만료 시간 확인
var expDate = new Date(payloadObject.exp * 1000);
console.log("exp : " + expDate);
console.log("exp : " + expDate.getFullYear() + "/" + (expDate.getMonth() + 1) + "/" + expDate.getDate() + " " + expDate.getHours() + ":" + expDate.getMinutes() + ":" + expDate.getSeconds());

var iatDate = new Date(payloadObject.iat * 1000);
console.log("iat : " + iatDate);
console.log("iat : " + iatDate.getFullYear() + "/" + (iatDate.getMonth() + 1) + "/" + iatDate.getDate() + " " + iatDate.getHours() + ":" + iatDate.getMinutes() + ":" + iatDate.getSeconds());

var currentDate = new Date().getTime() / 1000;
console.log("Current Date : " + currentDate);

if (payloadObject.exp < currentDate) {
    console.log("token expired");
} else {
    console.log("token valid");
}




router.post('/login', async function (req, res, next) {
    console.log("REST API Post Method - Member Login And JWT Sign");
    const memberId = req.body.id;
    const memberPassword = req.body.password;
    var memberItem = memberList.find(object => object.id == memberId);
    if (memberItem != null) {
        if (memberItem.password == memberPassword) {
            let accessToken = "";
            let errorMessageAT = "";
            // Access-Token
            try {
                accessToken = await new Promise((resolve, reject) => {
                    jwt.sign({
                            memberId: memberItem.id,
                            memberName: memberItem.name
                        },
                        secret, {
                            expiresIn: '1h'
                        },
                        (err, token) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(token);
                            }
                        });
                });
            } catch (err) {
                errorMessageAT = err;
            }
            console.log("Access-Token : " + accessToken);
            console.log("Access-Token Error : " + errorMessageAT);

            let refreshToken = "";
            let errorMessageRT = "";

            // Refresh-Token
            try {
                refreshToken = await new Promise((resolve, reject) => {
                    jwt.sign({
                            memberId: memberItem.id
                        },
                        secret, {
                            expiresIn: '1d'
                        },
                        (err, token) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(token);
                            }
                        });
                });
            } catch (err) {
                errorMessageRT = err;
            }
            console.log("Refresh-Token : " + refreshToken);
            console.log("Refresh-Token Error : " + errorMessageRT);

            if (errorMessageAT == "" && errorMessageRT == "") {
                memberItem.refreshToken = refreshToken;
                res.json({
                    success: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            } else {
                res.status(401).json({
                    success: false,
                    errormessage: 'token sign fail'
                });
            }
        } else {
            res.status(401).json({
                success: false,
                errormessage: 'id and password is not identical'
            });
        }
    } else {
        res.status(401).json({
            success: false,
            errormessage: 'id and password is not identical'
        });
    }
});
router.post('/refresh', async function (req, res, next) {
    console.log("REST API Post Method - Member JWT Refresh");
    const memberId = req.body.id;
    const accessToken = req.body.accessToken;
    const refreshToken = req.body.refreshToken;
    var memberItem = memberList.find(object => object.id == memberId);
    if (memberItem != null) {
        let refreshPayload = "";
        let errorMessageRT = "";
        // Refresh-Token Verify
        try {
            refreshPayload = await new Promise((resolve, reject) => {
                jwt.verify(refreshToken, secret,
                    (err, decoded) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(decoded);
                        }
                    });
            });
        } catch (err) {
            errorMessageRT = err;
        }
        let accessPayload = "";
        let errorMessageAT = "";
        // Access-Token Verify
        try {
            accessPayload = await new Promise((resolve, reject) => {
                jwt.verify(accessToken, secret, {
                        ignoreExpiration: true
                    },
                    (err, decoded) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(decoded);
                        }
                    });
            });
        } catch (err) {
            errorMessageAT = err;
        }
        if (errorMessageRT == "" && errorMessageAT == "") {
            if (memberId == accessPayload.memberId && memberId == refreshPayload.memberId && memberItem.refreshToken == refreshToken) {
                let accessToken = "";
                errorMessageAT = "";

                // Access-Token
                try {
                    accessToken = await new Promise((resolve, reject) => {
                        jwt.sign({
                                memberId: memberItem.id,
                                memberName: memberItem.name
                            },
                            secret, {
                                expiresIn: '10m'
                            },
                            (err, token) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(token);
                                }
                            });
                    });
                } catch (err) {
                    errorMessageAT = err;
                }
                console.log("Access-Token : " + accessToken);
                console.log("Access-Token Error : " + errorMessageAT);

                if (errorMessageAT == "") {
                    res.json({
                        success: true,
                        accessToken: accessToken
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        errormessage: 'token sign fail'
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    errormessage: 'Token is not identical'
                });
            }
        } else if (errorMessageRT != "") {
            res.status(401).json({
                success: false,
                errormessage: 'Refresh-Token has expired or invalid signature'
            });
        } else if (errorMessageAT != "") {
            res.status(401).json({
                success: false,
                errormessage: 'Access-Token is invalid signature'
            });
        }
        console.log("Access-Token Payload : ");
        console.log(accessPayload);
        console.log("Access-Token Verify : " + errorMessageAT);
        console.log("Refresh-Token Payload : ");
        console.log(refreshPayload);
        console.log("Refresh-Token Verify : " + errorMessageRT);
    } else {
        res.status(401).json({
            success: false,
            errormessage: 'id is not identical'
        });
    }
});


let refreshPayload = "";
let errorMessageRT = "";


console.log("Refresh-Token Payload : ");
console.log(refreshPayload);
console.log("Refresh-Token Verify : " + errorMessageRT);
module.exports = router;