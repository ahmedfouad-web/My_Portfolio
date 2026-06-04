// --- Custom Cursor ---
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // Only update cursor if it's visible (not on small screens)
    if (window.innerWidth > 768) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// Hover effect on clickable elements
const clickables = document.querySelectorAll('a, button, .project-card, .skill-card');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorGlow.style.backgroundColor = 'var(--secondary-neon)';
        cursorGlow.style.boxShadow = '0 0 20px var(--secondary-neon), 0 0 40px var(--secondary-neon)';
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.backgroundColor = 'var(--primary-neon)';
        cursorGlow.style.boxShadow = '0 0 20px var(--primary-neon), 0 0 40px var(--primary-neon)';
    });
});

// --- Mobile Navigation ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// --- Navbar Scroll Effect ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(3, 4, 11, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(3, 4, 11, 0.5)';
        navbar.style.boxShadow = 'none';
    }
});


// --- Starfield Canvas ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    
    // Create stars
    const numStars = Math.floor((width * height) / 2000); // Responsive star count
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5,
            vx: Math.floor(Math.random() * 50) - 25,
            vy: Math.floor(Math.random() * 50) - 25,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    
    // Fill with deep space color
    ctx.fillStyle = '#03040b';
    ctx.fillRect(0, 0, width, height);
    
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Randomly color stars slightly cyan or white
        if (Math.random() > 0.9) {
            ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        
        // Move stars
        star.y -= star.speed;
        
        // Wrap around
        if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
        }
    });
    
    requestAnimationFrame(drawStars);
}

// Handle window resize
window.addEventListener('resize', init);

// Start animation
init();
drawStars();


// --- Scroll Animation for Elements (Intersection Observer) ---
const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class based on element type
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Animate progress bar
                const progress = entry.target.querySelector('.progress');
                if (progress) {
                    const width = progress.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                    progress.style.width = width + '%';
                }
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Set initial state for animated elements
document.querySelectorAll('.glass-card, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// Set initial state for progress bars
document.querySelectorAll('.progress').forEach(el => {
    const targetWidth = el.style.width;
    el.dataset.width = targetWidth; // Store target width
    el.style.width = '100%'; // Reset to 0
});
emailjs.init("YOUR_PUBLIC_KEY");

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        this
    )
    .then(() => {
        alert("Message sent successfully!");
        form.reset();
    })
    .catch((error) => {
        console.log("ERROR:", error);
        alert("Failed to send message!");
    });
});

