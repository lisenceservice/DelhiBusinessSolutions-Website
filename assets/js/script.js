/**
 * DELHI BUSINESS SOLUTIONS - PREMIUM CORE WEB APPLICATION ENGINE
 * CODE VERSION: 3.2.0 (LIVE GOOGLE SHEETS BEACON SYNC INTEGRATED)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. APPLICATION INTAKE & FAILSAFE PRELOADER ENGINE
    // ==========================================
    const preloader = document.getElementById("preloader");
    
    function removePreloader() {
        if (preloader && !preloader.classList.contains("fade-out")) {
            preloader.classList.add("fade-out");
            document.body.classList.remove("loading");
            initializeMetricsCounter();
        }
    }

    setTimeout(removePreloader, 1000);
    window.addEventListener("load", removePreloader);

    // ==========================================
    // 2. RADIAL BACKGROUND MOUSE GLOW & CARD REFLECTIONS
    // ==========================================
    const mouseGlow = document.getElementById("mouseGlow");
    
    document.addEventListener("mousemove", (e) => {
        if (mouseGlow) {
            mouseGlow.style.setProperty("--x", `${e.clientX}px`);
            mouseGlow.style.setProperty("--y", `${e.clientY}px`);
        }
    });

    const serviceCards = document.querySelectorAll(".curve-asymmetric-card");
    serviceCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mx", `${x}px`);
            card.style.setProperty("--my", `${y}px`);
        });
    });

    // ==========================================
    // 3. RESPONSIVE MOBILE MENU ACTIONS & STICKY HEADER
    // ==========================================
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const dropdownLink = document.querySelector(".dropdown > .nav-link");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });
    }

    if (dropdownLink) {
        dropdownLink.addEventListener("click", (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdownLink.parentElement.classList.toggle("active");
            }
        });
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            document.body.classList.add("scrolled-header");
        } else {
            document.body.classList.remove("scrolled-header");
        }
    });

    // ==========================================
    // 4. MATRIX CORE AUTOMATED TYPING SUBSYSTEM
    // ==========================================
    const targetTyping = document.getElementById("typingText");
    const wordsDataset = [
        "Income Tax & ITR Compliances",
        "GST Filings & Notice Replies",
        "MCD, DPCC & FSSAI Licenses",
        "Corporate IT Automations"
    ];
    let wordPointer = 0;
    let characterPointer = 0;
    let isDeletingFlag = false;
    let processSpeed = 100;

    function coreTypingLoop() {
        const currentWord = wordsDataset[wordPointer];
        
        if (isDeletingFlag) {
            characterPointer--;
            processSpeed = 35;
        } else {
            characterPointer++;
            processSpeed = 85;
        }

        if (targetTyping) {
            targetTyping.textContent = currentWord.substring(0, characterPointer);
        }

        if (!isDeletingFlag && characterPointer === currentWord.length) {
            processSpeed = 2200;
            isDeletingFlag = true;
        } else if (isDeletingFlag && characterPointer === 0) {
            isDeletingFlag = false;
            wordPointer = (wordPointer + 1) % wordsDataset.length;
            processSpeed = 350;
        }

        setTimeout(coreTypingLoop, processSpeed);
    }

    if (targetTyping) setTimeout(coreTypingLoop, 800);

    // ==========================================
    // 5. 3D DEVIATION INTERACTOR PLANE
    // ==========================================
    const parallaxScene = document.getElementById("parallaxScene");
    
    if (parallaxScene && window.innerWidth > 992) {
        document.addEventListener("mousemove", (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
            parallaxScene.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // ==========================================
    // 6. NUMERIC INCREMENTATION LOGIC (METRIC COUNTERS)
    // ==========================================
    function initializeMetricsCounter() {
        const counterFields = document.querySelectorAll(".counter-number");
        
        counterFields.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            if (!target) return;
            const duration = 1800;
            const increment = target / (duration / 16);
            let initialCount = 0;
            
            const runUpdate = () => {
                initialCount += increment;
                if (initialCount < target) {
                    counter.textContent = Math.ceil(initialCount) + "+";
                    requestAnimationFrame(runUpdate);
                } else {
                    counter.textContent = target + "+";
                }
            };
            requestAnimationFrame(runUpdate);
        });
    }

    // ==========================================
    // 7. GPU ACCELERATED INTERSECTION SCROLL REVEAL
    // ==========================================
    const revealTargets = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");
    
    const elementRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    revealTargets.forEach(target => elementRevealObserver.observe(target));

    // ==========================================
    // 8. GOOGLE SHEETS LIVE DATA INTEGRATION BRIDGE (CORS-SAFE SYNC)
    // ==========================================
    const intakeForm = document.getElementById("businessIntakeForm");
    const logFeedback = document.getElementById("formFeedback");
    const submitBtn = document.getElementById("submitBtn");

    if (intakeForm) {
        intakeForm.addEventListener("submit", function(e) {
            e.preventDefault();

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Saving Lead Data...</span> <i class="fas fa-spinner fa-spin icon-space"></i>`;
            }

            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxiQz176zB1ZPFgpu57FQRD4FIL5bX_NexNE6viEPXxke-e2jUkZdvbC-GF1zv6IAlNKQ/exec";

            const nameVal = document.getElementById("name") ? document.getElementById("name").value.trim() : "";
            const mobileVal = document.getElementById("mobile") ? document.getElementById("mobile").value.trim() : "";
            const emailVal = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
            const serviceVal = document.getElementById("service") ? document.getElementById("service").value.trim() : "";
            const messageVal = document.getElementById("message") ? document.getElementById("message").value.trim() : "";

            const queryParams = new URLSearchParams({
                name: nameVal,
                mobile: mobileVal,
                email: emailVal,
                service: serviceVal,
                message: messageVal
            }).toString();

            const syncEndpoint = `${SCRIPT_URL}?${queryParams}`;

            // Image Beacon Method (100% bypasses CORS issues)
            const leadBeacon = new Image();
            leadBeacon.src = syncEndpoint;

            leadBeacon.onload = leadBeacon.onerror = function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Submit Request 🚀</span>`;
                }

                if (logFeedback) {
                    logFeedback.className = "form-feedback-log success";
                    logFeedback.textContent = "Thank you! Your request is registered.";
                    logFeedback.style.display = "block";
                }

                alert("Thank You! Your details have been submitted successfully.");

                const operatorMobile = "919876543210";
                const waBody = `*New Request - Delhi Business Solutions*\n\n` +
                               `*Name:* ${nameVal}\n` +
                               `*Mobile:* ${mobileVal}\n` +
                               `*Service:* ${serviceVal}\n` +
                               `*Details:* ${messageVal || "N/A"}`;

                const waRedirectUrl = `https://wa.me/${operatorMobile}?text=${encodeURIComponent(waBody)}`;

                intakeForm.reset();

                setTimeout(() => {
                    window.open(waRedirectUrl, '_blank');
                    if (logFeedback) logFeedback.style.display = "none";
                }, 800);
            };
        });
    }

    // ==========================================
    // 9. SCROLL TOP TRIGGER VIEW CONTROL
    // ==========================================
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==========================================
    // 10. MATERIAL LIQUID RIPPLE EFFECT FACTORY
    // ==========================================
    const rippleButtons = document.querySelectorAll(".ripple");
    
    rippleButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rippleElement = document.createElement("span");
            rippleElement.classList.add("ripple-effect");
            rippleElement.style.left = `${x}px`;
            rippleElement.style.top = `${y}px`;
            
            this.appendChild(rippleElement);
            
            setTimeout(() => {
                rippleElement.remove();
            }, 600);
        });
    });
});