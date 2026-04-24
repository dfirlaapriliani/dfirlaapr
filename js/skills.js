document.addEventListener('DOMContentLoaded', () => {
    const loopContainer = document.querySelector(".stack-loop");
    
    if (loopContainer) {
        const logoPaths = [
            "assets/tailwind.png",
            "assets/react.png",
            "assets/javascript.png",
            "assets/html5.png",
            "assets/css3.png",
            "assets/docker.png",
            "assets/node.png",
            "assets/laravel.png",
            "assets/php.png",
            "assets/postman.png",
            "assets/composer.png",
            "assets/flutter.png",
            "assets/figma.png",
            "assets/vsc.png",
            "assets/cope.png"
        ];

        // Render 2x untuk loop seamless
        for (let i = 0; i < 2; i++) {
            logoPaths.forEach(path => {
                const img = document.createElement('img');
                img.src = path;
                img.alt = path.split('/').pop().replace('.png', '');
                img.className = 'h-16 w-auto';
                loopContainer.appendChild(img);
            });
        }
    }
});