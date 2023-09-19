import './App.css';
import CreatePost from './components/createPost';
import { Route, Routes } from 'react-router-dom'
import Home from './components/home';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import PostWrapper from './components/postWrapper';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/createpost/' element={<CreatePost />} />
        <Route path='/login/' element={<Login />} />
        <Route path='/register/' element={<Register />} />
        <Route path='/post' element={<PostWrapper />} />
        <Route path='/post/:id' element={<PostWrapper />} />
      </Routes>
    </>
  );
}

export default App;
