import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    ScrollView,
    Switch, TextInput,

} from "react-native";

import {Header, Slider} from "react-native-elements";
import hello from "../../../assets/images/arrow_down.png"
import {Colors} from "../../../themes";
import {styles} from "./styles";
import {globalStyles} from "../../../themes/globalStyles";


export default class ClientBarberSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionOne:"white",
            optionTwo:"white",
            optionThree:"white",
            CheckBox1: require("../../../assets/images/tic_grey.png"),
            CheckBox2: require("../../../assets/images/tic_grey.png"),
            CheckBox3: require("../../../assets/images/tic_grey.png"),
            value: 0,
            unselected: require("../../../assets/images/greentick.png"),
            unselected2: require("../../../assets/images/greentick.png"),
            unselected3: require("../../../assets/images/greentick.png"),
            unselected4: require("../../../assets/images/greentick.png"),
        };

    }

    Selected() {
        if (this.state.unselected === require("../../../assets/images/greenticked.png")) {
            this.setState({unselected: require("../../../assets/images/greentick.png")})
        } else {
            this.setState({unselected: require("../../../assets/images/greenticked.png")})
        }
    }

    Selected2() {
        if (this.state.unselected2 === require("../../../assets/images/greenticked.png")) {
            this.setState({unselected2: require("../../../assets/images/greentick.png")})
        } else {

            this.setState({unselected2: require("../../../assets/images/greenticked.png")})
        }
    }

    Selected3() {
        if (this.state.unselected3 === require("../../../assets/images/greenticked.png")) {
            this.setState({unselected3: require("../../../assets/images/greentick.png")})
        } else {

            this.setState({unselected3: require("../../../assets/images/greenticked.png")})
        }
    }

    Selected4() {
        if (this.state.unselected4 === require("../../../assets/images/greenticked.png")) {
            this.setState({unselected4: require("../../../assets/images/greentick.png")})
        } else {

            this.setState({unselected4: require("../../../assets/images/greenticked.png")})
        }
    }


    checkbox1() {
        if (this.state.CheckBox1 === require("../../../assets/images/tic_green.png")) {
            this.setState({CheckBox1: require("../../../assets/images/tic_grey.png"),optionOne:"white"})
        } else {
            this.setState({CheckBox1: require("../../../assets/images/tic_green.png"),optionOne:"green"});
            this.setState({CheckBox2: require("../../../assets/images/tic_grey.png"),optionTwo:"white"});
            this.setState({CheckBox3: require("../../../assets/images/tic_grey.png"),optionThree:"white"});

        }
    }

    checkbox2() {
        if (this.state.CheckBox2 === require("../../../assets/images/tic_green.png")) {
            this.setState({CheckBox2: require("../../../assets/images/tic_grey.png"),optionTwo:"white"})
        } else {
            this.setState({CheckBox2: require("../../../assets/images/tic_green.png"),optionTwo:"green"});
            this.setState({CheckBox1: require("../../../assets/images/tic_grey.png"),optionOne:"white"});
            this.setState({CheckBox3: require("../../../assets/images/tic_grey.png"),optionThree:"white"});
        }
    }

    checkbox3() {
        if (this.state.CheckBox23 === require("../../../assets/images/tic_green.png")) {
            this.setState({CheckBox3: require("../../../assets/images/tic_grey.png"),optionThree:"white"})
        } else {
            this.setState({CheckBox3: require("../../../assets/images/tic_green.png"),optionThree:"green"});
            this.setState({CheckBox1: require("../../../assets/images/tic_grey.png"),optionOne:"white"});
            this.setState({CheckBox2: require("../../../assets/images/tic_grey.png"),optionTwo:"white"});
        }
    }


    renderRowInput() {
        return <View style={{width: "100%"}}>
            <View style={{height:50,flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Image resizeMode={"contain"} source={require("../../../assets/images/searchicon.png")}
                       style={{
                           width: 16,
                           height: 16,
                       }}/>
                       <View style={{marginStart:10}}>
                           <TextInput
                               style={{
                                   color: "white",
                                   fontSize: 16,
                                   fontFamily: "AvertaStd-RegularItalic",
                               }}
                               onChange={(text) => (text)}
                               placeholder={"Search by Instagram, Name, or Barbershop"}
                               placeholderTextColor={"grey"}
                           />
                       </View>

            </View>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}>
                            <Image
                                style={{
                                    tintColor: "white",
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={require("../../../assets/images/ic_back.png")}
                            />
                        </TouchableOpacity>
                    }
                    centerComponent={{text: "FILTER", style: {color: "#fff"}}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <ScrollView>
                    <View style={{
                        marginTop: 20,
                        marginStart: 20, marginEnd: 20,
                        backgroundColor: "#474857",
                        borderWidth: 0.5,
                        borderColor: "grey",
                        borderRadius: 6
                    }}>
                        {this.renderRowInput({})}
                    </View>
                    <View>
                        <Text style={{
                            color: "white",
                            fontWeight: 'bold',
                            marginStart: 20,
                            marginTop: 20,
                            fontSize: 17

                        }}>{"Distance"} </Text>
                    </View>
                    <View style={{
                        marginTop: 0,
                        marginStart: 20,
                        marginEnd: 20,
                        marginBottom: 20,
                        alignItems: 'stretch',
                        justifyContent: 'center'
                    }}>
                        <Slider
                            value={this.state.value}
                            onValueChange={value => this.setState({value})}
                            minimumTrackTintColor='red'
                            maximumTrackTintColor="#3D3E4D"
                            trackStyle={{height: 2}}
                            thumbStyle={{borderWidth: 0.5, borderColor: "white"}}
                        />
                        <View style={{
                            alignItems: 'stretch',

                            flexDirection: "row"

                        }}>
                            <Text style={{color: "#686F77", fontSize: 10}}>10 MILES</Text>
                            <Text style={{color: "#686F77", marginStart: 45, fontSize: 10}}>25 MILES</Text>
                            <Text style={{color: "#686F77", marginStart: 45, fontSize: 10}}>50 MILES</Text>
                            <Text style={{color: "#686F77", marginStart: 45, fontSize: 10}}>100 MILES</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{
                            color: "white",
                            fontWeight: 'bold',
                            marginStart: 20,
                            marginTop: 20,
                            fontSize: 17

                        }}>{"Cost"} </Text>
                    </View>
                    <View style={{
                        marginTop: 10,
                        marginStart: 20,
                        marginEnd: 20,
                        marginBottom: 20,
                        flexDirection: "row",
                    }}>
                        <TouchableOpacity onPress={() => this.checkbox1()}>

                            <Image resizeMode={"contain"} source={this.state.CheckBox1}
                                   style={{width: 20, height: 20}}

                            /></TouchableOpacity>
                        <Text style={{color: this.state.optionOne, marginStart: 10, fontSize: 15, fontWeight: 'bold'}}>$</Text>

                        <TouchableOpacity onPress={() => this.checkbox2()}>
                            <Image style={{width: 20, height: 20, marginStart: 100}}
                                   resizeMode={"contain"} source={this.state.CheckBox2}/>
                        </TouchableOpacity>
                        <Text style={{color: this.state.optionTwo, marginStart: 10, fontSize: 15, fontWeight: 'bold'}}>$$</Text>

                        <TouchableOpacity onPress={() => this.checkbox3()}>
                            <Image resizeMode={"contain"} source={this.state.CheckBox3}
                                   style={{width: 20, height: 20, marginStart: 85}}/>
                        </TouchableOpacity>
                        <Text style={{color: this.state.optionThree, marginStart: 10, fontSize: 15, fontWeight: 'bold'}}>$$$</Text>


                    </View>
                    <View>
                        <Text style={{
                            color: "white",
                            fontWeight: 'bold',
                            marginStart: 20,
                            marginTop: 20,
                            marginBottom: 10,
                            fontSize: 17

                        }}>{"Skill"} </Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginStart: 20,
                        marginEnd: 20,
                    }}>
                        <View style={{
                            flexDirection: "column",
                            width: "50%",
                            marginEnd: 4,
                        }}>
                            <TouchableOpacity onPress={() => this.Selected()}>
                                <View style={{
                                    flexDirection: "row",
                                    backgroundColor: "#474857",
                                    width: "100%",
                                    height: 40,
                                    marginBottom: 10,
                                    borderRadius: 20,
                                    borderWidth: 0.5,
                                    borderColor: "grey",
                                    alignItems: "center",
                                }}>
                                    <Image style={{height: 20, width: 20, position: "absolute", top: 10, left: 5}}
                                           resizeMode={"contain"}
                                           source={require("../../../assets/images/blend.png")}/>
                                    <Text style={{color: "white", marginStart: 30, fontSize: 10}}>Blend Quality</Text>
                                    <Image style={{height: 20, width: 20, position: "absolute", top: 10, right: 5}}
                                           resizeMode={"contain"}
                                           source={this.state.unselected}/>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.Selected2()}>
                                <View style={{
                                    flexDirection: "row",
                                    backgroundColor: "#474857",
                                    width: "100%",
                                    height: 40,
                                    marginTop: 7,
                                    marginBottom: 10,
                                    borderRadius: 20,
                                    borderWidth: 0.5,
                                    borderColor: "grey",
                                    alignItems: "center",
                                }}>
                                    <Image style={{height: 20, width: 20, position: "absolute", top: 10, left: 5}}
                                           resizeMode={"contain"}
                                           source={require("../../../assets/images/scissor.png")}/>
                                    <Text style={{color: "white", marginStart: 30, fontSize: 10}}>Scissor
                                        Technique</Text>
                                    <Image style={{height: 20, width: 20, position: "absolute", top: 10, right: 5}}
                                           resizeMode={"contain"}
                                           source={this.state.unselected2}/>

                                </View></TouchableOpacity>
                        </View>

                        <View style={{
                            flexDirection: "column",
                            width: "50%",
                            marginEnd: 2, marginStart: 10
                        }}>
                            <TouchableOpacity onPress={() => this.Selected3()}>
                                <View style={{
                                    flexDirection: "row",
                                    backgroundColor: "#474857",
                                    width: "100%",
                                    height: 40,
                                    marginBottom: 10,
                                    borderRadius: 20,
                                    borderWidth: 0.5,
                                    borderColor: "grey",
                                    alignItems: "center",
                                }}>
                                    <Image style={{height: 20, width: 20, position: "absolute", top: 10, left: 5}}
                                           resizeMode={"contain"}
                                           source={require("../../../assets/images/shapeblade.png")}/>
                                    <Text style={{color: "white", marginStart: 30, fontSize: 10}}>Shape Up
                                        Ability</Text>
                                    <Image style={{height: 20, width: 20, position: "absolute", top: 10, right: 5}}
                                           resizeMode={"contain"}
                                           source={this.state.unselected3}/>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.Selected4()}>
                                <View style={{
                                    flexDirection: "row",
                                    backgroundColor: "#474857",
                                    width: "100%",
                                    height: 40,
                                    marginBottom: 10,
                                    borderRadius: 20,
                                    borderWidth: 0.5,
                                    borderColor: "grey",
                                    alignItems: "center", marginTop: 7
                                }}>

                                    <Image style={{height: 20, width: 20, position: "absolute", top: 10, left: 5}}
                                           resizeMode={"contain"}
                                           source={require("../../../assets/images/hair.png")}/>
                                    <Text style={{color: "white", marginStart: 30, fontSize: 10}}>Combover Skills</Text>
                                    <Image style={{height: 20, width: 20, position: "absolute", top: 10, right: 5}}
                                           resizeMode={"contain"}
                                           source={this.state.unselected4}/>


                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                </ScrollView>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={[globalStyles.button, {
                    marginTop: 70,
                    height: 40,
                    width: 260,
                    position: "absolute",
                    bottom: 40
                }]}>
                    <Text style={globalStyles.buttonText}>See Results</Text>
                </TouchableOpacity>
            </View>
        )
    }


}