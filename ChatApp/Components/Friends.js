import React, { Component } from 'react';
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Modal,TouchableWithoutFeedback,TextInput} from 'react-native';
import Axios from 'axios';
import {URL} from 'react-native-dotenv';
import Style from './ChatBox';
import Icons from 'react-native-vector-icons/AntDesign';

class Friends extends Component {
    constructor({users}){
        super();
        this.state={
            user:users,
            friends:[],
            isClicked:false,
            whoIsOnChat:'',
            refrash:[],
            message:''
        }
        this.friends=this.friends.bind(this);
        this.refrashHandler=this.refrashHandler.bind(this);
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
    }
    componentDidMount(){
        setInterval(this.friends, 1000);
        setInterval(this.refrashHandler,1000);
    }
    friends(){
        Axios.post(`${URL}/checkAcceptance`,{
            userName:this.state.user.userName
        }).then(
            res=>{
                this.setState({friends:[...res.data.users]});
            }
        ).catch(err=>console.log(err));
    }
    refrashHandler(){
        Axios.post(`${URL}/chat`,{
            sender:this.state.user.userName,
            reciever:this.state.whoIsOnChat
        })
        .then(res=>{
            this.setState({refrash:[...res.data]});
        })
        .catch(err=>console.log(err));
    }
    onSubmitHandler(){
        Axios.post(`${URL}/messages`,{
            message:this.state.message,
            reciever:this.state.whoIsOnChat,
            sender:this.state.user.userName
        })
            .then(res=>{
                this.setState({message:''});
            })
            .catch(err=>console.log(err));
    }
    render() {
            return ( 
                <ScrollView style={style.container}>
                    <Modal visible={this.state.isClicked} animationType="slide">
                        <View style={Style.container}>
                            <View style={Style.header}>
                                    <Icons name="doubleleft" color="#0eed67" size={25} style={
                                        {alignContent:'center',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        marginTop:"5%",
                                        marginLeft:'15%'
                                        }} onPress={()=>{this.setState({isClicked:false,whoIsOnChat:''})}}></Icons>
                                    <TouchableWithoutFeedback>
                                        <View style={{flexDirection:'row',margin:10}}>
                                            <View style={Style.profileView}>
                                            {/* my profile pic her */}
                                            </View>
                                            <Text style={Style.text1}>{this.state.whoIsOnChat}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                            </View>
                            <ScrollView style={Style.messageField}>
                            {
                                this.state.refrash.map((message,index)=>{
                                        return(
                                            <View style={{margin:"2%"}} key={index}>
                                                {
                                                    (message.sender==this.state.user.userName)?
                                                    <Text style={style.message} >{message.message}</Text>:
                                                    <Text style={style.message2}>{message.message}</Text>
                                                }
                                            </View>
                                        )})
                            }
                            </ScrollView>
                            <View style={Style.sendArea}>
                                <TextInput style={Style.textField}
                                    onChange={(e)=>this.setState({message:e.nativeEvent.text})}
                                    value={this.state.message}
                                    multiline={true}
                                />
                                <TouchableOpacity 
                                style={Style.buttons}
                                onPress={this.onSubmitHandler}
                                >
                                    <Text style={Style.text}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {
                        this.state.friends.map((friend,index)=>(
                            (friend.sender===this.state.user.userName)?
                            <TouchableOpacity key={index} style={style.buttons} onPress={()=>{this.setState({isClicked:true,whoIsOnChat:friend.reciever});}}><Text style={style.text}>{friend.reciever}</Text></TouchableOpacity>
                            :<TouchableOpacity key={index} style={style.buttons} onPress={()=>{this.setState({isClicked:true,whoIsOnChat:friend.sender});}}><Text style={style.text}>{friend.sender}</Text></TouchableOpacity>
                        ))
                    }
                </ScrollView>
             );
    }
}
const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#0eed67"
    },
    text:{
        color:"#0eed67",
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        textAlign:'center',
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:30,
    },
    buttons:{
        width:"90%",
        backgroundColor:"#4382e8",
        height:40,
        marginLeft:"5%",
        margin:'2%',
        borderRadius:100,
    },
    message:{
        justifyContent:'flex-start',
        alignContent:'flex-start',
        alignSelf:'flex-start',
        padding:"4%",
        margin:4,
        borderWidth:1,
        borderColor:'#0eed67',
        color:'#0eed67',
        backgroundColor:"#4382e8",
        borderRadius:40
    },
    message2:{
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignSelf:'flex-end',
        padding:"4%",
        margin:4,
        borderWidth:1,
        borderColor:'#4382e8',
        color:'#4382e8',
        backgroundColor:"#0eed67",
        borderRadius:40
    }
})
export default Friends;