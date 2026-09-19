# Bibliografía y fuentes

Fuentes primarias citadas en el curso, organizadas por bloque. Se priorizan documentos originales, estándares y artículos de ingeniería sobre material divulgativo.

---

## Bloque I · Fundamentos de la nube

### Estándares y definiciones

- **NIST SP 800-145 · The NIST Definition of Cloud Computing** — [csrc.nist.gov](https://csrc.nist.gov/publications/detail/sp/800-145/final)
  Las once páginas que fijaron el vocabulario del sector. Las cinco características esenciales vienen de aquí.

### Marcos de arquitectura de proveedores

- **AWS Well-Architected Framework** — [aws.amazon.com](https://aws.amazon.com/architecture/well-architected/)
- **Microsoft Azure Well-Architected Framework** — [learn.microsoft.com](https://learn.microsoft.com/azure/well-architected/)
- **Google Cloud Architecture Framework** — [cloud.google.com](https://cloud.google.com/architecture/framework)

### Economía de la nube

- **FinOps Foundation · Framework** — [finops.org](https://www.finops.org/framework/)
- **Dropbox · Magic Pocket** — [dropbox.tech](https://dropbox.tech/infrastructure/magic-pocket-infrastructure)
  El caso documentado de migración inversa más citado.
- **CNCF Serverless Whitepaper** — [github.com/cncf](https://github.com/cncf/wg-serverless)

---

## Bloque II · Arquitectura y gobierno

### TOGAF y modelado

- **The Open Group · TOGAF Standard, 10th Edition** — [opengroup.org/togaf](https://www.opengroup.org/togaf)
- **TOGAF Library** — [publications.opengroup.org](https://publications.opengroup.org/togaf-library)
  Incluye las guías de configuración para entornos ágiles.
- **ArchiMate 3.2 Specification** — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/archimate32-doc/)
- **Architecture Decision Records** — [adr.github.io](https://adr.github.io/)

### Seguridad

- **NIST SP 800-207 · Zero Trust Architecture** — [csrc.nist.gov](https://csrc.nist.gov/publications/detail/sp/800-207/final)
- **AWS Shared Responsibility Model** — [aws.amazon.com](https://aws.amazon.com/compliance/shared-responsibility-model/)
- **OWASP Top 10** — [owasp.org](https://owasp.org/www-project-top-ten/)
- **OWASP Top 10 for LLM Applications** — [owasp.org](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
  La referencia sobre inyección de prompt y riesgos de aplicaciones con modelos de lenguaje.

### Gobierno de IA

- **NIST AI Risk Management Framework** — [nist.gov](https://www.nist.gov/itl/ai-risk-management-framework)
- **ISO/IEC 42001 · Sistemas de gestión de IA** — [iso.org](https://www.iso.org/standard/81230.html)

---

## Bloque III · Datos

### Libros y artículos fundacionales

- **Kleppmann, M. · Designing Data-Intensive Applications** — [dataintensive.net](https://dataintensive.net/)
  La referencia sobre sistemas de datos distribuidos.
- **Kreps, J. · The Log: What every software engineer should know** — [engineering.linkedin.com](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)
  El artículo que fundamenta la arquitectura Kappa.
- **Akidau, T. · Streaming 101 y 102** — [oreilly.com](https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/)
  La explicación definitiva de tiempo de evento y marcas de agua.

### Formatos y herramientas

- **Apache Iceberg** — [iceberg.apache.org](https://iceberg.apache.org/)
- **dbt · Model contracts** — [docs.getdbt.com](https://docs.getdbt.com/docs/collaborate/govern/model-contracts)

### Edge e IoT

- **NIST SP 500-325 · Fog Computing Conceptual Model** — [nist.gov](https://www.nist.gov/publications/fog-computing-conceptual-model)
- **MQTT 5.0 · Especificación OASIS** — [docs.oasis-open.org](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html)
- **LoRa Alliance** — [lora-alliance.org](https://lora-alliance.org/)
- **TinyML Foundation** — [tinyml.org](https://www.tinyml.org/)
- **OWASP IoT Top 10** — [owasp.org](https://owasp.org/www-project-internet-of-things/)
- **Google · Federated Learning** — [federated.withgoogle.com](https://federated.withgoogle.com/)

---

## Bloque IV · Ingeniería de plataforma

### Git

- **Chacon, S. y Straub, B. · Pro Git** — [git-scm.com/book/es](https://git-scm.com/book/es/v2)
  Gratuito y en español. El capítulo 10, sobre los internos de Git, es el más valioso.
- **Wiegley, J. · Git from the Bottom Up** — [jwiegley.github.io](https://jwiegley.github.io/git-from-the-bottom-up/)
- **Conventional Commits** — [conventionalcommits.org](https://www.conventionalcommits.org/es/)
- **Learn Git Branching** — [learngitbranching.js.org](https://learngitbranching.js.org/?locale=es_ES)
- **git-filter-repo** — [github.com/newren](https://github.com/newren/git-filter-repo)
- **DVC · Documentación** — [dvc.org/doc](https://dvc.org/doc)

### Contenedores

- **Docker · Documentación** — [docs.docker.com](https://docs.docker.com/)
- **Dockerfile best practices** — [docs.docker.com](https://docs.docker.com/build/building/best-practices/)
- **Open Container Initiative** — [opencontainers.org](https://opencontainers.org/)
- **Podman** — [podman.io](https://podman.io/)
- **Trivy** — [trivy.dev](https://trivy.dev/)
- **NVIDIA Container Toolkit** — [docs.nvidia.com](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/)

### Kubernetes

- **Kubernetes · Documentación (español)** — [kubernetes.io/es](https://kubernetes.io/es/docs/home/)
- **Ibryam, B. y Huß, R. · Kubernetes Patterns** — [k8spatterns.io](https://k8spatterns.io/)
- **Verma et al. · Large-scale cluster management at Google with Borg** — [research.google](https://research.google/pubs/pub43438/)
- **Kubernetes Failure Stories** — [k8s.af](https://k8s.af/)
  Colección de postmortems reales; la mejor forma de aprender los modos de fallo.
- **Kubeflow** — [kubeflow.org](https://www.kubeflow.org/)
- **KEDA** — [keda.sh](https://keda.sh/)

### DevOps y MLOps

- **Forsgren, Humble y Kim · Accelerate** — [itrevolution.com](https://itrevolution.com/product/accelerate/)
  La investigación detrás de las métricas DORA.
- **DORA · State of DevOps Report** — [dora.dev](https://dora.dev/)
- **Google · MLOps: Continuous delivery and automation pipelines in ML** — [cloud.google.com](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)
  El documento que define los niveles de madurez de MLOps.
- **Sculley et al. · Hidden Technical Debt in Machine Learning Systems** — [papers.nips.cc](https://papers.nips.cc/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html)
  El artículo fundacional sobre la deuda técnica específica de ML.
- **OpenGitOps · Principios** — [opengitops.dev](https://opengitops.dev/)
- **Google SRE Book** — [sre.google/books](https://sre.google/books/)
- **Evidently AI · ML in production** — [evidentlyai.com](https://www.evidentlyai.com/ml-in-production)

---

## Bloque V · Visión por computadora

### Fundamentos

- **CS231n · Convolutional Neural Networks for Visual Recognition (Stanford)** — [cs231n.github.io](https://cs231n.github.io/)
- **Goodfellow, Bengio y Courville · Deep Learning** — [deeplearningbook.org](https://www.deeplearningbook.org/)
- **Dive into Deep Learning** — [d2l.ai](https://d2l.ai/)
- **OpenCV · Tutoriales** — [docs.opencv.org](https://docs.opencv.org/4.x/d9/df8/tutorial_root.html)

### Artículos clave

- **He et al. · Deep Residual Learning for Image Recognition** — [arxiv.org/abs/1512.03385](https://arxiv.org/abs/1512.03385)
- **Dosovitskiy et al. · An Image is Worth 16x16 Words** — [arxiv.org/abs/2010.11929](https://arxiv.org/abs/2010.11929)
- **Radford et al. · CLIP** — [arxiv.org/abs/2103.00020](https://arxiv.org/abs/2103.00020)
- **Kirillov et al. · Segment Anything** — [arxiv.org/abs/2304.02643](https://arxiv.org/abs/2304.02643)
- **Guo et al. · On Calibration of Modern Neural Networks** — [arxiv.org/abs/1706.04599](https://arxiv.org/abs/1706.04599)

### Ética y evaluación

- **Buolamwini, J. y Gebru, T. · Gender Shades** — [gendershades.org](http://gendershades.org/)
  El estudio que estableció la obligación de evaluar por segmento.
- **Mitchell et al. · Model Cards for Model Reporting** — [arxiv.org/abs/1810.03993](https://arxiv.org/abs/1810.03993)
- **C2PA · Content Provenance and Authenticity** — [c2pa.org](https://c2pa.org/)
- **Partnership on AI · Responsible Practices** — [partnershiponai.org](https://partnershiponai.org/)

---

## Bloque VI · Sistemas agénticos

### Fuentes primarias

- **OpenAI · Harness engineering: leveraging Codex in an agent-first world** — [openai.com](https://openai.com/index/harness-engineering/)
  El informe del equipo que construyó un producto de aproximadamente un millón de líneas sin código escrito a mano.
- **Anthropic · Effective harnesses for long-running agents** — [anthropic.com](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
  Los patrones de fallo documentados y las soluciones de agente inicializador y lista de funcionalidades.
- **Anthropic · Building Effective Agents** — [anthropic.com](https://www.anthropic.com/engineering/building-effective-agents)
  La distinción autoritativa entre workflow y agente, y los cinco patrones base.

### Material didáctico

- **Learn Harness Engineering** — [walkinglabs.github.io](https://walkinglabs.github.io/learn-harness-engineering/es/)
  Curso completo en español sobre harness y graph engineering. La estructura y el enfoque pedagógico de este repositorio se inspiran en él.
- **AGENTS.md** — [agents.md](https://agents.md/)

### Loops y grafos

- **Osmani, A. · Loop Engineering** — [addyosmani.com](https://addyosmani.com/blog/loop-engineering/)
- **Osmani, A. · The Orchestration Tax** — [addyosmani.com](https://addyosmani.com/blog/orchestration-tax/)
- **Prefect · Loops vs. Graphs** — [prefect.io](https://www.prefect.io/blog/loops-vs-graphs)
- **LangGraph · Documentación** — [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/graph-api)
- **LangChain · The Best AI Agent Frameworks** — [langchain.com](https://www.langchain.com/resources/ai-agent-frameworks)

---

## Nota sobre las fuentes

!!! warning "Verifica antes de citar"
    Varias cifras que circulan sobre ingeniería de grafos y sobre rendimiento de agentes provienen de artículos que no tratan del tema o que comparan contra líneas base distintas. El [módulo 14](../modulos/14-graph-engineering.md) documenta un caso concreto.

    La regla del curso es la misma que se aplica a los modelos: **si no puedes rastrear el número hasta su fuente original, no lo uses.**

!!! note "Sobre el material de referencia"
    Este repositorio toma su formato y enfoque pedagógico del curso [Learn Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/es/), de WalkingLabs. El contenido, los casos y los laboratorios son originales de este curso. El repositorio de referencia no fue modificado de ninguna forma.
