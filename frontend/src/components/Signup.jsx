import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "..";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "Student",
    gender: "",
  });

  const [errors, setErrors] = useState({}); // For storing validation errors
  const navigate = useNavigate();

  // Handle change in gender radio buttons
  const handleGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    if (!user.fullName) newErrors.fullName = "Full Name is required";
    if (!user.username) newErrors.username = "Username is required";
    if (!user.password) newErrors.password = "Password is required";
    if (!user.role) newErrors.role = "Role is required";
    if (!user.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }

    // Reset form state after submission
    setUser({
      fullName: "",
      username: "",
      password: "",
      role: "",
      gender: "",
    });
    setErrors({}); // Clear errors after submission
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className={`w-full input input-bordered h-10 ${errors.fullName ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Full Name"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className={`w-full input input-bordered h-10 ${errors.username ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={`w-full input input-bordered h-10 ${errors.password ? 'border-red-500' : ''}`}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Role</span>
            </label>
            <select
              className={`w-full input input-bordered h-10 ${errors.role ? 'border-red-500' : ''}`}
              name="role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="institute">Institute</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center mr-4">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={handleGenderChange}
                className="radio mr-2"
              />
              <label htmlFor="male" className="cursor-pointer">Male</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={handleGenderChange}
                className="radio mr-2"
              />
              <label htmlFor="female" className="cursor-pointer">Female</label>
            </div>
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          <p className="text-center my-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
