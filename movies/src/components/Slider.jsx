import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";



const Wrap = styled.div`
    margin-top: 100px;
    position: relative;
    margin-bottom: 70px;
    padding-bottom: 120px;


`;
const STitle = styled.p`
    font-size: 22px;
    margin-bottom: 10px;
    padding-left: 20px;
    color: #fff;
`;
//slider안에서 애니메이션작동하기위해 motion
const Row = styled(motion.div)`
    display: grid;
    //6개를 1:1:1...비율로
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    position: absolute;
    width: 100%;

`;
const Box = styled(motion.div)`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: top center; //상하 좌우
    height: 180px;
    font-size: 50px;
    cursor: pointer;

    &:first-child {
        transform-origin: center left;
    }

    &:last-child {
        transform-origin: center right;
    }

`;


const RightArrow = styled.p`
    position: absolute;
    top: 40%;
    right: 10px;
    width: 55px;
    height: 55px;
    //fill: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    //filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.5));
`;
const LeftArrow = styled.p`
    position: absolute;
    top: 40%;
    left: 10px;
    width: 45px;
    height: 45px;
    cursor: pointer;
`;


const Info = styled(motion.div)`
    padding: 10px 0 0 0;
    background-color: white;
    opacity: 0;
    //position: absolute;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;

    h4 {
        text-align: center;
        font-size: 15px;
    }
`;
//사용자의 화면크기를 알아서 보여줄부분, 숨길부분 판단
// +5, -5은 6개씩 한줄이라 Box에 준 gap값.
const rowVariants = {
    hidden: {
        x: window.innerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.innerWidth - 5,
    },
};
const BoxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50, //위로올라가기
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween", //통통튀는거 잡기
        },
    },
};
const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween", //통통튀는거 잡기
        },
    },
};
//leaving을 체크해서, 슬라이더 에러잡기

export const offset = 6; //6개씩 보일것이니


function Slider({title, data, viewDetails}) {
    const [index, setIndex] = useState(0);

    const getPoster = (urls) => {
        return urls?.slice(0, 60);
    }

    const increaseIndex = (index)=>{
        if(index === 2)return;
        setIndex(++index);
    }
    const decreseIndex = (index)=>{
        if(index === 0)return;
        setIndex(--index);
    }

    useEffect(()=>{
    },[index]);

    return (
        <>
            <Wrap>
                <STitle>{title}</STitle>
                <AnimatePresence
                    initial={false}
                    // onExitComplete={toggleLeaving}
                >
                    <Row
                        key={index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{type: "tween", duration: 1}}
                    >
                        {data && data.slice(offset * index, offset * index + offset).map((movie) => (
                            <Box
                                key={movie.DOCID}
                                variants={BoxVariants}
                                initial="normal"
                                whileHover="hover"
                                transition={{
                                    type: "tween",
                                }}
                                bg={() => getPoster(movie.posters)}
                                layoutId={movie.DOCID + ""}
                                onClick={() => viewDetails(movie)}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{movie.title}</h4>
                                </Info>
                            </Box>
                        ))}
                        <LeftArrow>
                            <FontAwesomeIcon icon={faAngleLeft}
                                             onClick={()=> decreseIndex(index)}
                                             color={"#eee"}
                                             size={"3x"}
                                             style={{opacity:0.8}}
                            />
                        </LeftArrow>
                        <RightArrow>
                        <FontAwesomeIcon icon={faAngleRight}
                            onClick={()=>increaseIndex(index)}
                                         color={"#eee"}
                               size={"3x"}
                                         style={{opacity:0.8}}
                         />
                        </RightArrow>
                    </Row>
                </AnimatePresence>
            </Wrap>

        </>
    )
}

export default Slider;