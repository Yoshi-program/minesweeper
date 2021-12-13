import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

const FONT_COLORS = ['blue', 'green', 'red', 'purple', 'brown', 'orange', 'yellow', 'pink']

const Container = styled.div`
  height: 800px;
  background-color: #4796fd;
`
const Board = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  margin: 0;
  margin-right: -50%;
  background: yellow;
  background-color: white;
  transform: translate(-50%, -50%);
`
const Face = styled.div`
  position: relative;
  top: 15px;
  width: 50px; /* 幅 */
  height: 50px; /* 高さ */
  margin: auto;
  background-color: #ffcd8c;
  border: solid 2px;
  border-radius: 50%; /* 角丸 */
`
const RightEye = styled.div`
  position: relative;
  top: 13px;
  left: 9px;
  width: 11px;
  height: 11px;
  background-color: black;
  border-radius: 50%;
`
const LeftEye = styled.div`
  position: relative;
  top: 2px;
  left: 26px;
  width: 11px;
  height: 11px;
  background-color: black;
  border-radius: 50%;
`
const FaceMouth = styled.div`
  position: relative;
  top: 8px;
  left: 13px;
  width: 20px;
  height: 10px;
  border: solid 2px black;
  border-top: 0;
  border-radius: 0 0 100px 100px;
`

const BlockArea = styled.div`
  position: relative;
  top: 30px;
  width: 306px;
  height: 306px;
  margin: auto;
  background-color: gray;
`
const Block = styled.div<{ isOpen: boolean; num: number }>`
  float: left;
  width: 34px;
  height: 34px;
  font-size: 30px;
  font-weight: bold;
  line-height: 30px;
  color: ${(props) => (props.num >= 1 && props.num <= 8 ? FONT_COLORS[props.num - 1] : 'black')};
  text-align: center;
  vertical-align: baseline;
  background: ${(props) => (props.isOpen ? 'white' : 'gray')};
  border: solid 1px black;
`
const BombBlock = styled.div`
  float: left;
  width: 34px;
  height: 34px;
  font-size: 25px;
  line-height: 30px;
  color: red;
  text-align: center;
  vertical-align: baseline;
  background: white;
  border: solid 1px black;
`
const Home: NextPage = () => {
  // prettier -ignore
  const [board, setBoard] = useState([
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
  ])

  const [bombs, setBombs] = useState([{ x: 0, y: 0 }])

  const onClick = (x: number, y: number) => {
    console.log(x, y)
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    // newBoard[y][x] = 1
    let existBomb = false
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        existBomb = true
      }
    }
    newBoard[y][x] = existBomb ? 10 : 1

    setBoard(newBoard)
  }
  return (
    <Container>
      <Board>
        <Face>
          <RightEye></RightEye>
          <LeftEye></LeftEye>
          <FaceMouth></FaceMouth>
        </Face>
        <BlockArea>
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 10 ? (
                <BombBlock key={`${x}-${y}`}>●</BombBlock>
              ) : (
                <Block key={`${x}-${y}`} isOpen={num < 9} num={num} onClick={() => onClick(x, y)}>
                  {num > 0 && num < 9 && num}
                </Block>
              )
            )
          )}
        </BlockArea>
      </Board>
    </Container>
  )
}

export default Home
