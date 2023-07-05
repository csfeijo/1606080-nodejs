import mysql from 'mysql2/promise'

const con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'empresa'
})

con.getConnection().then(connection => {
  console.log('[OK] Database connection established')
  connection.release()
}).catch(err => {
  if (err.code === 'ECONNREFUSED') {
    console.error('[ERROR] Database connection was refused')
  }
})


export default con