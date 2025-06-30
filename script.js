document.addEventListener('DOMContentLoaded', () => {
    // 1. Carousel for Hero Section
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let counter = 0;
    const size = carouselImages[0].clientWidth; // Get width of first image

    // Set initial position
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // Next button
    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter++;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter--;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });
 // Reset carousel position when transition ends
    carouselSlide.addEventListener('transitionend', () => {
        // Optional: If you want infinite looping, you'd add logic here
        // For simplicity, we are not implementing infinite loop in this basic version
    });

    // Auto-scroll carousel (optional)
    let autoScrollInterval = setInterval(() => {
        nextBtn.click();
        if (counter >= carouselImages.length - 1) {
            counter = -1; // Reset counter to loop from beginning
            carouselSlide.style.transition = "none"; // Remove transition for instant jump
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            setTimeout(() => { // Re-add transition after a tiny delay
                carouselSlide.style.transition = "transform 0.5s ease-in-out";
            }, 50);
        }
    }, 5000); // Change image every 5 seconds

    // Pause auto-scroll on hover
    carouselSlide.parentNode.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
 carouselSlide.parentNode.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            nextBtn.click();
            if (counter >= carouselImages.length - 1) {
                counter = -1;
                carouselSlide.style.transition = "none";
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
                setTimeout(() => {
                    carouselSlide.style.transition = "transform 0.5s ease-in-out";
                }, 50);
            }
        }, 5000);
    });


    // 2. Smooth Scrolling for Navigation Links and Clickable Text
    document.querySelectorAll('nav a, .clickable-text, .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Check if it's an external link or a section ID
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
   }
            } else {
                // For external links, open in a new tab
                window.open(targetId, '_blank');
            }
        });
    });

    // 3. Image Click to Enlarge (Simple example)
    document.querySelectorAll('.carousel-slide img').forEach(image => {
        image.style.cursor = 'pointer'; // Indicate it's clickable
        image.addEventListener('click', () => {
            const imageUrl = image.src;
            window.open(imageUrl, '_blank'); // Open image in a new tab
        });
    });
});