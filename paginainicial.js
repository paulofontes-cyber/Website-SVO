document.addEventListener('DOMContentLoaded', function() {
    console.log("Script iniciado"); 
    
    const texts = document.querySelectorAll('.sliding-text');
    console.log("Textos encontrados:", texts.length); 
    
    let currentIndex = 0;

    function cycleTexts() {
        console.log("Alternando para texto:", currentIndex); 
        
        
        texts.forEach(text => text.classList.remove('active'));
        
        
        texts[currentIndex].classList.add('active');
        
       
        currentIndex = (currentIndex + 1) % texts.length;
    }

    
    setInterval(cycleTexts, 4000);
    
   
    cycleTexts();
});

// numeros importantes inicio


function animateCounters() {
    
    const counters = document.querySelectorAll('.counter-value');
    
    
    const animationDuration = 2000;
    
    
    counters.forEach(counter => {
      
      const target = +counter.getAttribute('data-target');
      
      
      let currentValue = 0;
      counter.innerText = currentValue;
      

      const increment = target / (animationDuration / 16);
      
      
      const updateCounter = () => {
        
        if (currentValue < target) {
          
          currentValue += increment;
          
          
          if (currentValue > target) {
            currentValue = target;
          }
          
          
          counter.innerText = Math.floor(currentValue);
          
          
          requestAnimationFrame(updateCounter);
        } else {
          
          counter.innerText = target;
        }
      };
      
      
      requestAnimationFrame(updateCounter);
    });
  }
  
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  
  let animationTriggered = false;
  window.addEventListener('scroll', () => {
    
    const counterSection = document.querySelector('.counter-section');
    
    
    if (counterSection && isElementInViewport(counterSection) && !animationTriggered) {
      animateCounters();
      animationTriggered = true;
    }
  });
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const counterSection = document.querySelector('.counter-section');
    if (counterSection && isElementInViewport(counterSection)) {
      animateCounters();
      animationTriggered = true;
    }
  });

 
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        
        const links = document.querySelectorAll('.nav-links li a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// aqui começa a section de serviços (acho q isso vai bugar ;-;)

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let interval;

  // Função para mostrar um slide específico
  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }

  // Função para avançar para o próximo slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Isso aqui Configura os pontos de navegação
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      showSlide(index);
      resetInterval();
    });
  });

  // Touch events para dispositivos móveis
  let touchStartX = 0;
  let touchEndX = 0;
  
  const contentContainer = document.querySelector('.content-container');
  
  contentContainer.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  contentContainer.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetInterval();
  }, false);
  
  function handleSwipe() {
    const minSwipeDistance = 50;
    
    if (touchStartX - touchEndX > minSwipeDistance) {
      // Swipe para esquerda - próximo slide
      nextSlide();
    } else if (touchEndX - touchStartX > minSwipeDistance) {
      // Swipe para direita - slide anterior
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }
  }

  // Iniciar o carrossel automático
  function startInterval() {
    interval = setInterval(nextSlide, 5000);
  }

  // Reiniciar o intervalo quando o usuário interage
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  // Pausar o carrossel ao passar o mouse
  contentContainer.addEventListener('mouseenter', function() {
    clearInterval(interval);
  });
  
  contentContainer.addEventListener('mouseleave', function() {
    startInterval();
  });

  // Iniciar o carrossel
  startInterval();

  // Verificar o redimensionamento da janela
  window.addEventListener('resize', function() {
    // Ajustar altura da content-container se necessário em dispositivos móveis
    const windowWidth = window.innerWidth;
    const contentContainer = document.querySelector('.content-container');
    
    if (windowWidth <= 900) {
      // Ajustar altura com base no conteúdo visível
      const activeSlide = document.querySelector('.slide.active');
      if (activeSlide) {
        const slideHeight = activeSlide.scrollHeight;
        contentContainer.style.minHeight = (slideHeight + 40) + 'px';
      }
    } else {
      contentContainer.style.minHeight = '';
    }
  });
});