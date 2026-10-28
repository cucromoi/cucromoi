// Nền emoji trôi rất nhẹ — giữ chất riêng nhưng không loè loẹt
const bgWrap = document.createElement("div");
bgWrap.id = "bg-emojis";
bgWrap.setAttribute("aria-hidden", "true");
bgWrap.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden";
document.body.prepend(bgWrap);

const softEmojis = ["✨", "💜", "🌙", "⭐"];

function spawnBgEmoji() {
  const el = document.createElement("span");
  el.textContent = softEmojis[Math.floor(Math.random() * softEmojis.length)];
  el.style.cssText = `
    position:absolute; bottom:-40px; left:${Math.random() * 100}vw;
    font-size:${12 + Math.random() * 10}px; opacity:0;
    animation: drift ${16 + Math.random() * 10}s linear forwards;`;
  bgWrap.appendChild(el);
  setTimeout(() => el.remove(), 27000);
}

const style = document.createElement("style");
style.textContent = `
@keyframes drift {
  0% { transform: translateY(0); opacity: 0; }
  12% { opacity: 0.14; }
  85% { opacity: 0.08; }
  100% { transform: translateY(-115vh) rotate(18deg); opacity: 0; }
}`;
document.head.appendChild(style);

setInterval(spawnBgEmoji, 3800);
for (let i = 0; i < 3; i++) setTimeout(spawnBgEmoji, i * 900);

const revealTargets = document.querySelectorAll(".card, .section-title, .hero-cta, .about-facts, .contact-sub");
revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => io.observe(el));
