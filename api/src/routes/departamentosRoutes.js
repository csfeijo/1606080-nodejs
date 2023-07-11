import con from '../services/connection.js'

const departamentosRoutes = (app) => {

  const base = '/api'

  /**
   * @swagger
   * components:
   *   schemas:
   *     Departamentos:
   *       type: object
   *       required:
   *         - nome
   *         - sigla
   *       properties:
   *         nome:
   *           type: string
   *           descriptiom: depto nome  
   *         sigla:
   *           type: string
   *           descriptiom: depto sigla
   *       example:
   *         nome: sample_depto
   *         sigla: smp 
   */

  /**
   * @swagger
   *
   * /api/departamentos:
   *   get:
   *     description: Lista todos departamentos
   *     produces:
   *       - text/json
   *     responses:
   *       200:
   *         description: Adiciona um registro na entidade de departamentos
   */
  app.get(`${base}/departamentos`, async (req, res) => {
    const [rows] = await con.query('SELECT * FROM DEPARTAMENTOS')
    res.json(rows)
  })

  app.get(`${base}/departamentos/:id_departamento`, async (req, res) => {
    const { id_departamento } = req.params
    const [rows] = await con.query('SELECT * FROM DEPARTAMENTOS WHERE id_departamento = ?', [id_departamento])
    res.json(rows)
  })


  /**
   * @swagger
   *
   * /api/departamentos:
   *   post:
   *     summary: Cadastra um departamento
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Departamentos'
   *     responses:
   *       200:
   *         description: Adiciona um novo departamento na base
   *       400:
   *         description: Ausência de algum parametro
   *       500:
   *         description: Erro interno do servidor
   */
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

  /**
   * @swagger
   *
   * /api/departamentos/{id_departamento}:
   *   patch:
   *     summary: Atualiza um departamento
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id_departamento
   *         description: ID do departamento a ser atualizado
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Departamentos'
   *     responses:
   *       200:
   *         description: Adiciona um novo departamento na base
   *       400:
   *         description: Ausência de algum parametro
   *       500:
   *         description: Erro interno do servidor
   */
  app.patch(`${base}/departamentos/:id_departamento`, async (req, res) => {
    const { id_departamento } = req.params
    const { nome, sigla } = req.body

    if (!id_departamento) {
      res.status(400).json({ message: 'One or more fields are unset.'})
    }
    
    const departamento = {}
    if (nome) departamento.nome = nome
    if (sigla) departamento.sigla = sigla
    
    try {
      const updateQuery = 'UPDATE DEPARTAMENTOS SET ? WHERE id_departamento = ?'
      const [result] = await con.query(updateQuery, [departamento, id_departamento])


      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Record not found.' })
      }

      res.status(201).json({ message: 'Record updated.', details: result})
    } catch(e) {
      res.status(500).json({ message: 'Error on update the record.', exception: e})
    }
  })

  /**
   * @swagger
   *
   * /api/departamentos/{id_departamento}:
   *   delete:
   *     description: Remove um departamento
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id_departamento
   *         description: ID do departamento a ser atualizado
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Insere um depto. no banco
   *       400:
   *         description: Parametro faltante
   *       404:
   *         description: Não encontrado
   */
  app.delete(`${base}/departamentos/:id_departamento`, async (req, res) => {
    const { id_departamento } = req.params

    if (!id_departamento) {
      res.status(400).json({ message: 'One or more fields are unset.'})
    }
    try {
      const [result] = await con.query('DELETE FROM DEPARTAMENTOS WHERE id_departamento = ?', [id_departamento])

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Record not found.' })
      }

      res.status(200).json({ message: 'Record deleted.', details: result})

    } catch(e) {
      res.status(500).json({ message: 'Error on delete the record.', exception: e})
    }
  })
}

export default departamentosRoutes
