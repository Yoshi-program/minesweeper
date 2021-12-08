import type { NextPage } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  background-color: blue;
  height: 1000px;
`
const Board = styled.div`
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
  width: 200px;
  height: 200px;
`
const Face = styled.div`
  width: 50px; /*幅*/
  height: 50px; /*高さ*/
  border-radius: 50%; /*角丸*/
  background-color: #ffcd8c;
  margin: auto;
`
const BlockArea = styled.div`
  width: 144px;
  height: 144px;
  margin: auto;
  background-color: gray;
`
const Block = styled.div`
  width: 16px;
  height: 16px;
  border: solid 1px;
  float: left;
  background-color: #cccccc;
  vertical-align: baseline;
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
