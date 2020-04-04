// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(error, req, res, next) {
  console.error(error)
  res.status(500)
  res.json({ error })
}
