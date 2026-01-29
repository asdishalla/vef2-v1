export function generateIndexHtml() {

  const html = /* HTML */ `
      <html>
      <head>
        <link rel="stylesheet" href="styles.css" />
        <script src="scripts.js" type="module"></script>
      </head>
      <body>
        <h1>Spurningaleikur!</h1>
        <p>Velkomin velkomin! Veldu flokk til að svara spurningum í:</p>
        <ul>
  <li><a href="almenn_kunnatta.html">Almenn kunnátta</a></li>
  <li><a href="nattura.html">Náttúra og vísindi</a></li>
  <li><a href="bokmenntir.html">Bókmenntir og listir</a></li>
  <li><a href="saga.html">Saga</a></li>
  <li><a href="landafraedi.html">Landafræði</a></li>
  <li><a href="skemmtun.html">Skemmtun og afþreying</a></li>
  <li><a href="ithrottir.html">Íþróttir og tómstundir</a></li>
</ul>
      </body>
    </html>`;

  return html
}

export function generateQuestionHtml(q) {
  const html = /* HTML */ ` <section class="question" data-answered="false">
    <h3>${q.question}</h3>
    <p class="hidden">${q.answer}</p>

    <button type="button" class="button button-show">Sýna svar</button>
    <button type="button" class="button button-correct">Rétt 🫡</button>
    <button type="button" class="button button-incorrect">Rangt 🥹</button>
  </section>`;

  return html;
}

export function generateQuestionCategoryHtml(title, questionsHtml) {
  const html = /* HTML */ `
    <html>
      <head>
        <link rel="stylesheet" href="styles.css" />
        <script src="scripts.js" type="module"></script>
      </head>
      <body>
        <h1>Spurningaleikur!</h1>
        <p><a href="index.html">Til baka</a></p>
        <div class="counter">
          <div class="correct">0</div>
          <div class="incorrect">0</div>
        </div>
        <div class="questions">
        <h2>${title}</h2>${questionsHtml}</div>
      </body>
    </html>
  `;

  return html;
}
