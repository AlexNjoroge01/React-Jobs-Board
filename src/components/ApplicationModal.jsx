import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ApplicationModal = ({ isOpen, onClose, job, companyEmail }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email content
    const subject = `Application for ${job.title}`;
    const body = `Dear ${job.company.name} Hiring Team,

I am writing to express my interest in the ${job.title} position based in ${job.location}.

Applicant Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Cover Letter:
${formData.coverLetter}

I have attached my resume/CV for your review. I look forward to discussing how my skills and experience align with your requirements.

Best regards,
${formData.name}`;

    // Create mailto link with pre-filled content
    const mailtoLink = `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    // Show success message after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // You could add a toast notification here if desired
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Apply for {job.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              Your application will be sent to: <strong className="text-indigo-600">{companyEmail}</strong>
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="coverLetter" className="block text-gray-700 font-bold mb-2">
              Cover Letter *
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              required
              rows="6"
              value={formData.coverLetter}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Opening Email...' : 'Submit Application'}
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            * Clicking "Submit Application" will open your email client with a pre-filled message. Please attach your resume/CV before sending.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;

