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