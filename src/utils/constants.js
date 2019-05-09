const Base_url = "http://ec2-3-14-204-57.us-east-2.compute.amazonaws.com:5000";
const path = "/api/auth/";

export const constants = {
    BarberLogin : Base_url + path + "login",
    BarberSignUp : Base_url + path + "signup",
};