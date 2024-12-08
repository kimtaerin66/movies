import React from "react";
import styled from "styled-components";


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
const Ul = styled.ul`
`
const Li = styled.li`
    margin-bottom: 20px;
`;



function RankMovies() {
    return <Wrap>
        <Title>이번주 영화 순위</Title>
            <Ul>
                <Li>
                </Li>
            </Ul>
    </Wrap>
}

export default RankMovies;
