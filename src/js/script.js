/**
 * Koch Rajbongshi Development Council Website
 * Interactive JavaScript functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Initialize all functions
    initFormHandling();
    initSmoothScroll();
    initLazyLoading();

    console.log('KRDC Website initialized successfully');
});

/**
 * Form handling and validation
 */
function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            if (validateForm(this)) {
                // Show success message (in production, this would submit to backend)
                showSuccessMessage(this);
            }
        });
    });
}

/**
 * Validate form inputs
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            highlightError(input);
        } else {
            clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                highlightError(input);
            }
        }

        // Phone validation (basic)
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
                isValid = false;
                highlightError(input);
            }
        }
    });

    return isValid;
}

/**
 * Highlight input errors
 */
function highlightError(input) {
    input.classList.add('border-red-500');
    input.classList.remove('border-olive-300');
}

/**
 * Clear input errors
 */
function clearError(input) {
    input.classList.remove('border-red-500');
    input.classList.add('border-olive-300');
}

/**
 * Show success message after form submission
 */
function showSuccessMessage(form) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-olive-100 border-l-4 border-olive-600 text-olive-900 p-4 rounded-lg mb-4';
    successDiv.innerHTML = `
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-olive-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm font-semibold">Application submitted successfully!</p>
                <p class="text-sm">We will contact you shortly.</p>
            </div>
        </div>
    `;

    // Insert message before form
    form.parentNode.insertBefore(successDiv, form);

    // Reset form
    form.reset();

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle if it's a hash link to an element on the page
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => img.classList.add('loaded'));
    }
}

/**
 * Add input event listeners for real-time validation feedback
 */
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                highlightError(this);
            } else {
                clearError(this);
            }
        });

        input.addEventListener('input', function() {
            if (this.value.trim()) {
                clearError(this);
            }
        });
    });
});

/**
 * Console welcome message
 */
console.log('%c Koch Rajbongshi Development Council ', 'background: #629405; color: #fee901; font-size: 16px; padding: 10px;');
console.log('%c Empowering through Education & Skill Development ', 'background: #213102; color: #fffbcc; font-size: 12px; padding: 5px;');
