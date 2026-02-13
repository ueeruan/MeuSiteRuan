# Guia de Deploy SUPER Detalhado - RuanziTwo Portfolio

Este guia foi feito para quem nunca usou Git ou Vercel. Siga cada passo com calma.

---

## 🛑 PASSO 0: Preparação (Faça isso antes de tudo)

1. **Instale o Git**:
   - Baixe aqui: [git-scm.com/download/win](https://git-scm.com/download/win)
   - Instale clicando em "Next" em todas as telas.
   - **IMPORTANTE**: Depois de instalar, FECHE O VS CODE e abra de novo.

2. **Crie uma conta no GitHub**:
   - Acesse [github.com](https://github.com/) e crie sua conta (lembre o email e senha).

3. **Abra o Terminal no VS Code**:
   - No topo do VS Code, clique em **Terminal** -> **New Terminal**.
   - Vai aparecer uma janelinha preta/azul na parte de baixo. É lá que você vai digitar os comandos.

---

## 💻 PASSO 1: Configurar seu "Crachá" no Git
(Isso resolve o erro "Author identity unknown" que você viu)

No terminal do VS Code, digite esses comandos (um por um) e aperte ENTER depois de cada linha:

1. Diga ao Git seu nome (pode ser seu nome real ou artístico):
   ```bash
   git config --global user.name "RuanziTwo"
   ```

2. Diga ao Git seu email (o mesmo que usou no GitHub):
   ```bash
   git config --global user.email "seu_email_aqui@exemplo.com"
   ```

*(Se não aparecer nenhuma mensagem de erro, deu certo!)*

---

## 📦 PASSO 2: Preparar os arquivos

Agora vamos "empacotar" seu site para enviar. No mesmo terminal, digite:

1. Iniciar o repositório (cria uma pasta oculta .git):
   ```bash
   git init
   ```

2. Adicionar todos os arquivos ao pacote:
   ```bash
   git add .
   ```
   *(Não esqueça do ponto no final!)*

3. Fechar o pacote com uma etiqueta (mensagem):
   ```bash
   git commit -m "Meu primeiro deploy"
   ```

4. Definir o ramo principal:
   ```bash
   git branch -M main
   ```

---

## 🚀 PASSO 3: Enviar para o GitHub

1. Vá no site do [GitHub](https://github.com/new) e crie um novo repositório.
   - **Repository name**: `ruanzitwo-site`
   - Deixe como **Public**.
   - Clique no botão verde **Create repository**.

2. O GitHub vai te mostrar uma página cheia de códigos. Procure a parte que diz **"…or push an existing repository from the command line"**.

3. Copie o comando que começa com `git remote add origin...` e cole no seu terminal:
   *(Se der erro **"remote origin already exists"**, rode esse comando antes: `git remote remove origin` e tente de novo)*
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/ruanzitwo-site.git
   ```

4. Agora, envie os arquivos (pode pedir sua senha do GitHub na primeira vez):
   ```bash
   git push -u origin main
   ```

Se aparecer uma mensagem dizendo "Branch 'main' set up to track...", SUCESSO! 🎉

---

## 🌐 PASSO 4: Colocar no Ar (Vercel)

1. Acesse [vercel.com](https://vercel.com/) e faça login com o **GitHub**.
2. Clique no botão **"Add New..."** -> **"Project"**.
3. Na lista, deve aparecer o `ruanzitwo-site`. Clique no botão **Import** ao lado dele.
4. Vai abrir uma tela de configuração.
   - **Framework Preset**: Deve estar "Vite" (se não, selecione Vite).
   - **Root Directory**: `.` (pode deixar como está).
5. Clique no botão azul **Deploy**.
6. Aguarde uns 30 segundos... vai aparecer uma chuva de confetes! 🎊

**Seu link estará pronto!** (Algo como `ruanzitwo-site.vercel.app`).

---

## 🔄 Como Atualizar o Site

Sempre que você (ou eu) fizer alguma alteração no código, o site **NÃO** atualiza sozinho magicamente. Você precisa enviar as mudanças para o GitHub. A Vercel vai ver que o GitHub mudou e atualizar o site automaticamente.

**Passo a Passo para Atualizar:**

1. Faça as alterações no código.
2. Abra o terminal e rode estes 3 comandos:

```bash
git add .
git commit -m "Atualização do site"
git push
```

3. Pronto! Em cerca de 1 minuto, a Vercel atualiza o site no ar.

---

### 🆘 Deu erro?
Se algum comando der erro, copie o erro e me mande aqui no chat que eu te ajudo a resolver!

---

## 🛠️ Correção do Erro 404 (Página não encontrada)

Se você clicar em "Em desenvolvimento" e der erro, é porque precisamos avisar a Vercel que o site é um aplicativo único.
Já criei o arquivo de correção (`vercel.json`). Para aplicar, basta atualizar o site:

```bash
git add .
git commit -m "Correção erro 404"
git push
```
