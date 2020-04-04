const { Router } = require('express')
const client = require('../db')

const route = Router()

const select = {
  id: true,
  name: true,
  longitude: true,
  latitude: true,
}

route.get('/companies', async (req, res) => {
  const companies = await client.company.findMany({
    select,
  })

  res.json(companies)
})

route.post('/companies', async (req, res, next) => {
  const { name, longitude, latitude, userId } = req.body

  try {
    const company = await client.company.create({
      data: {
        latitude,
        longitude,
        name,
        user: { connect: { id: userId } },
      },
      select,
    })

    res.json(company)
  } catch (error) {
    next(error)
  }
})

module.exports = route
