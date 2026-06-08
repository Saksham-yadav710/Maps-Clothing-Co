import { Link } from "react-router-dom";
import { footerData } from "../../assets/assets";
import logoImg from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="gradient-footer text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center mb-5">
              <img
                src={logoImg}
                alt="MAPS Clothing Co."
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/55 leading-relaxed mb-6 max-w-xs">
              {footerData.brand.description}
            </p>
            <div className="flex gap-2.5">
              {footerData.brand.socials.map((social, i) => (
                <a
                  aria-label="social-media icons"
                  key={i}
                  href={social.link}
                  className="size-9 rounded-xl bg-white/8 border border-white/10 flex-center hover:bg-gold/20 hover:border-gold/40 transition-all"
                >
                  <social.icon className="size-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic sections */}
          {footerData.sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3.5">
              {footerData.contact.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex gap-3 text-sm text-white/50">
                    <Icon className="size-4 text-gold shrink-0 mt-0.5" />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8" />

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 tracking-wide">
            © {new Date().getFullYear()} MAPS Clothing Co. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-gold animate-pulse-soft" />
            <span className="text-xs text-white/30">Crafted with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
