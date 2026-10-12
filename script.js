// ==========================================
// KONFIGURASI - UBAH SESUAI DATA KAMU
// ==========================================
const CONFIG = {
    githubUsername: 'kanno-gif',      // Ganti dengan username GitHub kamu
    gmailAddress: 'kannoproject@gmail.com',  // Ganti dengan email Gmail kamu
    maxRepos: 6
};

// ==========================================
// 1. STARFIELD ANIMATION
// ==========================================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
let shootingStars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 6000);
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
            twinkleDir: Math.random() > 0.5 ? 1 : -1
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    stars.forEach(star => {
        star.opacity += star.speed * star.twinkleDir;
        if (star.opacity >= 1 || star.opacity <= 0.1) {
            star.twinkleDir *= -1;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#6bb6ff';
        ctx.fill();
    });
    
    // Shooting stars
    if (Math.random() < 0.005) {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            length: Math.random() * 80 + 50,
            speed: Math.random() * 8 + 6,
            opacity: 1
        });
    }
    
    shootingStars.forEach((ss, i) => {
        ss.x += ss.speed;
        ss.y += ss.speed * 0.5;
        ss.opacity -= 0.015;
        
        if (ss.opacity <= 0) {
            shootingStars.splice(i, 1);
            return;
        }
        
        const gradient = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.length, ss.y - ss.length * 0.5);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        gradient.addColorStop(1, 'rgba(107, 182, 255, 0)');
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.length, ss.y - ss.length * 0.5);
        ctx.stroke();
    });
    
    request 