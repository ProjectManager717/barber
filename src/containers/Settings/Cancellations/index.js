import React, { Component } from "react";
import { View,Switch, Text, StyleSheet,Image,ScrollView,TouchableOpacity } from "react-native";
import { Colors } from "../../../themes";
import { globalStyles } from "../../../themes/globalStyles";
//import { styles } from "./styles";
import { Header } from "react-native-elements";
import CheckBox from "../../../components/CheckBox";


export default class Cancellations extends Component {
  renderRow(item){
    return <View style={{flex:1, flexDirection:'row',height:22,marginLeft:40}}>    
      <CheckBox onClick={()=>{}} isChecked={true} style={{alignSelf:'center'}} />
      <Text style={styles.row_title} >{item.title}</Text>
    </View>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content" // or directly
          style={{ backgroundColor: "yellow" }}
          outerContainerStyles={{ backgroundColor: "#1999CE" }}
          centerComponent={{ text: "CANCELLATIONS & NO-SHOWS", style: { color: "#fff" } }}
          rightComponent={{ color: "#fff" }}
          containerStyle={{
            backgroundColor: Colors.dark,
            justifyContent: "space-around"
          }}
          leftComponent={
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
              <Image 
                style={{tintColor:'white',height:20, resizeMode:'contain'}}
                source={require("../../../assets/images/ic_back.png")} 
              />
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <Text style={styles.txtHeader}>CANCELLATIONS</Text>
          <View style={[globalStyles.rowBackground, styles.row]}>
            <View style={{flex:1, flexDirection:'row',height:36}}>
              <Image style={styles.leftIcon} source={require("../../../assets/images/ic_cancellation_policy.png")} />
              <Text style={styles.row_title} >Cancellation Policy</Text>
              <Switch value={true} style={{
                position:'absolute',
                right:14,
                alignSelf:'center',
                tintColor:'white'
              }}  />
            </View>
          </View>
          {this.renderRow({title:"2 Hours Ahead,No Fee, 1 Reschedule"})}
          {this.renderRow({title:"1 Hour Ahead, 25% Fee, 1 Reschedule"})}
          {this.renderRow({title:"30 Minutes Ahead, 75% Fee, 0 Reschedule"})}
          <Text style={styles.txtHeader}>NO-SHOWS</Text>
          <View style={[globalStyles.rowBackground, styles.row]}>
            <View style={{flex:1, flexDirection:'row',height:36}}>
              <Image style={styles.leftIcon} source={require("../../../assets/images/ic_no_show.png")} />
              <Text style={styles.row_title} >No-Show Policy</Text>
              <Switch value={true} style={{
                position:'absolute',
                right:14,
                alignSelf:'center',
                tintColor:'white'
              }}  />
            </View>
          </View>
          {this.renderRow({title:"Booking Preferences"})}
          {this.renderRow({title:"Cancellations & No-Shows"})}
          {this.renderRow({title:"Surge Pricing"})}

          <TouchableOpacity style={[globalStyles.button,{marginTop:70, marginBottom:30,width:'70%'}]} onPress={()=>{
            this.props.navigation.navigate('BarberProfile');
          }}>
            <Text style={globalStyles.buttonText}>DONE</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: Colors.themeBackground
  },
  row:{
    flexDirection:'column',
    height:'auto',
    marginTop: 4 ,
    marginLeft:18,
    marginRight:18,
    marginBottom:10
  },
  txtHeader:{
    color:Colors.lightGrey,
    marginTop : 16,
    marginBottom:4,
    marginLeft:30,
    fontSize:12,
    fontFamily: "AvertaStd-Regular"
  },
  leftIcon:{
    height:16,
    width:16,
    marginLeft:8,
    alignSelf:'center',
    resizeMode:"contain"
  },
  row_title:{
    color:Colors.white,
    marginTop:5,
    marginLeft:10,
    alignSelf:'center',
    fontFamily: "AvertaStd-Regular"
  },
  right_arrow:{
    position:'absolute',
    right:14,
    alignSelf:'center',
    height:9,
    width:5,
    tintColor:'white'
  }
});
