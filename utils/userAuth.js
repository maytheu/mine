const mongoose = require('mongoose')
const User = mongoose.model('users')

module.exports = (req, res, next) => {
  const token = req.cookies.resume
  User.findToken(token, (err, user) => {
    if (err) throw err
    if (!user) {
      return res.json({
        isAuth: false,
        error: true
      })
    }
    req.token = token
    req.user = user

    next()
  })
}
