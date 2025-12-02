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

// Hero stats counter animation
const animateHeroStats = () => {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const obj = { value: 0 };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(obj, {
                        value: target,
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: () => {
                            stat.textContent = Math.floor(obj.value);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
};

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
        strings: ['Smarter Systems.'],
        typeSpeed: 80,
        showCursor: false,
        onComplete: () => {
            const typedGradient = new Typed('#typed-gradient', {
                strings: ['Less Work.'],
                typeSpeed: 80,
                showCursor: false,
                startDelay: 300
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
// ENHANCED 3D HERO SCENE
// ============================================
let heroScene, heroCamera, heroRenderer, heroObjects = [];

function initHero3D() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    // Scene setup
    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    heroRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create floating geometric shapes
    const geometryTypes = [
        () => new THREE.BoxGeometry(0.5, 0.5, 0.5),
        () => new THREE.SphereGeometry(0.3, 16, 16),
        () => new THREE.TorusGeometry(0.3, 0.1, 16, 100),
        () => new THREE.OctahedronGeometry(0.3)
    ];

    const material = new THREE.MeshPhongMaterial({
        color: 0x9333ea,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6,
        shininess: 100
    });

    // Create multiple floating objects
    for (let i = 0; i < 15; i++) {
        const geometryType = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
        const geometry = geometryType();
        const mesh = new THREE.Mesh(geometry, material.clone());
        
        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        mesh.userData = {
            speed: 0.5 + Math.random() * 0.5,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            }
        };
        
        heroObjects.push(mesh);
        heroScene.add(mesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x9333ea, 0.3);
    heroScene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9333ea, 1, 100);
    pointLight1.position.set(10, 10, 10);
    heroScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7e22ce, 0.8, 100);
    pointLight2.position.set(-10, -10, 10);
    heroScene.add(pointLight2);

    // Camera position
    heroCamera.position.z = 15;
    heroCamera.position.y = 2;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        heroObjects.forEach((obj, index) => {
            // Floating animation
            obj.position.y += Math.sin(time + index) * 0.01;
            obj.position.x += Math.cos(time * 0.5 + index) * 0.01;
            
            // Rotation
            obj.rotation.x += obj.userData.rotationSpeed.x;
            obj.rotation.y += obj.userData.rotationSpeed.y;
            obj.rotation.z += obj.userData.rotationSpeed.z;
            
            // Pulsing glow
            const pulse = 1 + Math.sin(time * 2 + index) * 0.2;
            obj.scale.set(pulse, pulse, pulse);
        });

        // Camera movement based on mouse
        const mouseX = (window.innerWidth / 2 - window.innerWidth / 2) * 0.0005;
        const mouseY = (window.innerHeight / 2 - window.innerHeight / 2) * 0.0005;
        heroCamera.position.x += (mouseX - heroCamera.position.x) * 0.05;
        heroCamera.position.y += (mouseY - heroCamera.position.y) * 0.05;
        heroCamera.lookAt(heroScene.position);

        heroRenderer.render(heroScene, heroCamera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        heroCamera.aspect = window.innerWidth / window.innerHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

// Initialize hero 3D scene
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initHero3D();
        animateHeroStats();
    });
} else {
    initHero3D();
    animateHeroStats();
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

// Portfolio visual animations
document.querySelectorAll('.website-preview').forEach(preview => {
    preview.addEventListener('mouseenter', () => {
        anime({
            targets: preview,
            scale: 1.02,
            duration: 400,
            easing: 'easeOutExpo'
        });
    });
    
    preview.addEventListener('mouseleave', () => {
        anime({
            targets: preview,
            scale: 1,
            duration: 400,
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

// ============================================
// XTERM.JS LINUX TERMINAL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const terminalElement = document.getElementById('terminal');
    if (terminalElement) {
        const term = new Terminal({
            cursorBlink: true,
            fontFamily: '"Cascadia Code", "Fira Code", monospace',
            fontSize: 14,
            theme: {
                background: '#0a0a0a',
                foreground: '#d1d5db',
                cursor: '#9333ea',
                selectionBackground: 'rgba(147, 51, 234, 0.3)',
                black: '#000000',
                red: '#ef4444',
                green: '#22c55e',
                yellow: '#eab308',
                blue: '#3b82f6',
                magenta: '#a855f7',
                cyan: '#06b6d4',
                white: '#ffffff',
                brightBlack: '#1f2937',
                brightRed: '#f87171',
                brightGreen: '#4ade80',
                brightYellow: '#facc15',
                brightBlue: '#60a5fa',
                brightMagenta: '#c084fc',
                brightCyan: '#22d3ee',
                brightWhite: '#f9fafb'
            }
        });
        const fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);
        term.open(terminalElement);
        fitAddon.fit();

        window.addEventListener('resize', () => {
            fitAddon.fit();
        });

        let line = '';
        const prompt = 'simplifai@production ~ $ ';

        term.write(prompt);

        term.onKey(({ key, domEvent }) => {
            const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey && !domEvent.shiftKey;

            if (domEvent.keyCode === 13) { // Enter key
                term.write('\r\n');
                handleCommand(line);
                line = '';
                term.write(prompt);
            } else if (domEvent.keyCode === 8) { // Backspace
                if (line.length > 0) {
                    term.write('\b \b');
                    line = line.slice(0, -1);
                }
            } else if (printable) {
                line += key;
                term.write(key);
            }
        });

        const handleCommand = (command) => {
            switch (command.trim()) {
                case 'help':
                    term.write('Available commands:\r\n');
                    term.write('  ls - List files\r\n');
                    term.write('  cat about.txt - Read about SimplifAI-1\r\n');
                    term.write('  tech-stack - View our core technologies\r\n');
                    term.write('  vm-info - Learn about VM hosting\r\n');
                    term.write('  clear - Clear the terminal\r\n');
                    break;
                case 'ls':
                    term.write('index.html  styles.css  script.js  about.txt  tech_stack.json  vm_config.yaml\r\n');
                    break;
                case 'cat about.txt':
                    term.write('SimplifAI-1: Smarter Systems. Less Work. Faster Growth.\r\n');
                    term.write('We build digital foundations businesses can actually rely on. Full-stack digital presence, automation, and AI solutions that work behind the scenes.\r\n');
                    break;
                case 'tech-stack':
                    term.write('Core Technologies:\r\n');
                    term.write('  Infrastructure: Docker, Kubernetes, AWS, Linux, Terraform\r\n');
                    term.write('  Backend: Python (FastAPI), Node.js (Express), PostgreSQL, MongoDB\r\n');
                    term.write('  AI/ML: TensorFlow, PyTorch, OpenAI API, LangChain\r\n');
                    term.write('  Frontend: React, Vue.js, TypeScript, Tailwind CSS, Next.js, Vite\r\n');
                    break;
                case 'vm-info':
                    term.write('VM Hosting for AI Agents:\r\n');
                    term.write('  Dedicated instances with auto-scaling, load balancing, and enterprise security.\r\n');
                    term.write('  Configurations: Standard (2-4 vCPU), Performance (4-8 vCPU), Enterprise (8-16 vCPU).\r\n');
                    term.write('  Features: 99.9% Uptime, DDoS Protection, 24/7 Support.\r\n');
                    break;
                case 'clear':
                    term.clear();
                    break;
                default:
                    term.write(`Command not found: ${command}\r\n`);
            }
        };
    }
});
