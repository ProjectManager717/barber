import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, Input, RedButton} from '../../../components';
import {constants} from "../../../utils/constants";
import Preference from 'react-native-preference';

export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CurrentPassword: "",
            NewPassword: "",
            ConfirmPassword: "",
            UserType:Preference.get("userType"),
            showLoading:false
        };
    }

    onChangeText = (key, value) => {
        this.setState({[key]: value});
    };
    Reset = () => {
   this.ChangePassword();

    };
    ChangePassword = () => {

        if (this.state.UserType === "Barber") {
            if (this.state.CurrentPassword === "" && this.state.NewPassword==="") {

                alert("Please Fill Password Fields!");
            } else {
                this.setState({showLoading:true});
                var details = {
                    email:Preference.get("userEmail"),
                    current_password:this.state.CurrentPassword,
                    new_password:this.state.NewPassword,
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                fetch(constants.barberChangePassword, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        this.setState({showLoading:false});
                        console.log("response-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {

                            alert("Your password has been Changed");
                            this.props.navigation.goBack();
                        } else {
                            this.setState({showLoading:false});
                            if (response.ResultType === 0) {
                                alert(response.Message);
                            }
                        }
                    })
                    .catch(error => {
                        this.setState({showLoading:false});
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        alert("Error: " + error);
                    });
                //Keyboard.dismiss();
            }
        } else {
            if (this.state.CurrentPassword === "" && this.state.NewPassword==="") {
                alert("Please Fill Password Fields!");
            } else {
                this.setState({showLoading:true});
                var details = {
                    email:Preference.get("userEmail"),
                    current_password:this.state.CurrentPassword,
                    new_password:this.state.NewPassword,
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                fetch(constants.ClientChangePassword, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        this.setState({showLoading:false});
                        console.log("response-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {

                            alert("Your password has been Changed");
                            this.props.navigation.goBack();
                        } else {
                            if (response.ResultType === 0) {
                                alert(response.Message);
                            }
                        }
                    })
                    .catch(error => {
                        this.setState({showLoading:false});
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        alert("Error: " + error);
                    });
                //Keyboard.dismiss();
            }
        }
    };

    onClose=()=>{
        this.props.navigation.goBack();
    }

    render() {
        const {CurrentPassword, NewPassword, ConfirmPassword} = this.state;
        const isValidCurrentPassword = CurrentPassword.length >= 6;
        const isvalidNewPassword = NewPassword.length >= 6;
        const isValidPasswordConfirm = ConfirmPassword.length >= 6 && (NewPassword === ConfirmPassword);
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.closeContainer}>
                    <CloseButton onPress={this.onClose}/>
                </View>
                <View style={{
                    width: "100%",
                    height: "10%",
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: 30,
                    marginBottom: 20
                }}>
                    <Image style={{resizeMode: "contain", width: 150, height: 100}}
                           source={require("../../../assets/images/logo.png")}/>
                </View>
                <KeyboardAwareScrollView style={styles.mainContainer}>
                    <View style={[styles.subContainer, {margginTop: 10}]}>
                        <Text style={styles.whiteBoldBigText}>
                            Change Password
                        </Text>
                        <Input
                            iconSource={require('../../../assets/icon_email.png')}
                            style={styles.inputContainer}
                            value={CurrentPassword}
                            placeholder="Current Password"
                            onChangeText={(text) => this.onChangeText('CurrentPassword', text)}
                            secureTextEntry
                            isValid={isValidCurrentPassword}/>


                        <Input
                            iconSource={require('../../../assets/icon_email.png')}
                            style={styles.inputContainer}
                            value={NewPassword}
                            placeholder="New Password"
                            onChangeText={(text) => this.onChangeText('NewPassword', text)}
                            secureTextEntry
                            isValid={isvalidNewPassword}
                        />
                        <Input
                            iconSource={require('../../../assets/icon_email.png')}
                            style={styles.inputContainer}
                            value={ConfirmPassword}
                            placeholder="Confirm New Password"
                            onChangeText={(text) => this.onChangeText('ConfirmPassword', text)}
                            secureTextEntry
                            isValid={isValidPasswordConfirm}
                        />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <RedButton style={styles.loginButton} label="Reset" onPress={this.Reset} textStyle={{width:"100%",textAlign:"center"}}/>
                    </View>
                </KeyboardAwareScrollView>
                {this.state.showLoading && <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    position: "absolute",
                    opacity: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")} style={{width:60,height:60, opacity: 1,}}/>
                </View>}
            </SafeAreaView>


        )


    }

}






