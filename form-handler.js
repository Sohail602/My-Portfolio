document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("84u0ON7-yq01y9gjb");
    
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Validate inputs
            if (!nameInput.value.trim()) {
                alert("Please enter your name");
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim()) {
                alert("Please enter your email");
                emailInput.focus();
                return;
            }
            
            if (!validateEmail(emailInput.value.trim())) {
                alert("Please enter a valid email address");
                emailInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                alert("Please enter your message");
                messageInput.focus();
                return;
            }
            
            // Prepare form data
            const formData = {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            // Change button text during submission
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            
            // Send email
            emailjs.send("service_x9iiacn", "template_1x4feok", formData)
                .then(function(response) {
                    alert("Message sent successfully!");
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error("EmailJS Error:", error);
                    alert("Failed to send message. Please try again later.");
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});