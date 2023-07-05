import con from '../services/connection.js'

const departamentosRoutes = (app) => {

  const base = '/api'

  app.get(`${base}/departamentos`, async (req, res) => {
    
    const [rows] = await con.query('SELECT * FROM DEPARTAMENTOS')

    res.json(rows)
  })

  app.post(`${base}/departamentos`, (req, res) => {
    res.send('Add depto')
  })
}

export default departamentosRoutes
