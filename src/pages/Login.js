import '../styles/login.css';
import { useState } from 'react';
import axios from 'axios';
import { login } from '../helpers/Utils';

export default function Login({onLogin}) {

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

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

        axios(
            {
                method: 'post',
                url: 'https://productifes-dispmoveisbsi.b4a.run/login.php',
                auth: {
                    username: userName,
                    password: userPassword
                }
            }
        ).then((response) => {
            if(response.data["sucesso"] == 1) {
                login(userName, userPassword);
                onLogin(true);
            }
            else {
                window.alert("Erro ao autenticar usuário: \n" + response.data["erro"]);
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
                <button
                    type="submit"
                    className="button"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
