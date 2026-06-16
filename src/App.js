import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Login from './pages/Login';
import Home from './pages/Home';
import Tutores from './pages/Tutores';
import Pets from './pages/Pets';
import Agenda from './pages/Agenda';
import Atendimento from './pages/Atendimento';
import HistoricoAgendamentos from './pages/HistoricoAgendamentos';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import Perfil from './pages/Perfil';
import CadastroPet from './pages/CadastroPet';
import CadastroTutor from './pages/CadastroTutor';
import PerfilTutor from './pages/PerfilTutor';
import PerfilPet from './pages/PerfilPet';


function App() {
  return (

    
    <BrowserRouter>

      <Navbar />
      <Routes>
  
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

    
        <Route path="/tutores" element={<Tutores />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/cadastrar-pet" element={<CadastroPet />} />
        <Route path="/cadastrar-tutor" element={<CadastroTutor />} />

  
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil-tutor/:id" element={<PerfilTutor />} />
        <Route path="/perfil-pet/:id" element={<PerfilPet />} />


  
        <Route path="/atendimento/:petId" element={<Atendimento />} />
        

        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/configuracoes" element={<Configuracoes />} />


        <Route path="/historico-agendamentos" element={<HistoricoAgendamentos />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;