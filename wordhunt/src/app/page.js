"use client";

import React, { useState, useEffect, useMemo } from 'react';
import styled from "styled-components"
import Grid from "../components/grid"
import wordsMap from "../data/words_dictionary"

export default function Home() {
  const [matrix, setMatrix] = useState([])
  const [isSelected, setIsSelected] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
  const [currentWord, setCurrentWord] = useState("")
  const [score, setScore] = useState(0)

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

  const [isMousePressed, setIsMousePressed] = useState(false);

  useEffect(() => {
    const handleGlobalMouseDown = () => setIsMousePressed(true);
    const handleGlobalMouseUp = () => {
      setIsMousePressed(false);
      setCurrentWord((prevWord) => {
        if (wordsMap[prevWord.toLowerCase()] == 1) {
          setScore(prev => prev + (prevWord.length * 50));
        }
        return "";
      });
      setIsSelected([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    };

    window.addEventListener("mousedown", handleGlobalMouseDown);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleGlobalMouseDown);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  }, [])

  return (
    <>
      <p>Current Word: {currentWord}</p>
      <p>Score: {score}</p>
      <Grid letters={matrix} isSelected={isSelected} selectEvent={selectEvent} isMousePressed={isMousePressed} />
    </>
  )
}
