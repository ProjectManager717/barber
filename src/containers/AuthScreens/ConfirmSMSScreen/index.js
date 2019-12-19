import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions, SafeAreaView, StackActions} from 'react-navigation';
import CodeInput from 'react-native-confirmation-code-input';
import {styles} from './styles';
import {CloseButton, RedButton} from '../../../components';
import {Colors} from '../../../themes';
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";

let Code = "", number = "";


class ConfirmSMSScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        Code = navigation.getParam('Code');
        number = navigation.getParam("number");
        console.log("gettingUSersignIn--->" + Code);

        this.state = {
            No: undefined,
            codeVerified: false,
            ShowLoading: false,
        };
        this.state.No = number;
    }

    onClose = () => {
        // alert('onClose');
        this.props.navigation.goBack();
    };

    onFinishCheckingCode = (isValid, code) => {
        console.info('isValid', isValid);
        console.info('code', code);
        if (isValid) {
            if (code === Code) {
                this.setState({codeVerified: true})
            }
        } else {
            Alert.alert('Invalid!', "Code you entered is wrong.");
        }
    };

    onSubmit = () => {
        if (this.state.codeVerified) {
            if (Preference.get("userType") === "Barber") {
                this.BarberVerifyCode();
            } else if (Preference.get("userType") === "Client") {
               this.ClientVerifyCode();
            }
        }
    };


    BarberVerifyCode () {
        this.setState({showLoading: true});
        var Details = {

            email: Preference.get("userEmail"),
            verification_code: Code

        }
        console.log("DETAILSCODE==>"+JSON.stringify(Details));
        var FormBody = [];
        for (var Property in Details) {
            var encodedKey = encodeURIComponent(Property);
            var encodedValue = encodeURIComponent(Details[Property]);
            FormBody.push(encodedKey + "=" + encodedValue);
        }
        FormBody = FormBody.join("&");
        fetch(constants.BarberVerifyCode, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:FormBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseBarberVerification-->", "-" + JSON.stringify(response));
                this.setState({showLoading: false});
                if (response.ResultType === 1) {
                    Preference.set({
                        barberlogin: true,
                    });
                    const goToScreen = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'BarberEditProfile'})],
                    });
                    this.props.navigation.dispatch(goToScreen);
                } else {
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        Preference.set({
                            barberlogin: false,
                        });
                        alert(response.Message);
                    }

                }

            })
            .catch(error => {
                this.setState({showLoading: false});
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: " + error);
            });


    };
    ClientVerifyCode () {
        this.setState({showLoading: true});
        var Details = {

            email: Preference.get("userEmail"),
            verification_code: Code

        }
        var FormBody = [];
        for (var Property in Details) {
            var encodedKey = encodeURIComponent(Property);
            var encodedValue = encodeURIComponent(Details[Property]);
            FormBody.push(encodedKey + "=" + encodedValue);
        }
        FormBody = FormBody.join("&");
        fetch(constants.ClientVerifyCode, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: FormBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                this.setState({showLoading: false});
                if (response.ResultType === 1) {
                    Preference.set({
                        clientlogin: true,
                    });
                    const goToScreen = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'ClientEditProfile'})],
                    });
                    this.props.navigation.dispatch(goToScreen);

                } else {
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        Preference.set({
                            clientlogin: false,
                        });
                        alert(response.Message);
                    }

                }

            })
            .catch(error => {
                this.setState({showLoading: false});
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: " + error);
            });


    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.closeContainer}>
                    <CloseButton onPress={this.onClose}/>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.whiteBoldBigText}>
                        Confirmation
                    </Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.whiteText}>
                            {`We just sent on SMS to\n ${this.state.No}\n with your verification code.\nEnter the 2-step verification code below.`}
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <CodeInput
                            ref="codeInputRef2"
                            avilabeSlot  keyboardType="numeric"
                            codeLength={5}
                            className="border-b"
                            compareWithCode={Code}
                            autoFocus={false}
                            codeInputStyle={styles.codeInputStyle}
                            onFulfill={this.onFinishCheckingCode}
                            inactiveColor={Colors.border}
                        />
                    </View>
                    <View style={styles.resendContainer}>
                        <Text style={styles.whiteSmallText}>
                            {`Didn't get it? `}
                        </Text>
                        <TouchableOpacity onPress={this.onClose} style={styles.resendButton}>
                            <Text style={styles.whiteSmallBoldText}>Resend code</Text>
                        </TouchableOpacity>
                    </View>
                    <RedButton label="Submit" onPress={this.onSubmit}/>
                </View>
                {this.state.showLoading && <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    position: "absolute",
                    opacity: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")}
                           style={{width: 60, height: 60, opacity: 1,}}/>
                </View>}

            </SafeAreaView>
        )
    }
}

export default ConfirmSMSScreen;
