const taskService = require('../services/task.service')

const obtenerTareas = (req, res, next) => {

 try {

  const tasks = taskService.obtenerTodas()

  res.json(tasks)

 } catch(error){
  next(error)
 }

}

const crearTarea = (req, res, next) => {

 try {

  const { title } = req.body

  if(!title){
   return res.status(400).json({
    message:'El título es obligatorio'
   })
  }

  const nuevaTarea = taskService.crearTarea({
   title
  })

  res.status(201).json(nuevaTarea)

 } catch(error){
  next(error)
 }

}

const eliminarTarea = (req, res, next) => {

 try {

  const { id } = req.params

  taskService.eliminarTarea(id)

  res.status(204).send()

 } catch(error){
  next(error)
 }

}

module.exports = {
 obtenerTareas,
 crearTarea,
 eliminarTarea
}