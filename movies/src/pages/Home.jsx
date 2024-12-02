import React, {useEffect, useState} from "react";
import styled from "styled-components";
import request from "../config/Axios.js";
import moment from "moment";


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
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    // background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        //   url(${(props) => props.bg});
    background-size: cover;
`;
const Title = styled.h2`
    //font-family: "GmarketSansBold";
    font-size: 58px;
    margin-bottom: 20px;
    margin-top: 30px;
`;

const Overview = styled.p`
    font-size: 25px;
    width: 40%;
    //font-family: "GmarketSansLight";
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

const Sliders = styled.div`
  position: relative;
  margin-bottom:70px ;
  top: -200px;
`;
const STitle = styled.p`
font-size: 22px;
margin-bottom: 20px;
padding-left: 20px;
`;

const Movie = styled.div`

`;

const Sliders2 = styled.div`
  position: relative;
  top: 0;
  margin-bottom:70px ;
`;


//메인페이지
function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [newRows, setNewRows] =useState([]);
    const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

    //공통 params
    const commonParams ={
        collection: "kmdb_new2",
        detail: "N",
        ServiceKey: SERVICE_KEY,
    }
    
    //최신 영화(개봉일이 오늘 날짜로부터 한달전부터 조회)
    const getNewMovies =()=>{
        const date = moment(new Date()).subtract(30,"day").format("YYYYMMDD");
        (async () => {
        const res =  await request.get(``, {
            params: {
                ...commonParams,
                releaseDts: date,
            }
        });
            setNewRows(res.data.Data[0].Result);
        })();


    };
    const getKoreaMovies =()=>{
        (async () => {
            return await request.get(``, {
                params: {
                    ...commonParams,
                    releaseDts: "20241101",
                }
            })
        })();
    };
    const getPopularMovies =()=>{
        (async () => {
            return await request.get(``, {
                params: {
                    ...commonParams,
                    releaseDts: "20241101",
                }
            })
        })();
    };
    useEffect(() => {
        (async () => {
            //인기있는

            //최신 영화
            getNewMovies();
            //한국 영화


        })();
    }, []);
    return (
        <Wrapper>
            {isLoading ? (<Loader>Loading...</Loader>)
                : (<>
                        <Banner>
                            <Title></Title>
                            <Overview></Overview>
                            <PlayBtn>&#x25B6; Play</PlayBtn>
                        </Banner>
                        <Sliders>
                            <STitle>따끈따끈, 최신 영화</STitle>
                            {newRows && newRows.map((movie)=> (<Movie key={movie.DOCID}>{movie.title}</Movie>))}
                        </Sliders>
                    </>
                )}
        </Wrapper>
    )
}

export default Home;
