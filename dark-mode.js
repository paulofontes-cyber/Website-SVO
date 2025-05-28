// Definir as variáveis de cor para ambos os temas
const lightTheme = {
  // Cores de fundo principais
  bodyBackground: "#fffde0",
  navbarBackground: "linear-gradient(to left, rgba(223, 221, 156, 0.591), rgba(255, 166, 0, 0.726))",
  heroBackground: "linear-gradient(to right, rgba(141, 67, 6, 0.797), rgba(232, 203, 14, 0.37))",
  counterSectionBackground: "linear-gradient(to left, rgba(255, 115, 0, 0.965), rgb(255, 204, 0))",
  newsSectionBackground: "linear-gradient(135deg, #DE6F0D, #FBB802)",
  secaoGradienteBackground: "linear-gradient(to right, #f78c4c, #ffb940)",
  imagemProfFundoBackground: "linear-gradient(to right, #f78c4c, #ffb940)",
  leftRectangleBackground: "linear-gradient(132deg, #FBB802 0%, #FF8761 100%)",
  secaoAgendaBackground: "linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%)",
  cabecalhoAgendaBackground: "linear-gradient(to right, #f78c4c, #ffb940)",
  blocoContatoPrincipalBackground: "#FFF8E8",
  rodapePrincipalSvoBackground: "linear-gradient(135deg, #FFD54F, #FFA000, #FF7043)",

  // Cores de texto
  textColor: "#000000",
  textColorInverted: "#ffffff",
  navLinksColor: "#ffffff",
  navLinksHoverColor: "#e67e22",
  footerTextColor: "#ffffff",
  titleColor: "#FF9066",

  // Cores de cartões e elementos
  cartaoTelefoneContatoBackground: "linear-gradient(135deg, #FFC107, #FF9800)",
  cartaoEmailContatoBackground: "linear-gradient(135deg, #FF9800, #FF7043)",
  cartaoLocalizacaoEnderecoBackground: "linear-gradient(135deg, #FF7043, #FF5722)",
  botaoRemocaoHoverBackground: "#d56a18",
  grupoDiaOddBackground: "#f8f9fa",
  grupoDiaEvenBackground: "#ffffff",
  tituloDiaColor: "#1e3c72",
  tipoAtendimentoColor: "#34495e",
  horarioAtendimentoColor: "#2980b9",
  horarioAtendimentoBackground: "#e8f4fc",

  // Cores específicas para a página institucional
  topoInstitucionalBackground: "linear-gradient(135deg, #FFD54F, #FFA000)",
  blocoInstitucionalBackground: "#ffffff",
  tabelaInstitucionalHeaderBackground: "#f8f9fa",
  tabelaInstitucionalRowBackground: "#ffffff",
  tabelaInstitucionalRowAltBackground: "#f8f9fa",
  pessoaInstitucionalBackground: "#ffffff",
  botaoInstitucionalBackground: "#FF9800",
  botaoInstitucionalTextColor: "#ffffff",
}

const darkTheme = {
  // Cores de fundo principais
  bodyBackground: "#121212",
  navbarBackground: "linear-gradient(to left, rgba(56, 56, 46, 0.8), rgba(97, 71, 18, 0.8))",
  heroBackground: "linear-gradient(to right, rgba(97, 52, 23, 0.9), rgba(97, 87, 24, 0.7))",
  counterSectionBackground: "linear-gradient(to left, rgba(97, 52, 23, 0.9), rgba(97, 87, 24, 0.9))",
  newsSectionBackground: "linear-gradient(135deg, #6b3608, #6b5102)",
  secaoGradienteBackground: "linear-gradient(to right, #6b3608, #6b5102)",
  imagemProfFundoBackground: "linear-gradient(to right, #6b3608, #6b5102)",
  leftRectangleBackground: "linear-gradient(132deg, #6b5102 0%, #6b3608 100%)",
  secaoAgendaBackground: "linear-gradient(135deg, #252525 0%, #1a1a1a 100%)",
  cabecalhoAgendaBackground: "linear-gradient(to right, #6b3608, #6b5102)",
  blocoContatoPrincipalBackground: "#1a1a1a",
  rodapePrincipalSvoBackground: "linear-gradient(135deg, #6b5102, #6b3a0c, #6b3608)",

  // Cores de texto
  textColor: "#e0e0e0",
  textColorInverted: "#121212",
  navLinksColor: "#e0e0e0",
  navLinksHoverColor: "#FBB802",
  footerTextColor: "#e0e0e0",
  titleColor: "#FBB802",

  // Cores de cartões e elementos
  cartaoTelefoneContatoBackground: "linear-gradient(135deg, #6b5102, #6b4209)",
  cartaoEmailContatoBackground: "linear-gradient(135deg, #6b4209, #6b3608)",
  cartaoLocalizacaoEnderecoBackground: "linear-gradient(135deg, #6b3608, #542a06)",
  botaoRemocaoHoverBackground: "#6b3608",
  grupoDiaOddBackground: "#252525",
  grupoDiaEvenBackground: "#1e1e1e",
  tituloDiaColor: "#FBB802",
  tipoAtendimentoColor: "#e0e0e0",
  horarioAtendimentoColor: "#FBB802",
  horarioAtendimentoBackground: "#252525",

  // Cores específicas para a página institucional
  topoInstitucionalBackground: "linear-gradient(135deg, #6b5102, #6b3a0c)",
  blocoInstitucionalBackground: "#1e1e1e",
  tabelaInstitucionalHeaderBackground: "#252525",
  tabelaInstitucionalRowBackground: "#1e1e1e",
  tabelaInstitucionalRowAltBackground: "#252525",
  pessoaInstitucionalBackground: "#252525",
  botaoInstitucionalBackground: "#6b3608",
  botaoInstitucionalTextColor: "#e0e0e0",
}

document.addEventListener("DOMContentLoaded", () => {
  // Adicionar o CSS do dark mode ao documento
  addDarkModeCSS()

  // Criar o botão de alternância do tema
  createThemeToggle()

  // Verificar se o usuário já tinha uma preferência salva
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    updateToggleAppearance(true)
  }

  // Adicionar listener para o botão de alternância
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme)
})

// Função para adicionar o CSS do modo escuro
function addDarkModeCSS() {
  const style = document.createElement("style")
  style.textContent = `
        /* Estilo do botão toggle */
        .theme-toggle {
            display: flex;
            align-items: center;
            margin-left: 20px;
            cursor: pointer;
            position: relative;
            width: 50px;
            height: 26px;
        }
        
        .theme-toggle-switch {
            position: absolute;
            top: 3px;
            left: 3px;
            width: 20px;
            height: 20px;
            background-color: #fff;
            border-radius: 50%;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .theme-toggle-switch.dark {
            transform: translateX(24px);
            background-color: #FBB802;
        }
        
        .theme-toggle {
            background-color: #e0e0e0;
            border-radius: 34px;
            padding: 3px;
            box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        }
        
        .theme-toggle.dark-mode {
            background-color: #333;
        }
        
        .theme-toggle-icon {
            position: absolute;
            left: 9px;
            font-size: 14px;
            color: #FBB802;
        }
        
        .theme-toggle-switch.dark + .theme-toggle-icon {
            left: auto;
            right: 9px;
            color: #fff;
        }
        
        /* Estilo do modo escuro */
        body.dark-mode {
            background-color: ${darkTheme.bodyBackground};
            color: ${darkTheme.textColor};
        }
        
        /* Navbar */
        body.dark-mode .navbar {
            background-image: ${darkTheme.navbarBackground};
        }
        
        body.dark-mode .nav-links li a {
            color: ${darkTheme.navLinksColor};
        }
        
        body.dark-mode .nav-links li a:hover {
            color: ${darkTheme.navLinksHoverColor};
        }
        
        body.dark-mode .icone_acessibilidade svg {
            fill: ${darkTheme.textColor};
        }
        
        /* Hero Section */
        body.dark-mode .hero {
            background-image: ${darkTheme.heroBackground}, url("imagens/pexels-shvetsa-4586984 (1).webp");
        }
        
        /* Counter Section */
        body.dark-mode .counter-section {
            background-image: ${darkTheme.counterSectionBackground};
        }
        
        /* News Section */
        body.dark-mode .news-section {
            background: ${darkTheme.newsSectionBackground};
        }
        
        body.dark-mode .news-card {
            background-color: rgba(30, 30, 30, 0.5);
        }
        
        body.dark-mode .news-title,
        body.dark-mode .news-preview {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .view-all-btn {
            background-color: ${darkTheme.textColor};
            color: ${darkTheme.textColorInverted};
        }
        
        /* Remoção Telinha */
        body.dark-mode .secao_gradiente {
            background: ${darkTheme.secaoGradienteBackground};
        }
        
        body.dark-mode .texto_da_remocao {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .botao_remocao {
            background-color: ${darkTheme.textColor};
            color: ${darkTheme.textColorInverted};
        }
        
        body.dark-mode .botao_remocao:hover {
            background-color: ${darkTheme.botaoRemocaoHoverBackground};
            color: ${darkTheme.textColor};
        }
        
        /* Profissionais */
        body.dark-mode .imagem_prof_fundo {
            background: ${darkTheme.imagemProfFundoBackground};
        }
        
        body.dark-mode .left-rectangle {
            background: ${darkTheme.leftRectangleBackground};
        }
        
        body.dark-mode .texto_prof {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .botao_prof {
            background-color: ${darkTheme.textColor};
        }
        
        body.dark-mode .botao_prof:hover {
            background-color: ${darkTheme.botaoRemocaoHoverBackground};
        }
        
        body.dark-mode .botao_prof_texto {
            color: ${darkTheme.textColorInverted};
        }
        
        body.dark-mode .botao_prof:hover .botao_prof_texto {
            color: ${darkTheme.textColor};
        }
        
        /* Agenda */
        body.dark-mode .secao-agenda {
            background: ${darkTheme.secaoAgendaBackground};
            border-color: #333;
        }
        
        body.dark-mode .cabecalho-agenda {
            background: ${darkTheme.cabecalhoAgendaBackground};
        }
        
        body.dark-mode .container-imagem {
            background-color: #252525;
            border-left-color: #333;
        }
        
        body.dark-mode .texto-imagem {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .grupo-dia:nth-child(odd) {
            background-color: ${darkTheme.grupoDiaOddBackground};
        }
        
        body.dark-mode .grupo-dia:nth-child(even) {
            background-color: ${darkTheme.grupoDiaEvenBackground};
        }
        
        body.dark-mode .grupo-dia:hover {
            background-color: #2c2c2c;
        }
        
        body.dark-mode .titulo-dia {
            color: ${darkTheme.titleColor};
            border-bottom-color:rgb(255, 0, 0);
        }
        
        body.dark-mode .titulo-dia::after {
            background-color: #FBB802;
        }
        
        body.dark-mode .item-horario {
            border-bottom-color: #333;
        }
        
        body.dark-mode .tipo-atendimento {
            color: ${darkTheme.tipoAtendimentoColor};
        }
        
        body.dark-mode .tipo-atendimento::before {
            color: #FBB802;
        }
        
        body.dark-mode .horario-atendimento {
            color: ${darkTheme.horarioAtendimentoColor};
            background-color: ${darkTheme.horarioAtendimentoBackground};
        }
        
        /* ===== AGENDA ATUALIZADA ===== */

        /* Seção principal da agenda */
        body.dark-mode .secao-agenda {
            background: #1e1e1e;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            border: 1px solid #333;
        }

        body.dark-mode .secao-agenda:hover {
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        /* Container principal */
        body.dark-mode .container-principal {
            background-color: transparent;
        }

        /* Painel lateral */
        body.dark-mode .painel-lateral {
            background: linear-gradient(135deg, #6b5102, #6b3a0c);
        }

        body.dark-mode .painel-lateral::before {
            background: radial-gradient(circle, rgba(251, 184, 2, 0.1) 0%, rgba(251, 184, 2, 0) 70%);
        }

        /* Ícone do relógio */
        body.dark-mode .icone-relogio {
            background: #252525;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            border: 2px solid #FBB802;
        }

        /* Título do painel */
        body.dark-mode .titulo-painel {
            color: ${darkTheme.textColor};
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        /* Informações de funcionamento */
        body.dark-mode .info-funcionamento {
            color: ${darkTheme.textColor};
        }

        body.dark-mode .linha-info {
            border-bottom: 1px solid rgba(251, 184, 2, 0.2);
        }

        body.dark-mode .tipo-servico {
            color: ${darkTheme.textColor};
        }

        body.dark-mode .horario-servico {
            background: rgba(251, 184, 2, 0.2);
            color: ${darkTheme.textColor};
            backdrop-filter: blur(10px);
        }

        /* Conteúdo da agenda */
        body.dark-mode .conteudo-agenda {
            background: #1a1a1a;
        }

        /* Cabeçalho da agenda */
        body.dark-mode .cabecalho-agenda h2 {
            color: ${darkTheme.titleColor};
        }

        body.dark-mode .cabecalho-agenda h2::after {
            background: linear-gradient(to right, #6b5102, #6b3a0c);
        }

        /* Grupos de dias */
        body.dark-mode .grupo-dia {
            background: #252525;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            border: 1px solid #333;
        }

        body.dark-mode .grupo-dia:hover {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            background: #2c2c2c;
        }

        /* Título do dia */
        body.dark-mode .titulo-dia {
            color: #FBB802;
        }

        body.dark-mode .titulo-dia::before {
            background: linear-gradient(135deg, #6b5102, #6b3a0c);
        }

        /* Itens de horário */
        body.dark-mode .item-horario {
            border-bottom: 1px solid #333;
        }

        body.dark-mode .item-horario:hover {
            background: rgba(251, 184, 2, 0.1);
        }

        /* Tipo de atendimento */
        body.dark-mode .tipo-atendimento {
            color: ${darkTheme.textColor};
        }

        body.dark-mode .tipo-atendimento::before {
            color: #FBB802;
        }

        /* Horário de atendimento */
        body.dark-mode .horario-atendimento {
            color: #FBB802;
            background: rgba(251, 184, 2, 0.15);
        }

        body.dark-mode .horario-atendimento:hover {
            background: rgba(251, 184, 2, 0.25);
        }

        /* Emergência */
        body.dark-mode .emergencia {
            background: linear-gradient(135deg, #8B0000, #DC143C);
            color: ${darkTheme.textColor};
        }

        body.dark-mode .emergencia::before {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }

        /* Animações específicas para dark mode */
        @keyframes pulseDarkAgenda {
            0% {
                box-shadow: 0 0 0 0 rgba(251, 184, 2, 0.7);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(251, 184, 2, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(251, 184, 2, 0);
            }
        }

        body.dark-mode .emergencia {
            animation: pulseDarkAgenda 2s infinite;
        }

        /* Ajustes para responsividade no dark mode */
        @media (max-width: 768px) {
            body.dark-mode .painel-lateral {
                background: linear-gradient(135deg, #6b5102, #6b3a0c);
            }
            
            body.dark-mode .secao-agenda {
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            }
        }
        
        /* Contato */
        body.dark-mode .bloco_contato_principal {
            background-color: ${darkTheme.blocoContatoPrincipalBackground};
        }
        
        body.dark-mode .titulo_contato_principal,
        body.dark-mode .subtitulo_contato_descricao {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .cartao_telefone_contato {
            background: ${darkTheme.cartaoTelefoneContatoBackground};
        }
        
        body.dark-mode .cartao_email_contato {
            background: ${darkTheme.cartaoEmailContatoBackground};
        }
        
        body.dark-mode .cartao_localizacao_endereco {
            background: ${darkTheme.cartaoLocalizacaoEnderecoBackground};
        }
        
        /* Footer */
        body.dark-mode .rodape_principal_svo {
            background: ${darkTheme.rodapePrincipalSvoBackground};
        }
        
        body.dark-mode .texto_rodape_descricao,
        body.dark-mode .link_rodape_navegacao,
        body.dark-mode .texto_contato_rodape,
        body.dark-mode .texto_copyright_rodape {
            color: ${darkTheme.footerTextColor};
        }
        
        body.dark-mode .titulo_coluna_rodape::after {
            background-color: #FBB802;
        }
        
        body.dark-mode .barra_copyright_rodape {
            border-top-color: rgba(255, 255, 255, 0.1);
        }
        
        /* Painel de acessibilidade */
        body.dark-mode .painel_acessibilidade {
            background-color: #252525;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode .painel_acessibilidade h3 {
            color: #FBB802;
            border-bottom-color: #333;
        }
        
        body.dark-mode .info_tamanho_fonte {
            color: #b0b0b0;
        }
        
        body.dark-mode .botao_controle_fonte {
            background-color: #333;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .botao_controle_fonte:hover {
            background-color: #444;
        }
        
        body.dark-mode .botao_resetar_fonte {
            background-color: #6b3608;
        }
        
        body.dark-mode .botao_resetar_fonte:hover {
            background-color: #FBB802;
            color: #000;
        }

        /* ESTILOS PARA A PÁGINA INSTITUCIONAL */
        
        /* Topo institucional */
        body.dark-mode .topo_institucional {
            background: ${darkTheme.topoInstitucionalBackground};
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .topo_institucional h1,
        body.dark-mode .topo_institucional p {
            color: ${darkTheme.textColor};
        }
        
        /* Blocos institucionais */
        body.dark-mode .bloco_institucional {
            background-color: ${darkTheme.blocoInstitucionalBackground};
            border-color: #333;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode .bloco_institucional h2,
        body.dark-mode .bloco_institucional h3 {
            color: ${darkTheme.titleColor};
            border-bottom-color: #6b3608;
        }
        
        body.dark-mode .quadro_atividades,
        body.dark-mode .organograma_institucional,
        body.dark-mode .equipe_institucional,
        body.dark-mode .moldura_institucional {
            background-color: #1a1a1a;
            border-color: #333;
        }
        
        /* Lista de atividades */
        body.dark-mode .lista_atividades li {
            border-bottom-color: #333;
        }
        
        body.dark-mode .lista_atividades li strong {
            color: ${darkTheme.titleColor};
        }
        
        /* Tabela institucional */
        body.dark-mode .tabela_institucional {
            border-color: #333;
        }
        
        body.dark-mode .tabela_institucional thead {
            background-color: ${darkTheme.tabelaInstitucionalHeaderBackground};
        }
        
        body.dark-mode .tabela_institucional th {
            color: ${darkTheme.titleColor};
            border-color: #444;
        }
        
        body.dark-mode .tabela_institucional td {
            border-color: #333;
        }
        
        body.dark-mode .tabela_institucional tbody tr:nth-child(odd) {
            background-color: ${darkTheme.tabelaInstitucionalRowBackground};
        }
        
        body.dark-mode .tabela_institucional tbody tr:nth-child(even) {
            background-color: ${darkTheme.tabelaInstitucionalRowAltBackground};
        }
        
        body.dark-mode .tabela_institucional tbody tr:hover {
            background-color: #2c2c2c;
        }
        
        /* Cards de profissionais */
        body.dark-mode .pessoa_institucional {
            background-color: ${darkTheme.pessoaInstitucionalBackground};
            border-color: #333;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode .nome_institucional {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .cargo_institucional {
            color: #b0b0b0;
        }
        
        body.dark-mode .botao_institucional {
            background-color: ${darkTheme.botaoInstitucionalBackground};
            color: ${darkTheme.botaoInstitucionalTextColor};
        }
        
        body.dark-mode .botao_institucional:hover {
            background-color: #FBB802;
            color: #000;
        }
        
        /* Currículo detalhado */
        body.dark-mode #exemplo-curriculo ul li {
            border-bottom-color: #333;
        }
        
        body.dark-mode #exemplo-curriculo h3 {
            color: ${darkTheme.titleColor};
        }

        /* ===== ESTILOS PARA A PÁGINA DO FORMULÁRIO ===== */
        
        /* Cabeçalho do formulário */
        body.dark-mode .cabecalho-principal {
            background: linear-gradient(135deg, #6b5102, #6b3a0c);
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .cabecalho-principal h1,
        body.dark-mode .cabecalho-principal p {
            color: ${darkTheme.textColor};
        }
        
        /* Container principal do formulário */
        body.dark-mode .container-formulario {
            background-color: #1e1e1e;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        }
        
        /* Barra de progresso */
        body.dark-mode .barra-progresso-container {
            background: linear-gradient(135deg, #6b5102, #6b3a0c);
        }
        
        body.dark-mode .numero-etapa {
            background: rgba(255, 255, 255, 0.2);
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .etapa-item.ativa .numero-etapa {
            background: #FBB802;
            color: #000;
        }
        
        body.dark-mode .etapa-item.concluida .numero-etapa {
            background: #28A745;
            color: white;
        }
        
        body.dark-mode .linha-progresso {
            background: rgba(255, 255, 255, 0.2);
        }
        
        body.dark-mode .progresso-preenchido {
            background: #FBB802;
        }
        
        /* Seções do formulário */
        body.dark-mode .secao-formulario {
            background-color: #1e1e1e;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .secao-formulario h3 {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .icone-secao {
            color: ${darkTheme.titleColor};
        }
        
        /* Campos do formulário */
        body.dark-mode .form-control {
            background-color: #252525;
            border-color: #444;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .form-control:focus {
            background-color: #252525;
            border-color: #FBB802;
            color: ${darkTheme.textColor};
            box-shadow: 0 0 0 0.2rem rgba(251, 184, 2, 0.25);
        }
        
        body.dark-mode .form-control::placeholder {
            color: #888;
        }
        
        body.dark-mode .form-label {
            color: ${darkTheme.textColor};
        }
        
        /* Radio buttons e checkboxes */
        body.dark-mode .radio-group {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .radio-item label {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .form-check-input {
            background-color: #252525;
            border-color: #444;
        }
        
        body.dark-mode .form-check-input:checked {
            background-color: #FBB802;
            border-color: #FBB802;
        }
        
        body.dark-mode .form-check-label {
            color: ${darkTheme.textColor};
        }
        
        /* Alertas */
        body.dark-mode .alerta-vermelho {
            background: #2d1b1b;
            border-color: #DC3545;
            color: #ff6b6b;
        }
        
        body.dark-mode .alerta-amarelo {
            background: #2d2a1b;
            border-color: #FBB802;
            color: #ffd93d;
        }
        
        /* Subcampos */
        body.dark-mode .subcampos {
            background-color: #252525;
            border: 1px solid #444;
        }
        
        /* Botões */
        body.dark-mode .btn-primario {
            background: linear-gradient(135deg, #6b5102, #6b3a0c);
            border: none;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .btn-primario:hover {
            background: linear-gradient(135deg, #FBB802, #e6a532);
            color: #000;
        }
        
        body.dark-mode .btn-secundario {
            background-color: #444;
            border: none;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .btn-secundario:hover {
            background-color: #555;
        }
        
        /* Tela de confirmação */
        body.dark-mode .tela-confirmacao {
            background-color: #1e1e1e;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .protocolo-numero {
            color: ${darkTheme.titleColor};
        }
        
        /* Navegação de botões */
        body.dark-mode #botoes-navegacao {
            background-color: #1e1e1e;
            border-top: 1px solid #333;
        }
        
        /* Mensagens de erro */
        body.dark-mode .mensagem-erro {
            color: #ff6b6b;
        }
        
        body.dark-mode .campo-invalido {
            border-color: #DC3545 !important;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }
        
        /* Select dropdown */
        body.dark-mode select.form-control {
            background-color: #252525;
            border-color: #444;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode select.form-control option {
            background-color: #252525;
            color: ${darkTheme.textColor};
        }
        
        /* File input */
        body.dark-mode input[type="file"] {
            background-color: #252525;
            border-color: #444;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode input[type="file"]::-webkit-file-upload-button {
            background-color: #444;
            color: ${darkTheme.textColor};
            border: 1px solid #555;
        }
        
        /* Text muted */
        body.dark-mode .text-muted {
            color: #888 !important;
        }
        
        /* Alert info */
        body.dark-mode .alert-info {
            background-color: #1a2332;
            border-color: #2980b9;
            color: #74c0fc;
        }
        
        /* Campos obrigatórios */
        body.dark-mode .campo-obrigatorio::after {
            color: #ff6b6b;
        }

        /* ===== ESTILOS PARA A PÁGINA DE PERFIL PROFISSIONAL ===== */
        
        /* Botão voltar */
        body.dark-mode .botao-voltar {
            background: linear-gradient(135deg, #6b5102, #6b3a0c);
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .botao-voltar:hover {
            background: linear-gradient(135deg, #FBB802, #e6a532);
            color: #000;
        }
        
        /* Logo do governo */
        body.dark-mode .gov_symbol {
            filter: brightness(0.8);
        }
        
        /* Botão voltar ao topo */
        body.dark-mode .botao-topo {
            background: linear-gradient(145deg, #6b5102, #6b3a0c);
        }
        
        body.dark-mode .botao-topo:hover {
            background: linear-gradient(145deg, #FBB802, #e6a532);
        }
        
        body.dark-mode .botao-topo svg {
            stroke: ${darkTheme.textColor};
        }
        
        body.dark-mode .circulo-base {
            stroke: rgba(255, 255, 255, 0.2);
        }
        
        body.dark-mode .circulo-valor {
            stroke: #FBB802;
        }
        
        /* Cabeçalho do perfil */
        body.dark-mode .topo_perfil {
            background: linear-gradient(135deg, #6b5102, #6b3a0c);
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .container_perfil {
            background-color: transparent;
        }
        
        body.dark-mode .topo_perfil h1 {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .cargo_perfil {
            color: #FBB802;
        }
        
        body.dark-mode .contato_rapido .contato_item {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .contato_rapido .contato_item svg {
            stroke: #FBB802;
        }
        
        body.dark-mode .badges_perfil .badge {
            background-color: rgba(251, 184, 2, 0.2);
            color: #FBB802;
            border: 1px solid #FBB802;
        }
        
        /* Container principal do conteúdo */
        body.dark-mode .conteudo_perfil {
            background-color: ${darkTheme.bodyBackground};
        }
        
        body.dark-mode .container_conteudo {
            background-color: transparent;
        }
        
        /* Sidebar */
        body.dark-mode .sidebar_perfil {
            background-color: #1e1e1e;
        }
        
        body.dark-mode .menu_perfil {
            background-color: #252525;
            border: 1px solid #333;
        }
        
        body.dark-mode .menu_perfil ul li a {
            color: ${darkTheme.textColor};
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .menu_perfil ul li a:hover {
            background-color: #333;
            color: #FBB802;
        }
        
        body.dark-mode .menu_perfil ul li a.ativo {
            background-color: #6b5102;
            color: ${darkTheme.textColor};
        }
        
        /* Card de contato na sidebar */
        body.dark-mode .card_contato {
            background-color: #252525;
            border: 1px solid #333;
        }
        
        body.dark-mode .card_contato h3 {
            color: ${darkTheme.titleColor};
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .card_contato .contato_item {
            color: ${darkTheme.textColor};
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .card_contato .contato_item svg {
            stroke: #FBB802;
        }
        
        body.dark-mode .botao_contato {
            background: linear-gradient(135deg, #6b5102, #6b3a0c);
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .botao_contato:hover {
            background: linear-gradient(135deg, #FBB802, #e6a532);
            color: #000;
        }
        
        /* Área principal do perfil */
        body.dark-mode .principal_perfil {
            background-color: transparent;
        }
        
        /* Seções do perfil */
        body.dark-mode .secao_perfil {
            background-color: transparent;
        }
        
        body.dark-mode .secao_perfil h2 {
            color: ${darkTheme.titleColor};
            border-bottom: 2px solid #6b5102;
        }
        
        /* Cartões de conteúdo */
        body.dark-mode .cartao_conteudo {
            background-color: #1e1e1e;
            border: 1px solid #333;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode .cartao_conteudo p {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .cartao_conteudo h3 {
            color: ${darkTheme.titleColor};
        }
        
        /* Citação */
        body.dark-mode .citacao_perfil {
            background-color: #252525;
            border-left: 4px solid #FBB802;
            color: ${darkTheme.textColor};
        }
        
        /* Linha do tempo */
        body.dark-mode .linha_tempo {
            border-left: 2px solid #333;
        }
        
        body.dark-mode .item_linha_tempo {
            background-color: transparent;
        }
        
        body.dark-mode .item_linha_tempo::before {
            background-color: #FBB802;
            border: 3px solid #1e1e1e;
        }
        
        body.dark-mode .periodo {
            background-color: #6b5102;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .conteudo_linha_tempo h3 {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .conteudo_linha_tempo p {
            color: ${darkTheme.textColor};
        }
        
        /* Listas */
        body.dark-mode .lista_perfil {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .lista_perfil li {
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .lista_perfil li::before {
            color: #FBB802;
        }
        
        /* Grid de certificados */
        body.dark-mode .grid_certificados {
            background-color: transparent;
        }
        
        body.dark-mode .card_certificado {
            background-color: #252525;
            border: 1px solid #333;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-mode .card_certificado:hover {
            background-color: #2c2c2c;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode .icone_certificado {
            background-color: rgba(251, 184, 2, 0.1);
        }
        
        body.dark-mode .icone_certificado svg {
            stroke: #FBB802;
        }
        
        body.dark-mode .info_certificado h3 {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .info_certificado p {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .ano_certificado {
            color: #FBB802;
        }
        
        /* Publicações */
        body.dark-mode .publicacoes_lista {
            background-color: transparent;
        }
        
        body.dark-mode .publicacao_item {
            background-color: #252525;
            border: 1px solid #333;
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 8px;
        }
        
        body.dark-mode .publicacao_item h3 {
            color: ${darkTheme.titleColor};
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .lista_publicacoes {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .lista_publicacoes li {
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .lista_publicacoes li strong {
            color: #FBB802;
        }
        
        /* Grid de atividades */
        body.dark-mode .atividades_grid {
            background-color: transparent;
        }
        
        body.dark-mode .atividade_card {
            background-color: #252525;
            border: 1px solid #333;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-mode .atividade_card:hover {
            background-color: #2c2c2c;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode .icone_atividade {
            background-color: rgba(251, 184, 2, 0.1);
        }
        
        body.dark-mode .icone_atividade svg {
            stroke: #FBB802;
        }
        
        body.dark-mode .atividade_card h3 {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .atividade_card p {
            color: ${darkTheme.textColor};
        }
        
        /* Lista de prêmios */
        body.dark-mode .lista_premios {
            background-color: #252525;
            border: 1px solid #333;
            padding: 20px;
            border-radius: 8px;
        }
        
        body.dark-mode .lista_premios li {
            color: ${darkTheme.textColor};
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .lista_premios li strong {
            color: #FBB802;
        }
        
        /* Lista de contato */
        body.dark-mode .lista_contato {
            background-color: #252525;
            border: 1px solid #333;
            padding: 20px;
            border-radius: 8px;
        }
        
        body.dark-mode .lista_contato li {
            color: ${darkTheme.textColor};
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .lista_contato a {
            color: #FBB802;
        }
        
        body.dark-mode .lista_contato a:hover {
            color: #e6a532;
        }
        
        /* Sidebar mobile */
        body.dark-mode .sidebar {
            background-color: #1a1a1a;
            border-left: 1px solid #333;
        }
        
        body.dark-mode .nav-links-mobile li a {
            color: ${darkTheme.textColor};
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .nav-links-mobile li a:hover {
            background-color: #252525;
            color: #FBB802;
        }
        
        body.dark-mode .sidebar-footer {
            color: #888;
            border-top: 1px solid #333;
        }
        
        /* Menu toggle button */
        body.dark-mode .menu-toggle span {
            background-color: ${darkTheme.textColor};
        }
        
        /* Notícias individuais */
        body.dark-mode .conteudo_noticia {
            background-color: #1e1e1e;
            border: 1px solid #333;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        
        body.dark-mode .cabecalho_noticia {
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .titulo_noticia {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .meta_noticia {
            color: #888;
        }
        
        body.dark-mode .corpo_noticia {
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .corpo_noticia h2,
        body.dark-mode .corpo_noticia h3 {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .corpo_noticia blockquote {
            background-color: #252525;
            border-left: 4px solid #FBB802;
        }
        
        body.dark-mode .tags_noticia {
            border-top: 1px solid #333;
        }
        
        body.dark-mode .tag {
            background-color: #252525;
            color: ${darkTheme.textColor};
            border: 1px solid #444;
        }
        
        body.dark-mode .tag:hover {
            background-color: #6b5102;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .navegacao_noticias {
            border-top: 1px solid #333;
        }
        
        body.dark-mode .nav-btn {
            background-color: #252525;
            color: ${darkTheme.textColor};
            border: 1px solid #444;
        }
        
        body.dark-mode .nav-btn:hover {
            background-color: #6b5102;
            color: ${darkTheme.textColor};
        }
        
        body.dark-mode .noticias_relacionadas {
            background-color: #1e1e1e;
            border: 1px solid #333;
        }
        
        body.dark-mode .noticias_relacionadas h3 {
            color: ${darkTheme.titleColor};
            border-bottom: 1px solid #333;
        }
        
        body.dark-mode .card_noticia_relacionada {
            background-color: #252525;
            border: 1px solid #333;
        }
        
        body.dark-mode .card_noticia_relacionada:hover {
            background-color: #2c2c2c;
        }
        
        body.dark-mode .titulo_noticia_relacionada {
            color: ${darkTheme.titleColor};
        }
        
        body.dark-mode .data_noticia_relacionada {
            color: #888;
        }
        
        /* Ícones FontAwesome */
        body.dark-mode .fas {
            color: #FBB802;
        }
        
        /* Fotos institucionais */
        body.dark-mode .foto_institucional {
            border: 4px solid #333;
        }
        
        body.dark-mode .pessoa_institucional:hover .foto_institucional {
            border-color: #FBB802;
        }

        /* ===== ESTILOS PARA A NOVA SEÇÃO DE SERVIÇOS ===== */

        /* Container principal */
        body.dark-mode .containerPrincipal {
            background-color: transparent;
        }

        /* Caixa de serviços */
        body.dark-mode .caixaServicos {
            background: linear-gradient(145deg, #1e1e1e 0%, #252525 100%);
            border: 1px solid rgba(251, 184, 2, 0.2);
            box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.3),
                0 10px 25px rgba(251, 184, 2, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        body.dark-mode .caixaServicos::before {
            background: linear-gradient(90deg, #6b5102 0%, #6b3a0c 50%, #6b3608 100%);
        }

        /* Título da seção */
        body.dark-mode .tituloSecao {
            color: ${darkTheme.titleColor};
            background: linear-gradient(135deg, #FBB802 0%, #e6a532 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Itens de serviço */
        body.dark-mode .itemServico {
            background: linear-gradient(135deg, #6b5102 0%, #8b6b02 100%);
            color: ${darkTheme.textColor};
            box-shadow: 
                0 8px 20px rgba(107, 81, 2, 0.3),
                0 3px 8px rgba(0, 0, 0, 0.2);
            border: 2px solid transparent;
        }

        body.dark-mode .itemServico::before {
            background: linear-gradient(90deg, transparent, rgba(251, 184, 2, 0.2), transparent);
        }

        body.dark-mode .itemServico:hover {
            background: linear-gradient(135deg, #8b6b02 0%, #FBB802 100%);
            box-shadow: 
                0 15px 35px rgba(107, 81, 2, 0.4),
                0 8px 20px rgba(0, 0, 0, 0.25);
            border-color: rgba(251, 184, 2, 0.3);
            color: #000;
        }

        body.dark-mode .itemServico.ativo {
            background: linear-gradient(135deg, #5a4201 0%, #6b5102 100%);
            box-shadow: 
                0 5px 15px rgba(90, 66, 1, 0.4),
                inset 0 2px 4px rgba(0, 0, 0, 0.2);
            color: ${darkTheme.textColor};
        }

        /* Título do item */
        body.dark-mode .tituloItem {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        body.dark-mode .itemServico:hover .tituloItem {
            color: #000;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        /* Ícones */
        body.dark-mode .iconeServico {
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
        }

        body.dark-mode .setaDropdown {
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
        }

        /* Conteúdo da resposta */
        body.dark-mode .conteudoResposta {
            background: linear-gradient(135deg, #4a2c00 0%, #5a4201 100%);
            color: ${darkTheme.textColor};
            box-shadow: 
                0 8px 25px rgba(74, 44, 0, 0.3),
                inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Imagem lateral */
        body.dark-mode .imagemLateral {
            border: 3px solid rgba(251, 184, 2, 0.3);
            box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.4),
                0 10px 25px rgba(251, 184, 2, 0.1);
        }

        body.dark-mode .imagemLateral:hover {
            box-shadow: 
                0 30px 60px rgba(0, 0, 0, 0.5),
                0 15px 30px rgba(251, 184, 2, 0.15);
        }

        /* Animações específicas para dark mode */
        body.dark-mode .pulseEffect {
            animation: pulseDark 2s infinite;
        }

        @keyframes pulseDark {
            0% {
                box-shadow: 0 8px 20px rgba(107, 81, 2, 0.3);
            }
            50% {
                box-shadow: 0 8px 20px rgba(107, 81, 2, 0.5);
            }
            100% {
                box-shadow: 0 8px 20px rgba(107, 81, 2, 0.3);
            }
        }

        /* Ajustes para estados específicos no dark mode */
        body.dark-mode .itemServico.ativo:hover {
            background: linear-gradient(135deg, #6b5102 0%, #8b6b02 100%);
            color: ${darkTheme.textColor};
        }

        body.dark-mode .itemServico.ativo:hover .tituloItem {
            color: ${darkTheme.textColor};
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        /* Melhorias para acessibilidade no dark mode */
        body.dark-mode .itemServico:focus {
            outline: 2px solid #FBB802;
            outline-offset: 2px;
        }

        body.dark-mode .conteudoResposta.aberto {
            border-top: 1px solid rgba(251, 184, 2, 0.2);
        }

        /* Ajustes para media queries no dark mode */
        @media (max-width: 768px) {
            body.dark-mode .caixaServicos {
                box-shadow: 
                    0 15px 30px rgba(0, 0, 0, 0.4),
                    0 5px 15px rgba(251, 184, 2, 0.1);
            }
        }

        @media (max-width: 480px) {
            body.dark-mode .itemServico {
                box-shadow: 
                    0 6px 15px rgba(107, 81, 2, 0.3),
                    0 2px 6px rgba(0, 0, 0, 0.2);
            }
            
            body.dark-mode .itemServico:hover {
                box-shadow: 
                    0 10px 25px rgba(107, 81, 2, 0.4),
                    0 5px 15px rgba(0, 0, 0, 0.25);
            }
        }
    `
  document.head.appendChild(style)
}

// Função para criar o botão de alternância do tema
function createThemeToggle() {
  // Criar o elemento de toggle
  const themeToggle = document.createElement("div")
  themeToggle.className = "theme-toggle"
  themeToggle.id = "theme-toggle"
  themeToggle.title = "Alternar entre modo claro e escuro"

  // Criar o interruptor
  const toggleSwitch = document.createElement("div")
  toggleSwitch.className = "theme-toggle-switch"
  // Criar o ícone
  const toggleIcon = document.createElement("span")
  toggleIcon.className = "theme-toggle-icon"

  // Adicionar estilos para os ícones
  const style = document.createElement("style")
  style.textContent = `
        .theme-toggle {
            background: #f6f6f6;
            border: 2px solid #ddd;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .theme-toggle.dark-mode {
            background: #333;
            border-color: #444;
        }
        
        .theme-toggle-switch {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FBB802;
            border-radius: 50%;
            transition: all 0.3s ease;
            z-index: 1;
            position: absolute;
            top: 2px;
            left: 2px;
        }
        
        .theme-toggle-switch.dark {
            background: transparent;
            border-radius: 50%;
            box-shadow: inset -3px -3px 0 1px #FBB802;
            transform: translateX(24px);
            transition: all 0.3s ease;
            width: 15px;
            height: 15px;
            margin: 0;
            left: 2px;
            top: 3px;
            z-index: 1;
        }

        .theme-toggle-icon {
            display: none;
        }
        `
  document.head.appendChild(style)

  // Montar o toggle
  themeToggle.appendChild(toggleSwitch)
  themeToggle.appendChild(toggleIcon)

  // Encontrar a navbar
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    // Criar um container para os controles
    const controlsContainer = document.createElement("div")
    controlsContainer.style.display = "flex"
    controlsContainer.style.alignItems = "center"
    controlsContainer.style.marginLeft = "auto"
    controlsContainer.style.gap = "10px"

    // Mover o toggle e o botão de acessibilidade para o container
    const acessibilidade = document.querySelector(".icone_acessibilidade")
    if (acessibilidade) {
      controlsContainer.appendChild(themeToggle)
      controlsContainer.appendChild(acessibilidade)
      navbar.appendChild(controlsContainer)
    }
  }
}

// Função para alternar entre os modos
function toggleTheme() {
  const isDarkMode = document.body.classList.toggle("dark-mode")
  const themeToggle = document.getElementById("theme-toggle")
  const toggleIcon = document.querySelector(".theme-toggle-icon")

  // Atualizar o ícone baseado no modo
  if (toggleIcon) {
    toggleIcon.innerHTML = isDarkMode ? "" : ""
  }

  // Adicionar ou remover a classe dark-mode do botão toggle
  if (themeToggle) {
    themeToggle.classList.toggle("dark-mode", isDarkMode)
  }

  // Salvar a preferência do usuário
  if (isDarkMode) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }

  // Atualizar a aparência do botão
  updateToggleAppearance(isDarkMode)

  // Também atualiza algumas propriedades diretamente para uma transição mais suave
  updateDynamicElements(isDarkMode)
}

// Função para atualizar a aparência do botão
function updateToggleAppearance(isDarkMode) {
  const toggleSwitch = document.querySelector(".theme-toggle-switch")
  const toggleIcon = document.querySelector(".theme-toggle-icon")

  if (toggleSwitch && toggleIcon) {
    if (isDarkMode) {
      toggleSwitch.classList.add("dark")
      toggleIcon.innerHTML = ""
    } else {
      toggleSwitch.classList.remove("dark")
      toggleIcon.innerHTML = ""
    }
  }
}

// Função para atualizar elementos dinâmicos
function updateDynamicElements(isDarkMode) {
  // Aqui podemos adicionar atualizações específicas para elementos que
  // não são facilmente alterados apenas com CSS
  // Por exemplo, podemos ajustar as cores dos gradientes diretamente
  // ou alterar atributos específicos de alguns elementos
  // Isso é útil para elementos que são adicionados dinamicamente via JavaScript
  // ou que têm estilos inline que precisam ser atualizados
}

function addThemeTransition() {
  const style = document.createElement("style")
  style.textContent = `
        body, body * {
            transition: background-color 0.3s ease, background-image 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
    `
  document.head.appendChild(style)
}

function checkSystemPreference() {
  // Verificar preferência do sistema se não houver preferência salva
  if (!localStorage.getItem("theme")) {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark-mode")
      updateToggleAppearance(true)
    }
  }
}

addThemeTransition()
checkSystemPreference()
