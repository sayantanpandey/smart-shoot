import Head from 'next/head';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("https://formspree.io/f/xaygwlyk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      toast.success("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
       toast.error("Oops! Something went wrong. Try again later.");
    }
  } catch (error) {
    toast.error("Error submitting the form.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      <Head>
        <title>Contact | Sayantan Pandey - Macro Photographer & Developer</title>
        <meta name="description" content="Get in touch with Sayantan Pandey for photography projects, development work, or collaboration opportunities." />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-slate-50  py-20 lg:py-15 px-6">
        {/* Geometric background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-400 rotate-45"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-emerald-400 rotate-12"></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 border border-emerald-400 -rotate-12"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-emerald-400"></div>
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Contact</span>
            <div className="w-8 h-px bg-emerald-400"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Let's <span className="text-emerald-400">Connect</span>
          </h1>
          
          <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Ready to collaborate on your next project? Whether it's capturing the perfect macro shot or building your digital presence, I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-slate-50 py-20 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Contact Methods */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="group bg-white border border-slate-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-emerald-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Email</h3>
              <p className="text-slate-600 mb-4">Drop me a line anytime</p>
              <a href="mailto:sayantanpandey060@gmail.com" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-300">
                sayantanpandey060@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="group bg-white border border-slate-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-emerald-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Location</h3>
              <p className="text-slate-600 mb-4">Based in India</p>
              <span className="text-emerald-600 font-semibold">Available for remote work</span>
            </div>

            {/* Response Time */}
            <div className="group bg-white border border-slate-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-emerald-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Response Time</h3>
              <p className="text-slate-600 mb-4">I typically respond within</p>
              <span className="text-emerald-600 font-semibold">24-48 hours</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-8 h-px bg-emerald-500"></div>
                  <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Get in Touch</span>
                  <div className="w-8 h-px bg-emerald-500"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Send Me a <span className="text-emerald-600">Message</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300 text-slate-800"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300 text-slate-800"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300 text-slate-800"
                  >
                    <option value="">Select a subject</option>
                    <option value="photography">Photography Project</option>
                    <option value="development">Web Development</option>
                    <option value="collaboration">General Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-300 text-slate-800 resize-vertical"
                    placeholder="Tell me about your project or how I can help you..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group px-8 py-4 bg-emerald-500 text-white text-lg font-semibold rounded-lg hover:bg-emerald-600 disabled:bg-emerald-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg disabled:transform-none disabled:shadow-md"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl shadow-xl p-8 lg:p-12 mt-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-emerald-400"></div>
                <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Connect</span>
                <div className="w-8 h-px bg-emerald-400"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let's <span className="text-emerald-400">Stay Connected</span>
              </h2>
              
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                Follow my work and connect with me on social platforms for updates on latest projects and behind-the-scenes content.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: 'LinkedIn',link:"https://www.linkedin.com/", icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { name: 'GitHub',link:"https://github.com/sayantanpandey", icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
                  { name: 'Instagram',link:"https://www.instagram.com/smart_shoot1/", icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="group flex items-center gap-3 px-6 py-3 bg-slate-700/50 rounded-lg backdrop-blur-sm hover:bg-slate-600/50 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;