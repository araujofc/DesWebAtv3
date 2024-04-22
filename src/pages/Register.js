import '../styles/register.css';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordAgain, setUserPasswordAgain] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(userName === "") {
            window.alert("É preciso digitar um nome de usuário");
            return;
        }

        if(userPassword === "") {
            window.alert("É preciso digitar uma senha válida");
            return;
        }

        if(userPassword != userPasswordAgain) {
            window.alert("Campos de senha não batem");
            return;
        }

        let data = {
            novo_login : userName,
            nova_senha : userPassword
        };

        await axios.post('https://productifes-dispmoveisbsi.b4a.run/registrar.php',
            data,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).then((response) => {
            if(response.data["sucesso"] == 1) {
                window.alert("Usuário registrado com sucesso!");
            }
            else {
                window.alert("Erro ao registrar usuário: \n" + response.data["erro"]);
            }
        });
    };

    return (
        <div className="page">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"
                    name="userName"
                    value={userName}
                    placeholder="Nome de Usuário"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    className="input"
                    name="userPassword"
                    value={userPassword}
                    placeholder="Senha"
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="input"
                    name="userPasswordAgain"
                    value={userPasswordAgain}
                    placeholder="Senha Novamente"
                    onChange={(e) => setUserPasswordAgain(e.target.value)}
                />
                <button
                    type="submit"
                    className="button"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
