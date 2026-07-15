/**
 * DELHI BUSINESS SOLUTIONS - PREMIUM CORE WEB APPLICATION ENGINE
 * CODE VERSION: 2.6.0 (PRODUCTION ENHANCED & GOOGLE SHEET INTEGRATED)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. APPLICATION INTAKE & PRELOADER TIMING ENGINE
    // ==========================================
    const preloader = document.getElementById("preloader");
    
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("fade-out");
                document.body.classList.remove("loading");
            }
            initializeMetricsCounter();
        }, 600);
    });

    setTimeout(() => {
        if (preloader && !preloader.classList.contains("fade-out")) {
            preloader.classList.add("fade-out");
            document.body.classList.remove("loading");
        }
    }, 2000);

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
        
        document.addEventListener("mouseleave", () => {
            parallaxScene.style.transform = `rotateY(0deg) rotateX(0deg)`;
            parallaxScene.style.transition = "transform 0.6s ease-out";
        });
    }

    // ==========================================
    // 6. NUMERIC INCREMENTATION LOGIC (METRIC COUNTERS)
    // ==========================================
    function initializeMetricsCounter() {
        const counterFields = document.querySelectorAll(".counter-number");
        
        counterFields.forEach(counter => {
            const target = +counter.getAttribute("data-target");
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
    // 8. GOOGLE SHEETS LIVE DATA INTEGRATION BRIDGE
    // ==========================================
    const intakeForm = document.getElementById("businessIntakeForm");
    const logFeedback = document.getElementById("formFeedback");
    const submitBtn = document.getElementById("submitBtn");

    if (intakeForm) {
        intakeForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Saving Lead Data...</span> <i class="fas fa-spinner fa-spin icon-space"></i>`;
            
            const formData = new FormData(intakeForm);
            
            try {
                // ACTIVE DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
                const targetWebhook = https://script.google.com/macros/s/AKfycbxIwxsGbmBs04wBygpMn_P1EORAo4sL8YskG-a53xNJa3YmxFz1fXe12WJV5BFF6O9vrA/exec
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });

                // Fetch Payload Dispatch via no-cors mode to ensure smooth transfer without browser blockages
                await fetch(targetWebhook, {
                    method: "POST",
                    mode: "no-cors", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formObject)
                });

                logFeedback.className = "form-feedback-log success";
                logFeedback.textContent = "Thank you! Your submission has been securely recorded in our Google Sheet database.";
                intakeForm.reset();
                
            } catch (err) {
                logFeedback.className = "form-feedback-log error";
                logFeedback.textContent = "Data connection processing error. Please try again.";
                console.error("Transmission Error Log: ", err);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                setTimeout(() => {
                    if (logFeedback) logFeedback.style.display = "none";
                }, 6000);
            }
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