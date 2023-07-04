import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to API')
})

app.listen(3033, () => {
  console.log('Servidor sendo executado...')
})


