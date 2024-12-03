import React, {useEffect, useState} from "react";
import styled from "styled-components";
import request from "../config/Axios.js";
import moment from "moment";
import Slider from "../components/Slider.jsx";


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
    const [newRows, setNewRows] =useState([]);
    const [koreaRows, setKoreaRows] =useState([]);
    const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

    //공통 params
    const commonParams ={
        collection: "kmdb_new2",
        detail: "Y", //포스터
        ServiceKey: SERVICE_KEY,
        listCount: 18
    }
    


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
        (async()=> {
            //최신 영화(개봉일이 오늘 날짜로부터 이주전 조회)
                const date = moment(new Date()).subtract(14,"day").format("YYYYMMDD");
                    const res =  await request.get(``, {
                        params: {
                            ...commonParams,
                            releaseDts: date,
                        }
                    });
                    setNewRows(res.data.Data[0].Result);

            const res2 =   await request.get(``, {
                        params: {
                            ...commonParams,
                            nation: "대한민국",
                        }
                    })

            setKoreaRows(res2.data.Data[0].Result);

        })();
    }, []);
    return (
        <Wrapper>
            {isLoading ? (<Loader>Loading...</Loader>)
                : (<>
                        <Banner>
                            <Title>Movies</Title>
                            <Overview></Overview>
                            <PlayBtn>&#x25B6; Play</PlayBtn>
                        </Banner>
                        {newRows && newRows.length > 0 ? (
                            <Slider
                                title="따끈따끈, 최신 영화"
                                data={newRows}
                            > </Slider>
                        ) : <></>}
                        {koreaRows && koreaRows.length > 0 ? (
                            <Slider
                                title="한국 영화"
                                data={koreaRows}
                            > </Slider>
                        ) : <></>}


                    </>
                )}
        </Wrapper>
    )
}

export default Home;
