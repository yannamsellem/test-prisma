const { createServer } = require('http')
const Express = require('express')

const error = require('./middleware/error')
const users = require('./routes/users')
const companies = require('./routes/companies')

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

app.use(users)
app.use(companies)

app.use(error)

if (!module.parent) {
  const server = createServer(app)
  // eslint-disable-next-line no-console
  server.listen(8080, () => console.log('listen http://localhost:8080'))
}
