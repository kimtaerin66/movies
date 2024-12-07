import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
    vertical-align: middle;
    width: 350px;
    margin: 0 auto;
`;
const Form = styled.form`
`;
const Label = styled.label`
    display: none;
`;
const Title = styled.h2`
    font-size: 32px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    padding: 230px 0 50px;
`;
const Ul = styled.ul`
`
const Li = styled.li`
    margin-bottom: 20px;
`;
const Input = styled.input`
    width: 100%;
    height: 46px;
    border: 1px solid #e1e4e8;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    color: #666670;
    padding-left: 13px;
    box-sizing: border-box;
`;
const Warning = styled.p`
    font-size: 14px;
    text-align: left;
    color: #ff5c5c;
    padding: 8px 0 0 15px;
`;
const LoginBtn = styled.button`
    width: 100%;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    line-height: 20px;
    height: 46px;
    background: #ff4444;
    color: #fff;
`;
const Social = styled.ul`
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
`;

const SItem = styled.li`
    background-color: #888888;
    margin-right: 15px;
    text-align: center;
    cursor: pointer;
    padding: 15px 15px;
`;


//로그인
function Login() {
    return (<Wrap>
            <Title>로그인</Title>
            <Form>
                <Ul>
                    <Li>
                        <Label>아이디</Label>
                        <Input
                            type="text"
                            name="username"
                            // value={userData.username}
                            // onChange={onChangeUserData}
                            placeholder={"아이디"}
                            maxLength={"20"}
                            // errorMessage={errorMessage}
                            // disabled={mode !== "login"}
                            width={"100%"}
                        />
                    </Li>
                    <Li>
                        <Label>비밀번호</Label>
                        <Input
                            type="password"
                            name="password"
                            // value={userData.password}
                            // onChange={onChangeUserData}
                            placeholder={"비밀번호"}
                            maxLength={"20"}
                            width={"100%"}
                        />
                    </Li>
                </Ul>
                <LoginBtn>로그인</LoginBtn>
            </Form>
            <Social>
                <SItem>네이버</SItem>
                <SItem>구글</SItem>
                <SItem>카카오</SItem>
            </Social>
        </Wrap>
    )
}

export default Login;
