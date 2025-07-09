import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Footer.css'; // Vamos alterar este arquivo também

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-contato">
      <div className="copyright-text">
        <p>&copy; {currentYear} - Direitos reservados aos alunos do Capacita Brasil.</p>
      </div>
      <div className="social-links">
        <a 
          href="https://www.instagram.com/feira-solidaria" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Link para o Instagram"
          className="social-icon"
        >
          <FaInstagram size={28} />
        </a>
        <a 
          href="https://wa.me/5500999999999"
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Link para o WhatsApp"
          className="social-icon"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;