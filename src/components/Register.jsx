import logo from './logo.jpg';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
const Register = ()=>{

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [college,setCollege] = useState('');
    const [username,setUsername] = useState('');
    const  [skills,setSkills] = useState('');
    const  [profile_img,setProfile] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const navigate  = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/posts');
        }
    });
    const handleClick=async ()=>{
        setLoading(true);
        if(profile_img.length==0){
            setProfile('https://cdn.pixabay.com/photo/2020/02/22/16/29/penguin-4871045__340.png');
        }
       let result = await fetch('https://guide-n-glide.herokuapp.com/register',{
        method:'post',
        body :JSON.stringify({name, email,password,profile_img,username,college,skills}),
        headers:{
            "Content-Type":'application/json'
        }
       });
       result = await result.json();
       if(result&&!result.message){
            localStorage.setItem("user",JSON.stringify(result));
            navigate('/posts');
       }else{
        alert(result.message);
       }
       setLoading(false);
    }
    if(loading){
        return (
            <div className="loading">
              <ReactLoading type="spinningBubbles" color="white" />
            </div>
          );
    }
   return(
    <div className="home-background">
        <div className="home-form">
        <img src={logo} alt="logo" />
            <h2>Welcome to Guide-N-Glide!</h2>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' required/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email' required/>
            <input type="text" value={college} onChange={(e)=>setCollege(e.target.value)}   placeholder='College' required/>
            <input type="text" value={skills} onChange={(e)=>setSkills(e.target.value)}   placeholder='Your skills' required/>
            <input type="text" value={profile_img} onChange={(e)=>setProfile(e.target.value)}   placeholder='Profile image URL(Leave blank for default)'/>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}  placeholder='Username' required/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password' required/>
            <button onClick={handleClick}>Register</button>
            <span className='footer-message'>New user? <a href='/signin'>Sign In here</a></span>
        </div>
    </div>
   ) 
}

export default Register;
