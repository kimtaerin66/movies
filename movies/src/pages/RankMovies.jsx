import React, {useEffect, useLayoutEffect, useState} from "react";
import styled from "styled-components";
import requestForRank from "../config/AxiosForRank.js";
import moment from "moment/moment.js";
import request from "../config/Axios.js";


const Wrap = styled.div`
    margin-top: 70px;
    width: 100%;
    padding: 50px;
    min-width: 1200px;
    box-sizing: border-box;
`;
const Title = styled.h2`
    width: 90%;
    font-size: 22px;
    font-weight: 700;
    color: #e1e4e8;
    padding-bottom: 10px;
    border-bottom: 1px solid #e1e4e8;
`;
const Number = styled.div`
    -webkit-text-stroke-color: #dadada;
    -webkit-text-stroke-width: 1px;
    color: transparent;
    font-size: 160px;
    display: flex;
`;
const Ul = styled.ul`
    display: flex;
    width: 90%;
    justify-content: center;
    margin: 50px 0;

`
const Li = styled.li`
    display: flex;
    margin-right: 50px;

    &:last-child {
        margin-right: 0;
    }
`;

const Poster = styled.div`
        //background-image: url(${(props) => props.bg});
    background-color: #888888;
    background-size: cover;
    background-position: top center;
    cursor: pointer;
    position: relative;
    width: 180px;
    height: 220px;
    font-size: 16px;

`;
const Table = styled.table`
    color: #fff;
    width: 700px;
    border: 1px solid #888;
    text-align: center;
  
`;

const Tr = styled.tr`
    border-bottom: 1px solid #888;
`;
const Th = styled.th`
    font-weight: 500;
    padding: 15px 25px;
`;
const Td = styled.td`
    padding: 16px 25px;
    vertical-align: middle;
    line-height: 22px;
`;


function RankMovies() {
    const VITE_KOFIC_KEY = import.meta.env.VITE_KOFIC_KEY;
    const [poster, setPoster] = useState([]);
    const [todayRow, setTodayRow] = useState([]);

    const thead = ["순위", "영화명", "개봉일", "당일 관객수", "누적 관객수"];

    const getRank = () => {
        (async () => {
            try {
                //어제날짜구하기
                const date = moment(new Date()).subtract(1, "day").format("YYYYMMDD");
                const res = await requestForRank.get(``, {
                    params: {
                        key: VITE_KOFIC_KEY,
                        targetDt: date,
                        itemPerPage: "10",
                    }
                });
                setTodayRow(res.data.boxOfficeResult.dailyBoxOfficeList.slice(0, 5));
            } catch (e) {
                console.error(e);
            }
        })();
    };

    const getPoster = (row) => {
        const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;
        const updatePoster = [];
        row.map((el) => {
            (async () => {
                const res = await request.get(``, {
                    params: {
                        collection: "kmdb_new2",
                        detail: "Y", //포스터
                        ServiceKey: SERVICE_KEY,
                        listCount: 1,
                        title: el.movieNm,
                        releaseDts: el.openDt.replaceAll("-", "")
                    }
                });
                if (res) {
                    const url = res.data.Data[0].Result[0].posters.slice(0, 60);
                    updatePoster[el.rank] = [el.movieNm, url];
                    setPoster(updatePoster);
                    console.log(updatePoster)

                }
            })();
        })
    };

    useLayoutEffect(() => {
        getRank();
    }, [])


    useEffect(() => {
        console.log(todayRow)
    }, [todayRow])

    return (<Wrap>
            <Title>이번주 영화 순위</Title>
            <Ul>
                {todayRow.map((movie, index) =>
                    <Li key={movie.rank}>
                        <Number>
                            {movie.rank}
                        </Number>
                        <Poster/>
                    </Li>
                )}
            </Ul>
            <Table>
                <Tr>  {thead.map((el, index) => (
                    <Th key={index}>{el}</Th>
                ))}
                </Tr>
                    {todayRow.map((el)=>(
                        <Tr>  <Td>{el.rank}</Td> <Td>{el.movieNm}</Td> <Td>{el.openDt}</Td><Td>{el.audiCnt}</Td><Td>{el.audiAcc}</Td> </Tr>
                    ))}
            </Table>
        </Wrap>
    )
}

export default RankMovies;
