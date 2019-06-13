import React, {Component} from 'react';
import {ImageBackground, View, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {styles} from './styles';
import {CloseButton, RedButton} from '../../../components/Buttons';
import {formatPhoneNumber, checkPhoneNumberValidation} from '../../../utils';
import Preference from "react-native-preference";

class SMSScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            formattedNumber: ''
        }
    }

    onClose = () => {
        alert('close');
    };

    onContinue = () => {
        const {number} = this.state;
        if (checkPhoneNumberValidation(number)) {
            if (Preference.get("userType") === "Barber") {
                this.props.navigation.navigate('ConfirmSMSScreen');
            }else
            {
                this.props.navigation.navigate('ConfirmSMSScreen');
            }
        } else {
            alert('invalid format');
        }

    };

    onChangeText = (str) => {
        const number = str.replace(/\D/g, '');
        const formattedNumber = formatPhoneNumber(str);
        this.setState({number, formattedNumber});
    };

    render() {
        const {formattedNumber} = this.state;
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.parentContainer}>
                    <ImageBackground
                        source={require('../../../assets/img_background4.png')}
                        style={styles.container}
                        imageStyle={styles.backgroundImg}
                    >
                        <View style={styles.closeContainer}>
                            <CloseButton onPress={this.onClose}/>
                        </View>
                        <Text style={styles.titleText}>
                            {`Confirm using\nyour Phone Number`}
                        </Text>
                        <View style={styles.mainContainer}>
                            <View style={[styles.inputContainer]}>
                                <View style={styles.countryCodeContainer}>
                                    <Text style={styles.titleText}>
                                        +1
                                    </Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={this.onChangeText}
                                        value={formattedNumber}
                                        keyboardType="numeric"
                                        maxLength={12}
                                        autoFocus={true}
                                    />
                                </View>
                            </View>
                            <Text style={styles.whiteText}>
                                We will send you One-Time code.
                            </Text>
                            <RedButton label="Continue" onPress={this.onContinue} style={styles.btnContainer}/>
                        </View>
                    </ImageBackground>
                    <View style={styles.bottomContainer}/>
                </SafeAreaView>
            </View>
        );
    }
}

export default SMSScreen;
