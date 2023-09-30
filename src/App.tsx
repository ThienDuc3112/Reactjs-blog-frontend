import './App.css';
import CreatePost from './components/createPost';
import { Route, Routes } from 'react-router-dom'
import Home from './components/home';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import PostWrapper from './components/postWrapper';
// import Posts from './components/posts';
import NotFound from './components/pageNotFound';
import { Dispatch, createContext, useState } from 'react';
import About from './components/about';
import Edit from './components/edit';
import Tags from './components/tagsListing';
import TagFilter from './components/tagFilter';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

disableReactDevTools()

export const UserContext = createContext<IUserContext>({})

interface IUserContext {
  user?: any
  setUser?: Dispatch<any>
}

function App() {
  const [user, setUser] = useState<any>()

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>

        <Navbar />
        <div className='page-container'>
          <Routes >
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Home />} />
            <Route path='/createpost/' element={<CreatePost />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tags' element={<Tags />} />
            <Route path='/tags/:tag' element={<TagFilter />} />
            {/* <Route path='/post' element={<Posts />} /> */}
            <Route path='/post/:id' element={<PostWrapper />} />
            <Route path='/post/edit/:id' element={<Edit />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>

  );
}

export default App;
