import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import { getPassword, getUser } from "../helpers/Utils";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Home({ itensPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itensCount, setItensCount] = useState(1);
    const history = useNavigate();

    const handlePageClick = (event) => {
        const newOffset = event.selected * itensPerPage % itensCount;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://productifes-dispmoveisbsi.b4a.run/pegar_produtos.php',
            params: {
                limit: itensPerPage,
                offset: itemOffset
            },
            auth: {
                username: getUser(),
                password: getPassword()
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
            if (response.data["sucesso"] === 1) {
                setCurrentItems(response.data["produtos"]);
                let qtde_produtos = response.data["qtde_produtos"];
                setItensCount(qtde_produtos);
                setPageCount(Math.ceil(qtde_produtos / itensPerPage));
            } else {
                window.alert("Erro ao obter lista de produtos: \n" + response.data["erro"]);
            }
        });
    }, [itemOffset, itensPerPage]);

    const handleProductClick = (productId) => {
        history(`/productDetail/${productId}`);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 0,
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
        }}>
            <Items currentItems={currentItems} onItemClick={handleProductClick} />
            <ReactPaginate
                nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 150 }} />}
                pageClassName="item pagination-page"
                pageLinkClassName="item"
                previousClassName="item previous"
                previousLinkClassName="item"
                nextClassName="item next"
                nextLinkClassName="item"
                breakLabel="..."
                breakClassName="item break-me"
                breakLinkClassName="item"
                containerClassName="pagination"
                activeClassName="item active "
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

function Items({ currentItems, onItemClick }) {
    return (
        <div style={{ margin: "auto" }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {currentItems && currentItems.map((item) => (
                    <ProductItem key={item.id} item={item} onClick={() => onItemClick(item.id)} />
                ))}
            </List>
        </div>
    );
}
