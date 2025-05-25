class IndividualNewsManager {
  constructor() {
    this.newsData = null
    this.allNews = []
    this.init()
  }

  init() {
    this.loadNewsFromURL()
    this.setupEventListeners()
}

  setupEventListeners() {
    const shareBtn = document.getElementById("shareBtn")
    if (shareBtn) {
      shareBtn.addEventListener("click", () => this.shareNews())
    }
  }

  loadNewsFromURL() {
    // Pegar dados da notícia da URL
    const urlParams = new URLSearchParams(window.location.search)
    const newsId = urlParams.get("id")
    const newsData = urlParams.get("data")

    if (newsId) {
      // Tentar carregar do localStorage primeiro
      const storedNews = localStorage.getItem(`news_${newsId}`)
      if (storedNews) {
        try {
          this.newsData = JSON.parse(storedNews)
          // Converter string de data de volta para objeto Date
          this.newsData.publishedAt = new Date(this.newsData.publishedAt)
          this.displayNews()
          this.loadRelatedNews()
          this.hideLoading()
          return
        } catch (error) {
          console.error("Erro ao carregar notícia do localStorage:", error)
        }
      }

      // Se não encontrou no localStorage, tentar buscar da API
      this.loadNewsById(newsId)
    } else if (newsData) {
      try {
        this.newsData = JSON.parse(decodeURIComponent(newsData))
        this.newsData.publishedAt = new Date(this.newsData.publishedAt)
        this.displayNews()
        this.loadRelatedNews()
        this.hideLoading()
      } catch (error) {
        console.error("Erro ao decodificar dados da notícia:", error)
        this.loadFallbackNews()
      }
    } else {
      // Carregar notícia de exemplo
      this.loadFallbackNews()
    }
  }

  async loadNewsById(id) {
    this.showLoading()

    try {
      // Tentar buscar a notícia específica
      const newsData = await this.fetchNewsById(id)
      if (newsData) {
        this.newsData = newsData
        this.displayNews()
        this.loadRelatedNews()
      } else {
        throw new Error("Notícia não encontrada")
      }
    } catch (error) {
      console.error("Erro ao carregar notícia:", error)
      this.loadFallbackNews()
    }

    this.hideLoading()
  }

  async fetchNewsById(id) {
    // Implementar busca por ID específico
    // Por enquanto, retornar null para usar fallback
    return null
  }

  loadFallbackNews() {
    // Notícia de exemplo quando não há dados
    this.newsData = {
      title: "Ministério da Saúde lança nova campanha de vacinação nacional",
      description:
        "O Ministério da Saúde anunciou hoje o lançamento de uma nova campanha nacional de vacinação que visa aumentar significativamente a cobertura vacinal em todo o território brasileiro.",
      content: `
        <p>O Ministério da Saúde anunciou hoje o lançamento de uma nova campanha nacional de vacinação que visa aumentar significativamente a cobertura vacinal em todo o território brasileiro. A iniciativa, que começará na próxima segunda-feira, tem como objetivo principal proteger a população contra diversas doenças preveníveis.</p>

        <h2>Objetivos da Campanha</h2>
        <p>A campanha tem como principais objetivos:</p>
        <ul>
          <li>Aumentar a cobertura vacinal para pelo menos 95% da população-alvo</li>
          <li>Reduzir a incidência de doenças preveníveis por vacinação</li>
          <li>Fortalecer o Sistema Único de Saúde (SUS)</li>
          <li>Promover a educação em saúde sobre a importância da vacinação</li>
        </ul>

        <h2>Grupos Prioritários</h2>
        <p>A campanha dará prioridade especial aos seguintes grupos:</p>
        <ul>
          <li>Crianças de 0 a 5 anos</li>
          <li>Idosos acima de 60 anos</li>
          <li>Gestantes</li>
          <li>Pessoas com comorbidades</li>
          <li>Profissionais de saúde</li>
        </ul>

        <h3>Estratégias de Implementação</h3>
        <p>Para garantir o sucesso da campanha, o Ministério da Saúde implementará diversas estratégias:</p>

        <blockquote>
          "Esta campanha representa um marco na saúde pública brasileira. Estamos comprometidos em levar a vacinação a todos os cantos do país, garantindo que nenhuma pessoa fique para trás na proteção contra doenças preveníveis."
        </blockquote>

        <p>As unidades básicas de saúde de todo o país estarão preparadas para receber a população, com horários estendidos e equipes reforçadas. Além disso, serão organizadas ações especiais em escolas, empresas e comunidades rurais.</p>

        <h2>Importância da Vacinação</h2>
        <p>A vacinação é uma das medidas mais eficazes de prevenção de doenças e tem papel fundamental na manutenção da saúde pública. Através da imunização coletiva, é possível proteger não apenas quem se vacina, mas toda a comunidade.</p>

        <p>Os especialistas reforçam que manter o calendário vacinal em dia é essencial para a prevenção de surtos e epidemias, contribuindo para um Brasil mais saudável e protegido.</p>
      `,
      url: "#",
      image: "/placeholder.svg?height=500&width=1000",
      publishedAt: new Date(),
      source: "Ministério da Saúde",
      category: "Saúde Pública",
    }

    this.displayNews()
    this.loadRelatedNews()
    this.hideLoading()
  }

  displayNews() {
    if (!this.newsData) return

    // Atualizar título da página
    document.getElementById("pageTitle").textContent = `${this.newsData.title} - SVO`
    document.title = `${this.newsData.title} - SVO`

    // Atualizar breadcrumb
    document.getElementById("breadcrumbTitle").textContent = this.truncateText(this.newsData.title, 50)

    // Atualizar categoria
    document.getElementById("articleCategory").textContent = this.newsData.category

    // Atualizar título
    document.getElementById("articleTitle").textContent = this.newsData.title

    // Atualizar data e fonte
    document.getElementById("articleDate").textContent = this.formatDate(this.newsData.publishedAt)
    document.getElementById("articleSource").textContent = this.newsData.source

    // Atualizar imagem
    const articleImage = document.getElementById("articleImage")
    articleImage.src = this.newsData.image
    articleImage.alt = this.newsData.title
    articleImage.onerror = function () {
      this.src = "/placeholder.svg?height=500&width=1000"
    }

    // Atualizar resumo
    document.getElementById("articleExcerpt").textContent = this.newsData.description

    // Atualizar conteúdo
    document.getElementById("articleBody").innerHTML = this.newsData.content || this.generateContentFromDescription()

    // Atualizar link original
    const originalLink = document.getElementById("originalLink")
    originalLink.href = this.newsData.url
    if (this.newsData.url === "#") {
      originalLink.style.display = "none"
    }

    // Forçar recarregamento da imagem se não carregar
    const articleImage2 = document.getElementById("articleImage")
    articleImage2.src = this.newsData.image
    articleImage2.alt = this.newsData.title

    // Função para tentar carregar imagem alternativa
    articleImage2.onerror = function () {
      // Tentar diferentes formatos de placeholder
      const placeholders = [
        "/placeholder.svg?height=500&width=1000",
        "https://via.placeholder.com/1000x500/cccccc/666666?text=Imagem+da+Noticia",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='500' viewBox='0 0 1000 500'%3E%3Crect width='1000' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23999'%3EImagem da Notícia%3C/text%3E%3C/svg%3E",
      ]

      const currentIndex = Number.parseInt(this.dataset.placeholderIndex || "0")
      if (currentIndex < placeholders.length - 1) {
        this.dataset.placeholderIndex = (currentIndex + 1).toString()
        this.src = placeholders[currentIndex + 1]
      }
    }

    // Tentar carregar a imagem original primeiro
    if (this.newsData.image && this.newsData.image !== "/placeholder.svg?height=500&width=1000") {
      const img = new Image()
      img.onload = function () {
        articleImage2.src = this.newsData.image
      }.bind(this)
      img.onerror = () => {
        articleImage2.onerror()
      }
      img.src = this.newsData.image
    }

    // Chamar no final de displayNews()
    this.improveImageLoading()
  }

  generateContentFromDescription() {
    // Gerar conteúdo expandido baseado na descrição
    const description = this.newsData.description
    return `
      <p>${description}</p>
      <p>Esta notícia foi obtida através de fontes confiáveis de saúde e representa informações importantes para o conhecimento público. Para mais detalhes e informações atualizadas, recomendamos consultar as fontes oficiais.</p>
      <h3>Importância da Informação</h3>
      <p>Manter-se informado sobre questões de saúde é fundamental para tomar decisões conscientes sobre o bem-estar pessoal e coletivo. O SVO está comprometido em fornecer informações relevantes e atualizadas para a população.</p>
    `
  }

  async loadRelatedNews() {
    try {
      // Tentar carregar notícias relacionadas da API
      const relatedNews = await this.fetchRelatedNews()
      this.displayRelatedNews(relatedNews)
    } catch (error) {
      console.error("Erro ao carregar notícias relacionadas:", error)
      this.displayFallbackRelatedNews()
    }
  }

  async fetchRelatedNews() {
    // Tentar buscar notícias relacionadas
    try {
      const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://g1.globo.com/rss/g1/saude/")
      const data = await response.json()

      if (data && data.items) {
        return data.items.slice(0, 3).map((item) => ({
          title: this.cleanText(item.title),
          description: this.cleanText(item.description),
          url: item.link,
          image: item.thumbnail || "/placeholder.svg?height=180&width=300",
          publishedAt: new Date(item.pubDate),
          source: "G1 Saúde",
          category: "Saúde",
        }))
      }
    } catch (error) {
      console.warn("Erro ao buscar notícias relacionadas:", error)
    }

    return null
  }

  displayFallbackRelatedNews() {
    const fallbackNews = [
      {
        title: "Pesquisa revela avanços no tratamento de doenças cardíacas",
        description: "Estudo brasileiro mostra resultados promissores em novos tratamentos.",
        url: "#",
        image: "/placeholder.svg?height=180&width=300",
        publishedAt: new Date(Date.now() - 86400000),
        source: "Pesquisa Médica",
        category: "Cardiologia",
      },
      {
        title: "SUS amplia atendimento em unidades básicas de saúde",
        description: "Expansão visa melhorar o acesso da população aos serviços de saúde.",
        url: "#",
        image: "/placeholder.svg?height=180&width=300",
        publishedAt: new Date(Date.now() - 172800000),
        source: "SUS",
        category: "Saúde Pública",
      },
      {
        title: "Tecnologia inovadora auxilia diagnósticos médicos",
        description: "IA está sendo utilizada para acelerar diagnósticos.",
        url: "#",
        image: "/placeholder.svg?height=180&width=300",
        publishedAt: new Date(Date.now() - 259200000),
        source: "Tecnologia Médica",
        category: "Inovação",
      },
    ]

    this.displayRelatedNews(fallbackNews)
  }

  displayRelatedNews(newsArray) {
    const relatedNewsGrid = document.getElementById("relatedNewsGrid")
    if (!relatedNewsGrid || !newsArray) return

    relatedNewsGrid.innerHTML = ""

    newsArray.forEach((news) => {
      const newsCard = this.createRelatedNewsCard(news)
      relatedNewsGrid.appendChild(newsCard)
    })
  }

  createRelatedNewsCard(news) {
    const card = document.createElement("a")
    card.className = "related-news-card"
    card.href = this.createNewsURL(news)
    card.target = "_blank"

    const formattedDate = this.formatDate(news.publishedAt)

    card.innerHTML = `
      <div class="news-image-container">
        <img src="${news.image}" alt="${news.title}" class="news-image" onerror="this.src='/placeholder.svg?height=180&width=300'">
        <div class="news-category">${news.category}</div>
      </div>
      <div class="news-content">
        <h3 class="news-title">${news.title}</h3>
        <span class="news-date">${formattedDate} • ${news.source}</span>
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

  shareNews() {
    if (navigator.share && this.newsData) {
      navigator
        .share({
          title: this.newsData.title,
          text: this.newsData.description,
          url: window.location.href,
        })
        .catch((error) => console.log("Erro ao compartilhar:", error))
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Link copiado para a área de transferência!")
        })
        .catch(() => {
          alert("Não foi possível copiar o link. URL: " + window.location.href)
        })
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

  cleanText(text) {
    if (!text) return ""
    return text.replace(/<[^>]*>/g, "").trim()
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
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

  // Função para melhorar o carregamento de imagens
  improveImageLoading() {
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      if (!img.complete || img.naturalHeight === 0) {
        img.addEventListener("error", function () {
          // Lista de fallbacks para imagens
          const fallbacks = [
            "https://via.placeholder.com/400x300/e0e0e0/999999?text=Imagem+Indisponivel",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%23999'%3EImagem não disponível%3C/text%3E%3C/svg%3E",
          ]

          const currentFallback = Number.parseInt(this.dataset.fallbackIndex || "0")
          if (currentFallback < fallbacks.length) {
            this.dataset.fallbackIndex = (currentFallback + 1).toString()
            this.src = fallbacks[currentFallback]
          }
        })
      }
    })
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new IndividualNewsManager()
})
