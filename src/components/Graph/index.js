import React, {Component} from "react";
import {View, Dimensions, StyleSheet, Image, Text, TouchableOpacity, Picker, ScrollView} from "react-native";
import colors from "../../themes/colors";
import PopupDialog from 'react-native-popup-dialog';
import Dialog from "../../containers/Home/Clients/ClientBarberProfile";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import {constants} from "../../utils/constants";
import Preference from "react-native-preference";

const {height, width} = Dimensions.get("window");

let getmonth = new Date().getMonth();
let getDate = new Date().getDate();
let getYear = new Date().getFullYear();

export default class lGraphComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading:false,
            DialogVisible: false,
            DialogVisible1: false,
            monthSelect: "Jan",
            weekSelect: "Week 1",
            totalClients: 0,
            totalCancellations: 0,
            totalTips: 0,
            totalRevenue: 0,
            chartData:[0,0,0,0,0,0,0],
            chartLabels:["Mon","Tue","Wed","Thur","Fri","Sat","Sun"],
        }
    }
    componentDidMount(): void {
        let mon=parseInt(getmonth)+1;
        let startDate=getYear+"-"+mon+"-20";
        let endDate=getYear+"-"+mon+"-26";
        this.getRevenueofBarber(startDate,endDate);
    }

    getRevenueofBarber(startDate,endDate) {
        this.setState({showLoading: true})
        console.log("URLgetAllAppointments-->", constants.BarberGetRevenue + "?barber_id=" + Preference.get("userId") + "&start_date_week=" + startDate+ "&end_date_week=" + endDate);
        fetch(constants.BarberGetRevenue + "?barber_id=" + Preference.get("userId") + "&start_date_week=" + startDate+ "&end_date_week=" + endDate, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => response.json())
            .then(response => {
                console.log("responseBarberGetRevenue-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    let Data=response.Data;
                    this.setState({
                        totalClients:Data.weekly_clients,
                        totalCancellations: Data.weekly_cancellations,
                        totalTips: Data.weekly_tips,
                        totalRevenue: Data.weekly_revenue,
                    });
                    //this.setState({chartData:[],chartLabels:[]});
                    let chartdata=[];
                    let chartlabels=[];
                    for(let i=0;i<Data.per_day_revenue.length;i++)
                    {
                        chartlabels.push(Data.per_day_revenue[i].Day_name);
                        chartdata.push(Data.per_day_revenue[i].total_price);
                    }

                    this.setState({chartData:chartdata,chartLabels:chartlabels});
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    width,
                    height: 30,
                    marginTop: 10,
                    marginBottom: 10,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{marginLeft: 20, flexDirection: "row"}}
                                      onPress={() => this.setState({DialogVisible: true})}>
                        <Text style={[styles.label, {fontSize: 11, fontWeight: 'bold'}]}>{this.state.monthSelect}</Text>
                        <Image source={require("../../assets/images/arrow_down.png")}
                               style={[styles.arrow_down, {marginLeft: 5, marginTop: 5}]}/>
                        <PopupDialog
                            visible={this.state.DialogVisible}
                            onTouchOutside={() => {
                                this.setState({DialogVisible: false});
                            }}
                            ref={(popupDialog) => {
                                this.popupDialog = popupDialog;
                            }}
                        >
                            <ScrollView>
                            <View style={{flexDirection: "column", alignItems: "center"}}>
                                <View style={{
                                    width: "100%",
                                    height: 0,
                                    marginTop: 3,

                                    backgroundColor: "black"
                                }}/>

                                <Text style={{margin:10,fontSize:20,fontWeight:"bold"}}>
                                {"Please Select Month"}</Text>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Jan",
                                        DialogVisible: false
                                    })}>Jan</Text>
<View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Feb",
                                        DialogVisible: false
                                    })}>Feb</Text>
<View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Mar",
                                        DialogVisible: false
                                    })}>Mar</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Apr",
                                        DialogVisible: false
                                    })}>Apr</Text>
<View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "May",
                                        DialogVisible: false
                                    })}>May</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Jun",
                                        DialogVisible: false
                                    })}>Jun</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Jul",
                                        DialogVisible: false
                                    })}>Jul</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Aug",
                                        DialogVisible: false
                                    })}>Aug</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Sep",
                                        DialogVisible: false
                                    })}>Sep</Text>
<View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Oct",
                                        DialogVisible: false
                                    })}>Oct</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>

                                <Text style={{marginTop:10,fontSize:20}}
                                    onPress={() => this.setState({
                                        monthSelect: "Nov",
                                        DialogVisible: false
                                    })}>Nov</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20,marginBottom:10}}
                                    onPress={() => this.setState({
                                        monthSelect: "Dec",
                                        DialogVisible: false
                                    })}>Dec</Text>
                            </View>
                            </ScrollView>
                        </PopupDialog>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 20, flexDirection: "row"}}
                                      onPress={() => this.setState({DialogVisible1: true})}>
                        <Text style={[styles.label, {
                            marginLeft: 15,
                            fontWeight: 'bold',
                            fontSize: 11
                        }]}>{this.state.weekSelect}</Text>
                        <Image source={require("../../assets/images/arrow_down.png")}
                               style={[styles.arrow_down, {marginLeft: 5, marginTop: 5}]}/>

                        <PopupDialog
                            visible={this.state.DialogVisible1}
                            onTouchOutside={() => {
                                this.setState({DialogVisible1: false});
                            }}
                            ref={(popupDialog) => {
                                this.popupDialog = popupDialog;
                            }}
                        >
                            <View style={{flexDirection: "column", alignItems: "center",marginTop:10,marginBottom:10}}>
                                <Text style={{margin:10,fontSize:20,fontWeight:"bold"}} >{"Please select Week"}</Text>

                                <Text style={{marginTop:10,fontSize:20}} onPress={() => this.setState({weekSelect: "Week 1", DialogVisible1: false})}>Week
                                    1</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}} onPress={() => this.setState({weekSelect: "Week 2", DialogVisible1: false})}>Week
                                    2</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}} onPress={() => this.setState({weekSelect: "Week 3", DialogVisible1: false})}>Week
                                    3</Text>
                                    <View style={{width:"80%",height:0.5,backgroundColor:"grey",marginTop:10}}/>
                                <Text style={{marginTop:10,fontSize:20}} onPress={() => this.setState({weekSelect: "Week 4", DialogVisible1: false})}>Week
                                    4</Text>

                            </View>
                        </PopupDialog>
                    </TouchableOpacity>
                </View>
                <View style={[styles.graphContainer, {alignItems: "center", marginBottom: 20}]}>
                    {/*<Image
                source={require("../../assets/images/graph.png")}
                style={styles.graph}
                resizeMode="contain"
            />*/}
                    <LineChart
                        data={{
                            labels: this.state.chartLabels,
                            datasets: [{data: this.state.chartData}]
                        }}
                        width={Dimensions.get('window').width - 40} // from react-native
                        height={200}
                        yAxisLabel={'$'}
                        chartConfig={{
                            backgroundColor: '#3D3E4D',
                            backgroundGradientFrom: '#3D3E4D',
                            backgroundGradientTo: '#3D3E4D',
                            //color:"#ffffff",
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                            style: {
                                borderRadius: 10
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 10
                        }}
                    />
                </View>

                <View style={styles.allBoxes}>
                    <View style={styles.boxContainer}>
                        <View style={styles.smallBox}>
                            <Image source={require("../../assets/images/client.png")} style={{width: 28, height: 25}}/>
                            <View style={{alignItems: 'center', marginLeft: 3}}>
                                <Text style={[styles.label]}>CLIENT</Text>
                                <Text style={[styles.label, {
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }]}>{this.state.totalClients}</Text>
                            </View>
                        </View>
                        <View style={[styles.smallBox, {width: width / 3.5}]}>
                            <Image source={require("../../assets/images/close.png")} style={{width: 25, height: 25}}/>
                            <View style={{marginLeft: 3}}>
                                <Text style={[styles.label]}>CANCELLATIONS</Text>
                                <Text style={[styles.label, {
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }]}>{this.state.totalCancellations}</Text>
                            </View>
                        </View>
                        <View style={[styles.smallBox, {width: width / 3}]}>
                            <Image source={require("../../assets/images/total_tip.png")}
                                   style={{width: 28, height: 25}}/>
                            <View style={{marginLeft: 3}}>
                                <Text style={[styles.label]}>TOTAL TIP</Text>
                                <Text style={[styles.label, {
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }]}>${this.state.totalTips}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.largeBox}>
                        <Image source={require("../../assets/images/dollar.png")}
                               style={{width: 25, height: 25, marginLeft: 15}}/>
                        <View style={{flex: 1, marginLeft: 10}}>
                            <Text style={[styles.label]}>TOTAL REVENUE</Text>
                            <Text style={[styles.label, {
                                fontWeight: 'bold',
                                fontSize: 15
                            }]}>${this.state.totalRevenue}</Text>
                        </View>
                        <View style={{
                            width: 100,
                            height: 30,
                            borderRadius: 15,
                            borderColor: colors.green,
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 15
                        }}>
                            <Text style={{color: colors.green, fontSize: 13}}>Cashout</Text>
                        </View>
                    </View>
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
                    <Image resizeMode={"contain"} source={require("../../assets/images/loading.gif")}
                           style={{width: 60, height: 60, opacity: 1,}}/>
                </View>}
            </View>
        )
            ;
    }
}
const styles = StyleSheet.create({
    container: {
        width,
        alignItems: "center",
        height: height / 1.45
    },
    graphContainer: {width, height: height / 3.5},
    graph: {height: "100%", width: "100%"},
    boxContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: width / 1.12
    },
    smallBox: {
        flexDirection: 'row',
        backgroundColor: colors.btn_bg_color,
        width: width / 4.3,
        height: height / 10,
        borderRadius: 4,
        borderWidth: .25,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    largeBox: {
        flexDirection: 'row',
        width: width / 1.12,
        height: height / 12,
        borderRadius: 4,
        backgroundColor: colors.btn_bg_color,
        borderWidth: .25,
        borderColor: colors.white,
        marginTop: 10,
        alignItems: 'center',


    },
    allBoxes: {
        height: height / 12 + height / 10 + 7,
        justifyContent: "space-between",
        marginTop: 40
    },
    arrow_down: {
        width: 9,
        height: 5
    },
    label: {
        fontSize: 8, color: colors.white
    }
});
