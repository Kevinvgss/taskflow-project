# Uso de Cursor en el proyecto TaskFlow

## Exploración de Cursor

Para este ejercicio instalé Cursor y abrí el proyecto TaskFlow. Estuve probando un poco la interfaz para ver cómo funciona. Básicamente es muy parecido a VS Code pero con herramientas de IA integradas.

Probé varias partes del editor:

- El explorador de archivos para moverme por el proyecto.
- La terminal integrada para ejecutar comandos.
- El chat de IA para preguntarle cosas sobre el código.
- La edición inline para modificar funciones.
- Composer para probar cambios en varios archivos.

Me pareció bastante útil porque puedes preguntarle cosas directamente sobre tu propio código.

---

# Atajos de teclado que utilicé

Mientras usaba Cursor utilicé algunos atajos que me resultaron bastante útiles:

- **Ctrl + L** → abrir el chat de IA
- **Ctrl + K** → pedir cambios o refactorizar código seleccionado
- **Ctrl + `shift + ñ** → abrir la terminal integrada
- **Ctrl + P** → buscar archivos rápidamente
- **Tab** → aceptar sugerencias de código generadas por Cursor

Estos atajos ayudan bastante a trabajar más rápido dentro del editor.

---

# Ejemplo 1: Generación automática de código

Probé el autocompletado escribiendo un comentario en el archivo `app.js`:

```javascript
// function that counts completed tasks
```

Después de escribir eso, Cursor me sugirió automáticamente una función:

```javascript
function countCompletedTasks(){
 const completedTasks = tasks.filter(task => task.completed)
 return completedTasks.length
}
```

La función básicamente cuenta cuántas tareas están completadas dentro del array de tareas. 

---

# Ejemplo 2: Mejora de una función existente

También probé la edición inline con la función `toggle` del proyecto.

La función original era algo así:

```javascript
function toggle(i){
 tasks[i].completed=!tasks[i].completed
 save()
 render()
}
```

Le pedí a Cursor que la hiciera más legible y me propuso algo así:

```javascript
function toggle(index){
 const task = tasks[index]
 task.completed = !task.completed

 save()
 render()
}
```

El cambio principal fue usar un nombre de variable más claro (`index`) y guardar la tarea en una variable antes de modificarla. Así el código se entiende mejor.

---

# Conclusión

Después de probar Cursor, creo que puede ayudar bastante a la hora de programar. Sobre todo para entender el código existente, generar funciones rápidamente o mejorar el código que ya está escrito. Aunque obviamente no sustituye saber programar, sí puede ahorrar bastante tiempo en algunas tareas.