import React from "react";
import "./styles.css";
import { createStore, createEvent } from "effector";
import { useList, useStore } from "effector-react";
import { Line, Wrap, Chord, Arrows } from "./ChordStyle";

const changeRight = createEvent("changeRight");
const changeLeft = createEvent("changeLeft");
const $chords = createStore([
  {
    id: 1,
    width: 100,
    left: 10,
    name: "Am",
    color: "wheat"
  },
  {
    id: 2,
    width: 180,
    left: 110,
    name: "B",
    color: "green"
  }
])
  .on(changeRight, (chords, params) => {
    return chords.map(el =>
      el.id.toString() === id ? { ...el, width: params.width } : el
    );
  })
  .on(changeLeft, (chords, params) =>
    chords.map(el =>
      el.id.toString() === id
        ? { ...el, width: params.width, left: params.left }
        : el
    )
  );

//width =>
const min_left = 30;
const min_width = 50;
const page_width = 400;

const max_width = page_width - $chords.length * min_width;

let firstPoint = 0;
let canChange = false;
let arrow = "";
let id = "";

const checkWidth = width => {
  if (width > max_width) return max_width;
  if (width < min_width) return min_width;
  return width;
};

const handleUp = () => {
  canChange = false;
  firstPoint = 0;
  arrow = "";
};

const handleMove = (event, list) => {
  if (!canChange) {
    return;
  }

  if (firstPoint === 0) {
    firstPoint += 1;
    id = event.target.id;
    if (event.target.classList.contains("right")) {
      arrow = "right";
    }
    if (event.target.classList.contains("left")) {
      arrow = "left";
    }
  }

  if (arrow === "") {
    return;
  }

  const element = list.find(el => el.id === id);
  const chordWidth = element.width;
  const chordLeft = element.left;

  if (arrow === "left") {
    const original_mouseX = chordLeft;
    const new_width = chordWidth - (event.pageX - original_mouseX);
    const new_x = chordLeft + (event.pageX - original_mouseX);
    const left = new_x < min_left ? min_left : new_x;
    const width = checkWidth(new_width);
    if (width > min_width && left > min_left) {
      console.log(width, min_width);
      changeLeft({ id, width, left });
    }
  }

  if (arrow === "right") {
    const original_mouseX = chordWidth + chordLeft;
    const new_width = chordWidth + (event.pageX - original_mouseX);
    const width = checkWidth(new_width);

    changeRight({ id, width });
  }
};

export const App = () => {
  const chords = useStore($chords);
  const list = useList($chords, ({ id, name, color, width, left }, index) => (
    <ChordApp
      id={id}
      key={index}
      name={name}
      color={color}
      chordWidth={width}
      chordLeft={left}
    />
  ));

  return (
    <div
      className="App"
      onPointerMove={event => handleMove(event, chords)}
      onPointerUp={handleUp}
    >
      <Line>{list}</Line>
    </div>
  );
};

export const ChordApp = ({ color, id, chordWidth, chordLeft, name }) => {
  return (
    <Wrap>
      <Arrow left={chordLeft} id={id} className="left" />
      <Chord width={chordWidth} left={chordLeft} color={color}>
        {name}
      </Chord>
      <Arrow
        left={chordLeft + chordWidth - 10}
        id={id}
        className="right"
        isRight
      />
    </Wrap>
  );
};

const Arrow = ({ left, id, setChage, isRight, className }) => {
  const handleDown = () => {
    canChange = true;
  };
  return (
    <Arrows
      onPointerDown={handleDown}
      className={className}
      left={left}
      id={id}
      isRight={isRight}
    />
  );
};
