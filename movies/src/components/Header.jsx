import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Outlet, useNavigate} from "react-router-dom";
import request from "../config/Axios.js";


const Wrapper = styled.header`
    background-color: white;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    min-width: 100%;
    top: 0;
    left: 0;
    z-index:10;
`;

const Logo = styled.div`
    padding-left: 10px;
    font-weight: bold;
    font-size: 22px;
    width : 150px
`;

const Menu = styled.ul`
    display: flex;
    margin-left: 40px;

`;
const MenuItem = styled.li`
    padding: 5px 12px;
    letter-spacing: -1px;
    cursor: pointer;

    &:hover {
        color: #ff4444;
    }
`;
const Search = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 10px;

`;
const Input = styled.input`
    width: 550px;
    padding: 8px 0 8px 10px;
    margin-right: 5px;
    border-radius: 5px;
    border: 1px solid #a0a0a0;


    &::-ms-clear, /* IE의 경우 */
    &::-ms-reveal {
        display: none; /* IE에서 취소 버튼을 숨깁니다 */
    }

    &::-webkit-search-cancel-button, /* 크롬, 사파리에서의 취소 버튼 */
    &::-webkit-search-decoration,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        display: none; /* 버튼을 숨깁니다 */
    }

    /* IE에서 검색 입력이 취소된 후 남는 공간도 제거할 수 있음 */

    &::-webkit-input-placeholder {
        text-align: left;
    }

`;

const Left = styled.div`
    display: flex;
    margin-left: 20px;
    width: 550px;

`;
const Right = styled.div`
    margin-right: 20px;
    display: flex;
    align-items: center;
`;

const LoginBtn = styled.button`
    padding: 7px 15px;
    border-radius: 8px;
    margin-right: 20px;
    background-color: #ff4444;
    color: white;
    letter-spacing: -0.8px;
`;

// 사용자의 scroll을 감지해 top이 0이면 black, 내려가면 white
//헤더 홈, 시리즈, new, 자체 컨텐츠, 내가 찜한 콘텐츠  ---- 검색창 , 마이페이지
function Header() {
    const [stateRow, setStateRow] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(5);
    const navigate = useNavigate();
    const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;
    // //공통 params
    const commonParams = {
        collection: "kmdb_new2",
        detail: "Y", //포스터
        ServiceKey: SERVICE_KEY,
        listCount: 50
    }

    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            searchMovies(e);
            }
}
    //영화명, 감독명 으로 검색 ?
    const searchMovies = (e) => {
        (async () => {
            try {
                const res = await request.get(``, {
                    params: {
                        ...commonParams,
                        query: e.target.value,
                    }
                });
                setTotalPage(Math.ceil(res.data.TotalCount / 10));
                setTotalCount(res.data.TotalCount);
                setStateRow(res.data.Data[0].Result.filter((el) => el.posters !== ""));
            } catch (e) {
                console.error(e);
            }
        })();
    };
useEffect(()=>{

    if(stateRow.length > 0 ){
                     navigate("/search",{
                         state :{
                             data : {
                                 row : stateRow,
                                 totalCount : totalCount,
                                 totalPage : totalPage,
                                 changePage: setPage
                             }
                             }});
                         }

    },[stateRow])

    return (
        <>
            <Wrapper>
                <Left>
                    <Logo> The Movies </Logo>
                    <Menu>
                        <MenuItem onClick={()=> navigate("/")}> HOME </MenuItem>
                        <MenuItem onClick={()=> navigate("/rank")}> 영화 랭킹 </MenuItem>
                        <MenuItem onClick={()=> navigate("/findCinema")}> 내 주변 영화관찾기 </MenuItem>
                    </Menu>
                </Left>
                <Right>
                    <Search>
                        <Input
                            type={"search"}
                            placeholder={"영화명, 감독명을 검색하세요"}
                            onKeyDown={(e) => handleSearchEnter(e)}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass}
                                         size={"lg"}
                                         color={"#787878"}
                                         style={{
                                             cursor: "pointer", paddingRight: "10px",
                                             position: "absolute", right: "5px"
                                         }}
                                         onClick={(e) => searchMovies(e)}
                        />
                    </Search>
                    {/*<FontAwesomeIcon icon={faUser}*/}
                    {/*                 size={"lg"}*/}
                    {/*                 color={"#333"}*/}
                    {/*                 style={{cursor: "pointer", padding: "0 7px"}}*/}
                    {/*/>*/}
                    <LoginBtn
                        onClick={() => navigate("/login")}> 로그인 </LoginBtn>
                </Right>
            </Wrapper>
            <Outlet></Outlet>
        </>
    )
}

export default Header;
