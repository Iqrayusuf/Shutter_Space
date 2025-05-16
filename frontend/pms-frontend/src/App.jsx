
import './App.css'
import PostComponent from './component/PostComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePost from './component/CreatePostComponent';
import EditPostComponent from './component/EditPostComponent';
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      // http://localhost:5173
      <Route path="/" element = {<PostComponent />}></Route>

      // http://localhost:5173/posts
      <Route path="/posts" element = {<PostComponent />}></Route>

      // http://localhost:5173/add-post
      <Route path="/add-post" element = {<CreatePost />}></Route>

      // http://localhost:5173/update-post
      <Route path="/edit-post/:id" element = {<EditPostComponent />}></Route>
    </Routes>
    
    </BrowserRouter>
 
    </>
  )
}

export default App
