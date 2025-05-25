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
      // Tentar múltiplas APIs de notícias de saúde
      const newsData = await this.fetchHealthNews()

      if (newsData && newsData.length > 0) {
        this.allNews = newsData
        this.displayFeaturedNews()
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
      // API do G1 Saúde
      {
        url: "https://api.rss2json.com/v1/api.json?rss_url=https://g1.globo.com/rss/g1/saude/",
        parser: this.parseG1News.bind(this),
      },
      // API do Ministério da Saúde (RSS)
      {
        url: "https://api.rss2json.com/v1/api.json?rss_url=https://www.gov.br/saude/pt-br/assuntos/noticias/RSS",
        parser: this.parseGovNews.bind(this),
      },
      // NewsAPI como fallback
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
    // Notícias de exemplo quando a API falha
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

    this.displayFeaturedNews()
    this.displayNewsGrid()
  }

  displayFeaturedNews() {
    const featuredNews = document.getElementById("featuredNews")
    if (!featuredNews || this.allNews.length === 0) return

    const news = this.allNews[0]
    const formattedDate = this.formatDate(news.publishedAt)
    const newsURL = this.createNewsURL(news)

    featuredNews.innerHTML = `
    <div class="news-image-container">
      <img src="${news.image}" alt="${news.title}" class="news-image" onerror="this.src='/placeholder.svg?height=400&width=800'">
      <div class="news-category">${news.category}</div>
    </div>
    <div class="news-content">
      <h2 class="news-title">${news.title}</h2>
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
  }

  displayNewsGrid() {
    const newsGrid = document.getElementById("newsGrid")
    if (!newsGrid) return

    const startIndex = 1 // Pular a primeira notícia (já exibida como destaque)
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
    // Criar um ID único baseado no título e timestamp
    const newsId = btoa(encodeURIComponent(news.title + news.publishedAt.getTime())).replace(/[^a-zA-Z0-9]/g, "")

    // Salvar os dados da notícia no localStorage
    localStorage.setItem(`news_${newsId}`, JSON.stringify(news))

    // Retornar URL com ID
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
