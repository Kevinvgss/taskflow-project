# Experimentos con IA y MCP

## Configuración de MCP

Durante esta práctica configuré un servidor MCP en Cursor para poder realizar consultas contextuales sobre el proyecto TaskFlow.

El servidor utilizado fue:

- Filesystem MCP

Este servidor permite que la IA pueda leer y analizar archivos del proyecto de forma contextual.

---

# Consultas realizadas

Realicé varias consultas sobre el proyecto usando MCP.

## Consulta 1

```text
Analyze app.js and explain which functions are related to task management
```

La IA identificó funciones relacionadas con la gestión de tareas como:

- toggle()
- deleteTask()
- editTask()
- render()
- updateStats()

---

## Consulta 2

```text
Find where render() is used inside the project
```

La IA mostró los lugares donde se utiliza la función render() dentro del proyecto.

---

## Consulta 3

```text
Explain how tasks are stored in localStorage in this project
```

La IA explicó cómo las tareas se guardan usando localStorage y JSON.stringify().

---

# Conclusión

El uso de MCP facilitó el análisis del proyecto y ayudó a entender mejor la estructura del código sin necesidad de revisar manualmente todos los archivos.

## Pruebas de integración backend

Se realizaron pruebas de integración utilizando fetch desde la consola del navegador.

Pruebas realizadas:
- GET de tareas
- POST correcto
- POST con error 400
- DELETE con error 404

El backend respondió correctamente en todos los casos.