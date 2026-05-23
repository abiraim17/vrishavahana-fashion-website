
// ── HERO CAROUSEL WITH REAL IMAGES ──
const slides = [
    { label: 'Bridal', img: 'images/image2.jpeg', grad: 'linear-gradient(160deg,#3d0a14,#6b1a2a,#8b2a3e)' },
    { label: 'Groom', img: 'images/image1.jpeg', grad: 'linear-gradient(160deg,#0d1b2a,#1c3a5e,#2d5986)' },
    { label: 'Fashion', img: 'images/image3.jpeg', grad: 'linear-gradient(160deg,#2a1a0a,#7a3d25,#b85c30)' },
    { label: 'Kids', img: 'images/image4.jpeg', grad: 'linear-gradient(160deg,#1a0a2a,#6b2a8b,#a060cc)' },
    { label: "Women's", img: 'images/image5.jpeg', grad: 'linear-gradient(160deg,#0a1a1a,#1a5a5a,#2a8a7a)' },
    { label: "Men's", img: 'images/image6.jpeg', grad: 'linear-gradient(160deg,#1a1a0a,#4a4a1a,#7a7a2a)' }
];

let current = 0;
let autoTimer = null;

const track = document.getElementById('carouselTrack');
const dotsEl = document.getElementById('carouselDots');
const catName = document.getElementById('activeCatName');
const heroBg = document.getElementById('heroBg');

// Build slide elements with REAL IMAGES
slides.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'carousel-slide';
    el.innerHTML = `
    <div class="slide-bg"
         style="background-image: url('${s.img}');
                background-size: cover;
                background-position: center;">
      <div class="slide-label">${s.label}</div>
    </div>
  `;
    el.addEventListener('click', () => {
        current = i;
        renderCarousel();
        resetAuto();
    });

    track.appendChild(el);
});

function renderCarousel() {
    const els = track.querySelectorAll('.carousel-slide');
    const dots = dotsEl.querySelectorAll('.carousel-dot');
    const total = slides.length;

    els.forEach((el, i) => {
        el.className = 'carousel-slide';
        const diff = ((i - current) % total + total) % total;
        const neg = ((current - i) % total + total) % total;
        const pos = diff <= neg ? diff : -neg;

        if (pos === 0) el.classList.add('pos-active');
        else if (pos === 1) el.classList.add('pos-next1');
        else if (pos === 2) el.classList.add('pos-next2');
        else if (pos === -1) el.classList.add('pos-prev1');
        else if (pos === -2) el.classList.add('pos-prev2');
        else el.classList.add('pos-hidden');
    });

    dots.forEach((d, i) => {
        d.className = 'carousel-dot' + (i === current ? ' active' : '');
    });

    catName.style.opacity = '0';
    setTimeout(() => {
        if (catName.querySelector('span')) {
            catName.querySelector('span').textContent = slides[current].label;
        }
        heroBg.style.background = slides[current].grad;
        catName.style.opacity = '1';
    }, 200);
    catName.style.transition = 'opacity 0.3s';
}

function moveCarousel(dir) {
    current = ((current + dir) % slides.length + slides.length) % slides.length;
    renderCarousel();
    resetAuto();
}

function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => moveCarousel(1), 3200);
}

renderCarousel();
resetAuto();

// ── Rest of your functions (keep everything below exactly as is) ──
function showTab(tab) {
    document.querySelectorAll('.gallery-category').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    event.target.classList.add('active');
}

let basePrice = 2500;

function selectColor(el, color, price) {
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    updatePrice();
}

function selectChip(el, addon) {
    const group = el.parentElement;
    group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    updatePrice();
}

function updatePrice() {
    const activeChips = document.querySelectorAll('.customize-options .chip.active');
    let total = basePrice;
    activeChips.forEach(chip => {
        const fn = chip.getAttribute('onclick');
        const match = fn && fn.match(/\d+/g);
        if (match) total += parseInt(match[match.length - 1]);
    });
    document.getElementById('price-display').textContent = 'LKR ' + total.toLocaleString();
}

function toggleChip(el) {
    el.classList.toggle('active');
}

function setUnit(el, unit) {
    document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

function submitForm() {
    document.getElementById('success-msg').style.display = 'block';
    setTimeout(() => {
        document.getElementById('success-msg').style.display = 'none';
    }, 5000);
}

function scrollToCustomize() {
    document.getElementById('customize').scrollIntoView({ behavior: 'smooth' });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(20px)';
    sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(sec);
});
