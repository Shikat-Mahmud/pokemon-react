import { useEffect } from "react";
import { useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);

    // api link
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

    // fetch data from api
    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);

            // store fetched data in json 
            const data = await res.json();

            // console.log(data);

            const detailedPokemonData = data.results.map(async (curPokemon) => {
                // console.log(curPokemon.url);

                const res = await fetch(curPokemon.url);
                const data = await res.json();

                return data;
            });

            // console.log(detailedPokemonData);

            const detailedResponse = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponse);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    return (
        <section className="container">
            <header>
                <h1>Welcome to Pokemon World</h1>
            </header>
            <div>
                <ul className="cards">
                    {
                        pokemon.map((curPokemon) => {
                            return (
                                <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
};