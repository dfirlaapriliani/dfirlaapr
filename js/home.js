// ===========================
// TYPEIT ANIMATION - 3 ROLES
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Animasi teks ketik di Hero Section
    if (typeof TypeIt !== 'undefined') {
        const typedText = document.getElementById('typed-text');
        if (typedText) {
            new TypeIt("#typed-text", {
                speed: 80,
                startDelay: 300,
                cursorChar: "|",
                loop: true,
                waitUntilVisible: true,
            })
            .empty()
            // Role 1
            .type("Full Stack")
            .pause(200)
            .break()
            .type("Developer")
            .pause(1500)
            .delete()
            // Role 2
            .type("UI/UX")
            .pause(200)
            .break()
            .type("Designer")
            .pause(1500)
            .delete()
            // Role 3
            .type("Creative")
            .pause(200)
            .break()
            .type("Technologist")
            .pause(1500)
            .delete()
            .go();
        }
    }

    // ===========================
    // MUSIC PLAYER TOGGLE
    // ===========================
    const musicToggle = document.getElementById('music-toggle');
    const musicPlayer = document.getElementById('musicPlayer');
    
    if (musicToggle && musicPlayer) {
        musicToggle.addEventListener('click', () => {
            musicPlayer.classList.toggle('hidden');
        });
    }

    // ===========================
    // SMOOTH SCROLL UNTUK LINK ABOUT
    // ===========================
    const aboutLinks = document.querySelectorAll('a[href="#about"]');
    aboutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===========================
    // SPOTIFY IFRAME LAZY LOAD
    // ===========================
    const spotifyFrame = document.querySelector('iframe[src*="spotify"]');
    if (spotifyFrame) {
        if (!('loading' in HTMLIFrameElement.prototype)) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        spotifyFrame.src = spotifyFrame.src;
                        observer.unobserve(spotifyFrame);
                    }
                });
            });
            observer.observe(spotifyFrame);
        }
    }
});