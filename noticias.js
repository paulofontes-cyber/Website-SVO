class NewsManager {
  constructor() {
    this.currentPage = 0
    this.itemsPerPage = 6
    this.allNews = []
    this.isLoading = false
    this.init()
  }

  init() {
    this.loadNews()
    this.setupEventListeners()
  }

  setupEventListeners() {
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => this.loadMoreNews())
    }
  }

  async loadNews() {
    if (this.isLoading) return

    this.isLoading = true
    this.showLoading()

    try {
      const newsData = await this.fetchHealthNews()

      if (newsData && newsData.length > 0) {
        this.allNews = newsData
        this.displayFeaturedNewsGrid() // Nova função para o grid
        this.displayNewsGrid()
        this.hideLoading()
      } else {
        throw new Error("Nenhuma notícia encontrada")
      }
    } catch (error) {
      console.error("Erro ao carregar notícias:", error)
      this.showFallbackNews()
      this.hideLoading()
    }

    this.isLoading = false
  }

  async fetchHealthNews() {
    const apis = [
      {
        url: "https://api.rss2json.com/v1/api.json?rss_url=https://g1.globo.com/rss/g1/saude/",
        parser: this.parseG1News.bind(this),
      },
      {
        url: "https://api.rss2json.com/v1/api.json?rss_url=https://www.gov.br/saude/pt-br/assuntos/noticias/RSS",
        parser: this.parseGovNews.bind(this),
      },
      {
        url: "https://newsapi.org/v2/everything?q=saúde+brasil&language=pt&sortBy=publishedAt&apiKey=demo",
        parser: this.parseNewsAPI.bind(this),
      },
    ]

    for (const api of apis) {
      try {
        const response = await fetch(api.url)
        const data = await response.json()

        if (data && (data.items || data.articles)) {
          return api.parser(data)
        }
      } catch (error) {
        console.warn(`Erro na API ${api.url}:`, error)
        continue
      }
    }

    return null
  }

  parseG1News(data) {
    if (!data.items) return []

    return data.items.slice(0, 20).map((item) => ({
      title: this.cleanText(item.title),
      description: this.cleanText(item.description),
      url: item.link,
      image: item.thumbnail || item.enclosure?.link || "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(item.pubDate),
      source: "G1 Saúde",
      category: "Saúde",
    }))
  }

  parseGovNews(data) {
    if (!data.items) return []

    return data.items.slice(0, 20).map((item) => ({
      title: this.cleanText(item.title),
      description: this.cleanText(item.description),
      url: item.link,
      image: item.thumbnail || "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(item.pubDate),
      source: "Ministério da Saúde",
      category: "Saúde Pública",
    }))
  }

  parseNewsAPI(data) {
    if (!data.articles) return []

    return data.articles.slice(0, 20).map((article) => ({
      title: this.cleanText(article.title),
      description: this.cleanText(article.description),
      url: article.url,
      image: article.urlToImage || "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(article.publishedAt),
      source: article.source.name,
      category: "Saúde",
    }))
  }

  cleanText(text) {
    if (!text) return ""
    return text.replace(/<[^>]*>/g, "").trim()
  }

  showFallbackNews() {
    this.allNews = [
      {
        title: "Ministério da Saúde lança nova campanha de vacinação",
        description:
          "Nova campanha visa aumentar a cobertura vacinal em todo o território nacional, com foco especial em grupos prioritários.",
        url: "#",
        image: "/placeholder.svg?height=400&width=600",
        publishedAt: new Date(),
        source: "Ministério da Saúde",
        category: "Saúde Pública",
      },
      {
        title: "Pesquisa revela avanços no tratamento de doenças cardíacas",
        description:
          "Estudo brasileiro mostra resultados promissores em novos tratamentos para doenças cardiovasculares.",
        url: "#",
        image: "/placeholder.svg?height=400&width=600",
        publishedAt: new Date(Date.now() - 86400000),
        source: "Pesquisa Médica",
        category: "Cardiologia",
      },
      {
        title: "SUS amplia atendimento em unidades básicas de saúde",
        description: "Expansão do atendimento visa melhorar o acesso da população aos serviços de saúde primária.",
        url: "#",
        image: "/placeholder.svg?height=400&width=600",
        publishedAt: new Date(Date.now() - 172800000),
        source: "SUS",
        category: "Saúde Pública",
      },
      {
        title: "Tecnologia inovadora auxilia diagnósticos médicos",
        description:
          "Inteligência artificial está sendo utilizada para acelerar e melhorar a precisão de diagnósticos.",
        url: "#",
        image: "/placeholder.svg?height=400&width=600",
        publishedAt: new Date(Date.now() - 259200000),
        source: "Tecnologia Médica",
        category: "Inovação",
      },
      {
        title: "Programa de prevenção reduz casos de diabetes",
        description: "Iniciativa governamental mostra resultados positivos na prevenção do diabetes tipo 2.",
        url: "#",
        image: "/placeholder.svg?height=400&width=600",
        publishedAt: new Date(Date.now() - 345600000),
        source: "Saúde Preventiva",
        category: "Prevenção",
      },
      {
        title: "Telemedicina expande acesso à saúde em áreas rurais",
        description: "Serviços de telemedicina levam atendimento especializado para regiões remotas do país.",
        url: "#",
        image: "/placeholder.svg?height=400&width=600",
        publishedAt: new Date(Date.now() - 432000000),
        source: "Telemedicina",
        category: "Tecnologia",
      },
    ]

    this.displayFeaturedNewsGrid()
    this.displayNewsGrid()
  }

  // NOVA FUNÇÃO: Exibir notícias no grid de mosaico
  displayFeaturedNewsGrid() {
    const gradePrincipal = document.getElementById("gradePrincipal")
    if (!gradePrincipal || this.allNews.length === 0) return

    // Pegar as primeiras 6 notícias para o grid principal
    const featuredNews = this.allNews.slice(0, 6)

    featuredNews.forEach((news, index) => {
      const cartao = document.getElementById(`cartao-${index}`)
      if (!cartao) return

      const newsURL = this.createNewsURL(news)

      // Atualizar imagem
      const img = cartao.querySelector(".news-image")
      if (img) {
        img.src = news.image
        img.alt = news.title
        img.onerror = function () {
          this.src = "/placeholder.svg?height=400&width=600"
        }
      }

      // Atualizar conteúdo
      const conteudo = cartao.querySelector(".conteudo-cartao")
      if (conteudo) {
        const h3 = conteudo.querySelector("h3")
        if (h3) {
          h3.textContent = news.title
        }

        // Adicionar categoria especial para o terceiro cartão (mockup)
        if (index === 2) {
          const etiqueta = conteudo.querySelector(".etiqueta-mockup")
          if (etiqueta) {
            etiqueta.textContent = news.category
          }
        }
      }

      // Adicionar evento de clique
      cartao.style.cursor = "pointer"
      cartao.onclick = () => {
        window.open(newsURL, "_blank", "noopener,noreferrer")
      }
    })
  }

  displayNewsGrid() {
    const newsGrid = document.getElementById("newsGrid")
    if (!newsGrid) return

    const startIndex = 6 // Pular as primeiras 6 notícias (já exibidas no grid principal)
    const endIndex = Math.min(startIndex + (this.currentPage + 1) * this.itemsPerPage, this.allNews.length)

    // Se é a primeira página, limpar o grid
    if (this.currentPage === 0) {
      newsGrid.innerHTML = ""
    }

    for (let i = startIndex + this.currentPage * this.itemsPerPage; i < endIndex; i++) {
      const news = this.allNews[i]
      if (!news) continue

      const newsCard = this.createNewsCard(news)
      newsGrid.appendChild(newsCard)
    }

    this.updateLoadMoreButton(endIndex)
  }

  createNewsCard(news) {
    const card = document.createElement("article")
    card.className = "news-card"

    const formattedDate = this.formatDate(news.publishedAt)
    const newsURL = this.createNewsURL(news)

    card.innerHTML = `
    <div class="news-image-container">
      <img src="${news.image}" alt="${news.title}" class="news-image" onerror="this.src='/placeholder.svg?height=220&width=350'">
      <div class="news-category">${news.category}</div>
    </div>
    <div class="news-content">
      <h3 class="news-title">${news.title}</h3>
      <p class="news-excerpt">${news.description}</p>
      <div class="news-meta">
        <span class="news-date">${formattedDate} • ${news.source}</span>
        <a href="${newsURL}" class="read-more-btn" target="_blank" rel="noopener noreferrer">
          Ler mais
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 17l10-10"/>
            <path d="M7 7h10v10"/>
          </svg>
        </a>
      </div>
    </div>
  `

    return card
  }

  createNewsURL(news) {
    const newsId = btoa(encodeURIComponent(news.title + news.publishedAt.getTime())).replace(/[^a-zA-Z0-9]/g, "")
    localStorage.setItem(`news_${newsId}`, JSON.stringify(news))
    return `noticia-individual.html?id=${newsId}`
  }

  loadMoreNews() {
    this.currentPage++
    this.displayNewsGrid()
  }

  updateLoadMoreButton(currentEndIndex) {
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    if (!loadMoreBtn) return

    if (currentEndIndex >= this.allNews.length) {
      loadMoreBtn.style.display = "none"
    } else {
      loadMoreBtn.style.display = "inline-flex"
      const remainingNews = this.allNews.length - currentEndIndex
      loadMoreBtn.innerHTML = `
                Carregar mais notícias (${remainingNews} restantes)
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14"/>
                    <path d="M19 12l-7 7-7-7"/>
                </svg>
            `
    }
  }

  formatDate(date) {
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return "Ontem"
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`
    } else {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    }
  }

  showLoading() {
    const loadingContainer = document.getElementById("loadingContainer")
    if (loadingContainer) {
      loadingContainer.classList.remove("hidden")
    }
  }

  hideLoading() {
    const loadingContainer = document.getElementById("loadingContainer")
    if (loadingContainer) {
      loadingContainer.classList.add("hidden")
    }
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new NewsManager()
})
