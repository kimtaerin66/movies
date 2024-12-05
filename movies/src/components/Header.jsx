import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";



const Wrapper = styled.div`
    background-color: white;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass}
                                         size={"lg"}
                                         color={"#333"}
                                         style={{cursor: "pointer", paddingRight: "10px",
                                             position: "absolute", right: "5px"}}
                        />
                    </Search>
                    <FontAwesomeIcon icon={faUser}
                                     size={"lg"}
                                     color={"#333"}
                                     style={{cursor: "pointer", padding: "0 7px"}}
                    />
                </Right>
            </Wrapper>
        </>
    )
}

export default Header;
