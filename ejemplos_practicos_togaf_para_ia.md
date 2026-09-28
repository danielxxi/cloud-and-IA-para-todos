# Ejemplos Prácticos de Aplicación de TOGAF para Proyectos de Inteligencia Artificial

---

## Ejemplo 1: IA Generativa (Asistente RAG para Contratos Legales en una Multinacional)

### Fase A · Visión
* **Capacidad:** Reducir el tiempo de búsqueda y redacción de borradores de respuestas contractuales mediante un sistema RAG (*Retrieval-Augmented Generation*).
* **Lo que explícitamente NO es:** Un sistema autónomo que firme o tome decisiones legales vinculantes. Es un sistema que **sugiere y redacta borradores**.
* **Interesados:** Vicepresidencia Jurídica, Dirección de Operaciones, TI, Oficial de Cumplimiento (GDPR/Compliance) y Proveedor del LLM.
* **Métrica de negocio:** Reducir el tiempo promedio de primera revisión contractual de 4 días a 2 horas.

> *Este reencuadre —de "reemplazar abogados" a "generar borradores acelerados"— mitiga el riesgo de alucinación legal y elimina responsabilidades directas sobre el modelo.*

---

### Fase B · Negocio

```
[Solicitud de Contrato] ➔ [Buscador RAG (Base de Conocimiento)] ➔ [Modelo GenAI redacta borrador] ➔ [Abogado revisa y aprueba] ➔ [Emisión del documento]
```

*El abogado sigue siendo el responsable final de aprobar o editar el documento generado. Ninguna decisión contractual se emite de forma automática.*

---

### Fase C · Datos y Aplicación

| Aspecto | Definición |
| :--- | :--- |
| **Entidad principal** | Repositorio de contratos vigentes e históricos (PDF/Docx) |
| **Propietario del dato** | Jefatura del Departamento Legal |
| **Clasificación** | Información confidencial y secreto comercial |
| **Anonymization / Masking** | Filtrado obligatorio de PII (nombres, importes, cuentas) mediante regex/NER antes de enviar fragmentos (*chunks*) al LLM |
| **Linaje** | Documento fuente ➔ Chunking/Embeddings ➔ Vector DB ➔ Contexto Prompt ➔ Borrador Generado |
| **Retención de inferencias** | Auditoría de respuestas generadas guardada por 3 años |
| **Sesgo / Rango conocido** | El modelo tiende a alucinar clausulado en legislación no local; se documenta restringiendo la base de conocimiento únicamente a jurisprudencia interna |

---

### Fase D · Tecnología

| Requisito | Decisión |
| :--- | :--- |
| **Privacidad de datos** | Ningún dato puede alimentar el entrenamiento público de un LLM. Se usa un modelo hospedado en VPC privada dedicada. |
| **Tiempo de respuesta** | Inferencias en menos de 10 segundos por consulta contractual. |
| **Disponibilidad** | Si falla la API del LLM, el sistema cae en modo degradado devolviendo solo los documentos recuperados por la Vector DB sin resumir. |
| **Auditabilidad** | Registro inmutable en base de datos con el prompt exacto enviado, los chunks citados y la versión del modelo/temperatura. |

---

### Fase E-F · Transiciones
1. **Transición 1:** El modelo genera borradores en la sombra (*shadow mode*) en paralelo al trabajo del equipo legal para medir la tasa de alucinaciones durante 6 semanas.
2. **Transición 2:** Habilitación del asistente solo para contratos estándar de confidencialidad (NDA), bajo la supervisión de un abogado sénior.
3. **Destino:** Despliegue total para todo tipo de contratos, con evaluación semestral de precisión de recuperador (RAG) y revisión del comité de privacidad.

---

### Fase G · Gobierno
El Consejo de Arquitectura y el área de Cumplimiento validan la lista de verificación. La **línea base no-IA** era la búsqueda manual por palabras clave en repositorios compartidos. El modelo debe demostrar una reducción de tiempo del 80% manteniendo cero alucinaciones críticas comprobadas estadísticamente.

---
---

## Ejemplo 2: IA Agéntica (Agente Autónomo de Soporte y Edición de Repositorios de Código)

### Fase A · Visión
* **Capacidad:** Resolver *tickets* sencillos de *bugs* en proyectos de software, editando el repositorio local y ejecutando pruebas unitarias automáticamente en el entorno de desarrollo.
* **Lo que explícitamente NO es:** Un desarrollador que haga despliegues autónomos a producción (*Production Deploy*). Es un agente que **crea una rama local y propone un Pull Request (PR)**.
* **Interesados:** Líder de Desarrollo, Equipo de Ciberseguridad, Operaciones TI (DevOps) y desarrolladores *Core*.
* **Métrica de negocio:** Reducir el tiempo de atención de *bugs* menores (*backlog triage*) de 3 días a 15 minutos.

> *Reencuadrar la IA Agéntica como un creador de PRs (y no como un desplegador directo) elimina el riesgo de corrupción del código en producción y agiliza la aprobación de seguridad.*

---

### Fase B · Negocio

```
[Ticket de bug asignado] ➔ [Agente clona repositorio/crea rama] ➔ [Agente edita código y ejecuta tests] ➔ [Pruebas pasan] ➔ [Agente abre Pull Request] ➔ [Humano revisa y hace Merge]
```

*El agente ejecuta herramientas locales (lectura de archivos, edición, comandos de terminal), pero el desarrollador humano es quien autoriza la integración a la rama principal.*

---

### Fase C · Datos y Aplicación

| Aspecto | Definición |
| :--- | :--- |
| **Entidad principal** | Repositorio de código fuente local y *logs* de prueba |
| **Propietario del dato** | Jefatura de Ingeniería de Software |
| **Clasificación** | Propiedad intelectual crítica de la empresa |
| **Anonymization / Sanitization** | Bloqueo estricto de credenciales en variables de entorno (`.env`, llaves API) antes de pasar archivos al contexto del agente |
| **Linaje** | Prompt del Ticket ➔ Lectura de código ➔ Plan de acción (Tool Call) ➔ Diff generado ➔ Log de ejecución de tests |
| **Retención de inferencias** | Registro de trazas de pensamiento (*Reasoning traces*) retenido por 1 año para auditoría de código |
| **Riesgo / Limitación conocida** | El agente puede entrar en bucles infinitos de corrección si un test falla; se establece un límite estricto de 3 intentos antes de abortar |

---

### Fase D · Tecnología

| Requisito | Decisión |
| :--- | :--- |
| **Seguridad de ejecución** | El agente solo puede ejecutar comandos dentro de un contenedor Docker aislado en la máquina local (*Sandboxing*). |
| **Rendimiento y Rate Limit** | Uso de API con límite de peticiones controlado para no sobrepasar la cuota del proveedor de inferencia (ej. max 15 req/min). |
| **Disponibilidad** | Si la API del agente no responde, la tarea vuelve a la cola manual de los desarrolladores sin interrumpir el flujo de CI/CD. |
| **Auditabilidad** | *Logs* inmutables que registran cada comando enviado a la terminal y cada archivo modificado por el agente. |

---

### Fase E-F · Transiciones
1. **Transición 1:** El agente opera en modo de solo lectura (analiza el código y propone la solución en texto sin modificar archivos) durante 4 semanas.
2. **Transición 2:** El agente modifica archivos locales y ejecuta *tests* únicamente en un repositorio de prueba (*sandbox*).
3. **Destino:** Integración con la plataforma de desarrollo local para creación de PRs reales, con revisión obligatoria por un par humano.

---

### Fase G · Gobierno
El Comité de Arquitectura y Seguridad establece la regla de oro: **"Cero permisos de escritura directa en la rama principal (`main`)"**. La línea base no-IA es la asignación manual a desarrolladores Junior. El agente agéntico debe superar la línea base en velocidad de resolución de *bugs* manteniendo un porcentaje de aprobación de PRs superior al 85%.