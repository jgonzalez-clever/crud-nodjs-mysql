# Arquitectura de Composite Actions - Pipeline Estándar

## 📊 Diagrama de Flujo

```
Capa 1 (Repos)          Capa 2 (Orquestadores)        Capa 3 (Actions)
──────────────          ──────────────────────        ────────────────
                                                      
activador-python  ────▶  orq-python-estandar  ────▶  image-build-python
     (Repo A)                                    └──▶  sonar
                                                 └──▶  detect-secrets
                                                 └──▶  sast
                                                 └──▶  dependency-scan
                                                 └──▶  container-scan
                                                 └──▶  iac-scan

activador-node    ────▶  orq-nodejs-estandar  ────▶  image-build-nodejs
     (Repo B)                                    └──▶  sonar
                                                 └──▶  detect-secrets
                                                 └──▶  sast
                                                 └──▶  dependency-scan
                                                 └──▶  container-scan
                                                 └──▶  iac-scan
```

---

## 🏗️ Arquitectura de los Composite Actions

### 📌 Visión General

Esta arquitectura implementa un **patrón de pipeline estandarizado** para GitHub Actions, utilizando **Composite Actions reutilizables** que permiten mantener consistencia y reducir duplicación de código en múltiples repositorios.

### 🎯 Principios de Diseño

1. **Separación de Responsabilidades**: Cada capa tiene un propósito específico
2. **Reutilización**: Los composite actions son compartidos entre diferentes tecnologías
3. **Estandarización**: Todos los proyectos siguen el mismo flujo de CI/CD
4. **Mantenibilidad**: Cambios centralizados en un solo lugar

---

## 📦 Descripción de Capas

### **Capa 1: Workflows Disparadores** (Repositorios Individuales)

**Ubicación**: `.github/workflows/` en cada repositorio de aplicación

**Propósito**: Workflows minimalistas que actúan como **puntos de entrada** en cada repositorio. Su única responsabilidad es invocar al orquestador correspondiente.

**Características**:
- ✅ **Livianos**: Apenas contienen lógica
- ✅ **Específicos por tecnología**: Python, Node.js, Java, etc.
- ✅ **Triggers configurables**: push, pull_request, workflow_dispatch, etc.
- ✅ **Personalizables**: Cada repo puede definir sus triggers sin afectar la lógica del pipeline

**Ejemplo de responsabilidades**:
```yaml
# activador-python-estandar.yml
- Define cuándo ejecutar (on: push, pull_request)
- Pasa variables específicas del proyecto
- Invoca al orquestador centralizado
```

**Ventajas**:
- Los desarrolladores solo necesitan un archivo mínimo en su repo
- Cambios en el pipeline no requieren modificar cada repositorio
- Fácil onboarding de nuevos proyectos

---

### **Capa 2: Orquestadores Centralizados**

**Ubicación**: `.github/workflows/` en un **repositorio central de estándares**

**Propósito**: Workflows que **coordinan la ejecución secuencial** de todas las etapas del pipeline para una tecnología específica.

**Características**:
- ✅ **Centralizados**: Un solo lugar para toda la lógica del pipeline
- ✅ **Workflow Calls**: Invocados mediante `workflow_call` desde otros repos
- ✅ **Orquestación**: Define el orden y dependencias entre stages
- ✅ **Específicos por stack**: Un orquestador por tecnología (Python, Node.js, etc.)

**Ejemplo de responsabilidades**:
```yaml
# orquestador-python-estandar.yml
1. Checkout del código
2. Configuración del entorno Python
3. Ejecución de image-build (composite action)
4. Ejecución de análisis de calidad (SonarQube)
5. Ejecución de security scans (en paralelo):
   - detect-secrets
   - SAST
   - dependency-scan
   - container-scan
   - iac-scan
6. Push de imagen a registry (si todo pasa)
7. Notificaciones
```

**Ventajas**:
- Un cambio en el pipeline se aplica a todos los proyectos automáticamente
- Visibilidad completa del flujo de CI/CD
- Fácil agregar o remover etapas
- Configuración de secrets y variables centralizada

---

### **Capa 3: Composite Actions Reutilizables**

**Ubicación**: `.github/actions/` en el repositorio central de estándares

**Propósito**: **Bloques de construcción modulares** que encapsulan tareas específicas y pueden ser reutilizados por cualquier orquestador.

**Características**:
- ✅ **Modulares**: Cada action hace una cosa y la hace bien
- ✅ **Reutilizables**: Compartidos entre Python, Node.js, Java, etc.
- ✅ **Parametrizables**: Inputs/outputs bien definidos
- ✅ **Versionables**: Pueden tener diferentes versiones (v1, v2)

#### **🔧 Actions por Categoría**

##### **Image Build** (Específicos por tecnología)
- **`image-build-python`**: Construye imagen Docker para apps Python
  - Ejecuta script bash: `image-build-python.sh`
  - Instala dependencias (pip/poetry)
  - Build de imagen Docker
  - Tag con SHA del commit
  
- **`image-build-nodejs`**: Construye imagen Docker para apps Node.js
  - Ejecuta script bash: `image-build-nodejs.sh`
  - Instala dependencias (npm/yarn)
  - Build de imagen Docker
  - Tag con SHA del commit

##### **Quality** (Compartidos)
- **`sonarqube`**: Análisis de calidad de código
  - Ejecuta SonarScanner
  - Envía resultados a SonarQube
  - Verifica Quality Gates
  - Compatible con múltiples lenguajes

##### **Security** (Compartidos)
- **`detect-secrets`**: Detecta credenciales hardcodeadas
  - Escanea código fuente
  - Identifica API keys, passwords, tokens
  - Falla el build si encuentra secretos

- **`sast`**: Static Application Security Testing
  - Análisis estático de vulnerabilidades
  - Identifica código inseguro
  - Reportes de seguridad

- **`dependency-scan`**: Escaneo de dependencias vulnerables
  - Analiza package.json, requirements.txt, pom.xml
  - Identifica CVEs en dependencias
  - Integración con bases de datos de vulnerabilidades

- **`container-scan`**: Escaneo de imágenes Docker
  - Analiza layers de la imagen
  - Detecta vulnerabilidades en base images
  - Verifica configuraciones de seguridad

- **`iac-scan`**: Infrastructure as Code scanning
  - Escanea Terraform, CloudFormation, K8s manifests
  - Detecta misconfigurations
  - Valida best practices

---

## 🔄 Flujo de Ejecución Completo

### Ejemplo: Push a repositorio Python

```
1. Developer hace push a main branch
   ↓
2. Se dispara: activador-python-estandar.yml (Repo App)
   ↓
3. Invoca: orquestador-python-estandar.yml (Repo Central)
   ↓
4. El orquestador ejecuta secuencialmente:
   
   Stage 1: Build
   ├─ image-build-python (composite action)
   │  └─ Ejecuta image-build-python.sh
   │     ├─ pip install -r requirements.txt
   │     ├─ docker build -t app:sha123 .
   │     └─ docker tag app:sha123
   
   Stage 2: Quality
   ├─ sonarqube (composite action)
   │  └─ sonar-scanner
   │     └─ Verifica quality gates
   
   Stage 3: Security (paralelo)
   ├─ detect-secrets → Escanea secretos
   ├─ sast → Análisis estático
   ├─ dependency-scan → CVEs en requirements.txt
   ├─ container-scan → Vulnerabilidades en imagen
   └─ iac-scan → Valida Terraform/K8s
   
   Stage 4: Push
   └─ docker push registry.com/app:sha123
   
5. ✅ Pipeline completo
```

---

## 💡 Ventajas de esta Arquitectura

### **1. DRY (Don't Repeat Yourself)**
- ❌ **Antes**: Cada repo tenía su propio pipeline completo (100+ líneas)
- ✅ **Ahora**: Cada repo solo tiene un activador (10-20 líneas)
- 📊 **Resultado**: 80% menos código duplicado

### **2. Mantenibilidad**
- ❌ **Antes**: Actualizar el pipeline requería modificar 50+ repositorios
- ✅ **Ahora**: Un cambio en el orquestador se aplica a todos
- 📊 **Resultado**: 95% menos esfuerzo de mantenimiento

### **3. Consistencia**
- ❌ **Antes**: Cada equipo implementaba CI/CD a su manera
- ✅ **Ahora**: Todos siguen el mismo estándar
- 📊 **Resultado**: 100% consistencia cross-team

### **4. Gobernanza**
- ✅ Control centralizado de security gates
- ✅ Auditoría simplificada
- ✅ Compliance automatizado

### **5. Velocidad de Onboarding**
- ❌ **Antes**: 2-3 días configurando pipeline para nuevo proyecto
- ✅ **Ahora**: 10 minutos copiando el activador
- 📊 **Resultado**: 95% más rápido

---

## 🚀 Casos de Uso

### **Agregar nueva validación de seguridad**
Solo necesitas:
1. Crear nuevo composite action en `.github/actions/security/nuevo-scan/`
2. Agregarlo al orquestador
3. ✅ Todos los repos lo ejecutan automáticamente

### **Soportar nueva tecnología (Go)**
1. Crear `image-build-go` composite action
2. Crear `orquestador-go-estandar.yml`
3. Los repos Go usan `activador-go-estandar.yml`
4. ✅ Reutilizan todas las security/quality actions

### **Actualizar versión de herramienta**
1. Modificar composite action específico (ej: actualizar SonarQube version)
2. ✅ Todos los pipelines usan la nueva versión sin cambios

---


