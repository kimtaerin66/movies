import React, {useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import request from "../config/Axios.js";
import {Outlet, useNavigate} from "react-router-dom";


const Wrapper = styled.header`
    background-color: white;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    min-width: 100%;
    top:0;
    left: 0;
`;

const Logo = styled.div`
    padding-left: 10px;
    font-weight: bold;
    font-size: 22px;
`;

const Menu = styled.ul`
    display: flex;
    margin-left: 40px;

`;
const MenuItem = styled.li`
    padding: 5px 12px;
    letter-spacing: -1px;
`;
const Search = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;
const Input = styled.input`
    width: 350px;
    padding: 8px 0 8px 10px;
    margin-right: 5px;
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
`;
const Right = styled.div`
    margin-right: 20px;
    display: flex;
    align-items: center;
`;

// 사용자의 scroll을 감지해 top이 0이면 black, 내려가면 white
//헤더 홈, 시리즈, new, 자체 컨텐츠, 내가 찜한 콘텐츠  ---- 검색창 , 마이페이지
function Header() {
    const navigate = useNavigate();

    const [searchRow, setSearchRows] = useState([]);
    const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;
    // //공통 params
    const commonParams = {
        collection: "kmdb_new2",
        detail: "Y", //포스터
        ServiceKey: SERVICE_KEY,
        listCount: 50
    }

    const handleSearchEnter = (e)=>{
        if (e.key === "Enter") {
            searchMovies(e);
            navigate("/search");
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
                setSearchRows(res.data.Data[0].Result);
            } catch (e) {
                console.error(e);
            }
        })();
    };
    return (
        <>
            <Wrapper>
                <Left>
                    <Logo> The Movies </Logo>
                    <Menu>
                        <MenuItem> HOME </MenuItem>
                        <MenuItem> 지금 뜨는 영화 </MenuItem>
                        <MenuItem> 추천 영화 </MenuItem>
                    </Menu>
                </Left>
                <Right>
                    <Search>
                        <Input
                            type={"search"}
                            placeholder={"영화명, 감독명을 검색하세요"}
                            onKeyDown={(e)=>handleSearchEnter(e)}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass}
                                         size={"lg"}
                                         color={"#333"}
                                         style={{
                                             cursor: "pointer", paddingRight: "10px",
                                             position: "absolute", right: "5px"
                                         }}
                                         onClick={(e) => searchMovies(e)}
                        />
                    </Search>
                    <FontAwesomeIcon icon={faUser}
                                     size={"lg"}
                                     color={"#333"}
                                     style={{cursor: "pointer", padding: "0 7px"}}
                    />
                </Right>
            </Wrapper>
            <Outlet></Outlet>
        </>
    )
}

export default Header;
