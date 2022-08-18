import React, { useState, useEffect } from 'react';
import { login as _login } from '../services/auth.service';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/loggedAction';
import { set } from '../actions/tokenAction';

export default function LoginForm(props) {
    const history = useHistory();

    const dispatch = useDispatch();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        // if (props.username) {
        //     setLoginForm({ ...loginForm, username: props.username });
        // }
    }, [])

    const { email, password } = loginForm;

    const handleChange = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        console.log(loginForm);
        event.preventDefault();

        _login({
            email: email,
            password: password
        })
        .then((data) => {
            if(data.token) {
                dispatch(set(data));
                dispatch(login());
                history.push('/');
            }
        })
        .catch((err) => {
            if(err.response) {
                setError(err.response.data.message);
            } else if(err.request) {
                setError(err.message);
            } else {
                setError(err.message);
            }
        })
    }

    return (
        <div className="row">
            <div className='col-md-3'></div>
            <div className="col-md-6">
                <div className="card card-primary">
                    <div className="card-body">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Email:</span>
                                <input type="text" className="form-control" placeholder="Email"
                                    name="email" value={email}
                                    onChange={(e) => handleChange(e)}
                                 />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Password:</span>
                                <input type="password" className="form-control" placeholder="Password"
                                    name="password" value={password}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            { error && <p className="text-warning">{error}</p>}
                            <div className="mb-3">
                                <button className="btn btn-primary float-end">Login</button>
                                <div className="clearfix"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    );
}