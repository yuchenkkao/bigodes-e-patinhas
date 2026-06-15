import './styles.css';

import { FaTooth } from "react-icons/fa";
import { FaBacterium } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa6";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaHospitalAlt } from "react-icons/fa";
import { RiAlarmWarningFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { FaStethoscope } from "react-icons/fa";
import { MdVaccines } from "react-icons/md";
import { FaFileMedical } from "react-icons/fa";
 
 export default function Servicos() {

        return (

        <section className="servicos-section">
        <h2>Conheça nossos serviços!</h2>
        
        <div className="cards-container">
          <div className="servico-card">
            <div className="bola-icone"><FaFileMedical className="servico-icon" /></div>
            <h3>Atestado para Viagens</h3>
            <p>O atestado é um documento emitido pelo veterinário que permite que você leve seu pet em suas viagens, comprovando que ele suportará o trajeto sem prejudicar a saúde.</p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><MdVaccines className="servico-icon" /></div>
            <h3>Vacinação</h3>
            <p>As vacinas ajudam a proteger o seu pet de uma grande gama de doenças, pois aplicamos produtos de alta qualidade, cientificamente comprovados, aliados a adequada conservação e meios de aplicação corretos por nossos veterinários.</p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><FaUserDoctor className="servico-icon" /></div>
            <h3>Clínico Geral</h3>
            <p>Um clínico geral é um médico que fornece cuidados de rotina para uma variedade de animais e pode diagnosticar e prescrever tratamentos para uma ampla gama de problemas.</p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><FaStethoscope className="servico-icon" /></div>
            <h3>Cirurgias</h3>
            <p>Com uma estrutura física desenhada para cirurgias gerais e especiais, o centro cirúrgico atende plenamente às normas de segurança, com sala de lavagem e esterilização.</p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><RiAlarmWarningFill className="servico-icon" /></div>
            <h3>Emergências</h3>
            <p>Uma emergência de animal de estimação pode ser assustadora para qualquer tutor. Por isso é importante estar preparado e saber como enfrentar tal situação. Contamos com veterinários treinados em medicina de emergência.</p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><FaHospitalAlt className="servico-icon" /></div>
            <h3>Hospitalização</h3>
            <p>O serviço de hospitalização funciona 24 horas por dia, sob a supervisão de veterinários e pessoal de apoio. O nosso internamento funciona em conjunto com o apoio diagnóstico laboratorial e de imagem, para desta forma, oferecer melhor segurança e rapidez na recuperação dos pacientes.</p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><FaHandHoldingMedical className="servico-icon" /></div>
            <h3>Medicina Preventiva</h3>
            <p>Existem muitos motivos para levar seu pet ao veterinário, não apenas se ele estiver doente. As consultas periódicas são importantes para o bem-estar geral dos animais, incluindo exames regulares.</p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><FaMicrochip className="servico-icon" /></div>
            <h3>Microchipagem</h3>
            <p>Processo de implantação de um pequeno chip sob a pele de um animal. Esses chips têm o tamanho de um grão de arroz e não funcionam como um localizador, eles armazenam dados e informações do tutor do pet, por exemplo. </p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><FaBacterium className="servico-icon" /></div>
            <h3>Quimioterapia</h3>
            <p>A quimioterapia é um tipo de tratamento contra o câncer que mata as células cancerosas. Existem muitos tipos diferentes de quimioterapia que afetam diferentes partes do corpo e atuam de maneiras diferentes. A escolha da substância será definida pelo médico veterinário de acordo com o tipo de câncer enfrentado pelo animal.</p>
          </div>

          <div className="servico-card">
            <div className="bola-icone"><FaTooth  className="servico-icon" /></div>
            <h3>Saúde bucal</h3>
            <p>A saúde bucal refere-se aos dentes, gengivas e a língua. As partes principais da saúde bucal nos animais envolvem problemas gengivais como o tártaro e doenças periodontais. A saúde bucal do seu animal de estimação é vital para seu bem-estar geral e qualidade de vida. </p>
          </div>
        </div>
      </section> 
      );
 }