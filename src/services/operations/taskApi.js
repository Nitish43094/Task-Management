import toast from "react-hot-toast";
import { setTask, setLoading, removeTask } from '../../Slice/taskSlice'
import { apiConnector } from "../apiConnector";
import { taskEndPoint } from "../apis";
const {
    CREATETASK_API,
    GETALLtASK_API,
    GETALLTASKBYUSER_API,
    UPDATETASK_API,
    DELETETASK_API,
} = taskEndPoint;
export function createTask(task,description, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CREATETASK_API, {task,description}, {
                Authorization: `Bearer ${token}`
            })

            console.log("CREATE Task RESPONSE API IS ......", response);
            if (!response.data.success) {
                throw new Error(response.data.success);
            }
            toast.success("Task Created");
        } catch (error) {
            console.log("Somthing is error while createing Task")
            console.log(error);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function getAllTask() {
    return async (dispatch) => {
        let result = [];
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("GET", GETALLtASK_API, null);
            console.log("GETTING ALL Task RESPONSE IS......", response?.data?.data);

            if (!response?.data?.success) {
                throw new Error("Failed to fetch tasks");
            }

            result = response?.data?.data;
            dispatch(setTask(result));
            toast.success("Successfully fetched all tasks");
        } catch (error) {
            console.error("Something went wrong while fetching tasks:", error);
            toast.error("Failed to fetch tasks. Please try again.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }

        return result;
    };
}

export function getAllTaskbyUser(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try {
            const response = await apiConnector("GET", GETALLTASKBYUSER_API,null,{
                Authorization : `Bearer ${token}`
            });
            console.log("Task RESPONSE API IS ", response.data);
            if (!response?.data?.success) {
                throw new Error("Could Not Fetch Course Categories");
            }
            result = response?.data;
            dispatch(setTask(response?.data));
        }
        catch (error) {
            console.log("Task API ERROR............", error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const updateTask = async (data, token, navigate) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("PUT", UPDATETASK_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE TASK RESOPNSE API....", response);
        if (!response?.data) {
            throw new Error(response.data);
        }
        toast.success("Update Successfully");
    } catch (error) {
        console.log("Somthing is Error while Updating Task");
        console.log(error);
    }
    toast.dismiss(toastId);;
}

export const deleteTask = async (id, token, dispatch) => {
    const toastId = toast.loading("Deleting...");
    try {
        const response = await apiConnector("DELETE", DELETETASK_API, {id}, {
            Authorization: `Bearer ${token}`,
        });

        console.log("DELETE TASK RESPONSE API...", response);

        if (!response?.data) {
            throw new Error("Failed to delete task.");
        }
        dispatch(removeTask(id));
        toast.success("Task deleted successfully!");
    } catch (error) {
        console.error("Error while deleting the task:", error);
        toast.error("Failed to delete the task.");
    } finally {
        toast.dismiss(toastId);
    }
};

