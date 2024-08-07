window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const createScrollIndicator = () => {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = `${scrolled}%`;
    });
};

const observeSections = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
};

const highlightActiveSection = () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
};

const createModeToggle = () => {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '🌓';
    toggleButton.className = 'mode-toggle';
    document.body.insertBefore(toggleButton, document.body.firstChild);

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            toggleButton.textContent = '🌙';
            toggleButton.style.color = '#ffffff';
        } else {
            toggleButton.textContent = '🌓';
            toggleButton.style.color = '#121212';
        }
    });
};


const init = () => {
    createScrollIndicator();
    observeSections();
    highlightActiveSection();
    createModeToggle();
    createMobileNavToggle();
};

document.addEventListener('DOMContentLoaded', init);
