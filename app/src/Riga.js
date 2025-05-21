import { useState } from "react";

export default function Riga(props) {
    const alunno = props.alunno;

    const [conferma, setConferma] = useState();
    const [mostraModifica, setMostraModifica] = useState(false);
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    
    function mostraConferma() {
        setConferma(!conferma);
    }
    async function cancellaAlunno(id) {
        const response = await fetch("http://localhost:8080/alunni/" + id, {method: "DELETE"});
        console.log(response);
        setConferma(!conferma);
        props.onCancella()
    }

    function prepFormModifica() {
        setMostraModifica(!mostraModifica);
    }

    async function salvaModifiche() {
        const response = await fetch(`http://localhost:8080/alunni/${document.getElementsByName("id")[0].value}`, {method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({nome: nome, cognome: cognome})});
        console.log(response);
        setMostraModifica(false);
        props.onCancella();
    }

    return (
        <tr>{
        mostraModifica ? (
                    <>
                    <td>{alunno.id}
                        <input name="id" id="id" value={alunno.id} type="hidden" ></input>
                    </td>
                    <td><input name="nome" id="nome" onChange={(event) => setNome(event.target.value)}/></td>
                    <td><input name="cognome" id="cognome" onChange={(event) => setCognome(event.target.value)}/></td>
                    </>) 
                    :
                    (<><td>{alunno.id}</td>
                    <td>{alunno.nome}</td>
                    <td>{alunno.cognome}</td></>)
            }
            
            <td>
                {
                !mostraModifica ? (
                    <>
                        <button onClick={prepFormModifica}>modifica</button>
                    </>
                )
                :
                (<>
                    <button onClick={salvaModifiche}>Conferma</button>
                    <button onClick={prepFormModifica}>annulla</button>
                </>)
                }
                {
                    !mostraModifica && (<> {
                    !conferma ? 
                    <button onClick={mostraConferma}>cancella</button>
                    :
                    (<>
                    <span>sicuro?</span>
                    <button onClick={() => cancellaAlunno(alunno.id)}>sì</button>
                    <button onClick={mostraConferma}>no</button></>)}</>)
                }
            </td>
        </tr>
    )
}