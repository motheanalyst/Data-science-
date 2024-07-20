interface ContactForm {
    name: string;
    email: string;
    message: string;
}

function validateForm(form: ContactForm): boolean {
    return form.name.trim() !== '' && form.email.trim() !== '' && form.message.trim() !== '';
}

document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item') as NodeListOf<HTMLElement>;
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const link = item.querySelector('a') as HTMLAnchorElement;
            if (link) window.open(link.href, '_blank');
        });
    });

    const achievementItems = document.querySelectorAll('.achievement-item') as NodeListOf<HTMLElement>;
    achievementItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3') as HTMLHeadingElement;
            if (title) alert(`Achievement: ${title.textContent}`);
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event: Event) {
            event.preventDefault();
            
            const form: ContactForm = {
                name: (document.getElementById('name') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value,
                message: (document.getElementById('message') as HTMLTextAreaElement).value
            };

            if (validateForm(form)) {
                // Send form data to backend
                fetch('/send_email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    (contactForm as HTMLFormElement).reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
