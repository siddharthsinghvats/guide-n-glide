import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import Nav from './components/ResponsiveAppBar'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateComponent from './components/PrivateComponent';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Profile from './components/Profile';
import OtherProfile from './components/OtherProfile';
import Footer from './components/Footer';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route element={<PrivateComponent/>}>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/posts/:id' element={<Post/>}/>
      <Route path='/create' element={<CreatePost/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/profile/:username' element={<OtherProfile/>}/>
      </Route>
      <Route path="/" element={<Home/>}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    {/* <Footer/> */}
    </BrowserRouter>
    </>
  );
}

export default App;
