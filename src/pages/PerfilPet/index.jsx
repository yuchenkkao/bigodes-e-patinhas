import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import FichaPet from '../../ui/partials/PerfilPet/FichaPet';
import ProntuarioPet from '../../ui/partials/PerfilPet/ProntuarioPet';
import ModalCarteirinha from '../../ui/partials/PerfilPet/ModalCarteirinha';

import './styles.css';
import { useAuth } from '../../data/hooks/useAuth';
import { usePet } from '../../data/hooks/usePets';
import { useVacinas } from '../../data/hooks/useVacinas';
import { useProntuario } from '../../data/hooks/useAtendimento';

export default function PerfilPet() {
  const { id } = useParams();
  const { papel: token } = useAuth();
  const { pet } = usePet(id);
  const [mostrarCarteirinha, setMostrarCarteirinha] = useState(false);

  const { vacinas, adicionarVacina } = useVacinas(id);
  const { historico: historicoClinico } = useProntuario(id);

  if (!pet) {
    return (
      <div className="perfil-erro-container">
        <h2>Paciente não localizado</h2>
        <Link to="/pets" className="btn-voltar-link"><FaArrowLeft /> Voltar ao Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="perfil-pet-container">
      <div className="back-link-container">
        <Link to="/pets" className="btn-voltar-link"><FaArrowLeft /> Voltar para Pets</Link>
      </div>

      <div className="perfil-pet-layout">
        <FichaPet pet={pet} onAbrirCarteirinha={() => setMostrarCarteirinha(true)} />
        <ProntuarioPet token={token} historico={historicoClinico} />
      </div>

      <ModalCarteirinha
        isOpen={mostrarCarteirinha}
        onClose={() => setMostrarCarteirinha(false)}
        nome={pet.nome}
        vacinas={vacinas}
        onAdicionarVacina={adicionarVacina}
      />
    </div>
  );
}