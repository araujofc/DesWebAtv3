import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`https://productifes-dispmoveisbsi.b4a.run/pegar_detalhes_produto?id=${productId}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Erro ao obter detalhes do produto:", error);
            });
    }, [productId]);

    return (
        <div>
            {product && (
                <div className="product-details">
                    <h2>{product.nome}</h2>
                    <p>Preço: {product.preco}</p>
                    <p>Descrição: {product.descricao}</p>
                    <p>Criado por: {product.criado_por}</p>
                    <img src={product.img} alt={product.nome} />
                </div>
            )}
        </div>
    );
}
