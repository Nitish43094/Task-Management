const BASE_URL = "http://localhost:4000/api"

export const userEndPoint = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    DELETE_API: BASE_URL + "/auth/delete-user",
    CHANGEPASSWORD_API: BASE_URL + "/auth/changePassword",
    REACTPASSWORD_API: BASE_URL + "/auth/rect-password",
    REACTPASSWORDTOKEN_API: BASE_URL + "/auth/rect-password-token",
}

export const taskEndPoint = {
    CREATETASK_API: BASE_URL + "/task/create-task",
    GETALLtASK_API: BASE_URL + "/task/get-all-task",
    GETALLTASKBYUSER_API : BASE_URL + "/task/get-all-task-by-user",
    UPDATETASK_API: BASE_URL + "/task/update-task",
    DELETETASK_API: BASE_URL + "/task/delete-task",
}

export const feedEndPoint = {
    CREATEFEED_API: BASE_URL + "/feed/create-feed",
    GETFEED_API: BASE_URL + "/feed/get-feed",
    GETALLFEED_API: BASE_URL + "/feed/get-all-feed",
    GETALLFEEDBYUSER_API : BASE_URL + "/feed/get-all-feed-by-user",
    UPDATEFEED_API: BASE_URL + "/feed/update-feed",
    DELETEFEED_API: BASE_URL + "/feed/delete-feed",
}