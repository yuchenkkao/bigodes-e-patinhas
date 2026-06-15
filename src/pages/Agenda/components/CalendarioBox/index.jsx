import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

export default function CalendarioBox({ dataSelecionada, aoMudarData }) {
  return (
    <div className="calendario-box">
      <Calendar 
        onChange={aoMudarData} 
        value={dataSelecionada} 
        minDate={new Date()} 
        className="calendario-customizado"
      />
    </div>
  );
}