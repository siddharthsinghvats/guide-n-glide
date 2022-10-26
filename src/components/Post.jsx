import { useEffect } from "react";
import { useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Link, useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState({title:" loading......"});
  const params = useParams();
  useEffect(() => {
    const getPost = async () => {
      let result = await fetch(`https://guide-n-glide.herokuapp.com/posts/${params.id}`);
      result = await result.json();
      setPost(result[0]);
    };
    getPost();
  }, []);

  console.log(typeof(post.content));
  return (
    <>
      <ResponsiveAppBar />
      <div className="container">
      <div className="post">
            <h1 className="post-title">{post.title}</h1>
            <hr/>
            <div className="sub-header">
            <span className="post-author">Author: {post.author_name}</span>
            <span className="post-time">Date: {post.time}</span>
            </div>
            <div className="post-image">
                <img src={post.image} alt="title" />
            </div>
        <div id="post-content" dangerouslySetInnerHTML={{ __html: post.content }}>
        </div>
      </div>
      </div>
    </>
  );
};

export default Post;
