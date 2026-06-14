# Alunos
Diego Costa Sales e Igor de Oliveira Teixeira

# Discplina 
Virtualização - Prof: Pedro Filho

# AutoDocker

AutoDocker é uma ferramenta de automação para monitoramento e atualização automática de containers Docker a partir de imagens hospedadas em um registry (local ou remoto). Foi desenvolvida como projeto acadêmico para a disciplina de Virtualização e tem funcionamento inspirado em ferramentas como o Watchtower.

Resumo rápido:
- Monitora o digest/sha das imagens configuradas
- Efetua pull automático quando detecta nova versão
- Recria o container com a imagem atualizada
- Registra logs e opera via scheduler com intervalo configurável

---

## Índice

1. Descrição
2. Pré-requisitos
3. Instalação
4. Configuração (CLI)
5. Uso (executar o monitor)
6. Exemplo de teste
7. Estrutura do projeto
8. Logs e debug
9. Problemas conhecidos e dicas
10. Melhorias futuras
11. Contribuição

---

## 1 — Descrição

AutoDocker monitora uma imagem Docker (por nome:tag) em um registry e compara o digest/sha atual com o digest salvo localmente. Quando detecta mudança, realiza pull da imagem nova, remove o container antigo e cria um novo container com a mesma configuração (nome, portas e variáveis, conforme implementado no projeto).

O sistema foi pensado para ambientes simples de laboratório e demonstra os conceitos de automação de containers e integração com o Docker Engine.

## 2 — Pré-requisitos

- Docker Engine instalado e em execução
- Node.js 18+ e npm
- (Opcional) Registry Docker local na porta 5000 para testes: registry:2

Verifique:

```bash
docker --version
node -v
npm -v
```

Se quiser rodar um registry local para testar:

```bash
docker run -d -p 5000:5000 --name registry registry:2
```

## 3 — Instalação

1. Instale dependências do projeto:

```bash
npm install
```

2. Dependências principais usadas por este projeto (caso precise instalar manualmente):

```bash
npm install dockerode winston
```

## 4 — Configuração (CLI)

O projeto fornece um modo de configuração interativo via `setup.js`. Execute e informe os dados solicitados:

```bash
node setup.js
```

Exemplo de entradas esperadas durante a configuração:

- Imagem Docker: localhost:5000/meu-nginx:latest
- Nome do container que será gerenciado: meu-app
- Intervalo de verificação (em segundos): 60

As configurações são salvas localmente (arquivo em `config/`) para uso posterior pelo monitor.

## 5 — Uso (executar o monitor)

Inicie o monitor com:

```bash
node main.js
```

Com o monitor em execução você verá logs indicando o início do scheduler, checks periódicos e ações tomadas quando uma nova imagem for encontrada.

Output esperado (exemplo):

- Monitor iniciado
- Scheduler iniciado
- Verificando atualizações...
- Antes: sha256:abc123
- Depois: sha256:def456
- Nova versão detectada
- Recriando container...
- Atualização concluída

## 6 — Exemplo de teste (fluxo completo)

1. Construa a imagem de teste e publique no registry (exemplo usando o Dockerfile em `docker/`):

```bash
docker build -t localhost:5000/meu-nginx:latest -f docker/Dockerfile .
docker push localhost:5000/meu-nginx:latest
```

2. Configure o sistema (veja seção 4) e inicie o monitor (`node main.js`).

3. Altere o conteúdo (por exemplo HTML), reconstrua e dê push novamente:

```bash
echo "<h1>VERSÃO 2</h1>" > docker/html/index.html
docker build -t localhost:5000/meu-nginx:latest -f docker/Dockerfile .
docker push localhost:5000/meu-nginx:latest
```

4. Observe os logs do AutoDocker: o monitor deve detectar a nova versão, realizar pull, remover o container antigo e criar um novo.

## 7 — Estrutura do projeto

Raiz:

```
autodocker/
├── config/           # Persistência de configuração
├── docker/           # Dockerfile e assets de exemplo
├── logs/             # Logs gerados pela aplicação
├── scheduler/        # Lógica do agendador
├── services/         # Serviços auxiliares (ex: configService)
├── updater/          # Código responsável por pull/atualização/redeploy
├── utils/            # Utilitários (logger etc.)
├── setup.js          # CLI de configuração
├── main.js           # Entrada principal do monitor
├── package.json
└── docker-compose.yml
```

Arquivos importantes:

- `setup.js` — script interativo para criar/atualizar a configuração
- `main.js` — inicializa o scheduler e inicia o ciclo de verificação
- `updater/` — contém os módulos que fazem pull, removem e recriam containers
- `services/configService.js` — manipula leitura/gravação de configurações
- `utils/logger.js` — configuração do Winston para logs

## 8 — Logs e debug

Os logs são gravados no diretório `logs/` e também emitidos no console (conforme a configuração padrão). Para aumentar a verbosidade, edite a configuração do logger em `utils/logger.js`.

Dicas de debug:

- Verifique se o Docker Engine está acessível pelo usuário que executa o Node.js
- Inspecione `logs/` para mensagens de erro ou falhas de pull
- Teste manualmente operações com `docker pull` / `docker run` para isolar problemas do código

## 9 — Problemas conhecidos e dicas

- O projeto assume permissões para manipular o Docker (usuário no grupo `docker` ou execução como root)
- Se usar registry local, confirme que a URL/porta (ex: `localhost:5000`) estejam corretas e que a imagem foi realmente enviada
- Recomenda-se o uso de tags imutáveis (ou digests) em ambientes de produção para evitar ambiguidades

## 10 — Melhorias futuras

- Dashboard web para visualizar status e histórico de atualizações
- Notificações (Telegram/Discord)
- Rollback automático em caso de falha na nova versão
- Suporte a multi-container e configuração por serviço
- Integração com CI/CD (GitHub Actions)

