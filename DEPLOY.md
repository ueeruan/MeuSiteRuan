# Guia de Deploy - RuanziTwo Portfolio

Seu portfólio está pronto! Como o **Git** não está instalado no seu computador, você precisará instalá-lo antes de colocar o site no ar.

## Passo 0: Instalar o Git

1. Baixe o Git para Windows: [git-scm.com/download/win](https://git-scm.com/download/win)
2. Instale aceitando todas as opções padrão (Next, Next, Next...).
3. Após instalar, reinicie o VS Code ou o terminal.

## Passo 1: GitHub (Armazenar o Código)

1. Crie uma conta no [GitHub](https://github.com/) se não tiver.
2. Crie um **novo repositório** (basta dar um nome, ex: `ruanzitwo-portfolio`).
   - Deixe como "Public" (Público).
   - Não marque "Add a README file".
3. No seu computador, abra o terminal na pasta do projeto e rode os comandos abaixo, um por um:

```bash
git init
git config user.name "RuanziTwo"
git config user.email "email@exemplo.com"
git add .
git commit -m "Meu Portfolio"
*(Nota: O passo `git config` é necessário apenas na primeira vez para o Git saber quem está salvando as alterações)*git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ruanzitwo-portfolio.git
git push -u origin main
```

*(Substitua `SEU_USUARIO` pelo seu usuário do GitHub)*

## Passo 2: Vercel (Colocar no Ar)

A Vercel é a empresa criadora dessas tecnologias e oferece hospedagem gratuita e super rápida.

1. Crie uma conta na [Vercel](https://vercel.com/) (pode entrar com sua conta do GitHub).
2. No painel (Dashboard), clique em **"Add New..."** -> **"Project"**.
3. Em **"Import Git Repository"**, você verá seu repositório `ruanzitwo-portfolio`. Clique em **"Import"**.
4. Nas configurações que aparecerem:
   - **Framework Preset**: Vite (ele deve detectar automaticamente).
   - **Build Command**: `vite build` (ou `npm run build`).
   - **Output Directory**: `dist`.
5. Clique em **"Deploy"**.

Espere alguns segundos e... **PRONTO!** 🚀
A Vercel vai te dar um link (ex: `ruanzitwo-portfolio.vercel.app`) que você pode acessar de qualquer lugar.

### Bônus: Domínio Próprio
Se você comprar um domínio (ex: `ruanzitwo.com`), pode configurá-lo na Vercel em **Settings > Domains**.

---

## Nota sobre a Logo
Tentei gerar a logo "RZ." mas o servidor de imagem estava indisponível no momento. Você pode usar o Canva ou Photoshop para criar algo simples: Fundo preto, letras brancas "RZ" e um ponto azul `#3B82F6`.

## Próximos Passos
- Divulgue seu link no Instagram e TikTok.
- Use a página de Feedback para coletar ideias de editores.
- Se precisar atualizar o site, basta salvar os arquivos, rodar `git add .`, `git commit -m "mensagem"` e `git push`. A Vercel atualiza o site automaticamente!
