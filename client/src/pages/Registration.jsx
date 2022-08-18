import { Link } from "react-router-dom";
import RegistrationForm from '../components/RegistrationForm';
import { useSelector } from "react-redux";

const Registration = (props) => {
    const token = useSelector(state => state.token);
    const isLogged = useSelector(state => state.isLogged);

    return (
        <div className="mt-5">
            <h2>SignUp</h2>
            <RegistrationForm token={props.token} onSignup={(email) => props.onSignup(email)} />
            {
                !(isLogged && token) ?
                    (<div>Already Registered? <Link to="/login">Login Here</Link></div>) : ''
            }
        </div>
    );
}

export default Registration;