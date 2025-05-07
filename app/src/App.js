import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [alunni, setAlunni] = useState([]);
  function gestisciClick () {
    const a = 
  }
  return (
    <div className="App">
      {
        alunni.length === 0 ?
        (<button onClick={gestisciClick}>carica alunni</button>):
        (<div>ciao</div>)
      }
    </div>
  );
}

export default App;
