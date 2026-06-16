import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartBar, FaCalendarCheck, FaPaw, FaNotesMedical, FaSyringe,
  FaLock, FaArrowLeft, FaFilter, FaChartPie
} from 'react-icons/fa';
import './styles.css';

export default function Relatorios() {
  const token = localStorage.getItem('@BigodesToken') || 'visitante';
  const [mesFiltro, setMesFiltro] = useState('Junho / 2026');

  if (token !== 'gestor') {
    return (
      <div className="relatorios-bloqueados-container">
        <div className="lock-circle-relatorios"><FaLock /></div>
        <h2>Acesso Negado à Gestão</h2>
        <p>Apenas usuários com credenciais de **Gestor Geral** podem visualizar os relatórios estatísticos.</p>
        <Link to="/agenda" className="btn-voltar-relatorios"><FaArrowLeft /> Ir para a Agenda</Link>
      </div>
    );
  }

  const metricasGerais = {
    totalAtendimentos: 120,
    mediaDiaria: 5,
    totalVacinas: 45,
    especiePrincipal: 'Cachorros (54%)'
  };

  const tiposPets = [
    { nome: 'Cachorros', quantidade: 65, porcentagem: 54 },
    { nome: 'Gatos', quantidade: 40, porcentagem: 33 },
    { nome: 'Roedores', quantidade: 10, porcentagem: 8 },
    { nome: 'Aves', quantidade: 5, porcentagem: 5 },
  ];

  const motivosConsulta = [
    { nome: 'Vacinação', quantidade: 45, porcentagem: 37 },
    { nome: 'Clínico Geral', quantidade: 35, porcentagem: 29 },
    { nome: 'Retorno', quantidade: 20, porcentagem: 17 },
    { nome: 'Castração', quantidade: 10, porcentagem: 8 },
    { nome: 'Saúde Bucal', quantidade: 10, porcentagem: 8 },
  ];

  const vacinasAplicadas = [
    { nome: 'Múltipla Canina (V10 / V8)', quantidade: 20, porcentagem: 44 },
    { nome: 'Antirrábica', quantidade: 15, porcentagem: 33 },
    { nome: 'Múltipla Felina (V5 / V4)', quantidade: 7, porcentagem: 15 },
    { nome: 'Gripe Canina / Tosse', quantidade: 3, porcentagem: 8 },
  ];

  return (
    <div className="dashboard-container">
      
      {/* Cabeçalho */}
      <div className="dashboard-header-box">
        <div className="dashboard-titulo">
          <FaChartBar className="icon-dashboard-principal" />
          <div>
            <h2>Relatórios de Atendimento</h2>
            <p>Estatísticas de consultas, perfil dos pacientes e vacinação.</p>
          </div>
        </div>

        <div className="filtro-periodo-dashboard">
          <FaFilter className="icon-filtro-dash" />
          <select value={mesFiltro} onChange={(e) => setMesFiltro(e.target.value)}>
            <option value="Junho / 2026">Junho / 2026</option>
            <option value="Maio / 2026">Maio / 2026</option>
            <option value="Abril / 2026">Abril / 2026</option>
          </select>
        </div>
      </div>

      <div className="dashboard-kpi-grid">
        <div className="kpi-card total-atendimentos">
          <div className="kpi-info">
            <span>Total de Consultas</span>
            <h3>{metricasGerais.totalAtendimentos}</h3>
          </div>
          <div className="kpi-icon-box"><FaCalendarCheck /></div>
        </div>

        <div className="kpi-card media-diaria">
          <div className="kpi-info">
            <span>Média Diária de Atendimentos</span>
            <h3>{metricasGerais.mediaDiaria}</h3>
          </div>
          <div className="kpi-icon-box"><FaChartPie /></div>
        </div>

        <div className="kpi-card total-vacinas">
          <div className="kpi-info">
            <span>Total de Vacinas Aplicadas</span>
            <h3>{metricasGerais.totalVacinas}</h3>
          </div>
          <div className="kpi-icon-box"><FaSyringe /></div>
        </div>

        <div className="kpi-card especie-top">
          <div className="kpi-info">
            <span>Espécie Mais Atendida</span>
            <h3>{metricasGerais.especiePrincipal.split(' ')[0]}</h3>
          </div>
          <div className="kpi-icon-box"><FaPaw /></div>
        </div>
      </div>

      <div className="dashboard-charts-layout">
        
        {/* Gráfico 1: Tipos de PETs */}
        <div className="chart-card-box">
          <h3><FaPaw className="icone-azul" /> Tipos de Pets Mais Atendidos</h3>
          <p className="sub-legend-chart">Volume de animais que passaram pela clínica.</p>
          <div className="chart-pure-css-list">
            {tiposPets.map((item, idx) => (
              <div key={idx} className="bar-progress-group">
                <div className="bar-labels">
                  <strong>{item.nome}</strong>
                  <span className="txt-volumetria">{item.quantidade} pets ({item.porcentagem}%)</span>
                </div>
                <div className="bar-track-bg">
                  <div className="bar-fill-color azul" style={{ width: `${item.porcentagem}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card-box">
          <h3><FaNotesMedical className="icone-verde" /> Motivos de Consulta Recorrentes</h3>
          <p className="sub-legend-chart">Procedimentos e justificativas das marcações.</p>
          <div className="chart-pure-css-list">
            {motivosConsulta.map((item, idx) => (
              <div key={idx} className="bar-progress-group">
                <div className="bar-labels">
                  <strong>{item.nome}</strong>
                  <span className="txt-volumetria">{item.quantidade}x ({item.porcentagem}%)</span>
                </div>
                <div className="bar-track-bg">
                  <div className="bar-fill-color verde" style={{ width: `${item.porcentagem}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card-box linha-inteira">
          <h3><FaSyringe className="icone-roxo" /> Ranking de Vacinas Mais Aplicadas</h3>
          <p className="sub-legend-chart">Detalhamento dos imunizantes administrados no período.</p>
          <div className="chart-pure-css-list duas-colunas">
            {vacinasAplicadas.map((item, idx) => (
              <div key={idx} className="bar-progress-group">
                <div className="bar-labels">
                  <strong>{item.nome}</strong>
                  <span className="txt-volumetria">{item.quantidade} doses</span>
                </div>
                <div className="bar-track-bg">
                  <div className="bar-fill-color roxo" style={{ width: `${item.porcentagem}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}