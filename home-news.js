class HomeNewsManager {
  constructor() {
    this.allNews = []
    this.isLoading = false
    this.init()
  }

  init() {
    this.loadNews()
  }

  async loadNews() {
    if (this.isLoading) return

    this.isLoading = true

    try {
      const newsData = await this.fetchHealthNews()

      if (newsData && newsData.length > 0) {
        this.allNews = newsData
        this.updateHomeNewsCards()
      } else {
        throw new Error("Nenhuma notícia encontrada")
      }
    } catch (error) {
      console.error("Erro ao carregar notícias:", error)
      this.showFallbackNews()
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
        title: "SVO investiga óbitos relacionados a doenças de interesse da saúde pública",
        description:
          "O SVO também investiga óbitos relacionados a doenças que são de interesse da saúde pública, ajudando a identificar e controlar surtos e epidemias.",
        url: "#",
        image: "imagens/pexels-cottonbro-7584484.jpg",
        publishedAt: new Date(),
        source: "SVO Sergipe",
        category: "Saúde Pública",
      },
      {
        title: "SVO firma parceria com universidades para ampliar pesquisas",
        description:
          "Nova parceria com instituições de ensino superior vai permitir avanços em pesquisas científicas e formação de novos profissionais na área.",
        url: "#",
        image: "imagens/pexels-jonathanborba-28736017.jpg",
        publishedAt: new Date(Date.now() - 86400000),
        source: "SVO Sergipe",
        category: "Pesquisa",
      },
      {
        title: "SVO recebe novos equipamentos",
        description:
          "Investimento em tecnologia e infraestrutura permitirá maior precisão nos diagnósticos e agilidade no atendimento aos casos recebidos pelo serviço.",
        url: "#",
        image: "imagens/pexels-saul-siguenza-355267816-28510160.jpg",
        publishedAt: new Date(Date.now() - 172800000),
        source: "SVO Sergipe",
        category: "Tecnologia",
      },
    ]

    this.updateHomeNewsCards()
  }

  updateHomeNewsCards() {
    // Pegar as 3 primeiras notícias
    const featuredNews = this.allNews.slice(0, 3)

    // Selecionar todos os cards de notícias da página principal
    const newsCards = document.querySelectorAll(".news-card")

    featuredNews.forEach((news, index) => {
      const card = newsCards[index]
      if (!card) return

      // Atualizar imagem
      const img = card.querySelector(".news-image")
      if (img) {
        img.src = news.image
        img.alt = news.title
        img.onerror = function () {
          // Manter as imagens originais como fallback
          const fallbackImages = [
            "imagens/pexels-cottonbro-7584484.jpg",
            "imagens/pexels-jonathanborba-28736017.jpg",
            "imagens/pexels-saul-siguenza-355267816-28510160.jpg",
          ]
          this.src = fallbackImages[index] || "/placeholder.svg?height=400&width=600"
        }
      }

      // Atualizar conteúdo
      const newsContent = card.querySelector(".news-content")
      if (newsContent) {
        const title = newsContent.querySelector(".news-title")
        const preview = newsContent.querySelector(".news-preview")
        const readMore = newsContent.querySelector(".read-more")

        if (title) {
          title.textContent = news.title
        }

        if (preview) {
          preview.style.display = "none" // Oculta o elemento de preview completamente
        }

        if (readMore) {
          // Criar URL para a notícia individual
          const newsURL = this.createNewsURL(news)
          readMore.href = newsURL
          readMore.target = "_blank"
          readMore.rel = "noopener noreferrer"
        }
      }

      // Adicionar evento de clique no card inteiro
      card.style.cursor = "pointer"
      card.onclick = (e) => {
        // Evitar duplo clique se clicar no link "Ler mais"
        if (e.target.classList.contains("read-more")) return

        const newsURL = this.createNewsURL(news)
        window.open(newsURL, "_blank", "noopener,noreferrer")
      }

      // Adicionar efeito hover melhorado
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(-5px)"
      })
    })
  }

  createNewsURL(news) {
    // Verificar se existe a página de notícia individual
    const hasIndividualPage =
      document.querySelector('link[href*="noticia-individual"]') ||
      document.querySelector('script[src*="noticia-individual"]')

    if (hasIndividualPage || news.url === "#") {
      // Criar ID único para a notícia e salvar no localStorage
      const newsId = btoa(encodeURIComponent(news.title + news.publishedAt.getTime())).replace(/[^a-zA-Z0-9]/g, "")
      localStorage.setItem(`news_${newsId}`, JSON.stringify(news))
      return `noticia-individual.html?id=${newsId}`
    } else {
      // Usar URL externa da notícia
      return news.url
    }
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Verificar se estamos na página principal (que tem a seção de notícias)
  const newsSection = document.querySelector(".news-section")
  if (newsSection) {
    new HomeNewsManager()
  }
})
