// Add random animation delays to glitch elements
document.addEventListener('DOMContentLoaded', function() {
    const glitchElements = document.querySelectorAll('.glitch-spontaneous');
    
    glitchElements.forEach((element, index) => {
        // Generate random delay between 0 and 3.7 seconds
        const randomDelay = Math.random() * 3.7;
        element.style.setProperty('--random-delay', randomDelay);
        element.style.animationDelay = `${randomDelay}s`;
    });
});
