//const Base_url = "http://ec2-3-14-204-57.us-east-2.compute.amazonaws.com:5000";
//const Base_url = "https://appcrates.net:8088";
// const Base_url = "https://clyprstatistics.com";
const Base_url = "http://clyprstatistics.com:5000";
const barberPath = "/api/auth/";
const clientPath = "/api/clientAuth/";
const clientPath1 = "/api/clients/";
const path2 = "/api/user/";
const path3 = "/api/";


export const constants = {
    portfolioImagePath: Base_url+"/images/barberPortfolio/",
    profileImagePath: Base_url+"/images/client/",
    BarberLogin: Base_url + barberPath + "login",
    BarberSocialLogin: Base_url + barberPath + "socialLogin",
    BarberSignUp: Base_url + barberPath + "signup",
    BarberForgetPassword: Base_url + barberPath + "forgot",
    BarberResetPassword: Base_url + barberPath + "reset",
    BarberWorkingHours: Base_url + path2 + "getworkingHour",
    UpdateWorkingHours: Base_url + path2 + "slotWorkingHours",
    ClientBlastMessage: Base_url + path2 + "sendClientBlast",
    GetNotifications: Base_url + path3+"notifications/" + "getnotification",
    GetCalenderSlots: Base_url + path2 + "bookinAgainstBarber",
    BarberBookingPreference: Base_url + path3 + "settings",
    UpdateBookingPreference: Base_url + path3 + "settings/bookingPreference",
    UpdateCancellation: Base_url + path3 + "settings/cancellationPolicy",
    UpdateSurgePricing: Base_url + path3 + "settings/surgePricing",
    BarbersProfile: Base_url + path2,
    BarberAddService: Base_url + path2 + "addservice",
    BarberUpdateService: Base_url + path2 + "updateService",
    GetReviews: Base_url + "/api/reviews/" + "get_review",
    BarberAddMobilePaySetting: Base_url + "/api/stripes/" + "CreateAccount_barber",
    BarbersSendVerfication: Base_url + path2 + "sendVerificationCode",
    BarbersProfileUpdate: Base_url + path2 + "update",
    BarbersDeleteImage: Base_url + path2 + "portfolio_ImageDelete",
    BarberUpdateAppointmentStatus: Base_url + path2 + "updateAppointmentStatus",
    BarberGetRevenue: Base_url + path2 + "revenue_perWeek",
    BarberUpdateAppointmentByQR: Base_url + path2 + "qr_code_app",
    BarberGetClients: Base_url + path2 + "new_and_recent",
    ClientLogin: Base_url + clientPath + "login",
    ClientSocialLogin: Base_url + clientPath + "socialLogin",
    ClientSignUp: Base_url + clientPath + "signup",
    //ClientSendVerfication: Base_url + clientPath1 + "sendVerificationCode",
    ClientForgetPassword: Base_url + clientPath + "forgot",
    ClientResetPassword: Base_url + clientPath + "reset",
    ClientProfileUpdate: Base_url + clientPath1 + "update_client",
    ClientPaymentMethod: Base_url + "/api/paymentCard/" + "add",
    ClientRecentBookings: Base_url + clientPath1 + "client_recent_booking",
    ClientPendingReviews: Base_url +  "/api/reviews/" + "review_status",
    ClientFavoritBarbers: Base_url + clientPath1 + "favoriteBarbers",
    ClientBarbersProfile: Base_url + path2,
    ClientBarbersSearch: Base_url + clientPath1 + "clientSearchBarber",
    ClientProfileData: Base_url + clientPath1,
    ClientBarbersProfileSlots: Base_url + path2 + "getSlots",
    ClientBarbersProfileSlotsWithOutLogin: Base_url + path2 + "getSlotsGuestUser",
    getDaySlots: Base_url + path2 + "onlySlots",
    ClientBookAppointment: Base_url + path2 + "oppointment",
    ClientAddFavoriteBarber: Base_url + clientPath1 + "favoriteBarber",
    ClientRemoveFavoriteBarber: Base_url + clientPath1 + "un_favoriteBarber",
    ClientSendVerfication: Base_url + clientPath1 + "client_sendVerificationCode",
    ClientAddReview: Base_url + "/api/reviews/" + "add_review",
    ClientReciept: Base_url + clientPath1 + "recipt_client",
    ClientRecieptCancelled: Base_url + "/api/user/" + "reciept_cancelled",
    ClientNewStripeUser: Base_url + "/api/stripes/" + "stripe_CreateCustomer",
    ClientStripePaymentFlow: Base_url + "/api/stripes/" + "payment_flow",
    ClientGetAllAppointments: Base_url + clientPath1 + "montly_client_booking",
    clientAddCard:Base_url+path3+"stripes/stripe_CreateCustomer",
    CardList:Base_url+path3+"stripes/get_card",
    ExperienceImages:Base_url+path2+"add_portFolio",
    PaymentFLow:Base_url+path3+"stripes/payment_flow",
    ClientVerifyCode:Base_url+clientPath1+"verifyCode",
    BarberVerifyCode:Base_url+path2+"verifyCode",
    ClientChangePassword:Base_url+clientPath+"change",
    barberChangePassword:Base_url+barberPath+"change",
    ClientDeleteCard:Base_url+path3+"stripes/delete_card_customer",
    BarberAddPaymentCard:Base_url+path3+"stripes/stripe_barber_customer",
    BarberCardList:Base_url+path3+"stripes/get_card_barber",
    BarberDeleteCard:Base_url+path3+"stripes/delete_card_berber",
    BarberPaymentFlow:Base_url+path3+"stripes/sub_pay_flow",
    BarberSubscriptionInfo:Base_url+path3+"stripes/barber_sub_info",
    CancelBarberSubscription:Base_url+path3+"stripes/cancel_subscription",
    DiscoverMePaymentMethod:Base_url+path3+"stripes/discover_payment",
    UpdateDiscoverMe:Base_url+path3+"settings/getDiscovered",
    GetDiscoverMe:Base_url+path3+"settings/getDiscoverdInfo",
    TopRatedBarbers:Base_url+clientPath1+"top_rated_barbers",
    BarberNotificationAlert:Base_url+path3+"settings/notificationAlert",
    ClientNotificationAlert:Base_url+clientPath1+"notificationAlert",
    ServiceDelete:Base_url+path2+"service_delete",
    ClientUpdateAppointmentStatus: Base_url + clientPath1 + "updateAppointmentStatus",
    BarberCashOut:Base_url+path3+"stripes/payout",

     StripeKey:"pk_live_BXlctkFE5BDLwdwxP67IFm1D",//Live account
    // StripeKey : 'pk_test_U4Ri0H7rP3PClZwTI5Z2r78J',//testing account*/

};
