
import './App.css'
import PostComponent from './component/PostComponent'
import HelloWorld from './HelloWorld'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import CreatePostComponent from './component/CreatePostComponent';

function App() {
  

  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
    <Routes>
      // http://localhost:5173
      <Route path="/" element = {<PostComponent />}></Route>

      // http://localhost:5173/posts
      <Route path="/posts" element = {<PostComponent />}></Route>

      // http://localhost:5173/add-post
      <Route path="/add-post" element = {<CreatePostComponent />}></Route>

      // http://localhost:5173/update-post
      <Route path="/update-post/:postId" element = {<CreatePostComponent />}></Route>
    </Routes>
    
    </BrowserRouter>
 
    </>
  )
}

export default App
