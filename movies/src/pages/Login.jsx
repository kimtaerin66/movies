import React from "react";
import styled from "styled-components";

const Form = styled.form``;
const Label = styled.label`
    display: none;
`;
const Title = styled.h2`
    font-size: 32px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    padding-bottom: 30px;
`;
const Ul = styled.ul`
`
const Li = styled.li`
    margin-bottom: 20px;
`;
const Input = styled.input`
    width: 340px;
    height: 46px;
    border: 1px solid #e1e4e8;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    color: #666670;
    padding-left: 13px;
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


//로그인
function Login() {
    return <>
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
    </>
}

export default Login;
