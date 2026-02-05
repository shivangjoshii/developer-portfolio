"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import { submitContactForm } from "@/utils/contact-service";
import { useState } from "react";
import { toast } from "react-toastify";
import SuccessPopup from "../../success-popup";
import { MdSend } from "react-icons/md";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      await submitContactForm(userInput);
      setShowSuccess(true);
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">Contact with me</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3D Animation Section */}
        <div className="hidden lg:flex items-center justify-center rounded-lg border border-[#464c6a] overflow-hidden bg-gradient-to-br from-[#0d1224] to-[#0a0d37] h-full min-h-96">
          <div className="w-full h-96 bg-gradient-to-br from-pink-500/5 via-violet-600/5 to-pink-500/5 flex items-center justify-center relative overflow-hidden rounded-lg">
            {/* Animated 3D-like element */}
            <div className="relative w-40 h-40">
              {/* Rotating cube-like shapes */}
              <div className="absolute inset-0 border-2 border-[#16f2b3]/30 rounded-3xl animate-spin" style={{animationDuration: '8s'}}></div>
              <div className="absolute inset-8 border-2 border-pink-500/30 rounded-2xl animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
              <div className="absolute inset-16 border-2 border-violet-600/30 rounded-lg animate-pulse"></div>
              
              {/* Center glowing orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#16f2b3] to-violet-600 rounded-full blur-md animate-pulse opacity-60"></div>
                <div className="absolute w-8 h-8 bg-gradient-to-br from-pink-500 to-[#16f2b3] rounded-full blur-sm"></div>
              </div>
            </div>
            
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-violet-600/10 pointer-events-none"></div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-6 lg:p-8 bg-gradient-to-br from-[#0d1224] via-[#0f1535] to-[#0a0d37]">
          <p className="text-sm text-[#d3d8e8] mb-6">
            {"Get in touch! I'm always interested in hearing about new projects and opportunities. Feel free to drop me a message."}
          </p>
          
          <form onSubmit={handleSendMail} className="space-y-5">
            <div className="group">
              <label className="text-base font-semibold text-[#16f2b3] mb-2 block transition-colors duration-300">
                Your Name
              </label>
              <input
                className="bg-[#10172d] w-full border-2 border-[#353a52] rounded-lg focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-white placeholder-[#7a8599] hover:border-[#16f2b3]/50"
                type="text"
                maxLength="100"
                required={true}
                placeholder="Enter your full name"
                onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
                onBlur={checkRequired}
                value={userInput.name}
              />
            </div>

            <div className="group">
              <label className="text-base font-semibold text-[#16f2b3] mb-2 block transition-colors duration-300">
                Your Email
              </label>
              <input
                className="bg-[#10172d] w-full border-2 border-[#353a52] rounded-lg focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-white placeholder-[#7a8599] hover:border-[#16f2b3]/50"
                type="email"
                maxLength="100"
                required={true}
                placeholder="your.email@example.com"
                value={userInput.email}
                onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                onBlur={() => {
                  checkRequired();
                  setError({ ...error, email: !isValidEmail(userInput.email) });
                }}
              />
              {error.email && (
                <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                  ⚠️ Please provide a valid email!
                </p>
              )}
            </div>

            <div className="group">
              <label className="text-base font-semibold text-[#16f2b3] mb-2 block transition-colors duration-300">
                Your Message
              </label>
              <textarea
                className="bg-[#10172d] w-full border-2 border-[#353a52] rounded-lg focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-white placeholder-[#7a8599] hover:border-[#16f2b3]/50 resize-none"
                maxLength="500"
                name="message"
                rows="4"
                required={true}
                placeholder="Tell me about your project or inquiry..."
                onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
                onBlur={checkRequired}
                value={userInput.message}
              />
              <p className="text-xs text-[#7a8599] mt-1">
                {userInput.message.length}/500 characters
              </p>
            </div>

            {error.required && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                ⚠️ Please fill in all required fields
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 disabled:from-pink-500/50 disabled:to-violet-600/50 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <MdSend className="group-hover:translate-x-1 transition-transform" size={20} />
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;