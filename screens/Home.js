import React,{useState,useEffect} from "react";
import {
    StyleSheet,
    ScrollView,
    Image,
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
  Spinner
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import {useIsFocused} from "@react-navigation/native";

const Home=({navigation,route}) => {

  const [listOfSeason,setListOfSeason]=useState([]);
  const [loading,setLoading]=useState(false);

  const isFocuse=useIsFocused();

  const getSeason=async() => {
    setLoading(true);

    const storedValue=await AsyncStorage.getItem('@season_list');
    if(!storedValue)
    {
      setListOfSeason([]);
    }

    const list=JSON.parse(storedValue);
    setListOfSeason(list);

    setLoading(false);
  };

  const deleteSeason= async(id) => {
    const newlist= await listOfSeason.filter((list)=>list.id!==id);
    await AsyncStorage.setItem('@season_list',JSON.stringify(newlist));
    setListOfSeason(newlist);

  };

  const markComplte=async(id) =>{
    const newArr=listOfSeason.map((list)=>{
      if(list.id==id)
      {
        list.isWatched=!list.isWatched;
      }
      return list;
   })
   await AsyncStorage.setItem('@season_list',JSON.stringify(newArr));
    setListOfSeason(newArr);
  };

  useEffect(()=>{
    getSeason();
  },[isFocuse]);

  if(loading)
  {
    return (
      <Container style={styles.container}>
        <Spinner color="#00b7c2"/>
      </Container>
    );
  }
    return(
        <ScrollView contentContainerStyle={styles.container}>
          {listOfSeason.length==0?(
            <Container style={styles.container} >
              <H1 style={styles.heading}>List is empty.Please add a season</H1>
            </Container>
          ):(
            <>
                <H1 style={styles.heading}>Next series to watch</H1>
                <List>
                  {listOfSeason.map((season)=>(
                    <ListItem key={season.id} noBorder style={styles.listItem}>
                    <Left>
                      <Button style={styles.actionButton}
                         danger
                         onPress={()=>deleteSeason(season.id)}>
                        <Icon name="trash" active/>
                      </Button>

                      <Button style={styles.actionButton}
                         onPress={()=>{
                           navigation.navigate("Edit",{season})
                         }}>
                        <Icon name="edit" active  type="Feather"/>
                      </Button>
                    </Left>
                     
                    <Body>
                      <Title style={styles.seasonName}>{season.name}</Title>
                      <Text note >{season.totalNoSeason} season to watch </Text>
                    </Body>

                    <Right>
                      <CheckBox checked={season.isWatched}
                      onPress={()=>markComplte(season.id)}/>
                    </Right>
               </ListItem>
                  ))}
                </List>

            </>
          )}

          <Fab 
          style={{backgroundColor:"#5067FF"}}
          position="bottomRight"
          onPress={()=>navigation.navigate("Add")}>
              <Icon name="add" />
          </Fab>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });
  