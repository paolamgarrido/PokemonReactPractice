import React, { useState, useEffect } from "react";
import { getPokemonData } from "../casosDeUso/getPokemonData";
import Card from "../vistas/componentes/Card";
import Pokeinfo from "../vistas/componentes/PokeInfo";

const Pokedex = () => {
  const [pokeData, setPokeData] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [pokeDex, setPokeDex] = useState();

  useEffect(() => {
    setLoading(true);
    getPokemonData(url).then((res) => {
      setPokeData(res.data);
      setNextUrl(res.next);
      setPrevUrl(res.prev);
      setLoading(false);
    });
  }, [url]);

  return (
    <div className="container">
      <div className="left-content">
        <div className="card-grid">
          <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
        </div>
        <div className="btn-group">
          {prevUrl && <button onClick={() => setUrl(prevUrl)}>Previous</button>}
          {nextUrl && <button onClick={() => setUrl(nextUrl)}>Next</button>}
        </div>
      </div>
      <div className="right-content">
        <Pokeinfo data={pokeDex} />
      </div>
    </div>
  );
};

export default Pokedex;