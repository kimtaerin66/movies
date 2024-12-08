import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";


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
    position :relative;

    &:first-child {
        transform-origin: center left;
    }

    &:last-child {
        transform-origin: center right;
    }

&:hover {
    p{
        opacity : 1
        }
    }

`;


const RightArrow = styled.p`
    position: absolute;
    cursor: pointer;
    top: 40%;
    right: 10px;
    width: 45px;
    height: 45px;
    display: ${(props) => props.index === 2 ? "none" : "default"}
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.2));
`;
const LeftArrow = styled.p`
    position: absolute;
    cursor: pointer;
    top: 40%;
    left: 10px;
    width: 45px;
    height: 45px;
    display: ${(props) => props.index === 0 ? "none" : "default"}
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.2));
`;

const Info = styled.p`
padding: 10px 0 3px 0;
 background-color: white;
   opacity: 0;
   width: 100%;
   box-sizing: border-box;
  text-align: center;
  position : absolute;
font-size: 15px;
   bottom :0
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
        y: -10, //위로올라가기
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween", //통통튀는거 잡기
        },
    },
};


export const offset = 6; //6개씩 보일것이니


function Slider({title, data, viewDetails}) {
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);

    const getPoster = (urls) => {
        return urls?.slice(0, 60);
    }
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const increaseIndex = (index) => {
        if (index >= 2) {
                    // 슬라이드가 끝에 도달하면 반대로
                    setIndex(index - 1); // 이전 인덱스로 돌아가게 설정
                } else {
                    setIndex(index + 1); // 슬라이드가 끝에 다다르지 않으면 정상적으로 증가
                }
                toggleLeaving();
    }
    const decreaseIndex = (index) => {
         if (index === 0) {
                    // 슬라이드가 처음에 도달하면 반대로
                    setIndex(index + 1); // 다음 인덱스로 넘어가게 설정
                } else {
                    setIndex(index - 1); // 슬라이드가 처음에 다다르지 않으면 정상적으로 감소
                }
                toggleLeaving();
    }

    return (
        <>
            <Wrap>
                <STitle>{title}</STitle>
                <AnimatePresence
                    initial={false}
                    onExitComplete={toggleLeaving}
                >
                    <Row
                        key={index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                            custom={index}
                        transition={{type: "tween", duration: 1}}
                    >
                        {data && data.slice(offset * index , offset * index  + offset).map((movie) => (
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
                                <Info >
                                    <h4>{movie.title.length >= 20 ? movie.title.slice(0, 20) + "..." : movie.title}</h4>
                                </Info>
                            </Box>
                        ))}
                        <LeftArrow index={index}>
                            <FontAwesomeIcon icon={faAngleLeft}
                                             onClick={() => decreaseIndex(index)}
                                             color={"#eee"}
                                             size={"3x"}
                                             style={{opacity: 0.8}}
                            />
                        </LeftArrow>
                        <RightArrow index={index}>
                            <FontAwesomeIcon icon={faAngleRight}
                                             onClick={() => increaseIndex(index)}
                                             color={"#eee"}
                                             size={"3x"}
                                             style={{opacity: 0.8}}
                            />
                        </RightArrow>
                    </Row>
                </AnimatePresence>
            </Wrap>

        </>
    )
}

export default Slider;