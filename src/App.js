import React, {useState} from "react";
import  api  from 'services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    api.post('/repositories',{
      title: `Repository ${Date.now()}`,
    }).then(response => {
      const newRepository = response.data

      setRepositories([...repositories,newRepository])
    })
  }
  
  async function handleRemoveRepository(id) {
    api.delete('/repositories').then(response => console.log(response.data))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(1)}>
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
