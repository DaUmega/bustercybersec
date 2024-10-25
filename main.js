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
  
    window.location.href = `mailto:your-email@buster-cybersecurity.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}
  