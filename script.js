// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .benefit-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Portfolio item hover effects
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to top functionality
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #9333ea 0%, #7e22ce 100%);
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Stats counter animation
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Console message
console.log('%cSimplifAI-1 Portfolio', 'color: #9333ea; font-size: 20px; font-weight: bold;');
console.log('%cTransforming business through AI & Automation', 'color: #c084fc; font-size: 14px;');

// ============================================
// PARTICLES.JS INITIALIZATION
// ============================================
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#9333ea', '#7e22ce', '#a855f7', '#c084fc']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#9333ea'
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#9333ea',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// ============================================
// TYPED.JS TYPING ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const typedText = new Typed('#typed-text', {
        strings: ['Smarter Systems. Less Work.'],
        typeSpeed: 50,
        showCursor: false,
        onComplete: () => {
            const typedGradient = new Typed('#typed-gradient', {
                strings: ['Faster Growth.'],
                typeSpeed: 50,
                showCursor: false,
                startDelay: 500
            });
        }
    });
});

// ============================================
// AOS INITIALIZATION
// ============================================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out-cubic',
    once: true,
    offset: 100,
    delay: 0
});

// ============================================
// VANILLA TILT FOR 3D EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const tiltElements = document.querySelectorAll('.service-card, .portfolio-item');
    tiltElements.forEach(element => {
        VanillaTilt.init(element, {
            max: 15,
            speed: 1000,
            glare: true,
            'max-glare': 0.3,
            scale: 1.05
        });
    });
});

// ============================================
// ANIME.JS ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Logo animation
    anime({
        targets: '.logo h2',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
    });

    // Nav links stagger
    anime({
        targets: '.nav-link',
        translateY: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
    });

    // Service icons pulse
    setInterval(() => {
        anime({
            targets: '.service-icon',
            scale: [1, 1.1, 1],
            duration: 2000,
            easing: 'easeInOutQuad',
            delay: anime.stagger(200)
        });
    }, 5000);

    // Stats counter with anime
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const target = parseInt(statNumber.textContent);
                
                anime({
                    targets: { value: 0 },
                    value: target,
                    duration: 2000,
                    easing: 'easeOutExpo',
                    update: function(anim) {
                        statNumber.textContent = Math.floor(anim.animatables[0].target.value) + '+';
                    }
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => {
        statsObserver.observe(item);
    });
});

// ============================================
// THREE.JS 3D DRAGON ANIMATION
// ============================================
let dragonScene, dragonCamera, dragonRenderer, dragonMesh;
let scrollProgress = 0;

function initDragon() {
    const canvas = document.getElementById('dragon-canvas');
    if (!canvas) return;

    // Scene setup
    dragonScene = new THREE.Scene();
    dragonCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    dragonRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    dragonRenderer.setSize(window.innerWidth, window.innerHeight);
    dragonRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create dragon-like shape using geometry
    const dragonGroup = new THREE.Group();
    
    // Dragon body (elongated sphere)
    const bodyGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x9333ea,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.5,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 1.5, 1);
    dragonGroup.add(body);

    // Dragon head
    const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 1.2, 0);
    head.scale.set(1.2, 1, 1);
    dragonGroup.add(head);

    // Dragon wings (two planes)
    const wingGeometry = new THREE.PlaneGeometry(0.8, 0.5);
    const wingMaterial = new THREE.MeshPhongMaterial({
        color: 0x7e22ce,
        emissive: 0x581c87,
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.rotation.z = -0.5;
    leftWing.position.set(-0.6, 0.5, 0);
    dragonGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.rotation.z = 0.5;
    rightWing.position.set(0.6, 0.5, 0);
    dragonGroup.add(rightWing);

    // Dragon tail
    const tailGeometry = new THREE.ConeGeometry(0.15, 1, 8);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(0, -1.5, 0);
    tail.rotation.z = 0.3;
    dragonGroup.add(tail);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.2
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.scale.set(1.5, 1.5, 1.5);
    dragonGroup.add(glow);

    dragonMesh = dragonGroup;
    dragonScene.add(dragonMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x9333ea, 0.5);
    dragonScene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9333ea, 1, 100);
    pointLight1.position.set(5, 5, 5);
    dragonScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7e22ce, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    dragonScene.add(pointLight2);

    // Camera position
    dragonCamera.position.z = 5;
    dragonCamera.position.y = 2;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        if (dragonMesh) {
            // Rotate based on scroll
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress = scrollY / maxScroll;

            // Dragon follows scroll
            dragonMesh.position.y = 3 - (scrollProgress * 6);
            dragonMesh.position.x = Math.sin(scrollProgress * Math.PI * 2) * 2;
            
            // Wing flapping animation
            const wingFlap = Math.sin(Date.now() * 0.003) * 0.3;
            if (dragonMesh.children[2]) dragonMesh.children[2].rotation.z = -0.5 - wingFlap;
            if (dragonMesh.children[3]) dragonMesh.children[3].rotation.z = 0.5 + wingFlap;

            // Body undulation
            dragonMesh.rotation.y = scrollProgress * Math.PI * 2;
            dragonMesh.rotation.x = Math.sin(scrollProgress * Math.PI * 4) * 0.2;

            // Tail movement
            if (dragonMesh.children[4]) {
                dragonMesh.children[4].rotation.z = 0.3 + Math.sin(Date.now() * 0.002) * 0.2;
            }

            // Glow pulse
            if (dragonMesh.children[5]) {
                const pulse = 1 + Math.sin(Date.now() * 0.001) * 0.2;
                dragonMesh.children[5].scale.set(1.5 * pulse, 1.5 * pulse, 1.5 * pulse);
            }
        }

        dragonRenderer.render(dragonScene, dragonCamera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        dragonCamera.aspect = window.innerWidth / window.innerHeight;
        dragonCamera.updateProjectionMatrix();
        dragonRenderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize dragon when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDragon);
} else {
    initDragon();
}

// ============================================
// PARTICLE SYSTEM
// ============================================
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    const particleCount = 50;
    const colors = ['#9333ea', '#7e22ce', '#a855f7', '#c084fc'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Hero title animation
gsap.from('.hero-title', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        toggleActions: 'play none none none'
    }
});

// Service cards stagger animation
gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.from(card, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        delay: index * 0.1
    });
});

// Portfolio items animation
gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
    gsap.from(item, {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        rotationY: 15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        delay: index * 0.15
    });
});

// Stats counter animation with GSAP
gsap.utils.toArray('.stat-number').forEach(stat => {
    const target = parseInt(stat.textContent);
    const obj = { value: 0 };
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(obj, {
                value: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                    stat.textContent = Math.floor(obj.value) + '+';
                }
            });
        }
    });
});

// Parallax effect on sections
gsap.utils.toArray('section').forEach(section => {
    gsap.to(section, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Dragon trail effect
const dragonTrail = document.createElement('div');
dragonTrail.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9;
    filter: blur(40px);
    transition: all 0.3s ease;
`;
document.body.appendChild(dragonTrail);

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;
    
    dragonTrail.style.top = (progress * 100) + '%';
    dragonTrail.style.left = (50 + Math.sin(progress * Math.PI * 2) * 10) + '%';
    dragonTrail.style.opacity = (0.5 + Math.sin(progress * Math.PI) * 0.3);
});

// Magnetic hover effect on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Floating animation for service icons
gsap.utils.toArray('.service-icon').forEach(icon => {
    gsap.to(icon, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2
    });
});

// Glow pulse on portfolio items
gsap.utils.toArray('.portfolio-item').forEach(item => {
    ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(item, {
                boxShadow: '0 0 60px rgba(147, 51, 234, 0.6)',
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
        }
    });
});

// ============================================
// ADDITIONAL INTERACTIVE EFFECTS
// ============================================

// Cursor trail effect
const cursorTrail = document.createElement('div');
cursorTrail.className = 'cursor-trail';
cursorTrail.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
`;
document.body.appendChild(cursorTrail);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursorTrail, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Magnetic effect on all interactive elements
document.querySelectorAll('a, button, .btn').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        anime({
            targets: element,
            translateX: x * 0.2,
            translateY: y * 0.2,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    element.addEventListener('mouseleave', () => {
        anime({
            targets: element,
            translateX: 0,
            translateY: 0,
            duration: 500,
            easing: 'easeOutElastic(1, .6)'
        });
    });
});

// Text reveal animation on scroll
const textReveal = gsap.utils.toArray('.section-title, .section-subtitle, h3');
textReveal.forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 85%'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
});

// Section entrance animations
gsap.utils.toArray('section').forEach((section, index) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 90%'
        },
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: index * 0.1
    });
});

// Button hover glow effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        anime({
            targets: btn,
            boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)',
            scale: 1.05,
            duration: 300
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        anime({
            targets: btn,
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)',
            scale: 1,
            duration: 300
        });
    });
});

// Portfolio image zoom on hover
document.querySelectorAll('.portfolio-image img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        anime({
            targets: img,
            scale: 1.2,
            duration: 600,
            easing: 'easeOutExpo'
        });
    });
    
    img.addEventListener('mouseleave', () => {
        anime({
            targets: img,
            scale: 1,
            duration: 600,
            easing: 'easeOutExpo'
        });
    });
});

// Floating animation for contact icons
anime({
    targets: '.contact-icon',
    translateY: [
        { value: -10, duration: 2000 },
        { value: 0, duration: 2000 }
    ],
    easing: 'easeInOutSine',
    loop: true,
    delay: anime.stagger(200)
});

// Page load animation sequence
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.from('body', {
        opacity: 0,
        duration: 0.5
    })
    .from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.3');
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #9333ea 0%, #7e22ce 50%, #a855f7 100%);
    z-index: 10000;
    box-shadow: 0 0 10px rgba(147, 51, 234, 0.8);
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Random sparkle effect
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #a855f7;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        box-shadow: 0 0 10px rgba(168, 85, 247, 1);
    `;
    
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    
    document.body.appendChild(sparkle);
    
    anime({
        targets: sparkle,
        scale: [0, 1.5, 0],
        opacity: [0, 1, 0],
        duration: 2000,
        easing: 'easeOutExpo',
        complete: () => sparkle.remove()
    });
}

setInterval(createSparkle, 500);

// Enhanced dragon trail with particles
const dragonParticles = [];
for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 8;
        opacity: 0;
    `;
    document.body.appendChild(particle);
    dragonParticles.push(particle);
}

let particleIndex = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;
    
    if (scrollY % 50 < 10) {
        const particle = dragonParticles[particleIndex % dragonParticles.length];
        particle.style.left = (50 + Math.sin(progress * Math.PI * 2) * 10) + '%';
        particle.style.top = (progress * 100) + '%';
        
        anime({
            targets: particle,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            duration: 1000,
            easing: 'easeOutExpo'
        });
        
        particleIndex++;
    }
});
