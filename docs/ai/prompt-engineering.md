# Ingeniería de prompts

## Uso de roles

Probé diferentes prompts asignando roles específicos a la IA para obtener respuestas más concretas.

### Ejemplo 1

Prompt:

```text
Actúa como un desarrollador senior de JavaScript y explica cómo mejorar la función toggle() del proyecto.
```

Resultado:

La IA propuso mejorar la legibilidad usando nombres de variables más claros y añadiendo validaciones.

---

## Few-shot prompting

También probé la técnica few-shot prompting, proporcionando ejemplos antes de pedir una solución.

### Ejemplo 2

Prompt:

```text
Ejemplo:
Input: [1,2,3,4]
Output: [2,4]

Ejemplo:
Input: [5,6,7,8]
Output: [6,8]

Ahora crea una función que devuelva solo los números pares de un array.
```

Resultado:

La IA generó correctamente una función utilizando filter() para devolver únicamente los números pares.

---

# Conclusión

El uso de roles y ejemplos ayuda a obtener respuestas más específicas y útiles.


# Resolución de problemas con y sin IA

## Sin IA

Resolver algunos errores manualmente llevaba más tiempo porque había que revisar varias funciones y buscar documentación.

## Con IA

Usando Cursor y ChatGPT fue más rápido detectar errores, mejorar funciones y entender el código.

La IA ayudó especialmente en:

- refactorización
- validaciones
- generación de comentarios JSDoc
- mejora de legibilidad

---

# Conclusión

La IA acelera bastante el desarrollo, aunque es importante revisar manualmente el código generado.