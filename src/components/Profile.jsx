import { useEffect } from "react";
import { useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ReactLoading from 'react-loading';


const Profile = () => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProfile = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      let result = await fetch(
        `https://guidnguide-api.onrender.com/profile/${user.username}`
      );
      result = await result.json();
      if (result && !result.message) {
        setUser(result);
      } else {
        alert(result.message);
      }
    };

    const getPosts = async () => {
      const cur_user = JSON.parse(localStorage.getItem("user"));
      let result = await fetch(
        `https://guidnguide-api.onrender.com/user_posts/${cur_user.username}`
      );
      result = await result.json();
      if (result && !result.message) {
        setUserPosts(result);
      } else {
        alert(result.message);
      }
    };
    getProfile();
    getPosts();
    setLoading(false);
  }, [loading]);
     console.log(userPosts);
  const deletePost = async (id) => {
    let upd_res = await fetch(
      `https://guidnguide-api.onrender.com/profile/${id}`,
      {
        method: "delete"
      }
    );
    if(upd_res){
        alert('Post Deleted');
        
        window.location.reload();
    }else{
        alert('Error deleting post!')
    }
  };

if(loading){
    return (
        <div className="loading">
          <ReactLoading type="spinningBubbles" color="blue" />
        </div>
      );
}
  return (
    <>
      <ResponsiveAppBar />
      <div className="profile">
        <div className="profile-header">
          <Card
            className="profile-card"
            sx={{
              minWidth: 250,
              maxWidth: 250,
              minHeight: 300,
              maxHeight: 300,
            }}
          >
            <CardMedia
              component="img"
              height="194"
              image={user.profile_img}
              alt="profile"
            />
          </Card>
          <Card
            className="profile-card"
            sx={{
              minWidth: 250,
              maxWidth: 250,
              minHeight: 300,
              maxHeight: 300,
            }}
          >
            <CardHeader
              avatar={
                <Avatar className="avt">
                  <img src={user.profile_img} alt="" />
                </Avatar>
              }
              title={user.name}
              subheader={user.username}
            />

            <CardContent>
              <h4> 🎓 {user.college}</h4>
              <br />
              <h4 > <a style={{textDecoration:"none",color:"inherit"}} href={`mailto:${user.email}`}>✉️ {user.email}</a> </h4>
              <br />
              <h4>💻 {user.skills}</h4>
            </CardContent>
          </Card>
        </div>
        <hr />

        <div>
          <h3 className="post-h3">Posts ({userPosts.length}): </h3>
          <div className="post-container">
            {userPosts &&
              userPosts.map((post) => {
                let title = post.title;
                title = title.substring(0,Math.min(title.length,20));
                let header = post.header;
                header = header.substring(0,Math.min(header.length,20));
                return (
                  <Card
                    className="post-card"
                    sx={{
                      minWidth: 200,
                      maxWidth: 200,
                      minHeight: 200,
                      maxHeight: 200,
                    }}
                  >
                    <CardHeader
                    className="profile-post"
                      title={title+"..."}
                      // subheader={post.time}
                    />
                   
                    <CardContent>
                      {header+"..."}
                      <br />
                      <Link className="read-more" to={"/posts/" + post._id}>
                        Read More..{" "}
                      </Link>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <button
                        className="delete"
                        onClick={() => {
                          deletePost(post._id);
                        }}
                      >
                        Delete
                      </button>
                    </CardActions>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
