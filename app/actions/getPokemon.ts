"use server"

export async function getPokemon ({query, page = 1, limit= 1500}:{
    query? : string
    page? : number
    limit? : number
}) {
    let apiUrl =  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) *24}`

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()

        if (query){
            const filteredPokemon = data.results.filter((pokemon: {name: string}) => 
             pokemonNameStartsWithQuery (pokemon.name, query.toLowerCase()))
          
            return filteredPokemon.slice(0 , 24)
        }else{
            return data.results.slice(0, 24)
        }

    } catch (error) {
        console.log(error)
        return null
    }

    function pokemonNameStartsWithQuery (name: string , query : string) {

        return name.toLowerCase().startsWith(query)
    }
}