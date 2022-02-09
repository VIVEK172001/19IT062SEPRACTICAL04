import React,{useState} from "react";
import {
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from "react-native"; 

import {
  container,
  Form,
  Item,
  Input,
  Button,
  Container,
  H1,
} from "native-base";

import Shortid from "shortid";

import AsyncStorage from '@react-native-community/async-storage';
import shortid from "shortid";

const Add=({navigation}) => {

  const [name,setName]=useState('');
  const [totalNoSeason,setTotalNoSeason]=useState('');

  const addToList=async()=>{
    try {
      if(!name||!totalNoSeason)
      {
        return alert("Please enter the both value");
      }

      const seasonToAdd={
        id:shortid.generate(),
        name,
        totalNoSeason,
        isWatched:false,
      };

        const storedValue=await AsyncStorage.getItem('@season_list');
        const preList=await JSON.parse(storedValue);

        if(!preList)
        {
          const newList=[seasonToAdd];
          await AsyncStorage.setItem('@season_list',JSON.stringify(newList));
        }
        else
        {
          preList.push(seasonToAdd);
          await AsyncStorage.setItem('@season_list',JSON.stringify(preList));
        }

        navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

    return(
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow:1}}>
          <H1 style={styles.heading}>Add To Watch List</H1>

          <Form>
            <Item rounded style={styles.formItem}>
              <Input placeholder="Enter The Season Name"
              style={{color:"#eee"}}
              value={name}
              onChangeText={(text)=>setName(text)}/>
            </Item>

            <Item rounded style={styles.formItem}>
              <Input placeholder="Total Number of Season"
              style={{color:"#eee"}}
              value={totalNoSeason}
              onChangeText={(text)=>setTotalNoSeason(text)}/>
            </Item>

            <Button rounded block
            onPress={addToList}>
              <Text style={{color:"#eee"}}>
                ADD
              </Text>
            </Button>
          </Form>

          
          </ScrollView>
        </Container>
    );
};

export default Add;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });