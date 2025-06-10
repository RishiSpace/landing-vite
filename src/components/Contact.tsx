import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('apikey', 'a86c93f7-d34c-4cd7-94ed-2c05bc8f0722');
    formData.append('subject', subject);
    formData.append('message', message);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setSubject('');
        setMessage('');
        setError('');
      } else {
        setError('Submission failed, please try again.');
        setSuccess(false);
      }
    } catch (err) {
      setError('An error occurred, please try again later.');
      setSuccess(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container mx-auto">
        <h2 className="text-center mb-6">Contact Me</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="subject" className="block mb-2">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-2 border border-gray-900 rounded bg-gray-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">
              Description:
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full p-2 border border-gray-900 rounded bg-gray-900"
            ></textarea>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">Message sent successfully!</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;