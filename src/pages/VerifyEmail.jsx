import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input"
import { BiArrowBack } from "react-icons/bi";
import { signup } from "../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const VerifyEmail = () => {
    const [otp, setOtp] = useState("")
    const { signupData, loading } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        if (!signupData) {
            navigate('/signup')
        }
    }, [])

    const handlerVerifiyAndSignup = (e) => {
        e.preventDefault();
        const {
            name,
            email,
            password,
        } = signupData
        dispatch(signup(name,email, password, otp, navigate))
    }
    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {
                loading === true ?
                    (<div>
                        <span class="loader">Loading</span>
                    </div>
                    )
                    :
                    (
                        <div className="max-w-[500px] p-4 lg:p-8">
                            <h1 className="text-richblack-5 font-semibold text-[1.875rem] loading-[2.375rem]">
                                Verify Email
                            </h1>
                            <p className="text-[1.125rem] loading-[1.625rem] my-4 ring-richblack-100">
                                A verifaction code has been sent to you. Enter the code Below
                            </p>
                            <form onSubmit={handlerVerifiyAndSignup}>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            placeholder="-"
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }}
                                            className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5
                                        aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                        />
                                    )}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 6px",
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                                >
                                    Verify Email
                                </button>
                            </form>
                            <div className="mt-6 flex items-center justify-between">
                                <Link to="/signup">
                                    <p className="text-richblack-5 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Signup
                                    </p>
                                </Link>
                                <button
                                    className="flex items-center text-blue-100 gap-x-2"
                                    onClick={() => dispatch(sendOTP(signupData.email, navigate))}
                                >
                                    Resent it
                                </button>
                            </div>
                        </div>
                    )

            }
        </div>
    )
}

export default VerifyEmail;