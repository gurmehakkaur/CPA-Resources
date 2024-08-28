import React, { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isEmailValid(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setEmail('');
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while subscribing.');
      });
  };

  const isEmailValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <form id="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Subscribe to get updates"
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}

export default NewsletterForm;
