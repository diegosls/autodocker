# 🐳 AutoDocker - Monitoramento e Atualização Automática de Containers

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
