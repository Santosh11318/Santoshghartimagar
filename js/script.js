/* =========================================================
   SANTOSH GHARTI MAGAR — AI WEBSITE DEVELOPER PORTFOLIO
   ========================================================= */
(function () {
  "use strict";

  const WA_NUMBER = "918799747981";

  /* ---------------- LOADER ---------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader && loader.classList.add("hidden"), 500);
  });

  /* ---------------- YEAR ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- CUSTOM CURSOR ---------------- */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (dot && ring && matchMedia("(hover:hover)").matches) {
    let rx = 0, ry = 0, mx = 0, my = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    (function loop() {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, input, select, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => { ring.style.width = "50px"; ring.style.height = "50px"; ring.style.opacity = ".3"; });
      el.addEventListener("mouseleave", () => { ring.style.width = "34px"; ring.style.height = "34px"; ring.style.opacity = ".6"; });
    });
  }

  /* ---------------- NAVBAR SCROLL ---------------- */
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 40;
    navbar && navbar.classList.toggle("scrolled", scrolled);
    backToTop && backToTop.classList.toggle("show", window.scrollY > 500);
  });
  backToTop && backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- MOBILE MENU ---------------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------------- THEME TOGGLE ---------------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = (() => { try { return localStorage.getItem("sg-theme"); } catch (e) { return null; } })();
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  else if (matchMedia("(prefers-color-scheme: light)").matches) root.setAttribute("data-theme", "light");

  function setPressed() {
    themeToggle && themeToggle.setAttribute("aria-pressed", String(root.getAttribute("data-theme") === "light"));
  }
  setPressed();
  themeToggle && themeToggle.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    root.setAttribute("data-theme", isLight ? "dark" : "light");
    try { localStorage.setItem("sg-theme", isLight ? "dark" : "light"); } catch (e) {}
    setPressed();
  });

  /* ---------------- SCROLL REVEAL ---------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); } }),
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* progress bars reveal */
  const progRows = document.querySelectorAll(".prog-row");
  const barIO = new IntersectionObserver(
    (entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in"); barIO.unobserve(entry.target); } }),
    { threshold: 0.4 }
  );
  progRows.forEach((el) => barIO.observe(el));

  /* ---------------- ANIMATED COUNTERS ---------------- */
  const counters = document.querySelectorAll(".stat-num");
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        cur += step;
        if (cur >= target) { el.textContent = target; return; }
        el.textContent = cur;
        requestAnimationFrame(tick);
      };
      tick();
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => counterIO.observe(el));

  /* ---------------- BUILD CONSOLE TYPING ANIMATION (signature hero element) ---------------- */
  const codeLines = [
    '<span class="kw">&lt;section</span> <span class="tag">class</span>=<span class="str">"hero"</span><span class="kw">&gt;</span>',
    '  <span class="kw">&lt;h1&gt;</span>Book Your Glow-Up<span class="kw">&lt;/h1&gt;</span>',
    '  <span class="kw">&lt;button&gt;</span>Book Now<span class="kw">&lt;/button&gt;</span>',
    '<span class="kw">&lt;/section&gt;</span>'
  ];
  const consoleScenes = [
    { tag: "Salon Website" },
    { tag: "Restaurant Website" },
    { tag: "Clinic Website" },
    { tag: "School Website" }
  ];
  const consoleCode = document.getElementById("consoleCode");
  const consoleTag = document.getElementById("consoleTag");
  const consolePreview = document.getElementById("consolePreview");

  function typeScene(sceneIndex) {
    if (!consoleCode) return;
    consoleCode.innerHTML = "";
    consolePreview && consolePreview.classList.remove("reveal");
    let lineIdx = 0;

    function typeLine() {
      if (lineIdx >= codeLines.length) {
        setTimeout(() => {
          if (consoleTag) {
            consoleTag.style.opacity = 0;
            setTimeout(() => {
              consoleTag.textContent = consoleScenes[sceneIndex].tag;
              consoleTag.style.opacity = 1;
            }, 250);
          }
          setTimeout(() => typeScene((sceneIndex + 1) % consoleScenes.length), 2600);
        }, 400);
        return;
      }
      const p = document.createElement("div");
      consoleCode.appendChild(p);
      const raw = codeLines[lineIdx];
      p.innerHTML = raw;
      p.style.opacity = 0;
      requestAnimationFrame(() => {
        p.style.transition = "opacity .3s";
        p.style.opacity = 1;
      });
      lineIdx++;
      setTimeout(typeLine, 420);
    }
    typeLine();
  }
  if (consoleCode) {
    consoleTag.style.transition = "opacity .25s";
    typeScene(0);
  }

  /* ================================================================
     DATA — SERVICES / PORTFOLIO / WHY / TESTIMONIALS / FAQ
     ================================================================ */
  const SERVICES = [
    { icon: "🤖", title: "AI Website Development", desc: "Modern websites built faster using AI-assisted workflows, without sacrificing hand-crafted quality." },
    { icon: "🚀", title: "Landing Page Design", desc: "High-converting single pages built to turn ad clicks and visitors into leads." },
    { icon: "🏢", title: "Business Website", desc: "A professional multi-page site that builds trust and describes what you offer clearly." },
    { icon: "🎨", title: "Portfolio Website", desc: "A personal or creative portfolio that showcases your work the way it deserves." },
    { icon: "🩺", title: "Clinic Website", desc: "Appointment-friendly websites for clinics and hospitals with clear service listings." },
    { icon: "🍜", title: "Restaurant Website", desc: "Menu-first websites with mouth-watering visuals and easy contact/ordering info." },
    { icon: "🏫", title: "School Website", desc: "Informative, parent-friendly websites for schools, colleges and academies." },
    { icon: "🏨", title: "Hotel Website", desc: "Booking-focused hotel sites with galleries, amenities and location details." },
    { icon: "🛒", title: "E-Commerce Website", desc: "Simple, secure online stores to showcase and sell your products." },
    { icon: "📈", title: "SEO Optimization", desc: "On-page SEO, schema markup and speed tuning so your business shows up on Google." },
    { icon: "🔄", title: "Website Redesign", desc: "Give your outdated website a modern, mobile-first, high-performance makeover." },
    { icon: "☁️", title: "Google Drive Hosting", desc: "Budget-friendly hosting setup for clients who want a working site without server costs." }
  ];

  const PROJECTS = [
    { title: "Nisha Beauty Salon", cat: "Salon Website", url: "https://santosh11318.github.io/Nisha-Beauty-salon/" },
    { title: "Zippy Momos", cat: "Restaurant Website", url: "https://santosh11318.github.io/Zippy-momos/" },
    { title: "Arghakhanchi Dental Clinic", cat: "Clinic Website", url: "https://santosh11318.github.io/Arghakhanchi-dental-clinic/" },
    { title: "Sharmila Suryavanshi", cat: "Personal Website", url: "https://santosh11318.github.io/Sharmilasuryavanshi/" },
    { title: "Supadeurali Placement Service", cat: "Business Website", url: "https://santosh11318.github.io/Supadeurali-placement-service/" },
    { title: "Ajay Thapa Portfolio", cat: "Portfolio Website", url: "https://santosh11318.github.io/Ajaythapa.portfolio/" }
  ];

  const WHY = [
    { icon: "⚡", title: "Fast Delivery", desc: "Most projects delivered within days, not months." },
    { icon: "📱", title: "100% Responsive", desc: "Looks great on every screen, from mobile to desktop." },
    { icon: "🔍", title: "SEO Friendly", desc: "Structured for search engines from the first line of code." },
    { icon: "✅", title: "Google Friendly", desc: "Clean, indexable markup that Google can actually understand." },
    { icon: "✨", title: "Modern Design", desc: "Glassmorphism, gradients and micro-interactions done right." },
    { icon: "🔒", title: "Secure Code", desc: "No sketchy scripts, no vulnerabilities, no shortcuts." },
    { icon: "🤝", title: "Lifetime Support", desc: "I don't disappear after delivery — I'm one message away." },
    { icon: "💰", title: "Affordable Pricing", desc: "Agency-quality websites at freelancer-friendly prices." }
  ];

  const TESTIMONIALS = [
    { quote: "Our booking enquiries doubled within a month of the new site going live — clients say it feels premium.", name: "Salon Owner", role: "Beauty & Wellness Client" },
    { quote: "Customers now find our menu on Google before they even walk in. Exactly what we needed.", name: "Restaurant Owner", role: "Food & Beverage Client" },
    { quote: "Patients book appointments through the website now instead of calling all day. Huge time saver.", name: "Clinic Administrator", role: "Healthcare Client" },
    { quote: "Delivered on time, looked better than sites agencies quoted 5x the price for.", name: "Placement Service Owner", role: "Business Client" }
  ];

  const FAQS = [
    { q: "How long does it take to build my website?", a: "Most business websites are delivered within 3–7 days depending on complexity. Landing pages can be ready in as little as 1–2 days." },
    { q: "Will my website be SEO optimized?", a: "Yes — every site includes on-page SEO, meta tags, schema markup, sitemap and clean semantic HTML so search engines can index it properly." },
    { q: "Do I need to buy hosting separately?", a: "Not necessarily. I offer budget Google Drive-based hosting for simple sites, or can guide you through affordable standard hosting if you need email and a custom domain." },
    { q: "What does it cost?", a: "Pricing depends on pages, features and design complexity. Message me on WhatsApp with your requirements and I'll send a clear, upfront quote." },
    { q: "Do you offer support after the website is delivered?", a: "Yes, I provide ongoing support for bug fixes, content updates and small changes even after the project is complete." },
    { q: "Can you redesign my existing website?", a: "Absolutely — send me your current site link and I'll suggest a modern, faster, mobile-first redesign." }
  ];

  /* ---------------- RENDER SERVICES ---------------- */
  const servicesGrid = document.getElementById("servicesGrid");
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.map(
      (s) => `
      <div class="service-card" data-reveal>
        <div class="ic" aria-hidden="true">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>`
    ).join("");
    servicesGrid.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
  }

  /* ---------------- RENDER PORTFOLIO ---------------- */
  const portfolioGrid = document.getElementById("portfolioGrid");
  if (portfolioGrid) {
    portfolioGrid.innerHTML = PROJECTS.map(
      (p) => `
      <div class="project-card" data-reveal>
        <div class="project-frame-wrap">
          <iframe src="${p.url}" title="${p.title} live preview" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>
          <div class="project-overlay">
            <a class="btn btn-primary" href="${p.url}" target="_blank" rel="noopener">
              <span>Live Preview</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </div>
        <div class="project-body">
          <p class="project-cat">${p.cat}</p>
          <h3>${p.title}</h3>
        </div>
      </div>`
    ).join("");
    portfolioGrid.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
  }

  /* ---------------- RENDER WHY ---------------- */
  const whyGrid = document.getElementById("whyGrid");
  if (whyGrid) {
    whyGrid.innerHTML = WHY.map(
      (w) => `
      <div class="why-card" data-reveal>
        <div class="ic" aria-hidden="true">${w.icon}</div>
        <h4>${w.title}</h4>
        <p>${w.desc}</p>
      </div>`
    ).join("");
    whyGrid.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
  }

  /* ---------------- RENDER TESTIMONIALS ---------------- */
  const testiTrack = document.getElementById("testiTrack");
  const testiDots = document.getElementById("testiDots");
  let testiIndex = 0;
  let testiTimer;

  if (testiTrack && testiDots) {
    testiTrack.innerHTML = TESTIMONIALS.map(
      (t) => `
      <div class="testi-card">
        <div class="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <p class="testi-quote">"${t.quote}"</p>
        <p class="testi-name">${t.name}</p>
        <p class="testi-role">${t.role}</p>
      </div>`
    ).join("");
    testiDots.innerHTML = TESTIMONIALS.map((_, i) => `<button aria-label="Show testimonial ${i + 1}" class="${i === 0 ? "active" : ""}"></button>`).join("");

    function goTo(i) {
      testiIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
      testiTrack.style.transform = `translateX(-${testiIndex * 100}%)`;
      testiDots.querySelectorAll("button").forEach((b, idx) => b.classList.toggle("active", idx === testiIndex));
    }
    testiDots.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => { goTo(i); resetTimer(); }));

    function resetTimer() {
      clearInterval(testiTimer);
      testiTimer = setInterval(() => goTo(testiIndex + 1), 5000);
    }
    resetTimer();
  }

  /* ---------------- RENDER FAQ ACCORDION ---------------- */
  const accordion = document.getElementById("accordion");
  if (accordion) {
    accordion.innerHTML = FAQS.map(
      (f, i) => `
      <div class="accordion-item" data-index="${i}">
        <button aria-expanded="false" id="faqBtn${i}" aria-controls="faqPanel${i}">
          <span>${f.q}</span>
          <span class="plus" aria-hidden="true"></span>
        </button>
        <div class="accordion-panel" id="faqPanel${i}" role="region" aria-labelledby="faqBtn${i}">
          <p>${f.a}</p>
        </div>
      </div>`
    ).join("");

    accordion.querySelectorAll(".accordion-item").forEach((item) => {
      const btn = item.querySelector("button");
      const panel = item.querySelector(".accordion-panel");
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        accordion.querySelectorAll(".accordion-item.open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector("button").setAttribute("aria-expanded", "false");
            openItem.querySelector(".accordion-panel").style.maxHeight = null;
          }
        });
        item.classList.toggle("open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });
  }

  /* ---------------- COPY EMAIL ---------------- */
  const copyBtn = document.getElementById("copyEmailBtn");
  copyBtn && copyBtn.addEventListener("click", async () => {
    const email = "santoshghartimagar918@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = email; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");
    setTimeout(() => { copyBtn.textContent = "Copy"; copyBtn.classList.remove("copied"); }, 2000);
  });

  /* ---------------- CONTACT FORM -> WHATSAPP ---------------- */
  const form = document.getElementById("contactForm");
  form && form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const business = (data.get("business") || "").toString().trim();
    const service = (data.get("service") || "").toString().trim();
    const budget = (data.get("budget") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const lines = [
      "Hi Santosh, I'd like to enquire about a website project:",
      "",
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      email ? `*Email:* ${email}` : null,
      business ? `*Business:* ${business}` : null,
      `*Service:* ${service}`,
      budget ? `*Budget:* ${budget}` : null,
      "",
      `*Message:* ${message}`
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener");
    form.reset();
  });
})();
