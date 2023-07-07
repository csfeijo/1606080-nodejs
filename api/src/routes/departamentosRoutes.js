import con from '../services/connection.js'

const departamentosRoutes = (app) => {

  const base = '/api'

  app.get(`${base}/departamentos`, async (req, res) => {
    const [rows] = await con.query('SELECT * FROM DEPARTAMENTOS')
    res.json(rows)
  })

  app.post(`${base}/departamentos`, async (req, res) => {
    const { nome, sigla } = req.body

    // Validação antes de executar a query
    if (!nome || !sigla) {
      res.status(400).json({ message: 'One or more fields are unset'})
      return
    }
    
    try {
      const [result] = await con.query('INSERT INTO DEPARTAMENTOS (nome, sigla) VALUES (?, ?)', [nome, sigla])
      res.status(201).json(result)
    } catch(e) {
      console.error(`[ERROR] ${e}`)
      if (e.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: e.message })
        return
      }
      // Se não tiver encontrado o erro, foi algo critico
      res.status(500).json({ message: e.message })
    }
  })

}

export default departamentosRoutes
