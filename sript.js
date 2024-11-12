document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.circle').forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const rotateValue = (percent / 100) * 360;
        circle.style.background = `conic-gradient(var(--circle-color, #3b82f6) ${rotateValue}deg, #f0f0f0 0deg)`;
    });
});


toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleThemeBtn.innerText = document.body.classList.contains("dark-mode") 
        ? " Switch to Light Mode" 
        : "Switch to Dark Mode";
});

const skillItems = document.querySelectorAll('.circle');

window.addEventListener('scroll', () => {
    skillItems.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillTop < windowHeight - 50) {
            const percent = skill.getAttribute('data-percent');
            const rotateValue = (percent / 100) * 360;
            skill.style.background = `conic-gradient(var(--circle-color, #3b82f6) ${rotateValue}deg, #f0f0f0 0deg)`;
        }
    });
});

window.addEventListener("load", () => {
    const about = document.getElementById("about");
    about.style.opacity = "0";
    about.style.transition = "opacity 2s ease-in-out";
    setTimeout(() => {
        about.style.opacity = "1";
    }, 500);
});