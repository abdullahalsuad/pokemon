import { useEffect, useState } from "react";
import Footer from "./Componet/Footer";
import PokemonThumnail from "./Componet/PokemonThumnail";

function App() {

      const [allPokemons,setAllpokemons] = useState([])
      const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')


       const getAllPokemons = async () =>{
          const res = await fetch(loadMore)
          const data = await res.json()
          
          
     

          setLoadMore(data.next)
          
          function createPokemonObject (result){
            result.forEach(async (pokemon) => {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              const data = await res.json()
        

            
              
              setAllpokemons(currentList => [...currentList, data])

            })
          }
          createPokemonObject(data.results) 
       }  
       
      useEffect(() =>{
        getAllPokemons()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])     //* load 1 time

      
 
  return (
    <div className="app-contaner">
        <h1>Pokemon Evolution</h1>
        <div className="pokemon-container">
            <div className="all-container">
              
              
                
                  {allPokemons.map(pokemon => 
                    <PokemonThumnail 
                    key={Math.random()}
                    image={pokemon.sprites.other.dream_world.front_default}
                    id={pokemon.id}
                    name={pokemon.name}
                    type={pokemon.types[0].type.name}
                    />
                  )}
                
            </div>
            <button type="button" className="btn btn-outline-secondary m-2 load-more" onClick={() => getAllPokemons()}>Load more </button>
        </div>
        <Footer />
    </div>
  );
}

export default App;
