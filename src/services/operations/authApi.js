import toast from 'react-hot-toast';

import { setUser, setloading, setToken } from '../../Slice/userSlice';
import { apiConnector } from '../apiConnector';
import { userEndPoint } from '../apis';

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    DELETE_API,
    CHANGEPASSWORD_API,
    REACTPASSWORDTOKEN_API,
    REACTPASSWORD_API,
} = userEndPoint;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Sending...");
        dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, { email });
            console.log("Sending API Response...............", response);
            if (!response?.data?.success) {
                throw new Error("Failed to send OTP");
            }
            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
        } catch (error) {
            console.error("SENDOTP API ERROR............", error);
            toast.error(error?.response?.data?.message || "Could Not Send OTP");
        } finally {
            dispatch(setloading(false));
            toast.dismiss(toastId);
        }
    };
}
export function signup(name, email, password, otp, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, { name, email, password, otp })
            // console.log(response);
            if (!response?.data?.success) {
                throw new Error(response.error);
            }
            toast.success("Signup Successfully");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/register")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });
            console.log("LOGIN API RESPONSE............", response?.data?.user)
            if (!response?.data?.success) {
                throw new Error(response?.data.message);
            }
            toast.success("Logined")
            dispatch(setToken(response?.data?.token))
            dispatch(setUser(response?.data?.user));

            localStorage.setItem("token", JSON.stringify(response?.data?.token));
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            navigate("/");
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setUser(null))
        dispatch(setToken(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate('/');
    }
}
export function deleteUser(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("DELETE", DELETE_API, null, {
                Authorization: `Bearer ${token}`
            })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("DELETE_User_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}

export function passwordChange(oldPassword, newPassword, cnfPassword, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", CHANGEPASSWORD_API, { oldPassword, newPassword, cnfPassword }, {
                Authorization: `Bearer ${token}`
            })
            console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Changed Successfully")
        } catch (error) {
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setloading(true))
        try {
            const response = await apiConnector("PSOT", REACTPASSWORDTOKEN_API, { email })
            console.log("RESET PASSWORD TOKEN RESPONSE....", response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            toast.success("Resent Email send");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, cnfPassword, token) {
    return async (dispatch) => {
        dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", REACTPASSWORD_API, { password, cnfPassword, token });
            console.log("RESET Password RESPONSE ... ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
        }
        catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Unable to reset password");
        }
        dispatch(setloading(false));
    }
}