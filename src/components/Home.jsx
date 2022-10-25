import { Link ,useNavigate} from 'react-router-dom';
import homeimg from './homeimg.png'
const Home = ()=>{
   return(
    <div className="home-page">
        <div className='home-text'>
            <div className='typer-container'>
            <h1 className='typed'>Guide-N-Glide</h1>
            </div>
            <p> Guide and Glide is a web platform for people to learn and help others.</p>
            <p>Meet skilled and hard working people here !</p>
            <Link to="/signin"><button>Get Started !</button></Link>
        </div>
        <div className='home-image'>
            <img src={homeimg} alt="" />
        </div>
    </div>
   ) 
}

export default Home;