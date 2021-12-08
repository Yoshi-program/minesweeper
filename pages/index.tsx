import type { NextPage } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  height: 1000px;
  background-color: blue;
`
const Board = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: -100px;
  background-color: white;
`
const Face = styled.div`
  width: 50px; /* 幅 */
  height: 50px; /* 高さ */
  margin: auto;
  background-color: #ffcd8c;
  border-radius: 50%; /* 角丸 */
`
const BlockArea = styled.div`
  width: 144px;
  height: 144px;
  margin: auto;
  background-color: gray;
`
const Block = styled.div`
  float: left;
  width: 16px;
  height: 16px;
  vertical-align: baseline;
  background-color: #ccc;
  border: solid 1px;
`

const Home: NextPage = () => {
  return (
    <Container>
      <Board>
        <Face></Face>
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
