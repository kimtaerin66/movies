import React,{useEffect,useState} from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

const Wrap = styled.div`
    margin-top: 70px;
    width: 100%;
    padding: 50px;
    min-width: 1200px;
    color: #fff;
`;
const Title = styled.h2`
    width: 90%;
    font-size: 22px;
    font-weight: 700;
    color: #e1e4e8;
    padding-bottom: 10px;
    padding-left: 15px;
    border-bottom: 1px solid rgba(205, 205, 205, 0.55);
`;
const Ul = styled.ul`
display : flex;
margin-top : 20px
`
const Li = styled.li`
    margin-bottom: 20px;
    font-size:14px;
    font-weight : 400;
    width : 180px;
    height :200px;
    margin-right : 10px;
       background-position: top center; //상하 좌우
        height: 180px;
        background-image: url(${(props) => props.bg});
        background-size: cover;
`;



function SearchedMovies() {
    //검색시 보낸 데이터 받아오기
    const location = useLocation();
    const data = location.state.data;
    const getPoster = (urls) => {
            return urls?.slice(0, 60);
        }
       useEffect(() => {
           (() => {
           })();
       }, []);

    return (
        <Wrap>
        <Title>검색 결과</Title>
            <Ul>
                {data ?  (
                    data.map((movie)=>(
                        <Li
                           key={movie.DOCID}
                          bg={() => getPoster(movie.posters)}
                        ></Li>
                        ))
           ) : <></>}
           </Ul>
    </Wrap>
    )
}

export default SearchedMovies;
