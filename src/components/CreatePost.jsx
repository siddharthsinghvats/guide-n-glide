import logo from './logo.jpg';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultEditor } from 'react-simple-wysiwyg';
import ResponsiveAppBar from "./ResponsiveAppBar";
import ReactLoading from 'react-loading';

const default_image = 'https://cdn.pixabay.com/photo/2015/06/24/15/45/computer-820281__340.jpg';
const heroku = "https://guide-n-glide.herokuapp.com";

const CreatePost = ()=>{

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [image,setImage] = useState('');
    const [header,setHeader] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate  = useNavigate();

    const handleClick=async ()=>{
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const author_name = user.name;
        const author_username = user.username;
        const author_image = user.profile_img;
        const cur_img = image.length?image:default_image;

       let result = await fetch(`${heroku}/create`,{
        method:'post',
        body :JSON.stringify({title,header,content,image:cur_img,author_name,author_image,author_username}),
        headers:{
            "Content-Type":'application/json'
        }
       });
       result = await result.json();
       if(!result||result.message){
        alert(result.message);
        return;
       }
       setLoading(false);
       navigate('/posts');
    }

    if(loading){
        return <div  className='loading' ><ReactLoading type="spinningBubbles" color='white'/></div> 
    }

   return(
    <>
    <ResponsiveAppBar />
    <div className="home-background">
        <div className="home-form create-form">
        <img src={logo} alt="logo" />
            <h2>Create A New Post !</h2>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Post Title' required/>
            <input type="text" value={header} onChange={(e)=>setHeader(e.target.value)} placeholder='Small Description of Post' required/>
            <DefaultEditor className='textarea' value={content}  onChange= {(e)=>setContent(e.target.value)} />
            <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}   placeholder='Title Image URL (Leave blank for deafult)' />
            <button onClick={handleClick}>Create</button>
        </div>
    </div>
    </>
   ) 
}

export default CreatePost;