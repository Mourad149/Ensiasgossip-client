import React from 'react';
import { StyleSheet, Text, View ,StatusBar,FlatList,ScrollView,Image} from 'react-native';
import { Container,Button,Title, Icon,Header, List, ListItem,Left,TextInput, Right, Body,Form ,Item ,Label,Input} from 'native-base';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux'
import logo from './assets/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

require('firebase/auth');

export default class AddService extends React.Component{
    constructor(props){
        super(props);

        this.state={
            noms :"",
            prixs:"",
            description:"",
            items : [],
            DisplayNom: "",
            DisplayPrix : "",
            DisplayDescription : ""


        }

        this.onChange=this.onChange.bind(this)
    }
    componentDidMount() {
        firebase.database().ref('services/'+this.props.QTY).on('value',snapshot => {
            this.setState({ noms: snapshot.val().nom ,;
             prixs: snapshot.val().prix ,
             description: snapshot.val().description });
          });


      }

    addaserviceintodatabse(name,price,descp){
    firebase.database().ref('services/'+this.props.QTY).set({nom:name,prix:price,description:descp});
    console.log(this.props.QTY)
    }
    goBack(){
        Actions.home();
    }
    onChange=(value,name)=>{
      this.setState({
        [name]:value
      })
    }
    render(){

        return(
            <ScrollView >

            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}/>
            </View>
            <Form style={styles.form}>

                <Item floatingLabel>
              <Label>Nom</Label>
              <Input
                secureTextEntry={false}
                autoCapitalize="none"
                name = "noms"
                value={this.state.noms}
                onChange={(e)=>this.onChange(e.target.value,e.target.name)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Prix</Label>
              <Input
                secureTextEntry={false}
                autoCapitalize="none"
                keyboardType='numeric'
                name = "prixs"
                value={this.state.prixs}
                type="text" pattern="[0-9]*"
                onChange={(e)=>this.onChange(e.target.value,e.target.name)}
                    />
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input
                secureTextEntry={false}
                autoCapitalize="none"
                name = "description"
                value={this.state.description}
                onChange={(e)=>this.onChange(e.target.value,e.target.name)}
              />
            </Item>
            <TouchableOpacity onPress={()=>{this.addaserviceintodatabse(this.state.noms,this.state.prixs,this.state.description);this.goBack}}><Button  style= {{marginTop: 40, width: 160, justifyContent: 'center', backgroundColor : "#e41b23"}}
               rounded ><Text style={{fontSize:20}}>Update service</Text></Button></TouchableOpacity>
            </Form>
            </ScrollView>



        )
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10,

    },
    inputBox:{
        width : 300,
        height: 50,
        backgroundColor : '#855922',
        borderRadius : 25,
        paddingHorizontal:16,
        color : '#000000',
        marginVertical:10,
    },
    logoContainer: {
        flex: 2,
        marginBottom: 50,
        alignItems: 'center',
      },
      logo: {
        width: 120,
        height: 120,
      },
      textLogin: {
        color: 'rgba(255,255,255,0.1)',
        fontSize: 20,
        textAlign: 'center',
      },
      form: {
        alignItems: 'center',
        padding: 20,
        flex: 1,
      },
  });
