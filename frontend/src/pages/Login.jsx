import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const { email, password } = formData;

    const dispatch = useDispatch();
    const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth);


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        //Redirect when logged in
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [isError, isSuccess, user, message, navigate, dispatch]);


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password


        }

        dispatch(login(userData));




    }


    if (isLoading) {
        return <Spinner />
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