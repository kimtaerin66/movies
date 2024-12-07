import React from "react";
import styled from "styled-components";


const Wrap = styled.div`
    margin-top: 70px;
    width: 100%;
    padding: 50px;
    min-width: 1200px;
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



function FindCinema() {
    return <Wrap>
        <Title>내 주변 영화관찾기</Title>
            <Ul>
                <Li>
                </Li>
            </Ul>
    </Wrap>
}

export default FindCinema;
