import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Login from './pages/Login';
import Home from './pages/Home';
import Tutores from './pages/Tutores';
import Pets from './pages/Pets';
import Agenda from './pages/Agenda';
import Atendimento from './pages/Atendimento';
import MeusAgendamentos from './pages/MeusAgendamentos';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';


function App() {
  return (

    
    <BrowserRouter>

      <Navbar />
      <Routes>
        {/*Público*/}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/*Atendente*/}
        <Route path="/tutores" element={<Tutores />} />
        <Route path="/pets" element={<Pets />} />

        {/*Todos*/}
        <Route path="/agenda" element={<Agenda />} />

        {/*Veterinário*/}
        <Route path="/atendimento/:petId" element={<Atendimento />} />
        
        {/* Gestor */}
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/configuracoes" element={<Configuracoes />} />

        {/* Tutor */}
        <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;