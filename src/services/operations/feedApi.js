import toast from "react-hot-toast";
import { setFeed, setloading } from '../../Slice/feedSlice';
import { apiConnector } from "../apiConnector";
import { feedEndPoint } from '../apis';

const {
    CREATEFEED_API,
    UPDATEFEED_API,
    GETALLFEED_API,
    GETALLFEEDBYUSER_API,
    GETFEED_API,
    DELETEFEED_API,
} = feedEndPoint;

export const createFeed = async (data, token) => {
    const toastId = toast.loading("Loading....");
    try {
        const response = await apiConnector("POST", CREATEFEED_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Section")
        }
        toast.success("Feed Created.")
    } catch (error) {
        console.log("CREATE Feed API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

export const updateFeed = async (title,currentFeedId, token) => {
    const toastId = toast.loading("Loading...");
    try {
        console.log(title," ",currentFeedId)
        const response = await apiConnector("PUT", UPDATEFEED_API, {title,currentFeedId}, {
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
    } catch (error) {
        console.log("UPDATE Feed API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}
export function getAllFeedbyUser(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try {
            const response = await apiConnector("GET", GETALLFEEDBYUSER_API,null,{
                Authorization : `Bearer ${token}`
            });
            // console.log("FEED RESPONSE API IS ", response);
            if (!response?.data?.success) {
                throw new Error("Could Not Fetch Course Categories");
            }
            result = response?.data;
            dispatch(setFeed(response.data));
        }
        catch (error) {
            console.log("GET_ALL_COURSE_API API ERROR............", error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}
export function getAllFeed() {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try {
            const response = await apiConnector("GET", GETALLFEED_API);
            console.log("FEED RESPONSE API IS ", response);
            if (!response?.data?.success) {
                throw new Error("Could Not Fetch Course Categories");
            }
            result = response?.data;
            dispatch(setFeed(response.data));
        }
        catch (error) {
            console.log("GET_ALL_COURSE_API API ERROR............", error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}


export const getFeed = async (id, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", GETFEED_API,id);
        console.log("GET FEED RESPONSE API IS ", response.success);
        if (!response.data.success) {
            throw new Error(response.data.success);
        }
        result = response?.data;
        toast.success("Get Feed Successfully");
    } catch (error) {
        console.log("Error are ", error);
        console.log("Somthig is wrang while geting feet");
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteFeet = async (id, token, navigate) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETEFEED_API, {id}, {
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE RESPONSS API............", response);
        if (!response?.data?.success) {
            throw new Error(response.data.success);
        }
        toast.success("Deleted Feed");
        navigate("/");
    } catch (error) {
        console.log("DELETE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
}