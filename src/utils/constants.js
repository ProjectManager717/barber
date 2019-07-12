const Base_url = "http://ec2-3-14-204-57.us-east-2.compute.amazonaws.com:5000";
const barberPath = "/api/auth/";
const clientPath = "/api/clientAuth/";
const clientPath1 = "/api/clients/";
const path2 = "/api/user/";
const path3 = "/api/";


export const constants = {
    portfolioImagePath: "http://ec2-3-14-204-57.us-east-2.compute.amazonaws.com:5000/images/barberPortfolio/",

    BarberLogin: Base_url + barberPath + "login",
    BarberSocialLogin: Base_url + barberPath + "socialLogin",
    BarberSignUp: Base_url + barberPath + "signup",
    BarberForgetPassword: Base_url + barberPath + "forgot",
    BarberResetPassword: Base_url + barberPath + "reset",
    BarberWorkingHours: Base_url + path2 + "getworkingHour",
    UpdateWorkingHours: Base_url + path2 + "slotWorkingHours",
    ClientBlastMessage: Base_url + path2 + "sendClientBlast",
    GetNotifications: Base_url + path3 + "notifications",
    GetCalenderSlots: Base_url + path2 + "calenderSlots",
    BarberBookingPreference: Base_url + path3 + "settings",
    UpdateBookingPreference: Base_url + path3 + "settings/bookingPreference",
    UpdateCancellation: Base_url + path3 + "settings/cancellationPolicy",
    UpdateSurgePricing: Base_url + path3 + "settings/surgePricing",
    BarbersProfile: Base_url + path2,
    BarberAddService: Base_url + path2 + "addservice",
    BarberUpdateService: Base_url + path2 + "updateService",
    GetReviews: Base_url +"/api/reviews?",
    BarberAddMobilePaySetting: Base_url + "/api/mobilePay/" + "add",
    BarbersProfileUpdate: Base_url + path2+"update",


    ClientLogin: Base_url + clientPath + "login",
    ClientSocialLogin: Base_url + clientPath + "socialLogin",
    ClientSignUp: Base_url + clientPath + "signup",
    ClientForgetPassword: Base_url + clientPath + "forgot",
    ClientResetPassword: Base_url + clientPath + "reset",
    ClientProfileUpdate: Base_url + clientPath1 + "update",
    ClientPaymentMethod: Base_url + "/api/paymentCard/" + "add",
    ClientRecentBookings: Base_url + clientPath1 + "client_recent_booking",
    ClientFavoritBarbers: Base_url + clientPath1 + "favoriteBarbers",
    ClientBarbersProfile: Base_url + path2,
    ClientBarbersSearch: Base_url + clientPath1 + "clientSearchBarber",
    ClientProfileData: Base_url + clientPath1,
    ClientBarbersProfileSlots: Base_url + path2+"getSlots",
    ClientBookAppointment: Base_url + path2+"oppointment",
    ClientAddFavoriteBarber: Base_url + clientPath1+"favoriteBarber",
    ClientRemoveFavoriteBarber: Base_url + clientPath1+"un_favoriteBarber",

};