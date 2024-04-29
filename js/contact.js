


function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
  
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
  
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
  
    let isValid = true;
  
    if (name.length <= 5) {
      nameError.textContent = 'Name should be more than 5 characters long';
      isValid = false;
    }
  
    if (!validateEmail(email)) {
      emailError.textContent = 'Invalid email address';
      isValid = false;
    }
  
    if (subject.length <= 15) {
      subjectError.textContent = 'Subject should be more than 15 characters long';
      isValid = false;
    }
  
    if (message.length <= 25) {
      messageError.textContent = 'Message content should be more than 25 characters long';
      isValid = false;
    }
  
    if (isValid) {
      // Submit the form
      document.getElementById('contactForm').submit();
    }
  }
  
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  