import './styles.css';

import { FaTooth, FaBacterium, FaHandHoldingMedical, FaHospitalAlt, FaStethoscope, FaFileMedical } from "react-icons/fa";
import { FaMicrochip, FaUserDoctor } from "react-icons/fa6";
import { RiAlarmWarningFill } from "react-icons/ri";
import { MdVaccines } from "react-icons/md";

function ServicoCard({ Icone, titulo, descricao }) {
  return (
    <div className="servico-card">
      <div className="bola-icone">
        <Icone className="servico-icon" />
      </div>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}


export default function Servicos() {
  
  const listaServicos = [
    {
      id: 1,
      Icone: FaFileMedical,
      titulo: 'Atestado para Viagens',
      descricao: 'O atestado é um documento emitido pelo veterinário que permite que você leve seu pet em suas viagens, comprovando que ele suportará o trajeto sem prejudicar a saúde.'
    },
    {
      id: 2,
      Icone: MdVaccines,
      titulo: 'Vacinação',
      descricao: 'As vacinas ajudam a proteger o seu pet de uma grande gama de doenças, pois aplicamos produtos de alta qualidade, cientificamente comprovados, aliados a adequada conservação e meios de aplicação corretos por nossos veterinários.'
    },
    {
      id: 3,
      Icone: FaUserDoctor,
      titulo: 'Clínico Geral',
      descricao: 'Um clínico geral é um médico que fornece cuidados de rotina para uma variedade de animais e pode diagnosticar e prescrever tratamentos para uma ampla gama de problemas.'
    },
    {
      id: 4,
      Icone: FaStethoscope,
      titulo: 'Cirurgias',
      descricao: 'Com uma estrutura física desenhada para cirurgias gerais e especiais, o centro cirúrgico atende plenamente às normas de segurança, com sala de lavagem e esterilização.'
    },
    {
      id: 5,
      Icone: RiAlarmWarningFill,
      titulo: 'Emergências',
      descricao: 'Uma emergência de animal de estimação pode ser assustadora para qualquer tutor. Por isso é importante estar preparado e saber como enfrentar tal situação. Contamos com veterinários treinados em medicina de emergência.'
    },
    {
      id: 6,
      Icone: FaHospitalAlt,
      titulo: 'Hospitalização',
      descricao: 'O serviço de hospitalização funciona 24 horas por dia, sob a supervisão de veterinários e pessoal de apoio. O nosso internamento funciona em conjunto com o apoio diagnóstico laboratorial e de imagem, para desta forma, oferecer melhor segurança e rapidez na recuperação dos pacientes.'
    },
    {
      id: 7,
      Icone: FaHandHoldingMedical,
      titulo: 'Medicina Preventiva',
      descricao: 'Existem muitos motivos para levar seu pet ao veterinário, não apenas se ele estiver doente. As consultas periódicas são importantes para o bem-estar geral dos animais, incluindo exames regulares.'
    },
    {
      id: 8,
      Icone: FaMicrochip,
      titulo: 'Microchipagem',
      descricao: 'Processo de implantação de um pequeno chip sob a pele de um animal. Esses chips têm o tamanho de um grão de arroz e não funcionam como um localizador, eles armazenam dados e informações do tutor do pet, por exemplo.'
    },
    {
      id: 9,
      Icone: FaBacterium,
      titulo: 'Quimioterapia',
      descricao: 'A quimioterapia é um tipo de tratamento contra o câncer que mata as células cancerosas. Existem muitos tipos diferentes de quimioterapia que afetam diferentes partes do corpo e atuam de maneiras diferentes. A escolha da substância será definida pelo médico veterinário de acordo com o tipo de câncer enfrentado pelo animal.'
    },
    {
      id: 10,
      Icone: FaTooth,
      titulo: 'Saúde bucal',
      descricao: 'A saúde bucal refere-se aos dentes, gengivas e a língua. As partes principais da saúde bucal nos animais envolvem problemas gengivais como o tártaro e doenças periodontais. A saúde bucal do seu animal de estimação é vital para seu bem-estar geral e qualidade de vida.'
    }
  ];

  return (
    <section className="servicos-section">
      <h2>Conheça nossos serviços!</h2>
      
      <div className="cards-container">
        {listaServicos.map((servico) => (
          <ServicoCard 
            key={servico.id}
            Icone={servico.Icone}
            titulo={servico.titulo}
            descricao={servico.descricao}
          />
        ))}
      </div>
    </section> 
  );
}