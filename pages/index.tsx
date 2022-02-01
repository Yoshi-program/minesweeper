import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
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
  width: 430px;
  height: 488px;
  margin: 0;
  margin-right: -50%;
  background: yellow;
  background-color: #e3e3e3;
  transform: translate(-50%, -50%);
  border-top: solid 5px #ffffff;
  border-left: solid 5px #ffffff;
  border-right: solid 5px #3e3e3e;
  border-bottom: solid 5px #3e3e3e;
`
const AboveBlock = styled.div`
  position: relative;
  top: 10px;
  width: 378px;
  height: 77px;
  margin: auto;
  background-color: #b0b0b0;
  border-top: solid 5px #3e3e3e;
  border-left: solid 5px #3e3e3e;
  border-right: solid 5px #ffffff;
  border-bottom: solid 5px #ffffff;
`
const NumBombsBlock = styled.div`
  position: absolute;
  top: 8px;
  right: 250px;
  width: 100px;
  height: 50px;
  margin: auto;
  background-color: #1b1b1b;
  color: red;
  font-size: 43px;
  text-align: center;
  border-top: solid 2px #d4d4d4;
  border-left: solid 2px #d4d4d4;
  border-right: solid 2px #3e3e3e;
  border-bottom: solid 2px #3e3e3e;
`
const TimerBlock = styled.div`
  position: absolute;
  top: 8px;
  right: 25px;
  width: 100px;
  height: 50px;
  margin: auto;
  background-color: #1b1b1b;
  color: red;
  font-size: 43px;
  text-align: center;
  border-top: solid 2px #d4d4d4;
  border-left: solid 2px #d4d4d4;
  border-right: solid 2px #3e3e3e;
  border-bottom: solid 2px #3e3e3e;
`

const Face = styled.div`
  position: relative;
  top: 8px;
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
const AroundBlockArea = styled.div`
  position: absolute;
  top: 95px;
  right: 20px;
  width: 378px;
  height: 378px;
  margin: auto;
  background-color: #b0b0b0;
  border-top: solid 5px #3e3e3e;
  border-left: solid 5px #3e3e3e;
  border-right: solid 5px #ffffff;
  border-bottom: solid 5px #ffffff;
`
const BlockArea = styled.div`
  position: relative;
  top: 0px;
  width: 369px;
  height: 369px;
  margin: auto;
  background-color: #b0b0b0;
`
const Block = styled.div<{ isOpen: boolean; num: number }>`
  float: left;
  width: 41px;
  height: 41px;
  font-size: 30px;
  font-weight: bold;
  line-height: 30px;
  color: ${(props) => (props.num >= 1 && props.num <= 8 ? FONT_COLORS[props.num - 1] : 'black')};
  text-align: center;
  vertical-align: baseline;
  background: ${(props) => (props.isOpen ? '#e5e5e5' : '#959595')};
  border-top: ${(props) => (props.isOpen ? 'solid 1px #707070' : 'solid 3px #d4d4d4')};
  border-left: ${(props) => (props.isOpen ? 'solid 1px #707070' : 'solid 3px #d4d4d4')};
  border-right: ${(props) => (props.isOpen ? 'solid 1px #707070' : 'solid 3px #3e3e3e')};
  border-bottom: ${(props) => (props.isOpen ? 'solid 1px #707070' : 'solid 3px #3e3e3e')};
`
const BombBlock = styled.div`
  float: left;
  width: 41px;
  height: 41px;
  font-size: 25px;
  line-height: 30px;
  color: red;
  text-align: center;
  vertical-align: baseline;
  background: #e5e5e5;
  border: solid 1px #707070;
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

  // タイマー関数

  const [count, setCount] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // 爆弾の生成
  const tmpBombs: { x: number; y: number }[] = []
  let NumofBombs = 0
  while (NumofBombs < 10) {
    const numx = Math.floor(Math.random() * 9)
    const numy = Math.floor(Math.random() * 9)

    if (!tmpBombs.some((value) => value === { x: numx, y: numy })) {
      if (!tmpBombs.some((bomb) => bomb.x === numx && bomb.y === numy)) {
        tmpBombs.push({ x: numx, y: numy })
        NumofBombs++
      }
      /*if (!tmpBombs.some((value) => value === { x: numx, y: numy })) {
      tmpBombs.push({ x: numx, y: numy })
      NumofBombs++*/

      // tmpBombs.push({ x: numx, y: numy })
      // i++
    }
  }
  //-----------
  console.log(tmpBombs)
  const [bombs, setBombs] = useState(tmpBombs)

  const onClick = (x: number, y: number) => {
    console.log(x, y)

    // 周りの爆弾を数える関数
    const CountBombs = (x: number, y: number) => {
      let existBomb = false
      let NumBombs = 0
      for (let i = 0; i < bombs.length; i++) {
        for (const n of [x + 1, x, x - 1]) {
          for (const j of [y + 1, y, y - 1]) {
            if (n == x && j == y) {
              continue
            }
            if (bombs[i].x === n && bombs[i].y === j) {
              existBomb = true
              if (existBomb) {
                NumBombs += 1
              }
              existBomb = false
            }
          }
        }
      }
      return NumBombs
    }

    // 白連鎖のための周りの座標を保存し返す関数
    const ListofAround = (x: number, y: number) => {
      let CoordinateList = []
      for (const cx of [x + 1, x, x - 1]) {
        for (const cy of [y + 1, y, y - 1]) {
          if (0 <= cx && cx < 9 && 0 <= cy && cy < 9 && { x: x, y: y } !== { x: cx, y: cy }) {
            CoordinateList.push({ x: cx, y: cy })
          }
        }
      }
      return CoordinateList
    }

    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    // newBoard[y][x] = 2
    let existBomb = false

    let NumBombs = 0

    for (let i = 0; i < bombs.length; i++) {
      for (const n of [x + 1, x, x - 1]) {
        for (const j of [y + 1, y, y - 1]) {
          if (n == x && j == y) {
            continue
          }
          if (bombs[i].x === n && bombs[i].y === j) {
            existBomb = true
            if (existBomb) {
              NumBombs += 1
            }
            existBomb = false
          }
        }
      }
    }
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        existBomb = true
      }
    }
    // 白連鎖
    if (NumBombs === 0) {
      let NewNumBombs = 0
      const Coordinate = ListofAround(x, y)
      for (const c of Coordinate) {
        NewNumBombs = CountBombs(c.x, c.y)
        newBoard[c.y][c.x] = NewNumBombs

        if (NewNumBombs === 0) {
          for (const nc of ListofAround(c.x, c.y))
            if (!Coordinate.some((nb) => nb.x === nc.x && nb.y === nc.y)) {
              Coordinate.push({ x: nc.x, y: nc.y })
            }
        }
      }
    }

    newBoard[y][x] = existBomb ? 10 : NumBombs

    setBoard(newBoard)
  }
  return (
    <Container>
      <Board>
        <AboveBlock>
          <NumBombsBlock>0{bombs.length}</NumBombsBlock>
          <Face></Face>
          <TimerBlock>{count}</TimerBlock>
        </AboveBlock>
        <AroundBlockArea>
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
        </AroundBlockArea>
      </Board>
    </Container>
  )
}

export default Home
