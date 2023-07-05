import express from 'express'
//import bodyParser from 'body-parser'
import departamentosRoutes from './src/routes/departamentosRoutes.js'

const app = express()

departamentosRoutes(app)

app.get('/', (req, res) => {
  res.send('Welcome to API')
})

app.listen(3033, () => {
  console.log('Servidor sendo executado...')
})


