document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sections = document.querySelectorAll('section');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme && currentTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        let theme = 'light';
        if (body.classList.contains('dark-theme')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });

    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    sections.forEach(section => {
        appearOnScroll.observe(section);
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    const trigger = document.getElementById('trigger');
    const content = document.getElementById('content');

    trigger.addEventListener('click', () => {
        content.classList.toggle('show');
        if (content.classList.contains('show')) {
            trigger.textContent = '내용 닫기';
        } else {
            trigger.textContent = '내용 보기';
        }
    });

    const experienceItems = document.querySelectorAll('.experience-item');

    experienceItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('show');
        });
    });

    const jobSelection = document.getElementById('job-selection');
    const webDeveloperInfo = document.getElementById('web-developer-info');
    const softwareDeveloperInfo = document.getElementById('software-developer-info');

    jobSelection.addEventListener('change', () => {
        if (document.querySelector('input[name="job"]:checked').value === 'web-developer') {
            webDeveloperInfo.style.display = 'block';
            softwareDeveloperInfo.style.display = 'none';
        } else {
            webDeveloperInfo.style.display = 'none';
            softwareDeveloperInfo.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const experienceItems = document.querySelectorAll('.experience-item');

    experienceItems.forEach(item => {
        const image = item.querySelector('img');

        item.addEventListener('click', () => {
            image.classList.toggle('rotate-left');
        });
    });
});
