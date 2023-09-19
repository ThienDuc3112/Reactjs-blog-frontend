import './App.css';
import CreatePost from './components/createPost';
import { Route, Routes } from 'react-router-dom'
import Home from './components/home';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import PostWrapper from './components/postWrapper';
import Posts from './components/posts';
import NotFound from './components/pageNotFound';

function App() {
  return (
    <>
      <Navbar />
      <div className='page-container'>

        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<NotFound />} />
          <Route path='/createpost/' element={<CreatePost />} />
          <Route path='/about' element={<NotFound />} />
          <Route path='/login/' element={<Login />} />
          <Route path='/register/' element={<Register />} />
          <Route path='/post' element={<Posts />} />
          <Route path='/post/:id' element={<PostWrapper />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
