document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.createElement('div');
    
    // Criar overlay para quando o sidebar estiver aberto
    overlay.classList.add('sidebar-overlay');
    document.body.appendChild(overlay);
    
    // Função para fechar o sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura o scroll do body
    }
    
    // Gerenciar cliques no menu hamburguer
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Impedir rolagem do corpo quando o sidebar estiver aberto
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fechar o sidebar ao clicar fora
    overlay.addEventListener('click', closeSidebar);
    
    // Fechar o sidebar ao clicar em links do menu
    const mobileLinks = document.querySelectorAll('.nav-links-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Fechar o sidebar ao pressionar a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // Ajustar posição do sidebar ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});