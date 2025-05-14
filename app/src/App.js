import './App.css';
import Riga from './Riga.js';
import {useState} from 'react';

function App() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [mostraForm, setMostraForm] = useState(false);

  async function caricaAlunni () {
    setLoading(true);
    const response = await fetch("http://localhost:8080/alunni", {method:"GET"});
    const data = await response.json();
    setLoading(false);
    setAlunni(data);
  }

  async function aggiungiStudente() {
    const response = await fetch("http://localhost:8080/alunni", {method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({nome: nome, cognome: cognome})})
    console.log(response);
  }
  
  return (
    <div className="App">
      {
        loading && <div>caricamento in corso</div>
      }
      {
        !loading &&
        alunni.length === 0 ?
        (<button onClick={caricaAlunni}>carica alunni</button>)
        :
        (<table border="1">
          {
            alunni.map(alunno => 
              <Riga alunno={alunno} onCancella={caricaAlunni}/>
            )
          }
        </table>)
      }
      <br/>
      <button onClick={() => setMostraForm(!mostraForm)}>aggiungi studente</button>
      {
      mostraForm && 
      <div>
        <label htmlFor="nome">Nome</label>
        <input name='nome' id='nome' onChange={(event) => setNome(event.target.value)} /><br/>
        <label htmlFor="cognome">Cognome</label>
        <input name='cognome' id='cognome' onChange={(event) => setCognome(event.target.value)}/><br/>
        <button onClick={aggiungiStudente}>Aggiungi</button>
      </div>
      }
    </div>
  );
}

export default App;