import React, {useState,useEffect} from "react";

import {
    StyleSheet,
    ScrollView
} from "react-native"; 

import { 
  Fab,
  Icon,
  List,
  ListItem,
  Container,
  Body,
  Text,
  Button,
  Left,
  Right,
  H1,
  Subtitle,
  CheckBox,
  Title,
  Spinner,
  Form,
  Item,
  Input
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";


const Edit=({navigation,route}) => {

  const [name, setName] = useState(''); 
  const [totalNoSeason, setTotalNoSeason] = useState('');
  const [id, setId] = useState(null);
  const [isWatched, setIsWatched] = useState(false);

  const upDate= async ()=>{
    try {
       if(!name||!totalNoSeason)
       {
         return alert("Please enter the value");
       }

       const seasonToUpdate={
         id,
         name,
         totalNoSeason,
         isWatched,
       };

       const storedValue=await AsyncStorage.getItem('@season_list');
       const list=await JSON.parse(storedValue);

       list.map((Singleseason)=>{
         if(Singleseason.id==id)
         {
           Singleseason.id=id;
           Singleseason.name=name;
           Singleseason.totalNoSeason=totalNoSeason;
           Singleseason.isWatched=isWatched;
         }
         return list;
       });

       await AsyncStorage.setItem("@season_list",JSON.stringify(list));

       navigation.navigate("Home");


    } catch (error) {
      console.log(error);
    }
 };

  useEffect(() => {
    const {season}=route.params;
    const {id,name,totalNoSeason}=season;
    setId(id);
    setName(name);
    setTotalNoSeason(totalNoSeason);
  }, []);

    return(
      <Container style={styles.container}>
      { <ScrollView contentContainerStyle={{flexGrow:1}}>
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
        onPress={upDate}>
          <Text style={{color:"#eee"}}>
            UPDATE
          </Text>
        </Button>
      </Form>
      </ScrollView> }
        </Container>
    );
};

export default Edit;

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