import React, { useState, useEffect } from 'react';
import './App.css';


function useFetch(url, defaultResponse) {
  const [ data, setData ] = useState(defaultResponse)
  const [ isLoading, setIsLoading ] = useState(true)

  async function getDataFromApi(url){
    try{
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      setData(data)
      setIsLoading(false)
    } catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getDataFromApi(url)
    return () => {
      
    }
  }, [url])

  return {data, isLoading}
}

function App() {

  const user = 'leodini'
  const apiEndpoint = `https:api.github.com/users/${user}`

  const { data, isLoading } = useFetch(apiEndpoint, {isLoading: true, data: null})

  if(!data || isLoading){
    return 'LOADING...'
  }

  const { login, avatar_url } = data

  return (
    <div className="App">
      <div>
        <h3>name: {login}</h3>
        <img src={avatar_url} alt="avatar"/>
      </div>
    </div>
  );
}

export default App;
