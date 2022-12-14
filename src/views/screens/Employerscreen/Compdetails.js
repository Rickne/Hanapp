import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, View, StyleSheet, useWindowDimensions, Dimensions, Keyboard, Alert,Image, SafeAreaView, RefreshControl, TouchableOpacity, FlatList} from 'react-native'
import Input from "../../components/Input";
import {Universalstyles} from "../../../const/Universalstyle";
import Loader from "../../components/Loader";
import React, { useState } from "react";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Compdetails = ({navigation}) => {
 
  const [inputs, setInputs] = React.useState({
    Compname: '',
    Establishdate: '',
    WebsiteURL: '',
    Compdesc: '',

  });

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const {height} = useWindowDimensions();
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  
  const validate = () => {
    
    Keyboard.dismiss();
    let valid = true;

   
    if (!inputs.Compname){
      handleError('Please enter the company name', 'Compname');
      valid = false;
    } 
    if (!inputs.Establishdate){
        handleError('Please enter the establishment date', 'Establishdate');
      valid = false;
    }
    if (!inputs.Compdesc){
        handleError('Please enter the company description', 'Compdesc');
      valid = false;
    }
    
    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        navigation.navigate('Employerscreen',{fname:inputs.firstname,lname:inputs.Lastname,email:inputs.email});
      } catch (error) {
        Alert.alert('Error', 'Something went wrong')
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs (prevState => ({...prevState, [input]: text}));
  };
  
  const handleError = (errorMessage, input) =>{
    setErrors((prevState) => ({...prevState, [input]: errorMessage}))
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView
        contentContainerStyle={{ 
         
        }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
               colors={['#F5E44C']}
            />
          }
        >

      <Loader visible={loading}/>
      <View style={[Universalstyles.signup, {}]}>
  
        <View style={[Universalstyles.signupbg, { height: 'auto', paddingBottom: 50, justifyContent: 'center'}]}>
          
        <Text style= {{
            color: '#2f2f2f', 
            paddingVertical: 10,  
            fontSize: 25, 
            fontWeight: '500',
          }}>

        Company details
        </Text>
            <Input 
            placeholder= 'Company name' 
            iconName= 'warehouse' 
            
            error={errors.Compname}
            onFocus={() =>{
              handleError(null, 'Compname');
            }}
            onChangeText = {text => handleOnChange(text, 'Compname')}
            />
            <Input 
            placeholder= 'Establishment date' 
            iconName= 'calendar' 
            keyboardType= 'numeric'
            error={errors.Establishdate}
            onFocus={() =>{
              handleError(null, 'Establishdate');
            }}
            onChangeText = {text => handleOnChange(text, 'Establishdate')}
            />
 <Input 
            placeholder= 'Website URL' 
            iconName= 'link' 
            error={errors.WebsiteURL}
            onFocus={() =>{
              handleError(null, 'WebsiteURL');
            }}
            onChangeText = {text => handleOnChange(text, 'WebsiteURL')}
            />
            

{/* TEMPORAY */}

            
<Input 
            placeholder= 'Company description' 
            iconName= 'newspaper-variant-outline' 
            
            error={errors.Compdesc}
            onFocus={() =>{
              handleError(null, 'Compdesc');
            }}
            onChangeText = {text => handleOnChange(text, 'Compdesc')}
            />
             
        
             
             <View style={{marginBottom: 50, alignItems: 'center', flexDirection:'row', justifyContent: 'space-around'}}>
    <TouchableOpacity  onPress={() => navigation.navigate('Employerscreen')}>
    <View style={{borderColor: 'red',
    alignSelf: 'center',
    width: 150,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,}}>
      <Text style={{color: 'black', fontWeight: '400', fontSize: 18}}>Skip</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity  onPress={validate}>
    <View style={{backgroundColor: '#4169e1',
    alignSelf: 'center',
    width: 150,
    height: 'auto',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    }}>
      <Text style={{color: 'white', fontWeight: 'light', fontSize: 18}}>Done</Text>
      </View>
    </TouchableOpacity>

    </View>
            
    </View>
            
        </View>
        
        
      </ScrollView>
      </SafeAreaView>
  );
};

export default Compdetails
