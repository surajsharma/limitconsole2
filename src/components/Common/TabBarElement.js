import styled from "styled-components";

const TabBarElement = styled.div`
    height: 60px;
    width: 100px;
    background-color: ${(props) => (props.active ? "#d8d8d8" : "#fff")};
    border-left: 1px solid #d8d8d8;
    text-align: center;
    font-family: "Noto Sans KR", sans-serif;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    font-size: 14px;
    &:hover {
        background: #eee;
        cursor: pointer;
    }
`;

export default TabBarElement;
