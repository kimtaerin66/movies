import React, {useEffect} from "react";
import styled from "styled-components";
import {useLocation} from 'react-router-dom';
import Pagenation from "../components/Pagenation.jsx";

const Wrap = styled.div`
    margin-top: 70px;
    max-width: 100%;
    padding: 50px;
    min-width: 1200px;
    color: #fff;
    box-sizing: border-box;
`;
const Total = styled.p`
    margin-left: 50px;
    font-size: 13px;
    margin-top: 15px;
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
    margin-top: 15px;
    margin-left: 50px;
`
const Li = styled.li`
    display: flex;
    justify-content: space-between;
    width: 85%;
    height: 200px;
    margin-bottom: 25px;
    font-size: 14px;
    font-weight: 400;
    margin-right: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(205, 205, 205, 0.2);
`;
const Poster = styled.div`
    background-position: top center; //상하 좌우
    background-image: url(${(props) => props.bg});
    background-size: cover;
    width: 150px;
    height: 200px;
    margin-right: 25px;
`;

const Desc = styled.div`
    margin: 10px;
    width: 90%;
    font-size: 14px;
    font-family: 'GmarketSansLight';

    p {
        margin: 2px 0
    }
`;
const Right = styled.div`
text-align: right;
`;

const MTitle = styled.p`
    font-size: 16px;
    letter-spacing: -0.5px;
    margin-bottom: 20px !important;
    font-family: 'GmarketSansMedium';

`;
const Genre = styled.p``;
const Summary = styled.div`
    padding-top: 15px;
`;
const ReleaseDate = styled.p``;
const MoreBtn = styled.button`
    font-family: 'GmarketSansMedium';
    font-size: 13px;
    margin-top: 15px;
    color: #fff;
    text-underline: #fff;
    background-color: transparent;
`;

function SearchedMovies() {
    //검색시 보낸 데이터 받아오기
    const location = useLocation();
    const {row, totalCount, totalPage, setPage} = location.state.data;
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
            <Total>전체 목록 : {totalCount}개</Total>
            <Ul>
                {row ? (
                    row.slice(0, 5).map((movie) => (
                        <Li key={movie.DOCID}>
                            <Poster bg={() => getPoster(movie.posters)}></Poster>
                            <Desc>

                                <MTitle> {movie.title}</MTitle>
                                <Genre>장르 : {movie.genre} / 국가 : {movie.nation}</Genre>
                                <ReleaseDate>개봉일
                                    : {movie.ratings.rating[0].releaseDate ? movie.ratings.rating[0].releaseDate : "개봉일 확인불가"} / {movie.rating}</ReleaseDate>
                                <Summary>{movie.plots.plot[0].plotText.length > 300 ? movie.plots.plot[0].plotText.slice(0, 300) + "..." : movie.plots.plot[0].plotText}</Summary>

                                <Right> <MoreBtn>더보기</MoreBtn> </Right>
                            </Desc>
                        </Li>
                    ))
                ) : <></>}
            </Ul>
            {totalCount !== 0 ? (
                <Pagenation
                    page={1}
                    //         limit={limit}
                    totalPage={totalPage}
                    changePage={setPage}
                />
            ) : null}
        </Wrap>
    )
}

export default SearchedMovies;
