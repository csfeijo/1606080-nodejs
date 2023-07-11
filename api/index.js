import express from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import departamentosRoutes from './src/routes/departamentosRoutes.js'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))

departamentosRoutes(app)




const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Nome da sua API',
      version: '1.0.0',
      description: 'Descrição da sua API'
    },
    host: 'localhost',
    basePath: '/',
    servers: [
      {
        url: 'http://localhost:3033', // Ajuste a URL base da sua API
      },
    ],
  },
  apis: ['./src/routes/*.js'],
  // paths: {
  //   '/api/departamentos': {
  //     post: {
  //       tag: ['departamento'],
  //       summary: 'Adicionar um novo departamento',
  //       description: '',
  //       operationId: 'addDepto',
  //       consumes: ['application/json'],
  //       parameters: [
  //         {
  //           in: 'body',
  //           name: 'body',
  //           description: 'Objeto Departamento que precisa ser adicionado',
  //           required: true,
  //           schema: {
  //             $ref: '#/definitions/Departamentos',
  //           },
  //         },
  //       ],
  //       responses: {
  //         200: {
  //           description: 'Sucesso',
  //         },
  //         400: {
  //           description: 'Parametros faltantes',
  //         },
  //       },
  //     }
  //   }
  // }
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
  res.send('Welcome to API')
})

app.listen(3033, () => {
  console.log('Servidor sendo executado...')
})


