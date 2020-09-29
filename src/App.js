import React, {useState} from "react";
import { useEffect } from "react";
import  api  from 'services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])
  const [likes, setLikes] = useState(0)

  async function handleAddRepository() {

    const response = await api.post('/repositories',{
      title: `Repository ${Date.now()}`,
      owner: 'Marcio'
      
    })
    const newRepository = response.data

    setRepositories([...repositories,newRepository])
  }
  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    if(response.status === 204) {
      const repository = repositories.filter(repository => repository.id !== id)
      setRepositories(repository)
    }
  }

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
