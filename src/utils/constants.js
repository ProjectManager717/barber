const Base_url = "http://ec2-3-14-204-57.us-east-2.compute.amazonaws.com:5000";
const path = "/api/auth/";
const path2 = "/api/user/";
const path3 = "/api/";

export const constants = {
    BarberLogin : Base_url + path + "login",
    BarberSignUp : Base_url + path + "signup",
    BarberForgetPassword : Base_url + path + "forgot",
    BarberResetPassword : Base_url + path + "reset",
    BarberWorkingHours : Base_url + path2 + "workingHour",
    UpdateWorkingHours : Base_url + path2 + "updateWorkingHours",
    ClientBlastMessage : Base_url + path2 + "sendClientBlast",
    GetNotifications : Base_url + path3 + "notifications",
    GetCalenderSlots : Base_url + path2 + "calenderSlots"

};