const express = require('express')
const cors = require('cors')

const { PORT } = require('./config/env')

const taskRoutes = require('./routes/task.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/tasks', taskRoutes)

app.get('/', (req, res) => {
 res.json({
  message: 'Servidor funcionando'
 })
})

app.use((err, req, res, next) => {

    if(err.message === 'NOT_FOUND'){
     return res.status(404).json({
      message:'Tarea no encontrada'
     })
    }
   
    console.error(err)
   
    return res.status(500).json({
     message:'Error interno del servidor'
    })
   
   })
   
app.listen(PORT, () => {
 console.log(`Servidor ejecutándose en puerto ${PORT}`)
})