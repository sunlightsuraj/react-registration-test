import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/loggedAction';
import { remove } from '../actions/tokenAction';

const Header = (props) => {
    const history = useHistory();

    const token = useSelector(state => state.token);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    function onLogout(e) {
        e.preventDefault();
        // props.onLogout();
        dispatch(logout());
        dispatch(remove());
        history.push('/');
    }

    return (
        <header>
            <ul className="header-menu-list">
            {
                !(isLogged && token) ? (
                    <>
                            <li className="header-menu-item">
                                <Link to="/signup" className="header-menu-link">Signup</Link>
                            </li>
                            <li className="header-menu-item">
                                <Link to="/login" className="header-menu-link">Login</Link>
                            </li>
                    </>
                ) : (
                    <>
                        <li className="header-menu-item">
                            <Link to="/posts" className="header-menu-link">Posts</Link>
                        </li>
                        <li className="header-menu-item">
                            <Link to="/profile" className="header-menu-link">Profile</Link>
                        </li>
                        <li className="header-menu-item">
                            <Link to="/settings" className="header-menu-link">Settings</Link>
                        </li>
                        <li className="header-menu-item">
                            <Link to="#" className="header-menu-link" onClick={onLogout}>Logout</Link>
                        </li>
                    </>
                )
            }
            </ul>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" className="img header-logo" />
                </Link>
            </div>
        </header>
    );
}

export default Header;