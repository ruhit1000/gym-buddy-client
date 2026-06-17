import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t border-border pt-16 pb-8 px-6 md:px-12 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Column 1: Brand Logo & Description */}
        <div className="space-y-4">
          <span className="font-heading font-black text-3xl tracking-wider text-brand transition-colors duration-300 select-none">
            GYM BUDDY
          </span>
          <p className="text-sm text-foreground/70 max-w-xs leading-relaxed">
            Leading the charge in professional-grade fitness. We provide the
            tools, you provide the sweat. Together we achieve the impossible.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:text-brand hover:border-brand transition-all duration-200"
            >
              <BsTwitterX className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:text-brand hover:border-brand transition-all duration-200"
            >
              <AiOutlineYoutube className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:text-brand hover:border-brand transition-all duration-200"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-brand mb-4 transition-colors duration-300">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/"
                className="text-foreground/70 hover:text-brand transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/classes"
                className="text-foreground/70 hover:text-brand transition-colors"
              >
                All Classes
              </Link>
            </li>
            <li>
              <Link
                href="/forum"
                className="text-foreground/70 hover:text-brand transition-colors"
              >
                Community Forum
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Support / Legal links from image reference */}
        <div>
          <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-brand mb-4 transition-colors duration-300">
            Support & Legal
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/help"
                className="text-foreground/70 hover:text-brand transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-foreground/70 hover:text-brand transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-foreground/70 hover:text-brand transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Information */}
        <div>
          <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-brand mb-4 transition-colors duration-300">
            Contact Info
          </h4>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-brand shrink-0" />
              <span>123 Performance Way, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-brand shrink-0" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-brand shrink-0" />
              <span>support@ironpulse.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Lower Copyright Area */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-border text-center text-xs text-foreground/50 tracking-wide transition-colors duration-300">
        <p>&copy; {currentYear} IRON PULSE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;
