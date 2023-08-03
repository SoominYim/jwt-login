const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // 요청 헤더에서 토큰을 얻습니다
    const token = req.header('auth-token')
    // 토큰이 없는지 확인합니다
    if(!token) return res.status(401).json({error: 'Acceso denegado'})
    try {
        // jwt 종속성과 .verify 메서드를 사용하여 토큰을 확인합니다
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        // 토큰이 정확하면 토큰에 넣은 데이터를 반환합니다
        req.user = verified
        // next()는 req가 테스트를 통과했고 계속 진행 중임을 나타냅니다.
        next()
    } catch (error){
        res.status(400).json({error: 'Token no valido, acceso denegado'})
    }
}

module.exports = verifyToken