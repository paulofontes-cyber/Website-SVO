

// Definir as variáveis de cor para ambos os temas
const lightTheme = {
    // Cores de fundo principais
    bodyBackground: '#fffde0',
    navbarBackground: 'linear-gradient(to left, rgba(223, 221, 156, 0.591), rgba(255, 166, 0, 0.726))',
    heroBackground: 'linear-gradient(to right, rgba(141, 67, 6, 0.797), rgba(232, 203, 14, 0.37))',
    counterSectionBackground: 'linear-gradient(to left, rgba(255, 115, 0, 0.965), rgb(255, 204, 0))',
    newsSectionBackground: 'linear-gradient(135deg, #DE6F0D, #FBB802)',
    secaoGradienteBackground: 'linear-gradient(to right, #f78c4c, #ffb940)',
    imagemProfFundoBackground: 'linear-gradient(to right, #f78c4c, #ffb940)',
    leftRectangleBackground: 'linear-gradient(132deg, #FBB802 0%, #FF8761 100%)',
    secaoAgendaBackground: 'linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%)',
    cabecalhoAgendaBackground: 'linear-gradient(to right, #f78c4c, #ffb940)',
    blocoContatoPrincipalBackground: '#FFF8E8',
    rodapePrincipalSvoBackground: 'linear-gradient(135deg, #FFD54F, #FFA000, #FF7043)',
    
    // Cores de texto
    textColor: '#000000',
    textColorInverted: '#ffffff',
    navLinksColor: '#ffffff',
    navLinksHoverColor: '#e67e22',
    footerTextColor: '#ffffff',
    titleColor: '#FF9066',
    
    // Cores de cartões e elementos
    cartaoTelefoneContatoBackground: 'linear-gradient(135deg, #FFC107, #FF9800)',
    cartaoEmailContatoBackground: 'linear-gradient(135deg, #FF9800, #FF7043)',
    cartaoLocalizacaoEnderecoBackground: 'linear-gradient(135deg, #FF7043, #FF5722)',
    botaoRemocaoHoverBackground: '#d56a18',
    grupoDiaOddBackground: '#f8f9fa',
    grupoDiaEvenBackground: '#ffffff',
    tituloDiaColor: '#1e3c72',
    tipoAtendimentoColor: '#34495e',
    horarioAtendimentoColor: '#2980b9',
    horarioAtendimentoBackground: '#e8f4fc',

    // Cores específicas para a página institucional
    topoInstitucionalBackground: 'linear-gradient(135deg, #FFD54F, #FFA000)',
    blocoInstitucionalBackground: '#ffffff',
    tabelaInstitucionalHeaderBackground: '#f8f9fa',
    tabelaInstitucionalRowBackground: '#ffffff',
    tabelaInstitucionalRowAltBackground: '#f8f9fa',
    pessoaInstitucionalBackground: '#ffffff',
    botaoInstitucionalBackground: '#FF9800',
    botaoInstitucionalTextColor: '#ffffff',
};

const darkTheme = {
    // Cores de fundo principais
    bodyBackground: '#121212',
    navbarBackground: 'linear-gradient(to left, rgba(56, 56, 46, 0.8), rgba(97, 71, 18, 0.8))',
    heroBackground: 'linear-gradient(to right, rgba(97, 52, 23, 0.9), rgba(97, 87, 24, 0.7))',
    counterSectionBackground: 'linear-gradient(to left, rgba(97, 52, 23, 0.9), rgba(97, 87, 24, 0.9))',
    newsSectionBackground: 'linear-gradient(135deg, #6b3608, #6b5102)',
    secaoGradienteBackground: 'linear-gradient(to right, #6b3608, #6b5102)',
    imagemProfFundoBackground: 'linear-gradient(to right, #6b3608, #6b5102)',
    leftRectangleBackground: 'linear-gradient(132deg, #6b5102 0%, #6b3608 100%)',
    secaoAgendaBackground: 'linear-gradient(135deg, #252525 0%, #1a1a1a 100%)',
    cabecalhoAgendaBackground: 'linear-gradient(to right, #6b3608, #6b5102)',
    blocoContatoPrincipalBackground: '#1a1a1a',
    rodapePrincipalSvoBackground: 'linear-gradient(135deg, #6b5102, #6b3a0c, #6b3608)',
    
    // Cores de texto
    textColor: '#e0e0e0',
    textColorInverted: '#121212',
    navLinksColor: '#e0e0e0',
    navLinksHoverColor: '#FBB802',
    footerTextColor: '#e0e0e0',
    titleColor: '#FBB802',
    
    
    // Cores de cartões e elementos
    cartaoTelefoneContatoBackground: 'linear-gradient(135deg, #6b5102, #6b4209)',
    cartaoEmailContatoBackground: 'linear-gradient(135deg, #6b4209, #6b3608)',
    cartaoLocalizacaoEnderecoBackground: 'linear-gradient(135deg, #6b3608, #542a06)',
    botaoRemocaoHoverBackground: '#6b3608',
    grupoDiaOddBackground: '#252525',
    grupoDiaEvenBackground: '#1e1e1e',
    tituloDiaColor: '#FBB802',
    tipoAtendimentoColor: '#e0e0e0',
    horarioAtendimentoColor: '#FBB802',
    horarioAtendimentoBackground: '#252525',

    // Cores específicas para a página institucional
    topoInstitucionalBackground: 'linear-gradient(135deg, #6b5102, #6b3a0c)',
    blocoInstitucionalBackground: '#1e1e1e',
    tabelaInstitucionalHeaderBackground: '#252525',
    tabelaInstitucionalRowBackground: '#1e1e1e',
    tabelaInstitucionalRowAltBackground: '#252525',
    pessoaInstitucionalBackground: '#252525',
    botaoInstitucionalBackground: '#6b3608',
    botaoInstitucionalTextColor: '#e0e0e0',
};

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar o CSS do dark mode ao documento
    addDarkModeCSS();
    
    // Criar o botão de alternância do tema
    createThemeToggle();
    
    // Verificar se o usuário já tinha uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateToggleAppearance(true);
    }
    
    // Adicionar listener para o botão de alternância
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});

// Função para adicionar o CSS do modo escuro
function addDarkModeCSS() {
    const style = document.createElement('style');
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
    `;
    document.head.appendChild(style);
}

// Função para criar o botão de alternância do tema
function createThemeToggle() {
    // Criar o elemento de toggle
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'theme-toggle';
    themeToggle.title = 'Alternar entre modo claro e escuro';
    
    // Criar o interruptor
    const toggleSwitch = document.createElement('div');
    toggleSwitch.className = 'theme-toggle-switch';
    // Criar o ícone
    const toggleIcon = document.createElement('span');
    toggleIcon.className = 'theme-toggle-icon';
    
    // Adicionar estilos para os ícones
    const style = document.createElement('style');
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
        `;
    document.head.appendChild(style);
    
    // Montar o toggle
    themeToggle.appendChild(toggleSwitch);
    themeToggle.appendChild(toggleIcon);
    
    // Encontrar a navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Criar um container para os controles
        const controlsContainer = document.createElement('div');
        controlsContainer.style.display = 'flex';
        controlsContainer.style.alignItems = 'center';
        controlsContainer.style.marginLeft = 'auto';
        controlsContainer.style.gap = '10px';
        
        // Mover o toggle e o botão de acessibilidade para o container
        const acessibilidade = document.querySelector('.icone_acessibilidade');
        if (acessibilidade) {
            controlsContainer.appendChild(themeToggle);
            controlsContainer.appendChild(acessibilidade);
            navbar.appendChild(controlsContainer);
        }
    }
}

// Função para alternar entre os modos
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = document.querySelector('.theme-toggle-icon');
    
    // Atualizar o ícone baseado no modo
    if (toggleIcon) {
        toggleIcon.innerHTML = isDarkMode ? '' : ''; 
    }
    
    // Adicionar ou remover a classe dark-mode do botão toggle
    if (themeToggle) {
        themeToggle.classList.toggle('dark-mode', isDarkMode);
    }
    
    // Salvar a preferência do usuário
    if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    
    // Atualizar a aparência do botão
    updateToggleAppearance(isDarkMode);
    
    // Também atualiza algumas propriedades diretamente para uma transição mais suave
    updateDynamicElements(isDarkMode);
}

// Função para atualizar a aparência do botão
function updateToggleAppearance(isDarkMode) {
    const toggleSwitch = document.querySelector('.theme-toggle-switch');
    const toggleIcon = document.querySelector('.theme-toggle-icon');
    
    if (toggleSwitch && toggleIcon) {
        if (isDarkMode) {
            toggleSwitch.classList.add('dark');
            toggleIcon.innerHTML = '';
        } else {
            toggleSwitch.classList.remove('dark');
            toggleIcon.innerHTML = '';
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
    const style = document.createElement('style');
    style.textContent = `
        body, body * {
            transition: background-color 0.3s ease, background-image 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

addThemeTransition();
checkSystemPreference();