// 필요한 모듈들을 가져오기
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var morgan = require("morgan");

// 사용자 정의 설정을 가져오기
var config = require("./config");

// 라우트 핸들러를 가져오기
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// Express 애플리케이션의 인스턴스를 생성
var app = express();

// bodyParser 미들웨어를 사용하여 URL-encoded 형식의 요청 바디를 파싱
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

// bodyParser 미들웨어를 사용하여 JSON 형식의 요청 바디를 파싱
app.use(bodyParser.json());

// 개발 모드에서 HTTP 요청을 개발자 친화적인 포맷으로 로깅하기 위해 Morgan 미들웨어를 사용
app.use(morgan("dev"));

// JSON 웹 토큰을 위한 비밀키를 설정합니다.
app.set("jwt-secret", config.secret);

// 루트 URL 경로에 대한 라우트 핸들러를 정의하고 응답으로 'asdsa'를 보내기
app.get("/", (req, res) => {
    res.send("asdsa");
});

// "/api/users" URL 경로에 "usersRouter" 미들웨어를 마운트
app.use("/api/users", usersRouter);

// MySQL 데이터베이스에 연결하기 위해 "mysql" 모듈을 사용하여 연결 객체를 생성
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
        console.error("mysql 연결 오류");
        console.error(err);
        throw err;
    }
});

// Pug 템플릿을 사용하기 위해 뷰 엔진을 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Express 애플리케이션에 로깅 미들웨어를 사용
app.use(logger("dev"));

// 요청에서 쿠키를 파싱하기 위해 cookieParser 미들웨어를 사용
app.use(cookieParser());

// "public" 디렉토리에서 정적 파일을 제공하기 위해 express.static 미들웨어를 사용
app.use(express.static(path.join(__dirname, "public")));

// 루트 URL 경로에 "indexRouter" 미들웨어를 마운트
app.use("/", indexRouter);

// "/users" URL 경로에 "usersRouter" 미들웨어를 마운트
app.use("/users", usersRouter);

// 404 에러를 처리하고 에러를 전달
app.use(function (req, res, next) {
    next(createError(404));
});

// 에러 핸들러 미들웨어를 사용하여 에러 메시지를 설정하고 에러 페이지를 렌더링
app.use(function (err, req, res, next) {
    // 개발 모드인 경우, 에러 정보를 로컬 변수에 설정합니다.
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // 에러 페이지를 렌더링합니다.
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
