import '../styles/CreateProduct.css';
import { useState } from 'react';
import axios from 'axios';
import { getPassword, getUser } from '../helpers/Utils';
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
    
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(name === "") {
            window.alert("É preciso digitar um nome para o produto");
            return;
        }

        if(price === "") {
            window.alert("É preciso digitar um preço para o produto");
            return;
        }

        if(description === "") {
            window.alert("É preciso digitar uma descriçao para o produto");
            return;
        }

        if(!selectedImage) {
            window.alert("É preciso selecionar uma imagem para o produto");
            return;
        }

        const formData = new FormData();
        formData.append('nome', name);
        formData.append('preco', price);
        formData.append('descricao', description);
        formData.append('img', selectedImage);

        axios({
            method: 'post',
            url: 'https://productifes-dispmoveisbsi.b4a.run/criar_produto.php',
            data: formData,
            auth: {
                username: getUser(),
                password: getPassword()
            },
            headers: { "Content-Type": "multipart/form-data"}
        }).then((response) => {
            if(response.data["sucesso"] == 1) {
                window.alert("Produto criado com sucesso");
                navigator('/');
            }
            else {
                window.alert("Erro ao cadastrar produto: \n" + response.data["erro"]);
            }
        });
    };

    return (
        <div className="page">
            <form onSubmit={handleSubmit}>
                {selectedImage  && (
                    <img 
                    width={"300px"}
                    src={URL.createObjectURL(selectedImage)}
                />
                )}
                
                <input
                    type="file"
                    className="input"
                    name="image"
                    accept="image/png, image/gif, image/jpeg"
                    placeholder="Digite o nome do produto"
                    onChange={(e) => {
                        setSelectedImage(e.target.files[0]);
                    }}
                />
                <input
                    type="text"
                    className="input"
                    name="name"
                    value={name}
                    placeholder="Digite o nome do produto"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    className="input"
                    name="price"
                    value={price}
                    placeholder="Digite o preço do produto"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    className="input"
                    name="description"
                    value={description}
                    placeholder="Digite a descrição do produto"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    type="submit"
                    className="button"
                >
                    Criar Produto
                </button>
            </form>
        </div>
    );
}
