/* =======================
    DEPENDENCIES 로드
==========================*/
const express = require("express"); // Express 웹 프레임워크 모듈 로드
const bodyParser = require("body-parser"); // 요청 본문 파싱을 위한 body-parser 로드
const morgan = require("morgan"); // 개발 중에 요청 로그를 출력하기 위한 morgan 로드
const mongoose = require("mongoose"); // MongoDB와의 연결을 위한 mongoose 로드

/* =======================
    CONFIG 로드
==========================*/
const config = require("./config"); // 프로젝트 설정을 담은 config 파일 로드
const port = process.env.PORT || 3000; // 환경 변수에서 포트 번호 가져오거나 기본값으로 3000 사용

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express(); // Express 애플리케이션 생성

// JSON 및 URL 인코딩된 쿼리 파싱
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 콘솔에 요청 로그 출력
app.use(morgan("dev"));

// JWT를 위한 시크릿 키 설정
app.set("jwt-secret", config.secret);

// 테스트를 위한 인덱스 페이지
app.get("/", (req, res) => {
    res.send("Hello JWT123213");
});

// API 라우터 설정
app.use("/api", require("./routes/api"));

// 서버 실행
app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
});

/* =======================
    MONGODB 서버에 연결
==========================*/
mongoose.connect(config.mongodbUri); // MongoDB에 연결
const db = mongoose.connection;

db.on("error", console.error); // 에러 발생 시 콘솔에 출력
db.once("open", () => {
    console.log("connected to mongodb server"); // MongoDB 연결 성공 시 메시지 출력
});
