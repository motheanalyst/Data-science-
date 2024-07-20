document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function typeEffect(element, text, speed = 100) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        typeEffect(typingElement, "Mohammed Ezzahar Portfolio");
    }

    // Scroll to top functionality
    const scrollToTopButton = document.getElementById("scroll-to-top");

    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    }

    scrollToTopButton.addEventListener("click", function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsContainer = document.querySelector('.projects');
    const projects = document.querySelectorAll('.project');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectsContainer.style.opacity = '0';
            setTimeout(() => {
                projects.forEach(project => {
                    if (filter === 'all' || project.classList.contains(filter)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
                projectsContainer.style.opacity = '1';
            }, 300);
        });
    });

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            removeError(name);
        }

        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(email);
        }

        if (message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        } else {
            removeError(message);
        }

        if (isValid) {
            // Send form data to backend
            fetch('/send_email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name.value,
                        email: email.value,
                        message: message.value
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
        }
    });

    function showError(input, message) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message') || document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorMessage);
        }
        input.className = 'error';
    }

    function removeError(input) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        if (errorMessage) {
            formControl.removeChild(errorMessage);
        }
        input.className = '';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    function setDarkMode(isDarkMode) {
        body.classList.toggle('dark-mode', isDarkMode);
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', isDarkMode);
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = !body.classList.contains('dark-mode');
        setDarkMode(isDarkMode);
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            const rect = level.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                level.style.width = level.getAttribute('data-level') + '%';
            }
        });
    }

    // Debounce function to limit the rate of function calls
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this,
                args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Event listeners
    window.addEventListener('scroll', debounce(animateSkillBars));
    window.addEventListener('load', animateSkillBars);

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Intersection Observer for lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyImageObserver.observe(img));

    // Example: Adding click event to video items
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            window.open(item.querySelector('a').href, '_blank');
        });
    });

    // Example: Adding click event to achievement items
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        item.addEventListener('click', () => {
            alert(`Achievement: ${item.querySelector('h3').textContent}`);
        });
    });
});