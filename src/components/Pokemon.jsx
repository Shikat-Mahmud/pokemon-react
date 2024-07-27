import { useEffect } from "react";
import { useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    if(loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    };

    if(error) {
        return (
            <div>
                <p className="text-error">Something went wrong.</p>
                <br />
                <h3>{error.message}</h3>
            </div>
        )
    }

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