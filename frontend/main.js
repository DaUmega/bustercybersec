// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("animate-slide-down");
    } else {
      mobileMenu.classList.remove("animate-slide-down");
    }
  });
}

// Close mobile menu on link click
document.querySelectorAll("#mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    e.preventDefault();
    const offset = 80;
    const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Toast notification
function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `fixed bottom-5 right-5 px-4 py-2 rounded shadow-lg z-50 text-white 
    ${isError ? "bg-red-600" : "bg-green-600"} animate-fade-in-out`;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// Email send handler
function sendEmail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all fields.", true);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Enter a valid email address.", true);
    return;
  }

  const subject = `New message from ${name}`;
  const body = `Name: ${name}%0DEmail: ${email}%0D%0DMessage:%0D${encodeURIComponent(message)}`;

  window.location.href = `mailto:info@bustercybersec.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  showToast("Opening email client...");
}

// Attach email button handler
const sendBtn = document.getElementById("send-btn");
if (sendBtn) {
  sendBtn.addEventListener("click", sendEmail);
}
