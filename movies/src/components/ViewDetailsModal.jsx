import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

//bg
const Wrap = styled.div`
    opacity: ${(props => props.visible ? 1 : 0)};
    visibility: ${(props => props.visible ? "visible" : "hidden")};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.25s ease;
    z-index: 4;
`;
const PopUp = styled.div`
    position: absolute;
    width: 550px;
    height: 700px;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius:5px;
`;

function ViewDetailsModal({open, movie }) {
    const modal = useRef(null);
    const [visibility, setVisibility] = useState(false);
    useEffect(() => {
        if (open) {
            setVisibility(true);
        } else {
            setVisibility(false)
        }
    }, [open]);

    return (
        <Wrap visible={visibility}>
            <PopUp ref={modal}>


            </PopUp>
        </Wrap>
    )
}

export default ViewDetailsModal;