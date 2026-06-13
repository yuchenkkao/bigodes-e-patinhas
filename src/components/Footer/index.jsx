import './styles.css';
import logoImg from '../../assets/NavbarLogo.png';
import { FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
  
        <div className="footer-brand">
          <img src={logoImg} alt="Logotipo Bigodes e Patinhas" className="footer-logo" />
        </div>


        <div className="footer-contacts">
          <h3>Fale Conosco</h3>
          <p><FaWhatsapp className="footer-icon"/> (45) 99999-9999</p>
          <p><FaEnvelope className="footer-icon"/> contato@bigodesepatinhas.com</p>
          <p><FaMapMarkerAlt className="footer-icon"/> Av. das Cataratas, 1234 - Foz do Iguaçu, PR</p>
        </div>

        <div className="footer-social">
          <h3>Acompanhe as nossas redes sociais</h3>
          <div className="social-icons">
            <p><FaInstagram /> bigodesepatinhas</p>
            <p><FaFacebook /> Bigodes e Patinhas</p>
          </div>
        </div>

      </div>


      <div className="footer-bottom">
        <p>&copy; 2026 Bigodes & Patinhas. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}