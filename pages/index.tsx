import type { NextPage } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  height: 800px;
  background-color: blue;
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
const RightEyes = styled.div`
  position: relative;
  top: 13px;
  left: 9px;
  width: 11px;
  height: 11px;
  background-color: black;
  border-radius: 50%;
`
const LeftEyes = styled.div`
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
  overflow: hidden; /* はみ出す部分を非表示にする */
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
const Block = styled.div`
  float: left;
  width: 34px;
  height: 34px;
  vertical-align: baseline;
  background-color: #ccc;
  border: solid 1px;
`

const Home: NextPage = () => {
  return (
    <Container>
      <Board>
        <Face>
          <RightEyes></RightEyes>
          <LeftEyes></LeftEyes>
          <FaceMouth></FaceMouth>
        </Face>
        <BlockArea>
          <Block></Block>
          <Block></Block>
          <Block></Block>
          <Block></Block>
          <Block></Block>
          <Block></Block>
          <Block></Block>
          <Block></Block>
          <Block></Block>
          <Block></Block>
          <Block></Block>
        </BlockArea>
      </Board>
    </Container>
  )
}

export default Home
