import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPasswordResetToken } from "../../services/operations/authApi";
const ForgetPassword = () => {
  const { loading } = useSelector((state) => state.user);
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  
  const handleOnsubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent))
  }
  return (
    <div className="text-richblack-5 flex justify-center">
      {
        loading ?
          (<div className="flex items-center justify-center text-white">
            <span class="loader"></span>
          </div>)
          :
          (<div className="flex flex-col items-start w-[30%] mx-auto my-auto">
            <h1>
              {
                !emailSent ? "Reset Your Password" : "Check Your Mail"
              }
            </h1>
            <p>
              {
                !emailSent ? "Have no fear. well email you instructions to reset your password. it you dont have access to your email we can try account Recovery"
                  : `We have sent The reset email to ${email}`
              }
            </p>
            <form onSubmit={handleOnsubmit} className="flex gap-5 items-center justify-center">
              {
                !emailSent && (
                  <label>
                    <p>Email Adderss</p>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email Address"
                      className="bg-richblack-800 p-2 rounded-md border" />
                  </label>
                )
              }
              <button
                type="submit">
                {
                  !emailSent ? "Reset Password" : "Resent Email"
                }
              </button>
            </form>
            <div>
              <Link to="/login">
                <p>Back to Login</p>
              </Link>
            </div>
          </div>)
      }
    </div>
  )
}
export default ForgetPassword;