// NASA API key - Replace with your own API key from https://api.nasa.gov/
const NASA_API_KEY = 'DEMO_KEY';

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Load NASA APOD (Astronomy Picture of the Day) images for the gallery
async function loadGalleryImages() {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=6`);
        const images = await response.json();
        
        const galleryGrid = document.querySelector('.gallery-grid');
        
        images.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <img src="${image.url}" alt="${image.title}">
                <div class="gallery-item-info">
                    <h3>${image.title}</h3>
                    <p>${image.date}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error loading gallery images:', error);
    }
}

// Add scroll animation for mission cards
function animateOnScroll() {
    const cards = document.querySelectorAll('.mission-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Add click event for CTA button
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#missions').scrollIntoView({
        behavior: 'smooth'
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages();
    animateOnScroll();
    
    // Add mobile menu toggle
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}); 