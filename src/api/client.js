const API_URL = 'http://localhost:3000/api/v1/tasks'

async function obtenerTareas() {

 const response = await fetch(API_URL)

 if(!response.ok){
  throw new Error('Error obteniendo tareas')
 }

 return response.json()
}

async function crearTarea(title) {

 const response = await fetch(API_URL, {
  method:'POST',
  headers:{
   'Content-Type':'application/json'
  },
  body: JSON.stringify({
   title
  })
 })

 if(!response.ok){
  throw new Error('Error creando tarea')
 }

 return response.json()
}

async function eliminarTarea(id){

 const response = await fetch(`${API_URL}/${id}`, {
  method:'DELETE'
 })

 if(!response.ok){
  throw new Error('Error eliminando tarea')
 }

}

window.taskApi = {
 obtenerTareas,
 crearTarea,
 eliminarTarea
}