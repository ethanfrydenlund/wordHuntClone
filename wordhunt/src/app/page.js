"use client";

import React, { useState, useEffect, useMemo } from 'react';
import styled from "styled-components"
import Grid from "../components/grid"
import wordsMap from "../data/words_dictionary"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`
const TopSection = styled.div`
  display: flex;
  margin-top: 5vh;
  flex-direction: column;
  width: 40vw;
`
const FirstRow = styled.div`
  display: flex;
`
const Scoreboard = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  align-items: center;
`
const Timer = styled.div`
  text-align: right;
  font-size: 40px;
  font-weight: 500;
  margin-right: 30px;
`
const Score = styled.div`
  text-align: left;
  font-size: 40px;
  font-weight: 500;
  color: gold;
`
const Word = styled.div`
  text-align: center;
  color: coral;
  font-size: 40px;  
  height: 3vh;
  margin-top: 5vh;
`
const PlayButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  background-color: #f0f0f0;
  color: black;
  width: 5vw;
  height: 5vw;
  padding: 5px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;

   &:hover {
    background-color: lightcoral;
  }
`

export default function Home() {
  const [matrix, setMatrix] = useState([
    ['?', '?', '?', '?'],
    ['?', '?', '?', '?'],
    ['?', '?', '?', '?'],
    ['?', '?', '?', '?']
  ])
  const [isSelected, setIsSelected] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
  const [currentWord, setCurrentWord] = useState("")
  const [timer, setTimer] = useState(60)
  const [score, setScore] = useState(0)
  const [isMousePressed, setIsMousePressed] = useState(false)
  const [words, setWords] = useState([])
  const [lastCoords, setLastCoords] = useState([])

  const startTimer = () => {
    global.tickTock = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer == 0) {
      clearInterval(global.tickTock)
      // can trigger some game logic here
    }
  }, [timer])

  const selectEvent = (hitRow, hitCol) => {
    setLastCoords(() => [hitRow, hitCol])
    setIsSelected(prevState => {
      return prevState.map((row, rIdx) =>
        row.map((col, cIdx) =>
          (rIdx === hitRow && cIdx === hitCol) ? 1 : col
        )
      )
    })
    setCurrentWord(prev => prev + matrix[hitRow][hitCol])
  }

  const generateRandom2DArray = (rows, cols) => {
    const newArray = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random() * 26));
      }
      newArray.push(row);
    }

    newArray.forEach((row, rowIndex) => row.forEach((elm, colIndex) => newArray[rowIndex][colIndex] = String.fromCharCode(elm + 65)))
    return newArray;
  }

  useEffect(() => {
    if (!isMousePressed && currentWord.length > 2) {
      if (wordsMap[currentWord.toLowerCase()] == 1 && !words.includes(currentWord)) {
        setScore(prev => prev + (currentWord.length * 100))
        setWords(prev => [...prev, currentWord])
      }
    }
    setIsSelected([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])
    setCurrentWord("")
    setLastCoords([])
  }, [isMousePressed])

  const handleGlobalMouseDown = () => setIsMousePressed(true);
  const handleGlobalMouseUp = () => setIsMousePressed(false);

  useEffect(() => {
    window.addEventListener("mousedown", handleGlobalMouseDown);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleGlobalMouseDown);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  }, [])

  const startGame = () => {
    setMatrix(generateRandom2DArray(4, 4))
    startTimer()
  }

  return (
    <Container>
      <TopSection>
        <FirstRow>
          <PlayButton onClick={() => startGame()}>Play</PlayButton>
          <Scoreboard>
            <Timer>⏰ {timer}</Timer>
            <Score>🪙 {score}</Score>
          </Scoreboard>
        </FirstRow>
        <Word>{currentWord}</Word>
      </TopSection>
      <Grid letters={matrix} isSelected={isSelected} selectEvent={selectEvent} isMousePressed={isMousePressed} lastCoords={lastCoords} />
    </Container>
  )
}
