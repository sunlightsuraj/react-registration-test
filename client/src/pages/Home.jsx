import { Link, Route } from "react-router-dom"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getPosts } from '../services/post.service';
import Posts from './home-pages/Posts';

const Home = (props) => {
    const token = useSelector(state => state.token);
    const isLogged = useSelector(state => state.isLogged);

    const [posts, setPosts] = useState([]);

    const drawAuthLinks = () => {
        if(!(isLogged && token)) {
            return (
                <div>
                    <Link to="/signup">SignUp</Link> &nbsp;|&nbsp; <Link to="/login">Login</Link>
                </div>
            );
        }
    }

    useEffect(() => {
        getPosts().then(posts => {
            setPosts(posts);
        }).catch(err => {
            console.log(err);
        })
    })
    
    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                {posts.map(post =>
                    (<li key={post.id}>{post.post}</li>)
                )}
            </ul>
            <Route exact path="/posts">
                <Posts />
            </Route>
            <Route exact path="/profile">
                <Posts />
            </Route>
            <Route exact path="/settings">
                <Posts />
            </Route>
            {drawAuthLinks()}
        </div>
    )
}

export default Home;