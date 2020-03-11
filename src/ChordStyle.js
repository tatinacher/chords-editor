import styled from "styled-components";

const map = ({ left }) => ({
  style: {
    left: `${left}px`,
    className: "arrow"
  }
});

const mapChord = ({ left, width, color }) => ({
  style: {
    background: color,
    width: width,
    left: `${left}px`
  }
});

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding-top: 120px;
  position: relative;
`;

export const Chord = styled.div.attrs(mapChord)`
  position: absolute;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Arrows = styled.div.attrs(map)`
  height: 50px;
  width: 10px;
  background: black;
  position: absolute;
  z-index: 1;
`;

export const Line = styled.div`
  display: flex;
`;
