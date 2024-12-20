import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/actions/authActions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api/auth/register`, data,{ timeout: 10000 })
      .then((res) => {
        dispatch(registerUser(res.data));
        navigate('/login');
      })
      .catch((err) => console.log(err));
    };

    const password = watch('password')

  return (
    <div className='container mt-4'>
      <h2 className='text-center'>Registration form</h2>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className='mb-3' >
            <label htmlFor="firstName" className='form-label'>First Name</label>
            <input type="text"
            id='firstName'
            {...register('firstName', { required: 'First name is required' })}
            className='form-control' />
            { errors.firstName && <p className='text-danger'>{errors.firstName.message}</p>}
        </div>
        
        <div className='mb-3'>
            <label htmlFor="lastName" className='form-label'>Last Name</label>
            <input type="text"
            id='lastName'
            {...register('lastName', { required: 'Last name is required' })}
            className='form-control' />
            { errors.lastName && <p className='text-danger'>{errors.lastName.message}</p>}
        </div>

        <div className='mb-3'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="email"
            id='email'
            {...register('email', { required: 'Email is required',
                // pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
             })}
            className='form-control' />
            { errors.email && <p className='text-danger'>{errors.email.message}</p>}
        </div>
        
        <div className='mb-3'>
            <label htmlFor="phoneNumber" className='form-label'>Phone Number</label>
            <input type="text"
            id='phone'
            {...register('phone', { required: 'Phone number is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Invalid Phone number' }
             })}
            className='form-control' />
            { errors.phone && <p className='text-danger'>{errors.phone.message}</p>}
        </div>
        
        <div className='mb-3'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password"
            name='password'
            id='password'
            {...register('password', { required: 'Password is required',
                minLength: { value: 6, message: 'Password must be atleast 6 characters' }
             })}
            className='form-control' />
            { errors.password && <p className='text-danger'>{errors.password.message}</p>}
        </div>
        
        <div className='mb-3'>
            <label htmlFor="confirmPassword" className='form-label'> Confirm Password</label>
            <input type="password"
            name='confirmPassword'
            id='confirmPassword'
            {...register('passwordConfirm', { required: 'Confirm Password is required',
                validate: value => value === password || 'Password do not match'
             })}
            className='form-control' />
            { errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
        </div>

        <div className='mb-3'>
            <input type="checkbox"
            name='terms'
            id='terms'
            {...register('acceptTerms', { required: 'You must accept terms and condition',
             })}
            className='form-check-input ' />
            <label htmlFor="terms" className='form-check-label'>Accept Terms and Condition</label>
            { errors.terms && <p className='text-danger'>{errors.terms.message}</p>}
        </div>

        <button type='submit' className='btn btn-primary' >Register</button>
      </form>
    </div>
  )
}

export default Register
