import React, { Component } from "react";
import { View,Switch, Text, StyleSheet,Image,ScrollView,TouchableOpacity } from "react-native";
import { Colors } from "../../../themes";
import { globalStyles } from "../../../themes/globalStyles";
//import { styles } from "./styles";
import { Header } from "react-native-elements";
import CheckBox from "../../../components/CheckBox";


export default class DiscoverMe extends Component {
  renderRow(item){
    return <View style={{flex:1, flexDirection:'row',height:22,marginLeft:40}}>    
      <CheckBox
      checkedImage={<Image style={{width:16,height:16}} source={require('../../../assets/images/ic_check_green.png')} />}
      onClick={()=>{}} isChecked={false} style={{alignSelf:'center'}} />
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
          centerComponent={{ text: "GET DISCOVERED", style: { color: "#fff" } }}
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
          <View style={[globalStyles.rowBackground, styles.row]}>
            <View style={{flex:1, flexDirection:'row',height:36}}>
              <Image style={styles.leftIcon} source={require("../../../assets/images/ic_range.png")} />
              <Text style={styles.row_title} >RANGE</Text>
            </View>
          </View>
          {this.renderRow({title:"Zipcode ($5)"})}
          {this.renderRow({title:"City ($15)"})}
          {this.renderRow({title:"State ($50)"})}
          <View style={[globalStyles.rowBackground, styles.row,{marginTop:30}]}>
            <View style={{flex:1, flexDirection:'row',height:36}}>
              <Image style={styles.leftIcon} source={require("../../../assets/images/ic_siren.png")} />
              <Text style={styles.row_title} >PROMOTION DURATION</Text>
            </View>
          </View>
          {this.renderRow({title:"1 Week ($5)"})}
          {this.renderRow({title:"2 Weeks ($10)"})}
          {this.renderRow({title:"3 Weeks ($15)"})}

          <View style={[globalStyles.rowBackground, {marginTop:30,height:60,width:200,alignSelf:'center', borderRadius:25}]}>
            <View style={{flex:1, flexDirection:'column',height:36,alignSelf:'center'}}>
              <Text style={styles.promo_title} >TOTAL</Text>
              <Text style={styles.promo_title} >$10.00</Text>
            </View>
          </View>

          <TouchableOpacity style={[globalStyles.button,{marginTop:70,width:'70%'}]} onPress={()=>{
            this.props.navigation.navigate('BarberProfile');
          }}>
            <Text style={globalStyles.buttonText}>Submit</Text>
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
    marginTop: 20 ,
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

  promo_title:{
    color:"#2FCEFE",
    marginTop:2,
    fontSize:16,
    marginLeft:10,
    alignSelf:'center',
    fontFamily: "AvertaStd-Bold"
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
