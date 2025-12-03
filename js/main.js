// =====================================================
// =============== GATE (OPENING SCREEN) ===============
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enterBtn");
  const hero = document.getElementById("hero");
  const gate = document.getElementById("gate");
  let savedScrollY = 0;

  function lockScroll() {
    savedScrollY = window.scrollY || window.pageYOffset;
    document.documentElement.style.position = "fixed";
    document.documentElement.style.top = `-${savedScrollY}px`;
    document.documentElement.style.left = "0";
    document.documentElement.style.right = "0";
    document.documentElement.style.width = "100%";
    document.body.classList.add("locked-scroll");
  }

  function unlockScroll() {
    document.documentElement.style.position = "";
    document.documentElement.style.top = "";
    document.documentElement.style.left = "";
    document.documentElement.style.right = "";
    document.documentElement.style.width = "";
    document.body.classList.remove("locked-scroll");
    window.scrollTo(0, savedScrollY);
  }

  // Lock scroll saat halaman pertama kali dibuka
  lockScroll();

  // Event klik tombol "Buka Undangan"
  enterBtn.addEventListener("click", () => {
    unlockScroll();
    hero.scrollIntoView({ behavior: "smooth" });

    if (gate) {
      setTimeout(() => {
        gate.classList.add("hidden");
        setTimeout(() => gate.remove(), 600);
      }, 800);
    }
  });
});

// =====================================================
// =================== PARAMETER NAMA ==================
// =====================================================
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("to");
if (nama) {
  document.getElementById("penerima").innerText = nama;
}

// =====================================================
// ================== BACKGROUND SLIDESHOW =============
// =====================================================
const images = [
  "./img/galery/ft1.jpg",
  "./img/galery/ft2.jpg",
  "./img/galery/ft3.jpg",
  "./img/galery/ft4.jpg",
  "./img/galery/ft5.jpg",
  "./img/galery/ft6.jpg"
];

// Preload image
images.forEach(src => { const img = new Image(); img.src = src; });

const bgA = document.getElementById("bgA");
const bgB = document.getElementById("bgB");

let showingA = true;
let index = 1;

bgA.style.backgroundImage = `url('${images[0]}')`;
bgB.style.backgroundImage = `url('${images[1]}')`;

function crossfade() {
  const nextUrl = images[index % images.length];
  const fadeIn = showingA ? bgB : bgA;
  const fadeOut = showingA ? bgA : bgB;

  fadeIn.style.backgroundImage = `url('${nextUrl}')`;

  fadeOut.classList.remove("opacity-100");
  fadeOut.classList.add("opacity-0");
  fadeIn.classList.remove("opacity-0");
  fadeIn.classList.add("opacity-100");

  showingA = !showingA;
  index++;
}

setInterval(crossfade, 3000);

// =====================================================
// ==================== COUNTDOWN ======================
// =====================================================
const targetDate = new Date("Dec 14, 2025 08:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML =
      "<p class='text-lg font-semibold'>The Wedding Has Started 🎉</p>";
    return;
  }

  document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =====================================================
// ==================== REVEAL ANIMATIONS =============
// =====================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      if (el.classList.contains("slide-left")) el.classList.remove("opacity-0", "-translate-x-10");
      if (el.classList.contains("slide-right")) el.classList.remove("opacity-0", "translate-x-10");
      if (el.classList.contains("slide-down")) el.classList.remove("opacity-0", "-translate-y-10");
      if (el.classList.contains("slide-up")) el.classList.remove("opacity-0", "translate-y-10");
      if (el.classList.contains("fade-in")) el.classList.remove("opacity-0");
      if (el.classList.contains("zoom-in")) el.classList.remove("opacity-0", "scale-95");

      el.classList.add("opacity-100", "translate-x-0", "translate-y-0", "scale-100");

      observer.unobserve(el);
    }
  });
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// =====================================================
// ====================== SWIPER GALLERY ===============
// =====================================================
function initGallerySwiper() {
  new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }
  });
}

// =====================================================
// ============== LOAD SECTION HTML DINAMIS ============
// =====================================================
function loadSection(id, url) {
  fetch(url)
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById(id);
      container.innerHTML = data;

      container.querySelectorAll(".reveal").forEach(el => observer.observe(el));

      if (id === "gallery") initGallerySwiper();
    })
    .catch(err => console.error("Gagal load:", err));
}

loadSection("mempelai", "./mempelai.html");
loadSection("acara", "./acara.html");
loadSection("story", "./story.html");
loadSection("gallery", "./gallery.html");
loadSection("qoutes", "./qoutes.html");
loadSection("closing", "./closing.html");
loadSection("footer", "./footer.html");
loadSection("amplop", "./amplop.html");
loadSection("navbar", "./navbar.html");

// =====================================================
// ======================== COPY BUTTON ================
// =====================================================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const norek = e.target.getAttribute("data-norek");
    navigator.clipboard.writeText(norek).then(() => {
      const toast = document.getElementById("toast");
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");

      setTimeout(() => {
        toast.classList.remove("opacity-100");
        toast.classList.add("opacity-0");
      }, 2500);
    });
  }
});

// =====================================================
// ========== SCRIPT MUSIK – AUTOPLAY ANTI BLOKIR ======
// =====================================================
const bgMusic = document.getElementById("bg-music");
const btnMusic = document.getElementById("btn-music");
const iconMusic = document.getElementById("icon-music");

let musicStarted = false;

// 🔊 Musik jalan hanya setelah interaksi user pertama
function triggerMusic() {
  if (musicStarted) return;

  bgMusic.play()
    .then(() => {
      musicStarted = true;
      iconMusic.classList.replace("fa-play", "fa-pause");
      console.log("Musik berhasil diputar setelah interaksi user");
    })
    .catch(err => {
      console.log("Autoplay diblokir:", err);
    });
}

// Event interaksi pertama user
["click", "touchstart", "scroll", "keydown"].forEach(eventName => {
  window.addEventListener(eventName, triggerMusic, { once: true });
});

// ▶️ Tombol play/pause
btnMusic.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      iconMusic.classList.replace("fa-play", "fa-pause");
    });
  } else {
    bgMusic.pause();
    iconMusic.classList.replace("fa-pause", "fa-play");
  }
});