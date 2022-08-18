import axios from 'axios';
const server = 'http://localhost:3002/';
const _url_posts = server + 'posts';

export function getPosts() {
    return axios.get(_url_posts)
        .then((res) => {
            if (res && res.status === 200) {
                return res.posts.data || [];
            }
        });
}