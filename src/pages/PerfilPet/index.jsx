import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import FichaPet from './components/FichaPet';
import ProntuarioPet from './components/ProntuarioPet';
import ModalCarteirinha from './components/ModalCarteirinha';

import './styles.css';

export default function PerfilPet() {
  const { id } = useParams();
  const token = localStorage.getItem('@BigodesToken') || 'visitante';
  const [mostrarCarteirinha, setMostrarCarteirinha] = useState(false);

  const [vacinasMedicas, setVacinasMedicas] = useState({
    Cachorro: [
      { nome: 'Múltipla V10 (Dose 1)', data: '12/01/2025', lote: 'V10-984X', status: 'Aplicada' },
      { nome: 'Múltipla V10 (Dose 2)', data: '02/02/2025', lote: 'V10-112Y', status: 'Aplicada' },
      { nome: 'Antirrábica Anual', data: '12/01/2026', lote: 'ANT-0052', status: 'Aplicada' },
      { nome: 'Gripe Canina (Reforço)', data: '15/05/2026', lote: '---', status: 'Pendente' },
    ],
    Gato: [
      { nome: 'Quádrupla Felina V4 (Dose 1)', data: '10/05/2025', lote: 'V4-441A', status: 'Aplicada' },
      { nome: 'Quádrupla Felina V4 (Dose 2)', data: '31/05/2025', lote: 'V4-882B', status: 'Aplicada' },
      { nome: 'Antirrábica Anual', data: '15/06/2026', lote: 'ANT-0099', status: 'Aplicada' },
    ]
  });

  const handleAdicionarVacina = (especie, novaVacina) => {
    setVacinasMedicas((prev) => ({
      ...prev,
      [especie]: [...prev[especie], novaVacina]
    }));
  };

  const bancoPets = [
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Vira-lata (SRD)', idade: '2 anos', peso: '14.2', genero: 'Macho', tutor: 'Maria Silva' },
    { id: 2, nome: 'Mingau', especie: 'Gato', raca: 'Persa', idade: '1 ano', peso: '4.5', genero: 'Macho', tutor: 'Carlos Souza' },
    { id: 3, nome: 'Luna', especie: 'Cachorro', raca: 'Poodle', idade: '3 anos', peso: '6.2', genero: 'Fêmea', tutor: 'Ana Costa' },
    { id: 4, nome: 'Nikolas', especie: 'Cachorro', raca: 'Pinscher', idade: '5 meses', peso: '2.1', genero: 'Macho', tutor: 'Victor Ribeiro' },
  ];

  const [historicoClinico, setHistoricoClinico] = useState([
    { 
      id: 101, 
      data: '15/06/2026', 
      veterinario: 'Dra. Mariana', 
      motivo: 'Vacinação', // Mesmo da Agenda!
      pesoConsulta: '14.2',
      sinaisClinicos: 'Animal ativo, alerta, mucosas normocoradas, sem picos febris. Parâmetros cardiopulmonares normais.', 
      vacinaVermifugo: 'Aplicada Vacina V10 (Merial - Lote 548/25) e Vermífugo Drontal Plus (1 comp).',
      exames: 'Nenhum exame laboratorial solicitado nesta consulta.', 
      prescricoes: 'Reforço anual concluído com sucesso. Observar possíveis reações locais nas próximas 24 horas.' 
    },
    { 
      id: 102, 
      data: '02/05/2026', 
      veterinario: 'Dra. Mariana', 
      motivo: 'Clínico Geral', 
      pesoConsulta: '13.8',
      sinaisClinicos: 'Prurido intenso em região auricular bilateral, balançar de cabeça frequente, secreção enegrecida e odor forte nas orelhas.', 
      vacinaVermifugo: 'Vermifugação em dia (informado pelo tutor). Nenhuma vacina aplicada.',
      exames: 'Solicitado citologia de conduto auditivo para pesquisa de ácaros e fungos.', 
      prescricoes: 'Oto-Sana Limp: Limpeza a cada 48h. Posatex Gotas: Aplicar 6 gotas em cada conduto afetado, 1x ao dia por 10 dias.' 
    },
    { 
      id: 103, 
      data: '12/01/2026', 
      veterinario: 'Dr. Eduardo', 
      motivo: 'Saúde Bucal', 
      pesoConsulta: '13.5',
      sinaisClinicos: 'Halitose acentuada, presença de placa bacteriana e tártaro nos pré-molares superiores. Gengiva discretamente inflamada.', 
      vacinaVermifugo: 'Nenhum imunizante ou antiparasitário aplicado nesta data.',
      exames: 'Exames pré-operatórios solicitados: Hemograma completo + Creatinina e Ureia (Perfil Renal).', 
      prescricoes: 'Agendar procedimento de tartrectomia (limpeza de tártaro) assim que os resultados dos exames de sangue forem liberados.' 
    },
  ]);
  const pet = bancoPets.find((p) => p.id === Number(id));

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

      {/* 🌟 PROPS SINCRONIZADAS AQUI */}
      <ModalCarteirinha 
        isOpen={mostrarCarteirinha}
        onClose={() => setMostrarCarteirinha(false)}
        nome={pet.nome}
        especie={pet.especie}
        vacinas={vacinasMedicas[pet.especie] || []}
        onAdicionarVacina={(nova) => handleAdicionarVacina(pet.especie, nova)}
      />
    </div>
  );
}