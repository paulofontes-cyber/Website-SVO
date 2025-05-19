document.addEventListener("DOMContentLoaded", () => {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://g1.globo.com/rss/g1/saude/')
    .then(res => res.json())
    .then(data => {
      console.log('Resposta da API:', data); // útil para depuração

      if (!data || !data.items || !Array.isArray(data.items)) {
        throw new Error("A resposta da API não contém itens.");
      }

      const posts = data.items.slice(0, 9); // pegar 9 posts agora
      const secoes = document.querySelectorAll('section');

      if (secoes.length < 3 || posts.length < 9) return;

      for (let i = 0; i < 3; i++) {
        const secao = secoes[i];
        const cardGrande = secao.querySelector('.card');
        const smallCards = secao.querySelectorAll('.small-card');

        // === CARD GRANDE ===
        const postGrande = posts[i * 3];
        if (cardGrande && postGrande) {
          const img = cardGrande.querySelector('img');
          const h2 = cardGrande.querySelector('h2');
          const p = cardGrande.querySelector('p');

          img.src = postGrande.thumbnail || './imagens/noticias.1.png';
          img.alt = postGrande.title;

          h2.innerHTML = '';
          const link = document.createElement('a');
          link.href = postGrande.link;
          link.target = '_blank';
          link.textContent = postGrande.title;
          link.style.color = 'white';
          link.style.textDecoration = 'none';
          link.style.cursor = 'pointer';
          h2.appendChild(link);

          p.textContent = postGrande.description.replace(/<[^>]*>/g, '').slice(0, 100) + '...';
        }

        // === CARDS PEQUENOS ===
        if (smallCards.length >= 2) {
          for (let j = 0; j < 2; j++) {
            const postPequeno = posts[i * 3 + j + 1]; // garante que cada card use um post único
            const card = smallCards[j];
            const img = card.querySelector('img');
            const h2 = card.querySelector('h2');
            const p = card.querySelector('p');

            img.src = postPequeno.thumbnail || './imagens/noticias.2.png';
            img.alt = postPequeno.title;

            h2.innerHTML = '';
            const link = document.createElement('a');
            link.href = postPequeno.link;
            link.target = '_blank';
            link.textContent = postPequeno.title;
            link.style.color = 'white';
            link.style.textDecoration = 'none';
            link.style.cursor = 'pointer';
            h2.appendChild(link);

            p.textContent = postPequeno.description.replace(/<[^>]*>/g, '').slice(0, 90) + '...';
          }
        }
      }
    })
    .catch(err => {
      console.error('Erro ao carregar notícias:', err);
      const container = document.querySelector('.container');
      if (container) {
        const erroMsg = document.createElement('p');
        erroMsg.textContent = 'Desculpe, não foi possível carregar as notícias no momento.';
        erroMsg.style.color = 'red';
        erroMsg.style.marginTop = '20px';
        container.appendChild(erroMsg);
      }
    });
});
