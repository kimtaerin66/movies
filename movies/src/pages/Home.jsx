import React, {useEffect, useState} from "react";
import styled from "styled-components";
import request from "../config/Axios.js";
import moment from "moment";
import Slider from "../components/Slider.jsx";
import Header from "../components/Header.jsx";
import ViewDetailsModal from "../components/ViewDetailsModal.jsx";


const Wrapper = styled.div`
    background-color: black;
`;

const Loader = styled.div`
    height: 20vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Banner = styled.div`
    //전체화면
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    // background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        //       url(${(props) => props.bg});
    background-size: cover;
`;
const Title = styled.h2`
    font-family: "GmarketSansBold";
    font-size: 58px;
    margin-bottom: 20px;
    margin-top: 30px;
`;
const Overview = styled.p`
    font-size: 25px;
    width: 40%;
    font-family: "GmarketSansLight";
    line-height: 1.5;
`;

const PlayBtn = styled.button`
    width: 150px;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin: 25px 0;
    font-size: 22px;
    cursor: pointer;
`;


//메인페이지
function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState();

    const [newRows, setNewRows] = useState([]);
    const [koreaRows, setKoreaRows] = useState([]);
    const [aniRows, setAniRows] = useState([]);
    const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

    //공통 params
    const commonParams = {
        collection: "kmdb_new2",
        detail: "Y", //포스터
        ServiceKey: SERVICE_KEY,
        listCount: 100
    }

    //최신 영화(개봉일이 오늘 날짜로부터 이주전 조회)
    const getNewMovies = () => {
        (async () => {
            const date = moment(new Date()).subtract(14, "day").format("YYYYMMDD");
            try {
                const res = await request.get(``, {
                    params: {
                        ...commonParams,
                        releaseDts: date,
                    }
                });
                setNewRows(checkExistPoster(res));
            } catch (e) {
                console.error(e);
            }
        })();
    };
    const getKoreaMovies = () => {
        (async () => {
            try {
                const res = await request.get(``, {
                    params: {
                        ...commonParams,
                        nation: "대한민국",
                    }
                });
                setKoreaRows(checkExistPoster(res));
            } catch (e) {
                console.error(e);
            }
        })();
    };
    const getAniMovies = () => {
        (async () => {
            try {
                const res = await request.get(``, {
                    params: {
                        ...commonParams,
                        type: "애니메이션",
                    }
                });
                setAniRows(checkExistPoster(res));
            } catch (e) {
                console.error(e);
            }
        })();
    };
    const checkExistPoster = (res) => {
        return res.data.Data[0].Result.filter((el) => el.posters !== "");
    }
    const closeModal = ()=>{
        setOpenModal(false);
    }


    const viewDetails = (movie) => {
        setSelectedMovie(movie);
        setOpenModal(true);

    };
    useEffect(() => {
        (() => {
            getNewMovies();
            getKoreaMovies();
            getAniMovies();
        })();
    }, []);

    return (
        //이름 장르 개봉일 평점 줄거리 ... > 자세히보기 클릭시 이동
        <>
            <Wrapper>
                {isLoading ? (<Loader>Loading...</Loader>)
                    : (<>
                            <Header></Header>
                            <Banner>
                                <Title>Movies</Title>
                                <Overview></Overview>
                                <PlayBtn>&#x25B6; Play</PlayBtn>
                            </Banner>
                            {newRows && newRows.length > 0 ? (
                                <Slider
                                    title="따끈따끈, 최신 영화"
                                    data={newRows}
                                    viewDetails={viewDetails}
                                > </Slider>
                            ) : <></>}
                            {koreaRows && koreaRows.length > 0 ? (
                                <Slider
                                    title="한국 영화"
                                    data={koreaRows}
                                    viewDetails={viewDetails}
                                > </Slider>
                            ) : <></>}
                            {aniRows && aniRows.length > 0 ? (
                                <Slider
                                    title="가족과 함께, 애니메이션"
                                    data={aniRows}
                                    viewDetails={viewDetails}
                                > </Slider>
                            ) : <></>}
                        </>
                    )}
            </Wrapper>
            {selectedMovie ?
                <ViewDetailsModal
                    open={openModal}
                    movie={selectedMovie}
                    closeModal={closeModal}
                /> : <></>}
        </>
    )
}

export default Home;