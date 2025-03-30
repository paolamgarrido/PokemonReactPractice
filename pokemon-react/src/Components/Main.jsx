import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Main=()=>{
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setPrevUrl]=useState();
    const [pokeDex,setPokeDex]=useState();

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const res = await axios.get(url);
          setNextUrl(res.data.next);
          setPrevUrl(res.data.previous);
      
          const pokemonData = await Promise.all(
            res.data.results.map(async (item) => {
              const result = await axios.get(item.url);
              return result.data;
            })
          );
          pokemonData.sort((a, b) => a.id - b.id);
          setPokeData(pokemonData);
          setLoading(false);
        };
      
        fetchData();
      }, [url]);
      
    return(
        <>
            <div className="container">
                <div className="left-content">
                    <div className="card-grid">
                        <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    </div>
                    <div className="btn-group">
                        {  prevUrl && <button onClick={()=>{
                            setPokeData([])
                           setUrl(prevUrl) 
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex}/>
                </div>
            </div>
        </>
    )
}

export default Main;