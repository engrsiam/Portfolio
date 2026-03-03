// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== CAROUSEL / SLIDESHOW ==========
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let autoPlayInterval;
const autoPlayDelay = 5000; // 5 seconds

// Initialize
function showSlide(index) {
    // Loop around
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Move carousel
    carousel.style.transform = `translateX(-${index * 100}%)`;

    // Update active class on slides (for caption animation)
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
}

// Event listeners for arrows
prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    resetAutoPlay();
});

nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    resetAutoPlay();
});

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoPlay();
    });
});

// Auto play
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, autoPlayDelay);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Pause on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});
carouselContainer.addEventListener('mouseleave', () => {
    startAutoPlay();
});

// Start auto play
startAutoPlay();

// Show first slide (caption animation)
showSlide(0);

console.log('⚡ Siam Shaikh · Automation Portfolio loaded');