import React,{Component} from 'react';
import {Text,ScrollView, View, TouchableOpacity, StyleSheet} from 'react-native';
import Axios from 'axios';
import {URL} from 'react-native-dotenv';

class FriendRequest extends Component {
    constructor({users}){
        super();
        this.state={
            user:users,
            FriendRequest:[],
            friends:[],
            newuser:'',
            temp:[],
            myFriend:[],
        }
        this.findUsers=this.findUsers.bind(this);
        this.request=this.request.bind(this);
        this.chat=this.chat.bind(this);
        this.check=this.check.bind(this);
        this.friends=this.friends.bind(this);
        this.confrimRequest=this.confrimRequest.bind(this);
    }
    componentDidMount(){
        setInterval(this.findUsers,1000);
        setInterval(this.chat,1000);
        setInterval(this.friends,1000);
        setInterval(this.check,1000);
    }
    findUsers(){
        Axios.post(`${URL}/users`,{
            userName:this.state.user.userName
        }).then(res=>{
            this.setState({FriendRequest:[...res.data]});
            }
        ).catch(err=>console.log(err));
    }
    chat(){
        Axios.post(`${URL}/`,{
            userName:this.state.user.userName
        }).then(
            res=>{
                this.setState({friends:[...res.data]});
            }
        ).catch(err=>console.log(err));
    }
    request(index){
        Axios.post(`${URL}/freindRequests`,{
            sender:this.state.user.userName,
            reciever:this.state.temp[index]
        }).then(res=>{
        }).catch(err=>console.log(err));
    }
    friends(){
        Axios.post(`${URL}/checkAcceptance`,{
            userName:this.state.user.userName
        }).then(
            res=>{
                this.setState({myFriend:[...res.data.users]});
            }
        ).catch(err=>console.log(err));
    }
    check(){
        let temp2=[];
        let temp3=[];
        let p;
        let temp=this.state.friends.filter((item)=>{return (item.sender===this.state.user.userName)}).map(function(x){
            return x;
        });
        let x=this.state.friends.filter((item1)=>{return (item1.reciever===this.state.user.userName)}).map(function(x){
            return x;
        });
        p=0;
        if(temp.length<=0){
            for(let i=0;i<this.state.FriendRequest.length;i++){
                temp2.push(this.state.FriendRequest[i].userName)
            }
        }else{
            for(let i=0;i<this.state.FriendRequest.length;i++){
                for(let j=0;j<temp.length;j++){
                    if(this.state.FriendRequest[i].userName==temp[j].reciever){
                        p++;
                    }
                }
                if(p==0){
                    temp2.push(this.state.FriendRequest[i].userName);
                }else p=0;
            }
        }
        p=0;
        if(x.length<=0){
            for(let i=0;i<temp2.length;i++){
                temp3.push(temp2[i]);
            }
        }else{
            for(let i=0;i<temp2.length;i++){
                for(let j=0;j<x.length;j++){
                    if(temp2[i]==x[j].sender){
                        p++
                    }
                }
                if(p==0){
                    temp3.push(temp2[i]);
                }else p=0;
            }
        }
        let temp4=[];
        this.state.myFriend.map((friend)=>{
            if(friend.sender===this.state.user.userName){
                temp4.push(friend.reciever);
            }
            else if(friend.reciever===this.state.user.userName){
                temp4.push(friend.sender);
            }
        });
        let temp5=[];
        p=0;
        for(let i=0;i<temp3.length;i++){
            for(let j=0;j<temp4.length;j++){
                if(temp3[i]==temp4[j]){
                    p++;
                }
            }
            if(p==0){
                temp5.push(temp3[i]);
            }else p=0;
        }
        this.setState({temp:[...temp5]});
    }
    confrimRequest(index,x){
        Axios.post(`${URL}/frinedReguestAcceptance`,{
            sender:x,
            reciever:this.state.user.userName,
        }).then(res=>{}).catch(err=>console.log(err));
    }
    render() {
        return ( 
            <ScrollView style={style.container}>
                {
                   this.state.friends.filter((item)=>{return (item.reciever===this.state.user.userName)})
                    .map((request,index)=>{
                        return(
                            <View style={style.subcontainer} key={index}>
                                <TouchableOpacity  style={style.button} onPress={()=>{this.confrimRequest(index,request.sender)}}>
                                    <Text style={style.text}>confirm</Text>
                                </TouchableOpacity>
                                <Text style={style.text2}>{request.sender}</Text>
                            </View>
                        )
                    })
                }
                {
                    this.state.temp.map((request,index)=>{
                        return(
                            <View style={style.subcontainer} key={index}>
                                <TouchableOpacity  style={style.button} onPress={()=>{this.request(index)}}>
                                    <Text style={style.text}>add</Text>
                                </TouchableOpacity>
                                <Text style={style.text2}>{request}</Text>
                            </View>
                        )
                    })
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
    button:{
        width:"50%",
        height:'100%',
        backgroundColor:"#0eed67",
        borderRadius:100,
        borderColor:'#4382e8',
        borderWidth:2
    },
    text:{
        textAlign:'center',
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:30,
        color:"#4382e8"
    },
    text2:{
        fontWeight:"normal",
        fontFamily:'Italianno-Regular',
        fontSize:40,
        color:"#0eed67",
        marginLeft:"6%"
    },
    subcontainer:{
        width:"90%",
        backgroundColor:"#4382e8",
        height:40,
        margin:'2%',
        borderRadius:100,
        flexDirection:'row'
    }
})
export default FriendRequest;