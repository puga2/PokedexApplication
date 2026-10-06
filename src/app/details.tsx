import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Details() {
    const params = useLocalSearchParams();
    console.log(params.name);

    useEffect(()=>{

    },[])
    // async function fetchPokemonDetails(name:string){
    //   try{
    //   // const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
    //   // const data = await response.json();
    //   // console.log(data);
    //   //  console.log(JSON.stringify(pokemons[0], null, 2));
    //   }catch(error){
    //     console.error(error);
    // }
  return (
<ScrollView contentContainerStyle={{
  gap:16,
  padding:16
}}>
   
</ScrollView>
  );
}

const styles = StyleSheet.create({
  name:{
    fontSize:28,
    fontWeight:"bold",
    textAlign:'center',
  },
  type:{
    fontSize:20,
    fontWeight:'bold',
    color:"gray",
    textAlign:'center'
  }
})
