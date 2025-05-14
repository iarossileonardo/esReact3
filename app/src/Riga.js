import { useState } from "react";

export default function Riga(props) {
    const alunno = props.alunno;

    const [conferma, setConferma] = useState();

    function mostraConferma() {
        setConferma(!conferma);
    }
    async function cancellaAlunno(id) {
        const response = await fetch("http://localhost:8080/alunni/" + id, {method: "DELETE"});
        console.log(response);
        setConferma(!conferma);
        props.onCancella()
    }

    return (
        <tr>
            <td>{alunno.id}</td>
            <td>{alunno.nome}</td>
            <td>{alunno.cognome}</td>
            <td>
                {
                    !conferma ? 
                    <button onClick={mostraConferma}>cancella</button>
                    :
                    (<>
                    <span>sicuro?</span>
                    <button onClick={() => cancellaAlunno(alunno.id)}>sì</button>
                    <button onClick={mostraConferma}>no</button></>)
                }
            </td>
        </tr>
    )
}