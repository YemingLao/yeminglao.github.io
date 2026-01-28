// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show All Honors
    const showAllHonorsBtn = document.getElementById('showAllHonors');
    const moreHonors = document.getElementById('moreHonors');

    if (showAllHonorsBtn) {
        showAllHonorsBtn.addEventListener('click', function() {
            moreHonors.classList.toggle('hidden');

            if (moreHonors.classList.contains('hidden')) {
                showAllHonorsBtn.innerHTML = '<i class="fas fa-plus"></i> View All Honors';
            } else {
                showAllHonorsBtn.innerHTML = '<i class="fas fa-minus"></i> Show Less';
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you for your message, ${name}! I will get back to you soon.`);

            // Reset form
            contactForm.reset();
        });
    }

    // Update current date in footer
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            // Close mobile menu if open
            navLinks.classList.remove('active');

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Add active class to nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Print CV button functionality (if added later)
    const printButtons = document.querySelectorAll('.print-cv');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });

    // Intersection Observer for animations (optional)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements you want to animate
    document.querySelectorAll('.experience-item, .honor-item, .publication-item, .interest-card').forEach(el => {
        observer.observe(el);
    });

    // Copy email to clipboard (if email link is added)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // You could add clipboard functionality here
            console.log('Email link clicked:', this.href);
        });
    });
});