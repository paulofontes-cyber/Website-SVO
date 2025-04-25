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

 // Adicione este JavaScript ao seu arquivo .js ou em uma tag <script>
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        const links = document.querySelectorAll('.nav-links li a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});