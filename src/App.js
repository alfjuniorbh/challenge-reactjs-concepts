import React, { useState, useEffect } from 'react';
import api from './services/api';
import { IoIosList, IoMdTrash } from 'react-icons/io';

import './styles.css';

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: `https://github.com/alfjuniorbh/${Date.now()}`,
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ['NodeJS', 'ReactJS', 'ReactNative'],
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repos = repositories.filter((repository) => repository.id !== id);
    setRepository(repos);
  }

  return (
    <div className='container'>
      <h1>
        <IoIosList />
        Repository Lists
      </h1>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => (
          <li key={repository.id}>
            <div className='divide'></div>
            <p>
              {repository.title} <span>{repository.url}</span>
            </p>

            <button
              data-testid='remove'
              onClick={() => handleRemoveRepository(repository.id)}
            >
              <IoMdTrash />
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Add Repository</button>
    </div>
  );
}

export default App;
