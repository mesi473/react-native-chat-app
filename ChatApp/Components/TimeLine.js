import React,{Component} from 'react';
import {Text, View, StyleSheet,ScrollView,Image,Modal, TextInput, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5'
import MatreialIcons from 'react-native-vector-icons/MaterialIcons'


const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle:"take photo with camera",
    chooseFormLibraryButtonTitle:"choose form photo galary",
  };
class TimeLine extends Component {
    constructor(){
        super();
        this.state={
            visible:false,
            source:null
        }
    }
    LoadingArea=()=>{
        return(
            <ScrollView>
                <View>
                    <View style={style.profile}>
                        <View style={style.profileView}>
                            <Text>profilepic</Text>
                        </View>
                        <Text style={style.Text}>userName</Text>
                    </View>
                    <View>
                        <View style={{
                            width:"90%",
                            height:200,
                            borderWidth:1,
                            margin:'5%',
                            borderColor:'#2253a3',
                            marginBottom:0
                        }}>

                        </View>
                        <Text style={style.Text}>caption</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
    onPressHandler=()=>{
        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);
        //     if (response.didCancel) {
        //       console.log('User cancelled image picker');
        //     } else if (response.error) {
        //       console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //       console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //       const source = { uri: response.uri };
        //       this.setState({
        //         source: source,
        //       });
        //     }
        //   });
    }
    render() { 
        return ( 
            <View style={style.container}>
                <Modal visible={this.state.visible}>
                    <View>
                        <MatreialIcons style={{
                            marginLeft:'45%'
                        }} name="clear" color="brown" size={40} onPress={()=>this.setState({visible:false})}/>
                        <View>
                            <View>
                                <Text style={style.Text}>give some title</Text>
                                <TextInput style={{
                                    borderWidth:1,
                                    borderColor:"#2253a3",
                                    width:"80%",
                                    margin:"10%",
                                    marginBottom:0,
                                    marginTop:"2%"
                                }}/>
                            </View>
                            <TouchableOpacity style={style.TouchableOpacity} onPress={this.onPressHandler}>
                                <Text style={style.Text}>choose photo</Text>
                            </TouchableOpacity>
                            {/* <Image source={this.state.source} width={40} height={40}/> */}
                            <TouchableOpacity style={{
                                marginTop:"20%",
                                borderWidth:1,
                                borderColor:"#2253a3",
                                width:"50%",
                                alignSelf:'center'
                            }}>
                                <Text style={style.Text}>post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={style.icon}>
                    <Icons name="plus" color="#4382e8" size={40} onPress={()=>this.setState({visible:true})}/>
                    <Text style={{
                        color:'#2253a3',
                        fontFamily:'Italianno-Regular',
                        fontSize:40,
                    }}>add  </Text>
                </View>
                <View style={style.loadingArea}>
                    <this.LoadingArea/>
                </View>
            </View>
         );
    }
}
const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#0eed67"
    },
    icon:{
        flex:2,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        margin:"1%"
    },
    loadingArea:{
        flex:8,
    },
    profileView:{
        backgroundColor:'#2253a3',
        marginTop:0,
        margin:2,
        height:40,
        width:40,
        borderColor:'white',
        borderWidth:1,
        borderRadius:500,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 200 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      profile:{
        flexDirection:'row',
        marginLeft:50,
        
      },
      TouchableOpacity:{
        backgroundColor:"#0eed67",
        width:"80%",
        margin:"10%",
        marginBottom:0,
        borderRadius:100,
      },
      Text:{
        color:'#2253a3',
        fontFamily:'Italianno-Regular',
        fontSize:40,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',                                        
      }
})

export default TimeLine;