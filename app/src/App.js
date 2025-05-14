import './App.css';
import Riga from './Riga.js';
import {useState} from 'react';

function App() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(false);

  async function caricaAlunni () {
    setLoading(true);
    const response = await fetch("http://localhost:8080/alunni", {method:"GET"});
    const data = await response.json();
    setLoading(false);
    setAlunni(data);
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
    </div>
  );
}

export default App;