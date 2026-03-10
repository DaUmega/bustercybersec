// Mobile menu
const nav = document.getElementById("nav");
document.getElementById("menu-btn").addEventListener("click", () => {
  nav.classList.toggle("open");
  if (nav.classList.contains("open")) nav.classList.add("slide-down");
});
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const t = document.getElementById(a.getAttribute("href").slice(1));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.offsetTop - 80, behavior: "smooth" });
  });
});

// Active nav
const navLinks = document.querySelectorAll("#nav a[href^='#']");
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`)
    );
  });
}, { threshold: 0.4 }).observe(...document.querySelectorAll("section[id]"));

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); ro.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach(el => ro.observe(el));

// Toast
function toast(msg, err) {
  const t = Object.assign(document.createElement("div"), { textContent: msg, className: "toast" });
  Object.assign(t.style, {
    position:"fixed", bottom:"1.5rem", right:"1.5rem", padding:".7rem 1.1rem",
    borderRadius:".6rem", color:"#fff", fontFamily:"'JetBrains Mono',monospace",
    fontSize:".8rem", zIndex:"9999", boxShadow:"0 8px 28px rgba(0,0,0,.4)",
    background: err ? "#450a0a" : "#0d1829",
    border: `1px solid ${err ? "#dc2626" : "rgba(6,182,212,.4)"}`
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// Contact
document.getElementById("send-btn").addEventListener("click", () => {
  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) return toast("Please fill in all fields.", true);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Enter a valid email.", true);
  const body = `Name: ${name}%0DEmail: ${email}%0D%0DMessage:%0D${encodeURIComponent(message)}`;
  window.location.href = `mailto:info@bustercybersec.com?subject=${encodeURIComponent(`Message from ${name}`)}&body=${body}`;
  toast("Opening email client...");
});
