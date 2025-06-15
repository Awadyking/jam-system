import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './routes/Home.tsx'
import './index.css'
import Header from './components/Header.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import Main from './components/Main.tsx'
import { MainStore } from './redux/Store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={MainStore} >
    <BrowserRouter>
      <Header />
      <Main>

              <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    {/* <Route path="/login" element={<Login/>}></Route>
                    <Route path="*" element={<E404/>}></Route> */}
              </Routes>
        </Main>
        {/* <Loading/> */}
        </BrowserRouter>
      </Provider>
  </StrictMode>,
)
