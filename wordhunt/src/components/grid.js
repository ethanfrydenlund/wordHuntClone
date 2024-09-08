import styled from "styled-components"


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100vw;
`

const Grid = styled.div`  
  display: flex; 
  flex-wrap: wrap;
  justify-content: center; 
  align-items: space-between;
  height: 50vh;
  width: 50vh;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vh;
  justify-content: space-between;
`;
const BaseItem = styled.div`
  display: flex;
  width: 10vh;
  height: 10vh;
  background-color: #f0f0f0;
  border: 2px solid #f0f0f0;
  text-align: center;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  user-select: none;
  transition: scale 0.25s ease;
`;

const Item1 = styled(BaseItem)`
  &:hover {
    border: 2px dashed coral;
  }
`;

const Item2 = styled(BaseItem)`
  background: coral;
  transform: scale(1); 
  animation: scaleUp 0.25s ease-out forwards;

  @keyframes scaleUp {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
`;

const grid = ({ letters, selectEvent, isSelected, isMousePressed, lastCoords }) => {

  const validateEvent = (rowIndex, colIndex) => {
    if (isMousePressed && isSelected[rowIndex][colIndex] == 0 && validateCoords(rowIndex, colIndex)) {
      selectEvent(rowIndex, colIndex)
    }
  }

  const validateCoords = (rowIndex, colIndex) => {
    if (lastCoords.length == 0) {
      return true
    }
    if (Math.abs(lastCoords[0] - rowIndex) <= 1 && Math.abs(lastCoords[1] - colIndex) <= 1) {
      return true
    }
    return false
  }

  return (
    <Container>
      <Grid>
        {letters.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((char, colIndex) => (
              !isSelected[rowIndex][colIndex]
                ? <Item1 onMouseLeave={() => validateEvent(rowIndex, colIndex)} onMouseEnter={() => validateEvent(rowIndex, colIndex)} key={colIndex}>{char}</Item1>
                : <Item2 onMouseLeave={() => validateEvent(rowIndex, colIndex)} onMouseEnter={() => validateEvent(rowIndex, colIndex)} key={colIndex}>{char}</Item2>
            ))}
          </Row>
        ))}
      </Grid>
    </Container>
  )
};



export default grid;