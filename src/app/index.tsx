import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

//  "results": [
//     {
//       "name": "bulbasaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/1/"
//     },
interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}
interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}
const colorsbyType = {
  grass: "#A7D7A9",
  fire: "#F4A261",
  water: "#8EC5E8",
  bug: "#B7D77A",
  normal: "#C4C4C4",
  poison: "#C39BD3",
  electric: "#F6D365",
  ground: "#C9A66B",
  fairy: "#F2B5D4",
  fighting: "#E98B6B",
  psychic: "#D19FE8",
  rock: "#A9A39A",
  ghost: "#8C8CB8",
  ice: "#A9DDEB",
  dragon: "#C87878"
};
export default function Index() {
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    fetchPokemon();
    // fetech pokemon

  }, [])
  async function fetchPokemon() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
      const data = await response.json();
      // console.log(data);
      // setPokemon(data.results);
      console.log(JSON.stringify(pokemons[0], null, 2));
      // fetch detailed info for each pokemon in parallel
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types
          }
        })
      )
      setPokemon(detailedPokemons)
    } catch (e) {
      console.log(e);
    }

  }
  return (
    <ScrollView contentContainerStyle={{
      gap: 16,
      padding: 16
    }}>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name}
        href={{pathname:"/details",params:{name:pokemon.name}}}
        >
          <View
            style={{

              // @ts-ignore
              backgroundColor: colorsbyType[pokemon.types[0].type.name] + 80,
              padding: 20,
              borderRadius: 20,
            }}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 200, height: 200 }}
              />
              <Image
                source={{ uri: pokemon.imageBack }}
                style={{ width: 200, height: 200 }}
              />
            </View>

          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: 'center',
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "gray",
    textAlign: 'center'
  }
})
