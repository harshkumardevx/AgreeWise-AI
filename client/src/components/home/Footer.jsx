import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import {
  ShieldCheck,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-(--brand-gold)/8 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20">

        {/* Top */}

        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-(--brand-gold) p-3">

                <ShieldCheck className="text-black" />

              </div>

              <div>

                <h2 className="font-display text-2xl font-semibold text-white">
                  AgreeWise AI
                </h2>

                <p className="text-sm text-white/40">
                  Universal Agreement Reader
                </p>

              </div>

            </div>

            <p className="mt-6 max-w-sm leading-8 text-white/50">

              Upload agreements, understand legal clauses,
              detect risks and receive AI-powered insights
              within seconds.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-6 font-semibold text-white">
              Product
            </h3>

            <div className="space-y-4">

              <a
                href="#features"
                className="block text-white/50 transition hover:text-(--brand-gold-soft)"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="block text-white/50 transition hover:text-(--brand-gold-soft)"
              >
                How It Works
              </a>

              <a
                href="#faq"
                className="block text-white/50 transition hover:text-(--brand-gold-soft)"
              >
                FAQ
              </a>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 font-semibold text-white">
              Company
            </h3>

            <div className="space-y-4">

              <Link
                to="/login"
                className="block text-white/50 transition hover:text-(--brand-gold-soft)"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="block text-white/50 transition hover:text-(--brand-gold-soft)"
              >
                Signup
              </Link>

              <Link
                to="/dashboard"
                className="block text-white/50 transition hover:text-(--brand-gold-soft)"
              >
                Dashboard
              </Link>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="mb-6 font-semibold text-white">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-(--brand-gold)/50 hover:bg-(--brand-gold)/10"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-(--brand-gold)/50 hover:bg-(--brand-gold)/10"
              >
                <FaLinkedin size={20} />
              </a>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-14 h-px bg-linear-to-r from-transparent via-(--brand-gold)/20 to-transparent" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-6 pb-10 md:flex-row">

          <p className="text-sm text-white/40">

            © {new Date().getFullYear()} AgreeWise AI.
            All rights reserved.

          </p>

          <div className="flex items-center gap-8">

            <Link
              to="/privacy"
              className="text-sm text-white/40 transition hover:text-(--brand-gold-soft)"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-sm text-white/40 transition hover:text-(--brand-gold-soft)"
            >
              Terms of Service
            </Link>

          </div>

          <button
            onClick={scrollTop}
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              p-3
              transition-all
              hover:-translate-y-1
              hover:border-(--brand-gold)/50
              hover:bg-(--brand-gold)/10
            "
          >
            <ArrowUp size={18} />
          </button>

        </div>

      </div>

    </footer>
  );
}