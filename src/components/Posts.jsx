import { useEffect } from "react";
import { useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ReactLoading from "react-loading";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getPosts = async () => {
      let result = await fetch("https://guidnguide-api.onrender.com/posts");
      result = await result.json();
      setPosts(result);
    };
    getPosts();
    setLoading(false);
  }, [loading]);

  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="loading">
        <ReactLoading type="spinningBubbles" color="white" />
      </div>
    );
  }
  return (
    <>
      <ResponsiveAppBar />
      {loading&&<ReactLoading type="spinningBubbles" color="white" />}
      <div className="post-container">
        {posts &&
          posts.map((post, index) => {
            let title = post.title;
            title = title.substring(0, Math.min(title.length, 20));
            let header = post.header;
            header = header.substring(0, Math.min(header.length, 20));
            return (
              <Card key={"_"+index}
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
                  title={title + "..."}
                  subheader={post.time}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent>
                  {header + "..."}
                  <br />
                  <Link className="read-more" to={"/posts/" + post._id}>
                    Read More..{" "}
                  </Link>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <span  onClick={(e)=>{e.currentTarget.classList.toggle("like")}}><FavoriteIcon /></span>
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default Posts;
