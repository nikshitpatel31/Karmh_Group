
AOS.init();
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function (e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        return false;
    }
}
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const tab = button.getAttribute('data-tab');
        document.querySelectorAll('.projects').forEach(p => p.classList.add('hidden'));
        document.getElementById(tab).classList.remove('hidden');
    });
});

function showAllProjects(button) {
    const completedSection = document.getElementById('completed');
    completedSection.classList.add('show-all');
    button.style.display = 'none';
  }

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            e.preventDefault(); // stop default behavior
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


$(document).ready(function () {
    $(".card-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 4 }
        }
    });
});
$(document).ready(function () {
    $(".pt-testimonial-1 .owl-carousel").each(function () {
        let $this = $(this);
        $this.owlCarousel({
            loop: $this.data("loop") === true,
            margin: $this.data("margin") || 30,
            nav: $this.data("nav") === true,
            dots: $this.data("dots") === true,
            autoplay: $this.data("autoplay") === true,
            responsive: {
                0: { items: $this.data("mob_sm") || 1 },
                576: { items: $this.data("mob_num") || 1 },
                768: { items: $this.data("tab_num") || 1 },
                992: { items: $this.data("lap_num") || 2 },
                1200: { items: $this.data("desk_num") || 2 }
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const text = "Find Your Dream Home with Us";
    const target = document.getElementById("typewriter");
    let i = 0;

    function typeEffect() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeEffect, 80); // Speed of typing (in ms)
        }
    }

    // Optional: Delay typing until AOS animation is done
    setTimeout(typeEffect, 3500); // Delay matches AOS delay+duration
});
const cards = document.querySelectorAll('.project-card');
const modal = document.getElementById('featureModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementById('modalClose');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const parentSection = card.closest('.projects');

        // ✅ Do nothing if the card is in the Technical Allies section
        if (parentSection && parentSection.id === 'technical') {
            return;
        }

        const title = card.getAttribute('data-title');
        const image = card.getAttribute('data-image');
        const description = card.getAttribute('data-description');

        modalImage.style.backgroundImage = `url('${image}')`;
        modalTitle.textContent = title;
        modalDescription.innerHTML = description;

        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});


document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("progress-bar");
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const lineWidth = 8;

    let percent = 0;
    const maxPercent = 100;
    const duration = 1500; // 1.5 seconds
    const intervalTime = duration / maxPercent;

    function drawProgress(currentPercent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background circle
        ctx.beginPath();
        ctx.arc(radius, radius, radius - lineWidth, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // Progress arc
        const startAngle = -0.5 * Math.PI; // Start at top
        const endAngle = startAngle + (2 * Math.PI * currentPercent / 100);
        ctx.beginPath();
        ctx.arc(radius, radius, radius - lineWidth, startAngle, endAngle);
        ctx.strokeStyle = "#fff"; // change color as needed
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    function animateProgress() {
        const interval = setInterval(() => {
            drawProgress(percent);
            percent++;

            if (percent > maxPercent) {
                clearInterval(interval);

                // Now hide the preloader after short delay
                setTimeout(() => {
                    document.body.classList.add("page-loaded");

                    // Optional: Remove from DOM
                    setTimeout(() => {
                        const preloader = document.getElementById("preloader");
                        if (preloader) preloader.remove();
                    }, 1000);
                }, 300);
            }
        }, intervalTime);
    }

    animateProgress();
});
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".odometer");

    const options = {
        threshold: 0.5
    };

    const startCounter = (el) => {
        const target = parseInt(el.getAttribute("data-count"));
        let current = 0;
        let increment;
        let intervalTime;

        if (target <= 20) {
            increment = 1;
            intervalTime = 200;
        } else {
            increment = Math.ceil(target / 100);
            intervalTime = 20; // 20ms per step
        }

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(interval);
            } else {
                el.textContent = current;
            }
        }, intervalTime);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = "true";
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
