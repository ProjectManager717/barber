import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {styles} from './styles';
import {WhiteButton, RedButton} from '../../../components';

class InitialScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const itemId = navigation.getParam('User', 'NO-ID');
        console.log("gettingUSer--->" + itemId);
        this.state = {
            userName: undefined,
        };
        this.state.userName=itemId;
    }

    onSignUp = () => {
        this.props.navigation.navigate('SignUpScreen', {User:this.state.userName});
    };

    onSignIn = () => {
        this.props.navigation.navigate('SignInScreen', {User:this.state.userName});
    };

    render() {
        return (
            <ImageBackground
                source={require('../../../assets/img_background3.png')}
                style={styles.container}
                imageStyle={styles.backgroundImg}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.buttonsContainer}>
                            <WhiteButton label="Sign Up with Email" onPress={this.onSignUp}/>
                            <RedButton label="Sign In" onPress={this.onSignIn}/>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        )
    }
}

export default InitialScreen;
