import React from "react";
import styled from "styled-components";


const Wrap = styled.div`
   margin-top: 100px;
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



function SearchedMovies() {
    return <Wrap>
        <Title>검색 결과</Title>
            <Ul>
                <Li>
                </Li>
            </Ul>
    </Wrap>
}

export default SearchedMovies;
