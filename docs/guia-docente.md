# Guía para el docente

## Estructura de una sesión de 180 minutos

| Tramo | Minutos | Qué ocurre |
| --- | --- | --- |
| Apertura | 0–15 | Pregunta detonadora + temario de la sesión. Nadie toma notas todavía. |
| Bloque teórico 1 | 15–60 | Conceptos centrales con diagramas. Pausa de preguntas cada 15 min. |
| Descanso | 60–70 | — |
| Bloque teórico 2 | 70–105 | Profundización, comparativas y contrapesos críticos. |
| Caso práctico | 105–130 | Análisis guiado en equipos de 3–4 personas. |
| Laboratorio | 130–165 | Trabajo en máquina. El docente circula, no expone. |
| Cierre y evaluación | 165–180 | Puntos clave + cuestionario rápido + asignación de ejercicios. |

## Preguntas detonadoras por módulo

| Módulo | Pregunta con la que abrir |
| --- | --- |
| 01 · Nube | ¿Por qué una startup de cuatro personas puede competir con la infraestructura de un banco? |
| 02 · Modelos de servicio | Si mañana tienes que lanzar una tienda en línea en dos semanas, ¿qué montas tú y qué alquilas? |
| 03 · TOGAF para IA | ¿Quién decide, en tu organización, si un modelo de IA puede pasar a producción? |
| 04 · Seguridad | Si el proveedor de nube sufre una brecha, ¿de quién es la culpa? |
| 05 · Big Data | ¿Cuántos datos tiene tu organización que nadie ha mirado nunca? |
| 06 · Edge e IoT | ¿Qué pasa con un auto autónomo si se cae el internet? |
| 07 · Git | ¿Cuál es el peor accidente que has tenido con un archivo `informe_final_v3_DEFINITIVO.docx`? |
| 08 · Docker | "En mi máquina funciona". ¿Cuántas horas de tu vida te ha costado esa frase? |
| 09 · Kubernetes | Tienes 200 contenedores y tres se caen cada hora. ¿Quién los levanta? |
| 10 · DevOps/MLOps | Un modelo con 99% de exactitud lleva ocho meses sin reentrenarse. ¿Sigue teniendo 99%? |
| 11 · Visión | ¿Qué ve exactamente una computadora cuando "ve" tu cara? |
| 12 · Visión aplicada | ¿Aceptarías que una cámara con IA decidiera si entras a un edificio? |
| 13 · Harness | Si el modelo es excelente, ¿por qué el agente igual falla? |
| 14 · Grafos | Cuando tienes cinco agentes trabajando a la vez, ¿quién resuelve el conflicto? |

## Dinámicas sugeridas

**Debate de dos bandos (módulos 02, 04, 12).** Divide el grupo. Un bando defiende la nube pública; el otro, la infraestructura propia. Quince minutos de preparación, diez de debate. El objetivo no es ganar sino que ambos lleguen al "depende de".

**Arquitectura en pizarra (módulos 03, 04, 09).** Da un requerimiento de negocio en una frase. Los equipos dibujan la arquitectura en cinco minutos. Después se comparan los dibujos: siempre son distintos y siempre es didáctico.

**Romper y reparar (módulos 07, 08, 09).** Entrega un repositorio o un manifiesto intencionalmente roto. La tarea es diagnosticar, no implementar. Enseña más que construir desde cero.

**Auditoría cruzada (módulos 10, 13, 14).** Cada equipo revisa el laboratorio de otro equipo buscando lo que falta verificar. Introduce naturalmente la idea de verificación independiente.

## Evaluación

El desglose completo, con rúbricas, está en [Evaluación y rúbricas](recursos/evaluacion.md). Resumen:

| Componente | Peso |
| --- | --- |
| Cuestionarios de cierre (14) | 20 % |
| Laboratorios entregados (10) | 40 % |
| Proyecto integrador | 30 % |
| Participación y auditorías cruzadas | 10 % |

## Errores comunes al impartir

!!! warning "No conviertas el laboratorio en una demo"
    Si el docente ejecuta los comandos en el proyector, el grupo mira. Si los ejecuta el grupo, el grupo aprende. El docente circula y desbloquea.

!!! warning "No dejes los bloques críticos para el final"
    Las secciones "Agua fría" de cada módulo son parte del contenido, no un apéndice. Un curso que solo vende ventajas produce arquitectos que no saben decir que no.

!!! warning "Cuidado con la brecha de entorno"
    El bloque IV se cae si los equipos llegan sin Docker instalado. Envía las instrucciones de instalación una semana antes y reserva los primeros 10 minutos de la sesión 08 para verificar entornos.

## Material descargable

- [Plantillas reutilizables](recursos/plantillas.md) — manifiestos, `Dockerfile`, `AGENTS.md`, matriz TOGAF.
- [Glosario](recursos/glosario.md) — para repartir impreso en la primera sesión.
- [Bibliografía](recursos/bibliografia.md) — fuentes primarias citadas en cada módulo.
