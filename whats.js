 (function() {
    
    const settings = {
        whatsappNumber: "557981236288", //fiz alguns teste e esse mecanismo funciona! Tenho certeza que existe APIs mais eficientes que façam esse trabalho, mas é oq temos pra hoje. 
        whatsappNumber: "5579981236288", 
        headerTitle: "Atendimento Web",
        headerSubtitle: "Normalmente responde em minutos",
        welcomeMessage: "Olá! Como posso ajudar você hoje?",
        placeholderText: "Digite sua mensagem...",
        buttonText: "➤",
        logoUrl: "logo/Logo/favicon/favicon_48x48.png", 
        position: "right", 
        themeColor: "#25d366", 
        showOnMobile: true, 
        showOnDesktop: true, 
        autoOpenDelay: 0 
    };

    
    function injectStyles() {
        const css = `
                                    /* Botão flutuante do WhatsApp */
                                    .whatsapp-float {
                                        position: fixed;
                                        width: 45px;
                                        height: 45px;
                                        bottom: 300px;
                                       
    
                                        ${settings.position}: 10px;
                                        background-color: ${settings.themeColor};
                                        color: #FFF;
                                        border-radius: 50px;
                                        text-align: center;
                                        font-size: 30px;
                                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                                        z-index: 1000;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        cursor: pointer;
                                        transition: all 0.3s ease;
                                    }

                                    .whatsapp-float:hover {
                                        transform: translateY(-3px);
                                        box-shadow: 0 6px 16px rgba(0,0,0,0.2);
                                    }

                                    /* Caixa de chat */
                                    .chat-box {
                                        position: fixed;
                                        bottom: 150px;
                                        ${settings.position}: 10px;
                                        width: 320px;
                                        background-color: #E8E8E8;
                                        border-radius: 15px;
                                        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                                        z-index: 5000;
                                        display: none;
                                        overflow: hidden;
                                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                                        transition: all 0.3s ease;
                                        max-height: calc(100vh - 120px);
                                    }

                                    .chat-box.active {
                                        display: flex;
                                        flex-direction: column;
                                        animation: slideIn 0.3s ease;
                                    }

                                    @keyframes slideIn {
                                        from { opacity: 0; transform: translateY(20px); }
                                        to { opacity: 1; transform: translateY(0); }
                                    }

                                    .chat-header {
                                        background-color: ${settings.themeColor};
                                        color: #fff;
                                        padding: 15px;
                                        display: flex;
                                        align-items: center;
                                    }

                                    .chat-header img {
                                        width: 35px;
                                        height: 35px;
                                        margin-right: 12px;
                                        border-radius: 50%;
                                        object-fit: cover;
                                    }

                                    .chat-header-text {
                                        flex-grow: 1;
                                    }

                                    .chat-header h3 {
                                        margin: 0;
                                        font-size: 16px;
                                        font-weight: 600;
                                    }

                                    .chat-header p {
                                        margin: 2px 0 0;
                                        font-size: 12px;
                                        opacity: 0.9;
                                    }

                                    .close-chat {
                                        cursor: pointer;
                                        font-size: 20px;
                                        opacity: 0.8;
                                        transition: opacity 0.2s;
                                    }

                                    .close-chat:hover {
                                        opacity: 1;
                                    }

                                    .chat-body {
                                        padding: 15px;
                                        background-color: #DCF8C6;
                                        flex-grow: 1;
                                        overflow-y: auto;
                                    }

                                    .chat-body p {
                                        background: #fff;
                                        padding: 10px 15px;
                                        border-radius: 15px;
                                        margin: 5px 0;
                                        display: inline-block;
                                        max-width: 85%;
                                        position: relative;
                                        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                                    }

                                    .chat-input {
                                        padding: 10px;
                                        background-color: #f0f0f0;
                                        display: flex;
                                        align-items: center;
                                        gap: 8px;
                                        border-top: 1px solid #ddd;
                                    }

                                    .chat-input textarea {
                                        flex-grow: 1;
                                        border: 1px solid #ccc;
                                        border-radius: 20px;
                                        padding: 8px 15px;
                                        resize: none;
                                        height: 40px;
                                        font-family: inherit;
                                        font-size: 14px;
                                        background: #fff;
                                        width: calc(100% - 50px);
                                    }

                                    .chat-input textarea:focus {
                                        outline: none;
                                        border-color: ${settings.themeColor};
                                    }

                                    .chat-input button {
                                        background-color: ${settings.themeColor};
                                        color: white;
                                        border: none;
                                        width: 40px;
                                        height: 40px;
                                        border-radius: 50%;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        transition: all 0.2s;
                                        padding: 0;
                                        min-width: 40px;
                                    }

                                    .chat-input button:hover {
                                        background-color: #128C7E;
                                    }
                                `

        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(css));
        document.head.appendChild(styleElement);
    }

    // Criar estrutura HTML
    function createHtml() {
        // Container principal
        const container = document.createElement('div');
        container.id = 'whatsapp-button-container';
        
        // Botão flutuante
        const button = document.createElement('div');
        button.className = 'whatsapp-float';
        button.id = 'whatsappButton';
        button.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
        `;
        
        // Caixa de chat
        const chatBox = document.createElement('div');
        chatBox.className = 'chat-box';
        chatBox.id = 'chatBox';
        
        // Cabeçalho do chat
        const chatHeader = document.createElement('div');
        chatHeader.className = 'chat-header';
        
        
        let headerContent = '';
        if (settings.logoUrl) {
            headerContent += `<img src="${settings.logoUrl}" alt="Logo">`;
        }
        
        headerContent += `
            <div class="chat-header-text">
                <h3>${settings.headerTitle}</h3>
                <p>${settings.headerSubtitle}</p>
            </div>
            <div class="close-chat" id="closeChat">✕</div>
        `;
        
        chatHeader.innerHTML = headerContent;
        
        // Corpo do chat
        const chatBody = document.createElement('div');
        chatBody.className = 'chat-body';
        chatBody.innerHTML = `<p>${settings.welcomeMessage}</p>`;
        
        // Área de entrada
        const chatInput = document.createElement('div');
        chatInput.className = 'chat-input';
        chatInput.innerHTML = `
            <textarea id="chatMessage" placeholder="${settings.placeholderText}"></textarea>
            <button id="sendWhatsapp">${settings.buttonText}</button>
        `;
        
        // Montar estrutura completa
        chatBox.appendChild(chatHeader);
        chatBox.appendChild(chatBody);
        chatBox.appendChild(chatInput);
        
        container.appendChild(button);
        container.appendChild(chatBox);
        
        // Adicionar ao documento
        document.body.appendChild(container);
    }

    // Adicionar eventos
    function setupEvents() {
        const whatsappButton = document.getElementById('whatsappButton');
        const chatBox = document.getElementById('chatBox');
        const closeChat = document.getElementById('closeChat');
        const sendWhatsapp = document.getElementById('sendWhatsapp');
        const chatMessage = document.getElementById('chatMessage');
        
        // Abrir/fechar a caixa de chat
        whatsappButton.addEventListener('click', () => {
            chatBox.classList.toggle('active');
            
            // Focus na textarea quando abrir o chat
            if (chatBox.classList.contains('active')) {
                setTimeout(() => {
                    chatMessage.focus();
                }, 300);
            }
        });
        
        closeChat.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });
        
        // Enviar mensagem para o WhatsApp
        function sendMessage() {
            const message = chatMessage.value.trim();
            
            if (message) {
                const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                chatMessage.value = '';
            } else {
                alert('Por favor, digite uma mensagem antes de enviar.');
            }
        }
        
        sendWhatsapp.addEventListener('click', sendMessage);
        
        // Permitir envio com Enter (Shift+Enter para nova linha)
        chatMessage.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Auto abrir se configurado
        if (settings.autoOpenDelay > 0) {
            setTimeout(() => {
                chatBox.classList.add('active');
            }, settings.autoOpenDelay);
        }
    }

    // Inicialização
    function init() {
        // Verificar se já foi inicializado
        if (document.getElementById('whatsapp-button-container')) {
            return;
        }
        
        injectStyles();
        createHtml();
        setupEvents();
    }

    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();