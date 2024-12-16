import React from "react";
import styled from "styled-components";
import Map from "../components/Map.jsx"


const Wrap = styled.div`
    padding: 50px;
    width: 1400px;
    margin: 0 auto;
    box-sizing: border-box;
`;
const Title = styled.h2`
    margin-top: 70px;
    font-size: 22px;
    font-weight: 700;
    color: #e1e4e8;
    padding-bottom: 10px;
    border-bottom: 1px solid #e1e4e8;
    margin-bottom: 40px;
`;

function FindCinema() {
    return <Wrap>
        <Title>내 주변 영화관찾기</Title>
      <Map />
    </Wrap>
}

export default FindCinema;
