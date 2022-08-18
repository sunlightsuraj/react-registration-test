import { Link } from "react-router-dom";
import LoginForm from '../components/LoginForm';

export default function Login(props) {
    return (
        <div className="mt-5">
            <h1>Login</h1>
            <LoginForm />
            Don't have an account yet? <Link to="/signup">Signup Here</Link>
        </div>
    );
}