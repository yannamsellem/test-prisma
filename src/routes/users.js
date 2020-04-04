const { Router } = require('express')
const client = require('../db')

const route = Router()

route.get('/users', async (req, res) => {
  const users = await client.user.findMany({
    select: {
      id: true,
      instagram: true,
      profile: { select: { name: true } },
    },
  })

  res.json(users)
})

route.post('/users', async (req, res, next) => {
  const { name, instagram } = req.body

  if (!name || !instagram) {
    res.status(400).send('Missing field')
    return
  }
  try {
    const user = await client.user.create({
      include: { profile: true },
      data: { instagram },
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
})

route.get('/users/:id', async (req, res) => {
  const { id } = req.params

  const user = await client.user.findOne({
    where: { id },
    select: { id: true, profile: { select: { name: true } } },
  })

  if (user) res.json(user)
  else res.status(404).send('user not found')
})

module.exports = route
