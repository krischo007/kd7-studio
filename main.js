(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3D tilt effect (lightweight)
  const tiltEl = document.querySelector("[data-tilt]");
  if (tiltEl) {
    const max = 10;

    const onMove = (e) => {
      const r = tiltEl.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = (-dy * max).toFixed(2);
      const ry = (dx * max).toFixed(2);
      tiltEl.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    const reset = () => {
      tiltEl.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    };

    tiltEl.addEventListener("mousemove", onMove);
    tiltEl.addEventListener("mouseleave", reset);
    tiltEl.addEventListener("touchend", reset, { passive: true });
  }

  // Modal preview (Home)
  const modal = document.getElementById("previewModal");
  const openBtn = document.getElementById("openPreview");
  const closeEls = document.querySelectorAll("[data-close]");

  const openModal = () => {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (openBtn) openBtn.addEventListener("click", openModal);
  closeEls.forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Contact form front-end success state (demo)
  const form = document.getElementById("contactForm");
  const success = document.getElementById("successBox");
  if (form && success) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const required = form.querySelectorAll("[required]");
      let ok = true;

      required.forEach((el) => {
        const isCheckbox = el.type === "checkbox";
        const valueOk = isCheckbox ? el.checked : String(el.value || "").trim().length > 0;
        if (!valueOk) ok = false;
      });

      if (!ok) {
        alert("Please complete the required fields.");
        return;
      }

      form.hidden = true;
      success.hidden = false;
    });
  }
})();
