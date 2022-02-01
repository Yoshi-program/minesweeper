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
    const ListofNewCoordinate = []
    let SecondNumBombs = 0
    let SeocndListofNewCoordinate = []
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
        /*for (const nc of ListofNewCoordinate) {
          NewNumBombs = CountBombs(nc.x, nc.y)
          if (NewNumBombs === 0) {
            ListofNewCoordinate.push({ x: nc.x, y: nc.y })
            newBoard[nc.y][nc.x] = NewNumBombs
          }
        }*/
      }
    }

    newBoard[y][x] = existBomb ? 10 : NumBombs

    /*if (NumBombs === 0) {
      for (const xz of [x + 1, x, x - 1]) {
        for (const yz of [y + 1, y, y - 1]) {
          NumBombs = 0
          if (xz == x && yz == y) {
            continue
          }
          for (let i = 0; i < bombs.length; i++) {
            for (const xzz of [xz + 1, xz, xz - 1]) {
              for (const yzz of [yz + 1, yz, yz - 1]) {
                if (xzz == xz && yzz == yz) {
                  continue
                }
                if (bombs[i].x === xzz && bombs[i].y === yzz) {
                  existBomb = true
                  if (existBomb) {
                    NumBombs += 1
                  }
                  existBomb = false
                  if (NumBombs === 0) {
                    newBoard[yz][xz] = NumBombs
                  }
                }
              }
            }
          }
        }
      }
    }*/

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
