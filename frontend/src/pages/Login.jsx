import React from 'react'
import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import {toast} from 'react-toastify'
function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();



    }

    return (
        <div>
            <section className="container heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>
                    Please login to your account
                </p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className='form-control'
                            id='email'
                            value={email}
                            name='email'
                            required
                            onChange={onChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className="form-group">
                        <input type="password" className='form-control'
                            id='password'
                            value={password}
                            name='password'
                            required
                            onChange={onChange}
                            placeholder='Enter your password'
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>

        </div>

    )
}

export default Login