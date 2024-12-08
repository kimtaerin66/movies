import React, {useEffect, useState} from "react";
import styled from "styled-components";
import request from "../config/Axios.js";
import moment from "moment";
import Slider from "../components/Slider.jsx";
import Header from "../components/Header.jsx";
import ViewDetailsModal from "../components/ViewDetailsModal.jsx";


const Wrapper = styled.div`
    width: 100%;
    padding-bottom: 50px;
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

const Video = styled.iframe`
    width: 100%;
    height: 70vh;
    background-color: #f8dada;
`;


//메인페이지
function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState();


    const [newRows, setNewRows] = useState([]);
    const [christmasRows, setChristmasRows] = useState([]);
    const [aniRows, setAniRows] = useState([]);
    const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

    //공통 params
    const commonParams = {
        collection: "kmdb_new2",
        detail: "Y", //포스터
        ServiceKey: SERVICE_KEY,
        listCount: 100
    }

    const category = [
        {
            title:"따끈따끈, 최신 영화",
            row : newRows
        },
        {
            title:"메리 크리스마스 ! 크리스마스 관련 영화",
             row : christmasRows
        },
        {
            title:"가족과 함께, 애니메이션",
            row : aniRows
        },
    ];
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
                setNewRows(checkExistPoster(res).slice(0,18));
            } catch (e) {
                console.error(e);
            }
        })();
    };
    const getChristmasMovies = () => {
        (async () => {
            try {
                const res = await request.get(``, {
                    params: {
                        ...commonParams,
                        query: "크리스마스",
                    }
                });
                setChristmasRows(checkExistPoster(res).slice(0,18));
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
                        listCount: 150,
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
            getChristmasMovies();
            getAniMovies();
        })();
    }, []);
    return (
        <>
            <Wrapper>
                {isLoading ? (<Loader>Loading...</Loader>)
                    : (<>
                            <Header/>
                        <Video
                        src={""}>

                        </Video>
                            {/*<Banner>*/}
                            {/*    <Title>Movies</Title>*/}
                            {/*    <Overview></Overview>*/}
                            {/*    <PlayBtn>&#x25B6; Play</PlayBtn>*/}
                            {/*</Banner>*/}
                            {newRows && christmasRows && aniRows ? (
                               category.map((el)=>(
                                   <Slider
                                       key={el.title}
                                   title={el.title}
                                   data={el.row}
                                   viewDetails={viewDetails}
                               > </Slider>
                               ))
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
