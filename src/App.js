import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: "gostack-desafio-4-conceitos-react-js",
      url:
        "https://github.com/decarvalholucas/gostack-desafio-2-conceitos-node-js",
      techs: ["Node", "Express", "TypeScript"],
    });
    setRepositories([...respositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepo = respositories.filter((repository) => repository.id !== id);
    setRepositories(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map((repository) => (
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
