function toggleDetails(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('hidden');
}

function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    const subject = `New message from ${name}`;
    const body = `Name: ${name}%0DEmail: ${email}%0D%0DMessage:%0D${encodeURIComponent(message)}`;
  
    window.location.href = `mailto:info@bustercybersec.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}

// Toggle mobile menu visibility
document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a menu option
const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        const offset = 80; // Adjust based on your header's height

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: "smooth"
        });
    });
});