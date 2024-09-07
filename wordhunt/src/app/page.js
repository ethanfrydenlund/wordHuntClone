"use client";

import React, { useState, useEffect, useMemo } from 'react';
import styled from "styled-components"
import Grid from "../components/grid"
import wordsMap from "../data/words_dictionary"


const Header = styled.div`
font-size: 40px;
color: coral;
width: 100vw;
text-align: center;
`

export default function Home() {
  const [matrix, setMatrix] = useState([])
  const [isSelected, setIsSelected] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
  const [currentWord, setCurrentWord] = useState("")
  const [timer, setTimer] = useState(60)
  const [score, setScore] = useState(0)
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [words, setWords] = useState([])

  useEffect(() => {
    global.tickTock = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000);
  }, [])

  useEffect(() => {
    if (timer == 0) {
      clearInterval(global.tickTock)
      // can trigger some game logic here
    }
  }, [timer])

  const selectEvent = (hitRow, hitCol) => {
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
    const rows = 4;
    const cols = 4;
    setMatrix(generateRandom2DArray(rows, cols));
  }, [])

  useEffect(() => {
    if (!isMousePressed && currentWord.length > 2) {
      if (wordsMap[currentWord.toLowerCase()] == 1 && !words.includes(currentWord)) {
        setScore(prev => prev + (currentWord.length * 100))
        setWords(prev => [...prev, currentWord])
      }
    }
    setIsSelected([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])
    setCurrentWord("")
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

  return (
    <>
      <Header>
        <p>Current Word: {currentWord}</p>
        <p>Score: {score}</p>
        <p>{timer}</p>
      </Header>
      <Grid letters={matrix} isSelected={isSelected} selectEvent={selectEvent} isMousePressed={isMousePressed} />
    </>
  )
}
