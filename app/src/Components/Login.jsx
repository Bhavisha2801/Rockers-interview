import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios
  .post(`${process.env.REACT_APP_BACKEND_API}/api/auth/login`, data)
  .then((res) => {
    dispatch(loginUser(res.data));
    Cookies.set('authToken', res.data.token, { expires: 1 })
    navigate('/');
  })
  .catch((err) => console.log(err));
};

  return (
    <div className="container mt-4">
      <h2 className="text-center">Login form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            className="form-control"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
            })}
            className="form-control"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
