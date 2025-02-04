window.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('hero');
    setTimeout(() => {
        hero.classList.add('active');
    }, 500); // Delay the animation slightly after the page loads
});

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let bgPosY = scrollTop * -0.2; // Adjust the 0.5 value for scroll speed

    document.getElementById('hero').style.backgroundPosition = `center ${bgPosY}px`;
});