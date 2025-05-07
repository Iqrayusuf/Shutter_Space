import './App.css'
import { useState } from 'react'
import { HeaderComponent } from './Component/HeaderComponent'
import { FooterComponent } from './Component/FooterComponent'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import LearningPlanComponent from './Component/LearningPlanComponent'
import ListLearningPlanComponent from './Component/ListLearningPlanComponent'
import UpdateLearningPlanComponent from './Component/UpdateLearningPlanComponent'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>

    <Routes>
<Route path='/' element = { <ListLearningPlanComponent/>}></Route>

<Route path='/Users' element =  { <ListLearningPlanComponent/>}></Route>
<Route path='/add-NewLearningPlan' element = {<LearningPlanComponent/>}></Route>
<Route path="/update-learning-plan/:id" element={<UpdateLearningPlanComponent />} />
          
</Routes>
    <FooterComponent/>
  
     
      </BrowserRouter>
    </>
  )
}

export default App
