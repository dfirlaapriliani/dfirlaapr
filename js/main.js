// ===========================
// PARTICLES CONFIGURATION
// ===========================
const themeParticleConfigs = {
    purple: {
        colors: ["#a259ff", "#59ffa2", "#59d1ff", "#ff59c1"],
        linkColor: "#a259ff"
    },
    ocean: {
        colors: ["#06b6d4", "#0ea5e9", "#22d3ee", "#0891b2"],
        linkColor: "#06b6d4"
    },
    sunset: {
        colors: ["#f97316", "#dc2626", "#fbbf24", "#ea580c"],
        linkColor: "#f97316"
    },
    forest: {
        colors: ["#10b981", "#059669", "#34d399", "#047857"],
        linkColor: "#10b981"
    },
    cosmic: {
        colors: ["#a855f7", "#ec4899", "#f472b6", "#9333ea"],
        linkColor: "#a855f7"
    },
    neon: {
        colors: ["#00ff94", "#00d4ff", "#ff006e", "#39ff14"],
        linkColor: "#00ff94"
    }
};

let particlesInstance = null;

function loadParticles(theme = 'purple') {
    const config = themeParticleConfigs[theme];
    
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-js", {
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: { enable: true, mode: "repulse" },
                    resize: true
                },
                modes: {
                    push: { quantity: 4 },
                    repulse: { distance: 120, duration: 0.4 }
                }
            },
            particles: {
                color: { value: config.colors },
                links: {
                    color: config.linkColor,
                    distance: 130,
                    enable: true,
                    opacity: 0.3,
                    width: 1
                },
                collisions: { enable: false },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: true,
                    speed: 1.5,
                    straight: false
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 80  // Dikurangi dari 150
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
                },
                shape: { type: "circle" },
                size: {
                    value: { min: 1, max: 4 },
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
                }
            },
            detectRetina: true
        });
    }
}

// ===========================
// THEME MANAGEMENT
// ===========================
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    loadParticles(theme);
    
    // Close all dropdowns
    document.querySelectorAll('.theme-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'purple';
    setTheme(savedTheme);
}

// ===========================
// SOUND MANAGEMENT
// ===========================
let isMuted = localStorage.getItem('portfolio-muted') === 'true';

function toggleSound() {
    isMuted = !isMuted;
    localStorage.setItem('portfolio-muted', isMuted);
    updateSoundIcons();
}

function updateSoundIcons() {
    document.querySelectorAll('#sound-icon, #sound-icon-mobile').forEach(icon => {
        if (icon) {
            icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        }
    });
}

// ===========================
// DRAWER (MOBILE MENU)
// ===========================
function initDrawer() {
    const drawer = document.getElementById('drawer');
    const menuToggle = document.getElementById('menu-toggle');
    const closeDrawer = document.getElementById('close-drawer');
    
    if (menuToggle && drawer) {
        menuToggle.addEventListener('click', () => {
            drawer.style.transform = 'translateX(0)';
        });
    }
    
    if (closeDrawer && drawer) {
        closeDrawer.addEventListener('click', () => {
            drawer.style.transform = 'translateX(-100%)';
        });
    }
    
    // Close drawer when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (drawer) {
                drawer.style.transform = 'translateX(-100%)';
            }
        });
    });
}

// ===========================
// THEME DROPDOWN TOGGLES
// ===========================
function initThemeDropdowns() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeDropdown = document.getElementById('theme-dropdown');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeDropdownMobile = document.getElementById('theme-dropdown-mobile');
    
    if (themeToggle && themeDropdown) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('active');
            if (themeDropdownMobile) themeDropdownMobile.classList.remove('active');
        });
    }
    
    if (themeToggleMobile && themeDropdownMobile) {
        themeToggleMobile.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdownMobile.classList.toggle('active');
            if (themeDropdown) themeDropdown.classList.remove('active');
        });
    }
    
    // Theme option click
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            if (theme) setTheme(theme);
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-selector')) {
            document.querySelectorAll('.theme-dropdown').forEach(d => d.classList.remove('active'));
        }
    });
}

// ===========================
// NAVIGATION HIGHLIGHTING
// ===========================
function highlightActiveLink() {
    const sections = ["home", "about", "project", "certificate", "skill", "contact"];
    let current = "";
    const scrollY = window.scrollY + 100;

    for (let id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
            current = id;
        }
    }

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

// ===========================
// NAVIGATION SOUND
// ===========================
function playNavSound() {
    if (!isMuted) {
        const navSound = document.getElementById('nav-sound');
        if (navSound) {
            navSound.currentTime = 0;
            navSound.play().catch(() => {});
        }
    }
}

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDrawer();
    initThemeDropdowns();
    
    // Sound toggle buttons
    document.querySelectorAll('#toggle-sound, #toggle-sound-mobile').forEach(btn => {
        btn.addEventListener('click', toggleSound);
    });
    
    updateSoundIcons();
    
    // Play sound on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', playNavSound);
    });
    
    // Scroll highlight
    window.addEventListener('scroll', highlightActiveLink);
    window.addEventListener('load', highlightActiveLink);
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 1000
        });
    }
});

// Load particles immediately
if (document.getElementById('particles-js')) {
    loadParticles(localStorage.getItem('portfolio-theme') || 'purple');
}