document.getElementById('sign-up-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate inputs
    let isValid = true;

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        const fieldName = input.placeholder; // Use placeholder as field name
        if (input.value.trim() === '') {
            if (input.type === 'email') {
                input.placeholder = 'email@example/com'; // Update placeholder for email
                input.classList.add('error'); // Add error class to highlight the input
                showError(input, 'Looks like this is not an email'); // Set specific error message for email
            } else {
                input.classList.add('error'); // Add error class to highlight the input
                showError(input, `${fieldName} cannot be empty`); // Use placeholder for error message
            }
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Looks like this is not an email'); // Set specific error message for invalid email
            isValid = false;
        }
    });

    if (isValid) {
        alert('Form submitted successfully!');
    }
});

function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        input.classList.add('error'); // Add the error class to the input
        errorSpan.textContent = message; // Set the error message
        errorSpan.style.display = 'block'; // Display the error message
    } else {
        console.error(`Error span not found for input: ${input.id}`);
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((error) => {
        error.style.display = 'none'; // Hide all error messages
    });

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        input.classList.remove('error'); // Remove the error class from all inputs
        if (input.type === 'email') {
            input.placeholder = 'Email Address'; // Reset placeholder for email
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    return re.test(String(email).toLowerCase());
}