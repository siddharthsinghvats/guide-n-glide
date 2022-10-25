import { useEffect } from "react";
import { useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import homeimg from "./homeimg.png";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const Profile = () => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const getProfile = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      let result = await fetch(
        `https://guide-n-glide.herokuapp.com/profile/${user.username}`
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
        `https://guide-n-glide.herokuapp.com/user_posts/${cur_user.username}`
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
  }, []);
  //    console.log(userPosts);
  const navigate = useNavigate();
  const deletePost = async (id) => {
    let upd_res = await fetch(
      `https://guide-n-glide.herokuapp.com/profile/${id}`,
      {
        method: "delete"
      }
    );
    if(upd_res){
        alert('Post Deleted');
        navigate('/profile');
    }else{
        alert('Error deleting post!')
    }
  };


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
              <h4>✉️ {user.email}</h4>
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
              userPosts.map((post, index) => {
                return (
                  <Card
                    className="post-card"
                    sx={{
                      minWidth: 300,
                      maxWidth: 300,
                      minHeight: 400,
                      maxHeight: 400,
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar className="avt">
                          <img
                            onClick={() =>
                              navigate("/profile/" + post.author_username)
                            }
                            src={post.author_image}
                            alt=""
                          />
                        </Avatar>
                      }
                      title={post.title}
                      subheader={post.time}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={post.image}
                      alt={post.title}
                    />
                    <CardContent>
                      {post.header}
                      <br />
                      <Link className="read-more" to={"/posts/" + post._id}>
                        Read More..{" "}
                      </Link>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
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
