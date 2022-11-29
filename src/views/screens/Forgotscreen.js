import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, View, useWindowDimensions, Keyboard, Alert, TouchableOpacity, Image, SafeAreaView, RefreshControl, Dimensions} from 'react-native'
import React from 'react'
import Input from "../components/Input";
import {Universalstyles} from "../../const/Universalstyle";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Logo from '../../../assets/bg/Picture1.png';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Forgotscreen = ({navigation}) => {
    const [inputs, setInputs] = React.useState({
        email: ''
    
      });
      const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const {height} = useWindowDimensions();
      const [valid,setValid] = React.useState(false)
      const handleError = (errorMessage, input) =>{
        setErrors((prevState) => ({...prevState, [input]: errorMessage}))
      }
      const handleOnChange = (text, input) => {
        setInputs (prevState => ({...prevState, [input]: text}));
      };
      
      const [errors, setErrors] = React.useState({});
      const [loading, setLoading] = React.useState(false);

      const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.email){
          handleError('Please enter your email', 'email');
          valid = false;
        } 
     if (valid) {
          showPass();
        }
      };
      const cancel = () =>{
        navigation.navigate('Loginscreen')
      }
    
      const showPass = () => {
        setLoading(true);
        setTimeout(async() => {
          setLoading(false);
          let userData = await AsyncStorage.getItem('user');
          if (userData) {
            userData = JSON.parse(userData);
            if (inputs.email == userData.email 
              ){
                AsyncStorage.setItem(
                  'user', JSON.stringify({...userData, loggedIn: true}),
                );
                Alert.alert('Forgotten Password', userData.password)
               navigation.navigate('Homescreen',{fname:userData.firstname,lname:userData.Lastname,email:userData.email});
                setValid(true)
              } 
              else {
                  Alert.alert('Error', 'User does not exists')
              }
          }
              
            }, 1000)
      };

      return (   
      
        <SafeAreaView style={{flex: 1,}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
         <View
    style={[Universalstyles.signup, {height: 'auto', justifyContent: 'center', padding: 10, }]}>
   
          <Loader visible={loading}/>
           
              
          <View style={[Universalstyles.signupbg, {height: 'auto', borderWidth: 2, borderRadius: 10, borderColor: '#e8e8e8'}]}>
          <Image source={Logo} style={[Universalstyles.logo, {height: height * 0.19, marginLeft: 10}]} />
          <Text style= {Universalstyles.txt}>
            Verify Email
            </Text>
    
            
                <Input 
                placeholder= 'Email' 
                iconName= 'email-outline' 
                
                error={errors.email}
                onFocus={() =>{
                  handleError(null, 'email');
                }}
                onChangeText = {text => handleOnChange(text, 'email')}
                />


                <Button title='Submit' onPress={validate}/>
                
                <Text 
                onPress={() => navigation.navigate('Log in')}
                style={{color: 'blue', textAlign: 'center', padding: 10}}>Cancel
                </Text>
  
                </View>
                </View>
          </ScrollView>
        </SafeAreaView>
        )


}

export default Forgotscreen;