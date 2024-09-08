
import { useState } from "react"
// import Header from "./components/Header"
import Home from "./components/Home"
import AppHeader from "./components/Header"



function App() {
  const [cat,setCat]=useState('')
  


   
  return (
    <>
    <AppHeader setCat={setCat}/>
    <Home cat={cat}/>
    </>
  )
}

export default App
