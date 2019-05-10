const Base_url = "http://ec2-3-14-204-57.us-east-2.compute.amazonaws.com:5000";
const path = "/api/auth/";
const path2 = "/api/user/";

export const constants = {
    BarberLogin : Base_url + path + "login",
    BarberSignUp : Base_url + path + "signup",
    BarberForgetPassword : Base_url + path + "forgot",
    BarberResetPassword : Base_url + path + "reset",
    BarberWorkingHours : Base_url + path2 + "workingHour"
};