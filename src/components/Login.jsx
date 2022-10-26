import logo from './logo.jpg';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from  'react-loading';
const Login = ()=>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] =useState(false);
    const navigate  = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/posts');
        }
    });
    const handleClick=async ()=>{
        setLoading(true);
       let result = await fetch('https://guide-n-glide.herokuapp.com/signin',{
        method:'post',
        body :JSON.stringify({password,username}),
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
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' required/>
            <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
            <button onClick={handleClick}>Sign In</button>
            <span className='footer-message'>New user? <a href='/register'>Register Here</a></span>
        </div>
    </div>
   ) 
}

export default Login;