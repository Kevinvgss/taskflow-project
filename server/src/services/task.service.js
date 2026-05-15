let tasks = []

const obtenerTodas = () => {
 return tasks
}

const crearTarea = (data) => {

 const nuevaTarea = {
  id: Date.now(),
  title: data.title
 }

 tasks.push(nuevaTarea)

 return nuevaTarea
}

const eliminarTarea = (id) => {

 const taskIndex = tasks.findIndex(task => task.id == id)

 if(taskIndex === -1){
  throw new Error('NOT_FOUND')
 }

 tasks.splice(taskIndex,1)
}

module.exports = {
 obtenerTodas,
 crearTarea,
 eliminarTarea
}