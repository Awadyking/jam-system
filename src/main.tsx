import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import Main from './components/Main.tsx'
import Store from './redux/Store.ts'
import E404 from './routes/E404.tsx'
import Loading from './components/Loading.tsx'
import Login from './routes/Login.tsx'
import i18n from "i18next"; 
import Dialog from './components/Dialog.tsx'
import Register from './routes/Register.tsx'
import App from './routes/App.tsx'
import Home from './routes/Home.tsx'
import Profile from './routes/Profile.tsx'
import Settings from './routes/Settings.tsx'
import Wallets from './routes/Wallets.tsx'
import Payments from './routes/Payments.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={Store} >
    <BrowserRouter>
      <Header />
      <Main>
              <Routes>
                    <Route path='/' element={<App/>}></Route>
                    <Route path="*" element={<E404/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/home' element={<Home/>}></Route>
                    <Route path='/profile' element={<Profile/>}></Route>
                    <Route path='/settings' element={<Settings/>}></Route>
                    <Route path='/wallets' element={<Wallets/>} ></Route>
                    <Route path='/payments' element={<Payments/>}></Route>
              </Routes>
        </Main>
        <Loading/>
        <Dialog/>
        </BrowserRouter>
      </Provider>
  </StrictMode>,
)
