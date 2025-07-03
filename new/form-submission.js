// File: new/form-submission.js
// This script handles form submission, validation, and displays a success modal with a countdown timer. 
 document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    if (!form) {
        console.warn("Form with ID 'contact-form' not found.");
        return;
    }

    // Create success modal element
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-content">
          
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you soon.</p>
            <div class="countdown">Closing in 7 seconds...</div>
        </div>
    `;
    document.body.appendChild(successModal);

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validation
        if (!name || !email || !message) {
            alert("Please fill in all required fields (Name, Email, and Message)");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("message", message);

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbx7JhAwE5910Cj-X9O8akoTtHir4s90PE5fZenuB9Ucu1e7kSRJOZhoRL5hfDTfHXet/exec", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            // Show success modal
            successModal.style.display = 'flex';
            
            // Update countdown timer
            let secondsLeft = 7;
            const countdownElement = successModal.querySelector('.countdown');
            const countdownInterval = setInterval(() => {
                secondsLeft--;
                countdownElement.textContent = `Closing in ${secondsLeft} second${secondsLeft !== 1 ? 's' : ''}...`;
                
                if (secondsLeft <= 0) {
                    clearInterval(countdownInterval);
                    successModal.style.display = 'none';
                }
            }, 1000);

            form.reset();

        } catch (error) {
            console.error("Submission error:", error);
            alert("Sorry, we couldn't send your message. Please try again later.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});
