# P09 · Tu primer harness agéntico

<div class="modulo-meta" markdown>
<span>:material-book-open-variant: Módulo 13</span>
<span>:material-clock-outline: 120 minutos</span>
<span>:material-tools: Un agente de codificación con CLI</span>
</div>

## Objetivo

Convertir el repositorio de AgroVisión en un entorno donde un agente de IA pueda trabajar de forma fiable, y **medir la diferencia** contra trabajar sin harness.

## Desarrollo

### 1. Línea base medida

Elige una tarea concreta, acotada y verificable. Por ejemplo: *"añadir un endpoint `/metricas` que exponga el conteo de inferencias por clase en formato Prometheus, con su prueba"*.

Dásela a un agente **sin ningún harness**. Registra:

| Métrica | Valor |
| --- | --- |
| Intervenciones humanas necesarias | |
| Tiempo hasta un resultado válido | |
| ¿Compiló a la primera? | |
| ¿Pasó las pruebas existentes? | |
| Convenciones inventadas (listar) | |
| ¿Rompió algo no relacionado? | |

Guarda esta tabla. Es tu punto de comparación.

### 2. `init.sh`

Debe dejar el entorno en estado conocido y **verificar que funciona**, no solo instalar. Si termina con éxito, el desarrollador —humano o agente— debe poder empezar a trabajar inmediatamente.

```bash
#!/usr/bin/env bash
set -euo pipefail
# verificar dependencias → entorno → servicios → prueba de humo → mensaje claro
```

### 3. `AGENTS.md`

Máximo 100 líneas. Usa la plantilla del módulo 13. Debe contener obligatoriamente:

- [ ] Qué es el proyecto, en tres líneas.
- [ ] La secuencia exacta de inicio de sesión.
- [ ] Los comandos de entorno, pruebas y linter.
- [ ] Las reglas no negociables (al menos cinco).
- [ ] Dónde buscar cada tipo de información.
- [ ] Qué hacer al terminar la sesión.

!!! warning "La prueba del archivo"
    Si tu `AGENTS.md` supera las 100 líneas, no estás escribiendo un índice: estás escribiendo una enciclopedia. Mueve el detalle a documentos referenciados.

### 4. `feature_list.json`

Descompón un objetivo en al menos 15 funcionalidades **verificables de extremo a extremo**. Todas en `"passes": false`.

```json
{
  "id": "metricas-001",
  "category": "functional",
  "description": "El endpoint /metricas devuelve conteos por clase en formato Prometheus",
  "steps": [
    "Levantar el servicio con ./init.sh",
    "Hacer 3 inferencias de clases distintas",
    "GET /metricas",
    "Verificar que el cuerpo contiene inferencias_total{clase=\"...\"}",
    "Verificar que los conteos coinciden con las inferencias realizadas"
  ],
  "passes": false
}
```

Cada entrada debe poder verificarse **sin leer el código**, solo ejecutando la aplicación.

### 5. `docs/progreso.md`

Con la estructura del módulo 13: última sesión, estado del proyecto, bloqueos conocidos, siguiente recomendado, trampas encontradas.

### 6. Verificación mecánica

`make test` debe:

- Ejecutarse en menos de 2 minutos.
- Fallar de verdad cuando algo está roto (compruébalo rompiendo algo a propósito).
- Incluir al menos una prueba de extremo a extremo que levante el servicio real.

### 7. Una regla como linter

Elige una convención que repitas en revisiones y conviértela en comprobación automática. El mensaje de error debe **incluir la instrucción de remediación**, porque ese mensaje entra directamente al contexto del agente.

```python
# Mal:  "Error: logging no estructurado en línea 42"
# Bien: "Error: logging no estructurado en línea 42.
#        Usa log.info('evento', clave=valor) en lugar de log.info(f'...').
#        Ver docs/decisiones/ADR-005.md"
```

### 8. Repite la tarea del paso 1

Misma tarea, mismo agente, ahora con harness. Completa la tabla comparativa.

### 9. Verificación independiente

Ejecuta un segundo agente, con **contexto nuevo** y preferentemente otro modelo, con esta instrucción:

> Revisa este cambio buscando problemas. Cita evidencia específica del código. No asumas que es correcto. Enumera lo que NO está verificado.

Registra cuántos problemas encuentra que el primero no vio, y cuántos son válidos.

### 10. Aislamiento

Ejecuta la tarea dentro de un contenedor efímero y un `git worktree` dedicado. Verifica:

```bash
# El agente no puede escribir fuera de su directorio
# El agente no puede alcanzar dominios arbitrarios
# Las credenciales son de corta vida y privilegio mínimo
```

Documenta qué permisos tiene exactamente y qué acciones requieren confirmación humana.

### 11. Dos agentes en paralelo

Lanza dos agentes en worktrees distintos trabajando en funcionalidades diferentes. Verifica que no colisionan. Mide cuánto tiempo te lleva revisar ambos resultados.

## Entregable

1. Los cuatro archivos del harness: `init.sh`, `AGENTS.md`, `feature_list.json`, `docs/progreso.md`.
2. El linter personalizado con su mensaje de remediación.
3. **Tabla comparativa** sin harness contra con harness, con las seis métricas del paso 1.
4. Lista de hallazgos del verificador independiente, marcando cuáles eran válidos.
5. Especificación del aislamiento: permisos, red, acciones que requieren confirmación, qué se registra.
6. Medición del tiempo de revisión de dos resultados en paralelo.
7. Un párrafo: **¿cuál de los cuatro archivos aportó más y por qué?**

## Criterios de evaluación

| Criterio | Qué se espera |
| --- | --- |
| Reproducible (40 %) | `./init.sh` funciona desde un clon limpio en otra máquina |
| Justificación (30 %) | Las reglas no negociables responden a problemas reales observados |
| Medición (20 %) | La tabla comparativa tiene números, no impresiones |
| Documentación (10 %) | `AGENTS.md` cabe en 100 líneas y es un índice, no una enciclopedia |

!!! tip "Lo que suele revelar la tabla comparativa"
    La mejora más grande casi nunca viene del archivo de instrucciones. Viene de `init.sh` y de que `make test` funcione de verdad.

    Un agente que puede **verificar su propio trabajo mecánicamente** mejora mucho más que uno al que se le explica con más detalle qué hacer. La verificación gana a la instrucción.
