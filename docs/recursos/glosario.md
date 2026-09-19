# Glosario

Términos del curso, con el módulo donde se tratan.

## A

**ADM (Architecture Development Method)** · [M03](../modulos/03-togaf-ia.md)
: Ciclo iterativo de nueve fases que constituye el núcleo de TOGAF.

**ADR (Architecture Decision Record)** · [M03](../modulos/03-togaf-ia.md)
: Registro breve y versionado de una decisión de arquitectura, sus alternativas y consecuencias.

**AIOps** · [M10](../modulos/10-devops-mlops.md)
: Uso de IA para detectar, correlacionar, diagnosticar y remediar en la operación de sistemas.

**Ancla** · [M14](../modulos/14-graph-engineering.md)
: Mecanismo que fija un loop al mundo real: resultado de negocio, verdad de referencia, muestreo manual.

**Arista** · [M14](../modulos/14-graph-engineering.md)
: Conexión entre nodos de un grafo; expresa paralelismo, condición, reintento o retroceso.

**Arquitectura de transición** · [M03](../modulos/03-togaf-ia.md)
: Estado intermedio entre línea base y destino, que debe ser operable y útil por sí mismo.

**Arranque en frío** · [M02](../modulos/02-modelos-servicio.md)
: Latencia adicional en la primera invocación de una función serverless inactiva.

**Aumento de datos** · [M11](../modulos/11-vision-fundamentos.md)
: Transformaciones que amplían artificialmente el conjunto de entrenamiento.

## B

**Barrera de protección (*guardrail*)** · [M04](../modulos/04-arquitectura-seguridad.md)
: Control automático preventivo, detectivo o correctivo que hace cumplir una política.

**BDAT** · [M03](../modulos/03-togaf-ia.md)
: Los cuatro dominios de TOGAF: negocio, datos, aplicación y tecnología.

**Big Data** · [M05](../modulos/05-big-data.md)
: Conjunto de datos cuyo volumen, velocidad o variedad supera la capacidad de las herramientas convencionales.

**Blob / tree / commit** · [M07](../modulos/07-git.md)
: Los objetos del modelo de datos de Git: contenido, estructura e instantánea con metadatos.

## C

**CaaS** · [M02](../modulos/02-modelos-servicio.md)
: Contenedores como servicio; orquestación gestionada con portabilidad real entre proveedores.

**Calibración** · [M12](../modulos/12-vision-aplicaciones.md)
: Correspondencia entre la confianza declarada por un modelo y su frecuencia real de acierto.

**CALMS** · [M10](../modulos/10-devops-mlops.md)
: Cultura, automatización, eficiencia (*lean*), medición y compartir.

**CAP / PACELC** · [M05](../modulos/05-big-data.md)
: Intercambios entre consistencia, disponibilidad y latencia en sistemas distribuidos.

**CapEx / OpEx** · [M01](../modulos/01-fundamentos-nube.md)
: Inversión de capital amortizada frente a gasto operativo variable del periodo.

**cgroups** · [M08](../modulos/08-docker.md)
: Mecanismo del núcleo Linux que limita los recursos de un proceso.

**CI / CD** · [M10](../modulos/10-devops-mlops.md)
: Integración continua; entrega continua (puede desplegarse) o despliegue continuo (se despliega).

**Commit atómico** · [M07](../modulos/07-git.md)
: Un commit por cambio lógico.

**Computación en la nube** · [M01](../modulos/01-fundamentos-nube.md)
: Entrega de servicios de cómputo por internet, bajo demanda, con pago por consumo.

**Contenedor** · [M08](../modulos/08-docker.md)
: Proceso aislado mediante namespaces, cgroups y un sistema de archivos en capas.

**Contrato de datos** · [M05](../modulos/05-big-data.md)
: Acuerdo versionado entre productor y consumidor sobre esquema, calidad y política de cambios.

**Convolución** · [M11](../modulos/11-vision-fundamentos.md)
: Producto de un núcleo por una vecindad de píxeles, desplazado por toda la imagen.

**Cortacircuitos (*circuit breaker*)** · [M04](../modulos/04-arquitectura-seguridad.md)
: Patrón que deja de llamar a un servicio caído para evitar el fallo en cascada.

**Cuantización** · [M06](../modulos/06-edge-iot.md)
: Reducción de la precisión numérica de los pesos para acelerar y aligerar un modelo.

## D

**Data Lake / Warehouse / Lakehouse** · [M05](../modulos/05-big-data.md)
: Almacenamiento flexible y barato / analítico y estructurado / la combinación mediante formatos de tabla abiertos.

**Defensa en profundidad** · [M04](../modulos/04-arquitectura-seguridad.md)
: Controles de seguridad en capas, de modo que la falla de uno no comprometa el sistema.

**Degradación elegante** · [M04](../modulos/04-arquitectura-seguridad.md)
: Devolver un resultado reducido en lugar de un error cuando falla una dependencia.

**Deriva (datos / conceptual / predicción / esquema)** · [M10](../modulos/10-devops-mlops.md)
: Los cuatro tipos de cambio que degradan un modelo en producción.

**Despliegue canary / shadow** · [M09](../modulos/09-kubernetes.md)
: Enviar una fracción real del tráfico frente a enviar una copia cuya salida se descarta.

**DevOps** · [M10](../modulos/10-devops-mlops.md)
: Eliminación del muro entre desarrollo y operación mediante responsabilidad compartida.

**Deuda de verificación** · [M13](../modulos/13-harness-engineering.md)
: Brecha entre lo que se aceptó y lo que se comprobó mecánicamente.

**Dependencia del proveedor (*vendor lock-in*)** · [M02](../modulos/02-modelos-servicio.md)
: Costo de migrar fuera de un proveedor; no se elimina, se dimensiona y se negocia.

**DORA (métricas)** · [M10](../modulos/10-devops-mlops.md)
: Frecuencia de despliegue, tiempo de entrega, tasa de fallo de cambios y tiempo de restauración.

## E

**Edge computing** · [M06](../modulos/06-edge-iot.md)
: Procesamiento en el punto de generación de los datos o muy cerca de él.

**Egress** · [M01](../modulos/01-fundamentos-nube.md)
: Transferencia de datos hacia afuera del proveedor; principal costo oculto.

**Elasticidad** · [M01](../modulos/01-fundamentos-nube.md)
: Capacidad de crecer **y reducirse** automáticamente. Distinta de escalabilidad.

**ETL / ELT** · [M05](../modulos/05-big-data.md)
: Transformar antes de cargar frente a cargar crudo y transformar dentro del almacén.

## F

**FaaS / serverless** · [M02](../modulos/02-modelos-servicio.md)
: Ejecución de código por evento, con escalado a cero y pago por milisegundo.

**Feature store** · [M10](../modulos/10-devops-mlops.md)
: Definición única de características materializada en un almacén offline y otro online.

**FinOps** · [M02](../modulos/02-modelos-servicio.md)
: Práctica de atribuir el costo de la nube a quien lo genera.

**Fog computing** · [M06](../modulos/06-edge-iot.md)
: Capa intermedia de coordinación entre muchos nodos de borde y la nube.

**Forma exec / forma shell** · [M08](../modulos/08-docker.md)
: `CMD ["a","b"]` frente a `CMD a b`; la primera recibe señales correctamente.

**Fuga de datos** · [M11](../modulos/11-vision-fundamentos.md)
: Información del conjunto de prueba que influyó en el entrenamiento.

## G

**Git** · [M07](../modulos/07-git.md)
: Sistema de control de versiones distribuido con almacenamiento direccionado por contenido.

**GitOps** · [M10](../modulos/10-devops-mlops.md)
: Infraestructura declarada en Git y reconciliada continuamente por un agente.

**Goodhart (ley de)** · [M14](../modulos/14-graph-engineering.md)
: Cuando una medida se convierte en objetivo, deja de ser una buena medida.

**Grad-CAM** · [M11](../modulos/11-vision-fundamentos.md)
: Mapa de calor que indica qué regiones de la imagen influyeron en la predicción.

**Graph Engineering** · [M14](../modulos/14-graph-engineering.md)
: Organización de agentes, loops, herramientas y evaluadores en un grafo explícito.

**Gravedad de los datos** · [M01](../modulos/01-fundamentos-nube.md)
: Tendencia de aplicaciones y servicios a migrar hacia donde residen los datos.

## H

**Harness** · [M13](../modulos/13-harness-engineering.md)
: Sistema de entorno, estado, verificación y control dentro del cual opera un agente.

**HPA / VPA / KEDA** · [M09](../modulos/09-kubernetes.md)
: Escaladores de réplicas, de recursos y por eventos externos.

## I

**IaaS** · [M02](../modulos/02-modelos-servicio.md)
: Infraestructura virtualizada; administras del sistema operativo hacia arriba.

**IAM** · [M04](../modulos/04-arquitectura-seguridad.md)
: Gestión de identidades y accesos; origen de la mayoría de los incidentes relevantes.

**Idempotencia** · [M05](../modulos/05-big-data.md)
: Ejecutar una operación varias veces produce el mismo resultado.

**Imagen (contenedor)** · [M08](../modulos/08-docker.md)
: Plantilla inmutable de solo lectura formada por capas.

**Impuesto de orquestación** · [M14](../modulos/14-graph-engineering.md)
: Arrancar agentes es barato, revisar sus resultados es caro; tu atención es serial.

**initContainer** · [M09](../modulos/09-kubernetes.md)
: Contenedor que se ejecuta y termina antes que los contenedores principales del Pod.

**Inyección de prompt** · [M04](../modulos/04-arquitectura-seguridad.md), [M13](../modulos/13-harness-engineering.md)
: Contenido no confiable procesado por un modelo que actúa como instrucción.

**IoT** · [M06](../modulos/06-edge-iot.md)
: Red de objetos físicos con sensores, cómputo y conectividad.

**IoU** · [M11](../modulos/11-vision-fundamentos.md)
: Intersección sobre unión; métrica de solapamiento entre cajas o máscaras.

## K–L

**Kubernetes** · [M09](../modulos/09-kubernetes.md)
: Orquestador que mantiene continuamente el estado real igual al estado declarado.

**Lambda / Kappa** · [M05](../modulos/05-big-data.md)
: Arquitecturas de procesamiento con rutas paralelas de lotes y flujo, o con una sola ruta de flujo.

**LoRaWAN** · [M06](../modulos/06-edge-iot.md)
: Red de área amplia de bajo consumo y bajo ancho de banda, con alcance de kilómetros.

**Loop Engineering** · [M13](../modulos/13-harness-engineering.md), [M14](../modulos/14-graph-engineering.md)
: Diseñar el sistema que hace prompting al agente, en lugar de hacerlo tú.

## M

**Marca de agua (*watermark*)** · [M05](../modulos/05-big-data.md)
: Estimación del avance del tiempo de evento que permite cerrar ventanas.

**Medallón (arquitectura de)** · [M05](../modulos/05-big-data.md)
: Organización en zonas bronce (crudo inmutable), plata (limpio) y oro (modelado).

**MLOps** · [M10](../modulos/10-devops-mlops.md)
: DevOps para sistemas que aprenden; versiona código, datos y modelo juntos.

**Model card** · [M12](../modulos/12-vision-aplicaciones.md)
: Ficha documental de un modelo con uso previsto, limitaciones y métricas por segmento.

**Modelo fundacional** · [M12](../modulos/12-vision-aplicaciones.md)
: Modelo grande entrenado a escala web, adaptable a muchas tareas.

**MQTT** · [M06](../modulos/06-edge-iot.md)
: Protocolo de publicación/suscripción ligero, estándar de facto en IoT.

**Multi-tenencia** · [M01](../modulos/01-fundamentos-nube.md)
: Varios clientes comparten la misma infraestructura física con aislamiento lógico.

## N–O

**Namespaces (Linux)** · [M08](../modulos/08-docker.md)
: Mecanismo del núcleo que da a un proceso su propia vista de PIDs, red y sistema de archivos.

**NetworkPolicy** · [M09](../modulos/09-kubernetes.md)
: Cortafuegos a nivel de Pod; sin ella, todo se comunica con todo.

**NIST (cinco características)** · [M01](../modulos/01-fundamentos-nube.md)
: Autoservicio bajo demanda, acceso amplio por red, agrupación de recursos, elasticidad rápida y servicio medido.

**NMS** · [M11](../modulos/11-vision-fundamentos.md)
: Supresión no máxima; elimina detecciones duplicadas del mismo objeto.

**Nodo (grafo)** · [M14](../modulos/14-graph-engineering.md)
: Unidad de trabajo con una responsabilidad; puede ser código, herramienta, agente o humano.

**OCI** · [M08](../modulos/08-docker.md)
: Estándares de imagen, runtime y distribución que garantizan portabilidad entre herramientas.

**OOMKilled** · [M09](../modulos/09-kubernetes.md)
: Terminación de un contenedor por superar su límite de memoria.

## P

**PaaS** · [M02](../modulos/02-modelos-servicio.md)
: Entorno de ejecución gestionado; administras aplicación y datos.

**Pantano de datos (*data swamp*)** · [M05](../modulos/05-big-data.md)
: Lago sin catálogo, linaje ni propietarios.

**Parquet** · [M05](../modulos/05-big-data.md)
: Formato columnar binario; estándar para analítica sobre almacenamiento de objetos.

**Pod** · [M09](../modulos/09-kubernetes.md)
: Unidad mínima desplegable; contenedores que comparten red, almacenamiento y ciclo de vida.

**PodDisruptionBudget** · [M09](../modulos/09-kubernetes.md)
: Mínimo de réplicas que debe sobrevivir a una interrupción voluntaria.

**Precisión / exhaustividad** · [M12](../modulos/12-vision-aplicaciones.md)
: De lo que marqué cuánto era correcto / de lo que existía cuánto encontré.

**Presupuesto de error** · [M10](../modulos/10-devops-mlops.md)
: Margen de fallo permitido; $100\% - \text{SLO}$.

## R

**Rama (Git)** · [M07](../modulos/07-git.md)
: Puntero móvil a un commit; crearla cuesta 41 bytes.

**Rebase** · [M07](../modulos/07-git.md)
: Reaplicar commits creando otros nuevos; produce historial lineal y reescribe hashes.

**Reconciliación declarativa** · [M09](../modulos/09-kubernetes.md)
: El sistema compara continuamente el estado real con el deseado y corrige la diferencia.

**Reflog** · [M07](../modulos/07-git.md)
: Registro de los movimientos de `HEAD`; red de seguridad para recuperar trabajo.

**Requests / limits** · [M09](../modulos/09-kubernetes.md)
: Recursos garantizados frente a máximo permitido.

**Residual (conexión)** · [M11](../modulos/11-vision-fundamentos.md)
: $y = F(x) + x$; permite entrenar redes muy profundas.

**Responsabilidad compartida** · [M04](../modulos/04-arquitectura-seguridad.md)
: El proveedor asegura la nube; el cliente asegura lo que pone en ella.

**Rightsizing** · [M02](../modulos/02-modelos-servicio.md)
: Ajustar el tamaño de los recursos al consumo medido, no al estimado.

**RTO / RPO** · [M04](../modulos/04-arquitectura-seguridad.md)
: Tiempo máximo de interrupción y pérdida máxima de datos aceptables.

## S

**SaaS** · [M02](../modulos/02-modelos-servicio.md)
: Software terminado por suscripción; administras únicamente tus datos y configuración.

**Separación generador-evaluador** · [M13](../modulos/13-harness-engineering.md)
: Quien hace el trabajo no lo califica; el verificador tiene contexto nuevo.

**Service (Kubernetes)** · [M09](../modulos/09-kubernetes.md)
: Abstracción estable de red sobre un conjunto cambiante de Pods.

**Sesgo entrenamiento-servicio** · [M10](../modulos/10-devops-mlops.md)
: Discrepancia entre cómo se calcula una característica al entrenar y al inferir.

**Sidecar** · [M09](../modulos/09-kubernetes.md)
: Contenedor auxiliar que acompaña al principal durante toda su vida.

**SLA / SLI / SLO** · [M01](../modulos/01-fundamentos-nube.md), [M10](../modulos/10-devops-mlops.md)
: Compromiso contractual / indicador medido / objetivo sobre el indicador.

**Sondas (startup, liveness, readiness)** · [M08](../modulos/08-docker.md), [M09](../modulos/09-kubernetes.md)
: ¿Terminó de arrancar? ¿Sigue vivo? ¿Puede atender peticiones?

## T–Z

**TinyML** · [M06](../modulos/06-edge-iot.md)
: Machine learning en microcontroladores con kilobytes de memoria.

**TOGAF** · [M03](../modulos/03-togaf-ia.md)
: Marco de arquitectura empresarial de The Open Group.

**Transfer learning** · [M11](../modulos/11-vision-fundamentos.md)
: Reutilizar un modelo preentrenado adaptando sus últimas capas.

**Volumen (Docker/K8s)** · [M08](../modulos/08-docker.md)
: Almacenamiento gestionado que sobrevive al contenedor.

**Worktree** · [M07](../modulos/07-git.md)
: Directorio de trabajo adicional sobre el mismo repositorio.

**Zero Trust** · [M04](../modulos/04-arquitectura-seguridad.md)
: Verificar explícitamente, privilegio mínimo, asumir la brecha.

**Zona de disponibilidad** · [M04](../modulos/04-arquitectura-seguridad.md)
: Centro de datos independiente dentro de una región; unidad básica de alta disponibilidad.

**6 R (las)** · [M04](../modulos/04-arquitectura-seguridad.md)
: Rehospedar, replataformar, recomprar, refactorizar, retirar, retener.
