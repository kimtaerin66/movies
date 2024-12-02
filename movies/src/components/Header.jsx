import React  from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  margin: 100px 0 0 60px;
`;
const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Summury = styled.p`
  font-size: 20px;
  font-family: "GmarketSansLight";
  margin-bottom: 35px;
`;

const Container = styled.div``;
const ShowBox = styled.div`
  float: left;
  margin-right: 15px;
  ::after {
    overflow: hidden;
    content: "";
  }
`;
const Title = styled.div`
  margin: 10px 0;
`;

const Img = styled.img`
  width: 200px;
  height: 250px;
  border-radius: 10px;
`;

const ImgLI = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 250px;
  border-radius: 10px;
  background-color: gray;
  font-size: 18px;

`;

//헤더
function Header() {
  return (
      <Wrapper>
        header
  </Wrapper>
  )
}

export default Header;
