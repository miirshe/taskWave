import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Board, Home, PageLayout, UserLogin, UserRegister } from './ExportFiles'
import { Toaster } from 'react-hot-toast';
import { useGetCurrentBoardQuery } from './redux/slices/boardSlices';
import { useSelector } from 'react-redux';
const App = () => {
  const { data: getBoards = [] } = useGetCurrentBoardQuery();
  const userBoards = getBoards?.userBoards || [];
  const boardColor = useSelector(state => state.boardColor.boardColor)
  const textColor = useSelector(state => state.boardColor.textColor)
  useEffect(() => {
    document.body.style.backgroundColor = boardColor;
    document.body.style.color = textColor;
  }, [boardColor , textColor]);
  return (
    <>

      <Routes>
        {/* public routes  */}
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-register' element={<UserRegister />} />

        {/* private routes  */}
        <Route path='/' element={<PageLayout />} >
          <Route index element={<Home />} />
          {
            userBoards?.map(board => {
              return <Route key={board?._id} path={`/${board?.title}`} element={<Board board={board} />} />
            })
          }
        </Route>
      </Routes>
      <Toaster />

    </>
  )
}

export default App