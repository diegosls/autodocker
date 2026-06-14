# 🐳 AutoDocker - Sistema de Monitoramento e Atualização Automática de Containers

O **AutoDocker** é um sistema desenvolvido para a disciplina de **Virtualização**, que automatiza o monitoramento de imagens Docker em um registry e realiza atualização automática de containers quando uma nova versão é detectada.

O projeto simula um sistema semelhante ao **Watchtower**, aplicando conceitos de automação, virtualização e DevOps.

---

## 👨‍🎓 Integrantes

- Igor de Oliveira Teixeira  
- Diego Costa Sales  

---

## 📚 Disciplina

Virtualização

---

## 🎯 Objetivo

O sistema foi desenvolvido para:

- Monitorar imagens Docker em um registry local/remoto
- Detectar alterações em imagens (novas versões)
- Realizar pull automático da nova imagem
- Recriar containers automaticamente
- Executar monitoramento contínuo com intervalo configurável

---

## ⚙️ Funcionalidades

✔ Configuração via terminal (CLI)  
✔ Persistência de configuração local  
✔ Monitoramento contínuo de imagens Docker  
✔ Detecção de atualização de imagens  
✔ Pull automático de imagens atualizadas  
✔ Recriação automática de containers  
✔ Sistema de logs  
✔ Execução baseada em scheduler  

---

## 🧱 Tecnologias

- Node.js 18+
- Docker Engine
- Docker Registry (porta 5000)
- Dockerode (API Docker)
- Winston (logs)
- JavaScript ES6+

---

## 📦 Instalação das Dependências

```bash
npm install

Dependências principais:

npm install dockerode winston
🐳 Pré-requisitos
Docker
docker --version
Node.js
node -v
Registry local (opcional)
docker run -d -p 5000:5000 --name registry registry:2
🚀 EXECUÇÃO DO PROJETO
📌 1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/autodocker.git
cd autodocker
📌 2. Instalar dependências
npm install
📌 3. Criar imagem Docker
docker build -t localhost:5000/meu-nginx:latest -f docker/Dockerfile .
📌 4. Enviar imagem para o registry
docker push localhost:5000/meu-nginx:latest
📌 5. Configurar o sistema

Executa o modo configuração interativo:

node setup.js
Entrada esperada:
Imagem Docker: localhost:5000/meu-nginx:latest
Nome do container: meu-app
Intervalo (segundos): 60
📌 6. Iniciar o monitoramento
node main.js
🔄 EXECUÇÃO EM TEMPO REAL (COMPORTAMENTO DO SISTEMA)

Após iniciar o monitor, o sistema entra em execução contínua:

Monitor iniciado
Scheduler iniciado
Verificando atualizações...
Antes: sha256:abc123
Depois: sha256:def456
Nova versão detectada
Recriando container...
Atualização concluída
🔁 CICLO DE FUNCIONAMENTO
[Docker Registry]
       ↓
AutoDocker verifica imagem
       ↓
Compara versão atual vs anterior
       ↓
┌──────────────────────┐
│ Mudou a imagem?      │
└─────────┬────────────┘
          │ Sim
          ↓
   Pull da nova imagem
          ↓
   Remove container antigo
          ↓
   Cria novo container
          ↓
   Continua monitoramento

Se não mudou:
→ aguarda intervalo e repete
📁 ESTRUTURA DO PROJETO
autodocker/
├── config/
├── docker/
│   └── Dockerfile
├── logs/
├── scheduler/
├── services/
├── updater/
├── utils/
├── setup.js
├── main.js
├── package.json
└── docker-compose.yml
📊 EXEMPLO DE USO COMPLETO
# 1. Build da imagem
docker build -t localhost:5000/meu-nginx:latest -f docker/Dockerfile .

# 2. Push para registry
docker push localhost:5000/meu-nginx:latest

# 3. Configurar sistema
node setup.js

# 4. Iniciar monitor
node main.js
🔥 TESTE DE ATUALIZAÇÃO

Para testar o sistema:

# Alterar algo no projeto (ex: HTML)
echo "<h1>VERSÃO 2</h1>" > docker/html/index.html

# Rebuild
docker build -t localhost:5000/meu-nginx:latest -f docker/Dockerfile .

# Push nova versão
docker push localhost:5000/meu-nginx:latest

📌 Resultado esperado no monitor:

Nova versão detectada
Recriando container
Atualização concluída
⚠️ OBSERVAÇÕES
Docker deve estar ativo durante execução
Registry deve estar rodando na porta 5000
Recomenda-se uso de tags ou digest para maior precisão
O sistema executa continuamente até ser interrompido
🧠 MELHORIAS FUTURAS
Interface Web (dashboard)
Notificações (Telegram/Discord)
Rollback automático
Histórico de versões
CI/CD integrado com GitHub Actions
Suporte multi-container
📌 STATUS DO PROJETO

✔ Monitoramento funcionando
✔ Atualização automática
✔ Integração Docker completa
✔ Sistema CLI funcional

🏁 CONCLUSÃO

O AutoDocker implementa conceitos de:

Virtualização com containers
Automação de infraestrutura
Monitoramento contínuo
Princípios de DevOps# 🐳 AutoDocker - Monitoramento e Atualização Automática de Containers

Projeto desenvolvido para a disciplina de **Virtualização**, com o objetivo de automatizar o monitoramento de imagens Docker em um registry e realizar atualização automática de containers quando uma nova versão da imagem é detectada.

---

## 📌 Integrantes

- Igor de Oliveira Teixeira  
- Diego Costa Sales  

---

## 🎯 Objetivo do Projeto

O AutoDocker é um sistema de automação que:

- Monitora uma imagem Docker em um registry local ou remoto
- Detecta alterações na imagem (nova versão)
- Realiza o download (pull) automaticamente
- Recria o container atualizado sem intervenção manual

---

## ⚙️ Funcionalidades

- 📦 Configuração interativa via terminal
- 🐳 Integração com Docker Engine
- 🔄 Monitoramento contínuo de imagens Docker
- ⚡ Atualização automática de containers
- 📝 Logs de execução detalhados
- ⏱ Execução em intervalos configuráveis

---

## 🧱 Tecnologias Utilizadas

- Node.js 18+
- Docker Engine
- Docker Registry (local ou remoto)
- JavaScript (ES6+)
- Winston (logs)
- Dockerode (integração com Docker API)

---

## 📦 Dependências

Antes de executar o projeto, instale as dependências:

```bash
npm install
