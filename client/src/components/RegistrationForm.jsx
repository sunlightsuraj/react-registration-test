import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { register } from '../services/auth.service';

export default function RegistrationForm(props) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const {first_name, last_name, email, password} = formData;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        
        register({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })
        .then((data) => {
            console.log(data);
            setIsLoading(false);
            history.push('/login');
        }).catch(err => {
            setIsLoading(false);
            setError(err.response.data.message);
        });
    }

    return (
        <div className="row" >
            <div className='col-md-3'></div>
            <div className="col-md-6">
                <div className="card card-primary">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Name:</span>
                                <input type="text" className="form-control" value={first_name} name="first_name" placeholder="First Name" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Name:</span>
                                <input type="text" className="form-control" value={last_name} name="last_name" placeholder="Last Name" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Email:</span>
                                <input type="email" className="form-control" value={email} name="email" placeholder="Email Address" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Password:</span>
                                <input type="password" className="form-control" value={password} name="password" placeholder="Password" onChange={handleChange} />
                            </div>
                            {
                                error ? (
                                    <p className="text-danger">{error}</p>
                                ) : ''
                            }
                            <div className="mb-3">
                                <button className="btn btn-primary float-end">{ isLoading ? 'Loading...' : 'Submit' }</button>
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