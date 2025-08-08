// Modal functionality
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input[type="text"]');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('acquisitionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['company', 'name', 'title', 'email', 'budget', 'timeline'];
            const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
            
            if (missingFields.length > 0) {
                alert('Please fill in all required fields: ' + missingFields.join(', '));
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Send to Formspree (will forward to your email)
            const formspreeEndpoint = 'https://formspree.io/f/xpzgqjqj'; // Replace with your Formspree endpoint
            
            fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company: data.company,
                    name: data.name,
                    title: data.title,
                    email: data.email,
                    phone: data.phone,
                    budget: data.budget,
                    timeline: data.timeline,
                    message: data.message,
                    subject: 'Premium Domain Acquisition Inquiry - hacking.tools',
                    _subject: 'Premium Domain Acquisition Inquiry - hacking.tools'
                })
            })
            .then(response => {
                if (response.ok) {
                    // Reset form
                    form.reset();
                    
                    // Show success message
                    alert('Thank you for your inquiry! We will contact you within 24 hours to discuss this premium acquisition opportunity.');
                    
                    // Close modal
                    closeContactModal();
                    
                    // Track submission
                    console.log('Acquisition inquiry submitted:', data);
                    
                    // Track analytics
                    trackEvent('acquisition_inquiry_submitted', {
                        company: data.company,
                        budget: data.budget,
                        timeline: data.timeline
                    });
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                alert('There was an error submitting your inquiry. Please try again or contact us directly.');
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.opportunity-card, .roadmap-phase, .value-point');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Copy to clipboard functionality (for sharing)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show temporary notification
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10001;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

// Add sharing functionality
function shareAcquisitionOpportunity() {
    const url = window.location.href;
    const text = 'Premium domain acquisition opportunity: hacking.tools - The Ethical Security OS. Valued at $450M-$500M USD.';
    
    if (navigator.share) {
        navigator.share({
            title: 'hacking.tools - Premium Domain Acquisition',
            text: text,
            url: url
        });
    } else {
        copyToClipboard(`${text} ${url}`);
    }
}

// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Preload critical resources
    const criticalImages = [];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Lazy load non-critical elements
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.dataset.lazy;
                
                if (element.tagName === 'IMG') {
                    element.src = src;
                } else {
                    element.style.backgroundImage = `url(${src})`;
                }
                
                element.removeAttribute('data-lazy');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
});

// Analytics placeholder (replace with actual analytics)
function trackEvent(eventName, data) {
    console.log('Event tracked:', eventName, data);
    
    // Example: Google Analytics
    // gtag('event', eventName, data);
    
    // Example: Mixpanel
    // mixpanel.track(eventName, data);
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.matches('.btn-primary')) {
        trackEvent('cta_clicked', {
            button_text: target.textContent,
            page_location: window.location.pathname
        });
    }
    
    if (target.matches('.opportunity-card')) {
        trackEvent('metric_viewed', {
            metric: target.querySelector('.opportunity-label')?.textContent,
            value: target.querySelector('.opportunity-value')?.textContent
        });
    }
});

// Form field analytics
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('#acquisitionForm input, #acquisitionForm select, #acquisitionForm textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            trackEvent('form_field_focused', {
                field_name: field.name,
                field_type: field.type
            });
        });
        
        field.addEventListener('blur', function() {
            if (field.value) {
                trackEvent('form_field_completed', {
                    field_name: field.name,
                    field_type: field.type
                });
            }
        });
    });
});

// Page load analytics
window.addEventListener('load', function() {
    trackEvent('page_loaded', {
        page_title: document.title,
        load_time: performance.now(),
        user_agent: navigator.userAgent,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight
    });
});

// Exit intent detection
let exitIntentShown = false;

document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        
        // Show exit intent (could be modal, notification, etc.)
        trackEvent('exit_intent_detected', {
            time_on_page: performance.now(),
            scroll_position: window.scrollY
        });
        
        // Optional: Show compelling offer or reminder
        if (confirm('Interested in this premium domain acquisition opportunity? Click OK to submit an inquiry.')) {
            openContactModal();
        }
    }
});

// Scroll depth tracking
let maxScrollDepth = 0;

window.addEventListener('scroll', function() {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track scroll milestones
        if (scrollDepth >= 25 && scrollDepth < 50) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollDepth >= 50 && scrollDepth < 75) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollDepth >= 75 && scrollDepth < 90) {
            trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollDepth >= 90) {
            trackEvent('scroll_depth', { depth: '90%' });
        }
    }
});

// Session timeout warning (for high-value forms)
let sessionWarningShown = false;
const SESSION_TIMEOUT = 25 * 60 * 1000; // 25 minutes

setTimeout(function() {
    if (!sessionWarningShown && document.getElementById('contactModal').style.display === 'block') {
        sessionWarningShown = true;
        alert('Your session will expire soon. Please submit your inquiry to avoid losing your information.');
    }
}, SESSION_TIMEOUT);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('hacking.tools premium domain page loaded');
    
    // Add any initialization code here
    trackEvent('page_initialized', {
        timestamp: new Date().toISOString(),
        page_type: 'acquisition_landing'
    });
});
