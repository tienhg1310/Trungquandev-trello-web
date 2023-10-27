// Board Detail
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { mockData } from '~/apis/mock-data'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoadBar'
import BoardContent from './BoardContent/BoadContent'

import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '653bde683e940b20c6c7f3af'
    // Call API
    fetchBoardDetailsAPI(boardId).then((board) => setBoard(board))
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
