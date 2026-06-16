import { Link } from 'react-router-dom';
import './styles.css';
import ImgPaginaIncial from '../../assets/FotoPaginaInicial.png';
import Servicos from '../../components/Servicos';


export default function Home() {

  const token = localStorage.getItem('@BigodesToken') || 'visitante';

  return (
    <div className="home-container">
      
   
      <section className="intro-section">
        <div className="intro-text">
          <h1>Cuidado veterinário completo para o seu melhor amigo!</h1>
          <p>
           Desde 2005, a Clínica Veterinária Bigodes & Patinhas combina tradição, tecnologia, amor e carinho no atendimento de cães, gatos e animais silvestres.
          </p>

          {(token === 'visitante') && (
          <Link to="/login" className="bnt-intro">Acessar o Sistema</Link>
          )}

          {(token === 'atendente') && (
            <>
          <Link to="/cadastrar-pet" className="bnt-intro">Cadastrar PET</Link>
          <Link to="/cadastrar-tutor" className="bnt-intro">Cadastrar Tutor</Link>
            </>
          )}

          {(token === 'veterinario') && (
          <Link to="/agenda" className="bnt-intro">Acessar atendimentos</Link>
          )}

          {(token === 'cliente') && (
          <Link to="/agenda" className="bnt-intro">Agendar Atendimento</Link>
          )}


        </div>
        
        <div className="intro-image-box">
          <div className="placeholder-image">
             <img src={ImgPaginaIncial} alt="PETS pagina Inicial" className="FotoPGIncicial" />
          </div>
        </div>
      </section>

      <Servicos/>

    </div>
  );
}