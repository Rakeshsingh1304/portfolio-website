/* ==========================================================================
   Navigation Bar Scroll Effect & Mobile Menu
   ========================================================================== */
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
    });
});

/* ==========================================================================
   Marquee Slider Setup
   ========================================================================== */
const items = [
    'Responsive Design', 'WordPress Expert', 'E-Commerce',
    'Landing Pages', 'SEO Optimization', 'Speed Optimization',
    'Dental Specialist', 'UI / UX Design', 'Gujarat, India', '3+ Years Exp.'
];
const mtrack = document.getElementById('mtrack');
if (mtrack) {
    mtrack.innerHTML = [...items, ...items].map(i => `<span class="marquee-item"><span>✦</span>${i}</span>`).join('');
}

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */
const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));

/* ==========================================================================
   Number Counter Animation
   ========================================================================== */
const cobs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
            entry.target.dataset.done = 1;
            const tgt = +entry.target.dataset.count;
            const sfx = tgt === 100 ? '%' : '+';
            let c = 0;
            const inc = tgt / 60;
            const tm = setInterval(() => {
                c = Math.min(c + inc, tgt);
                entry.target.textContent = Math.floor(c) + sfx;
                if (c >= tgt) clearInterval(tm);
            }, 20);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => cobs.observe(el));

/* ==========================================================================
   Portfolio Filtering Logic
   ========================================================================== */
const cards = [...document.querySelectorAll('.bento-card')];
document.querySelectorAll('.ftab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;

        cards.forEach(c => {
            const match = f === 'all' || c.dataset.cat === f;
            c.classList.toggle('shown', match);
            /*c.classList.toggle('hidden', !match);*/
        });
    });
});

/* ==========================================================================
   3D Tilt Effect on Portfolio Cards (Desktop Only)
   ========================================================================== */
if (window.innerWidth > 1024) {
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        });
    });
}

/* ==========================================================================
   Testimonials - Infinite Marquee Generator
   ========================================================================== */
const reviews = [
    { q: "Rakesh completely transformed our dental clinic website. Patient inquiries increased by 60% in the first month. He truly understands what a medical practice needs.", name: "Dr. Rohan Mehta", role: "Dentist, Ahmedabad", av: "av1", init: "DR" },
    { q: "Exceptional work! My e-commerce store went live on time, looks stunning, and sales started coming in from day one. The whole process was smooth and professional.", name: "Priya Sharma", role: "Online Boutique Owner, Surat", av: "av2", init: "PS" },
    { q: "The landing page Rakesh designed for our product launch had a 34% conversion rate. That's not a website — that's a sales machine. Highly recommended.", name: "Amit Kulkarni", role: "SaaS Founder, Pune", av: "av3", init: "AK" },
    { q: "Our old website was embarrassing us. Rakesh redesigned it completely — now it loads under 2 seconds and looks world-class. Our staff loves showing it to patients.", name: "Dr. Neha Patel", role: "Dental Surgeon, Baroda", av: "av4", init: "NP" },
    { q: "From discovery to launch in 3 weeks. Rakesh communicated at every stage, delivered exactly what was promised, and added ideas we hadn't even thought of.", name: "Vishal Joshi", role: "Restaurant Owner, Gujarat", av: "av5", init: "VJ" },
    { q: "Best investment I made for my business. Rakesh built our WordPress site and trained us to manage it ourselves. We haven't needed to call a developer since!", name: "Sunita Kapoor", role: "Education Consultant, Mumbai", av: "av6", init: "SK" },
    { q: "The speed optimization alone was worth every rupee. My website went from 4.2s to under 1s load time. My Google rankings improved within weeks.", name: "Rahul Desai", role: "Digital Marketer, Surat", av: "av7", init: "RD" },
    { q: "Working with Rakesh felt like having a business partner, not just a developer. He asked the right questions and delivered a website that truly represents our brand.", name: "Meera Nair", role: "Yoga Studio Owner, Pune", av: "av8", init: "MN" }
];

function makeCard(r) {
    /* ====== TESTIMONIAL AVATARS (IMAGE ADD HERE) ====== */
    /* 
       Agar client ki photos add karni hain, toh niche diye gaye div <div class="tcard-avatar ${r.av}"> me style attribute add karke image path de sakte hain:
       <div class="tcard-avatar" style="background-image: url('images/${r.init}.jpg'); background-size: cover;"></div>
       Abhi CSS gradient colors use ho rahe hain (.av1, .av2 etc class se).
    */
    return `<div class="tcard">
        <div class="tcard-badge">✓ Verified</div>
        <div class="tcard-stars">${'<span>★</span>'.repeat(5)}</div>
        <p class="tcard-quote">${r.q}</p>
        <div class="tcard-author">
            <div class="tcard-avatar ${r.av}">${r.init}</div>
            <div>
                <div class="tcard-name">${r.name}</div>
                <div class="tcard-role">${r.role}</div>
            </div>
        </div>
    </div>`;
}

const r1 = document.getElementById('trow1');
const r2 = document.getElementById('trow2');

if (r1 && r2) {
    const half = Math.ceil(reviews.length / 2);
    const set1 = reviews.slice(0, half);
    const set2 = reviews.slice(half);

    // Double each set for seamless loop
    r1.innerHTML = [...set1, ...set1].map(makeCard).join('');
    r2.innerHTML = [...set2, ...set2].map(makeCard).join('');
}

/* ==========================================================================
   Contact Form Submission to Google Sheets
   ========================================================================== */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// IMPORTANT: Replace this URL with your deployed Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEPQX7DNiZtAI_wwKvaM8B1vZu39qJeem6bsskr79yHp59oKRy-UCjvOlOIs8LlZHM/exec';

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... ⏳';
        submitBtn.disabled = true;
        formMessage.style.display = 'none';

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.result === 'success') {
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
                formMessage.style.color = '#22c55e';
                formMessage.style.border = '1px solid rgba(34, 197, 94, 0.3)';
                formMessage.innerHTML = '✅ Thank you! Your message has been sent successfully.';
                contactForm.reset();
            } else {
                throw new Error(result.error || 'Something went wrong');
            }
        } catch (error) {
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            formMessage.style.color = '#ef4444';
            formMessage.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            formMessage.innerHTML = '❌ Oops! Something went wrong. Please try again or contact via WhatsApp.';
            console.error('Error!', error.message);
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
