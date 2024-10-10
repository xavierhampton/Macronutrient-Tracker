import {View, Text, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, TextInput} from 'react-native'
import { useState, useEffect } from 'react';
import {themeColor} from '@/hooks/theme';
import {router, useLocalSearchParams} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown'


const overview = (props) => {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [food, setFood] = useState({})

  const fetchCache = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('overview-cache');
        const cacheVal = jsonValue != null ? JSON.parse(jsonValue) : null;
        setFood(cacheVal)
        updateList(cacheVal)
      }
        catch (e) {
        console.log('fetch error')
        return
      }
    }
    const [data, setData] = useState([{ label: 'Item 1', value: '1' },
                                    { label: 'Item 2', value: '2' },
                                    { label: 'Item 3', value: '3' },])

    const updateList = (f) => {
      let tmp = []
      if (f.servings) {
        for (let i = 0; i < f.servings.length; i++) {
          console.log(i)
          tmp.push({label: f.servings[i].servingName, value: i})
        }
        setData(tmp)
      } 
    }

    useEffect(() => {fetchCache()}, [])
    
    return (
        <View style={{backgroundColor: themeColor().primary}}>
              <KeyboardAvoidingView behavior='position' style={{width: '100%', height: '100%'}} contentContainerStyle={{backgroundColor: 'black'}}>
              <View style={styles.Content}> 

              <View style={[styles.headerContainer, {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}]}>
              <Pressable onPress={() => {router.push('main/home')}} style={{width: 26, marginBottom: 10, marginLeft:'auto', backgroundColor: themeColor().secondary}}>
                      <Text style={[styles.closeButton, {marginLeft: 'auto', fontSize: 40, transform: 'translateX(-10px) translateY(10px)'}]}>x</Text>
                    </Pressable>
                <Text style={[styles.headerText, {transform: 'translateY(-20px)'}]}>{food.name}</Text>
              </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100, width: '100%'}}>

                <View style={{display: 'block', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
              </View>
              <View style={styles.foodInformationContainer}>
                  
                  <View style={[styles.flexContainer, {height: 80, width: 375, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput maxLength={3}style={[styles.textInput, {width: 80, padding: 5}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 60, width: 375, borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
                    <Text style={styles.label}>Serving Size</Text>
                    <View style={[styles.textInput, {width: 120, padding: 5, marginRight: 30}]}></View>
                  </View>
                </View>


        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          
            
          
        />

                </ScrollView>
                </View>
                </KeyboardAvoidingView>
        </View>
    )
}

export default overview

const styles = {
Content: {
    height: '100%',
    width: '100%',

    backgroundColor: themeColor().primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    gap: 10,
  },
  closeButton: {
    width: '100%',
    color: 'white',
    fontSize: 30,
    marginTop: 40,
    fontFamily: 'Arial',
    fontWeight: 900,
    textAlign: 'center',
    opacity: 0.4,
  },
  foodInformationContainer: {
    width: '100%',
    
    borderRadius: 10,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: 385,
    height: 90,
    backgroundColor: themeColor().secondary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  headerText: {
    color: 'white',
    fontFamily: 'JetBrainsMono',
    fontSize: 20,
    opacity: .6,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor().secondary,
    borderRadius: 10,
  },
  label: {
    fontFamily: 'JetBrainsMono',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
  },
  textInput: {
    width: 200,
    borderColor: 'white',
    borderWidth: 2,
    height: 40,
    borderRadius: 5,
    marginLeft: 'auto',
    color: 'white',
    fontSize: 16,
    fontFamily: 'JetBrainsMono',
    marginRight: 10,
  },
  dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'white',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
}