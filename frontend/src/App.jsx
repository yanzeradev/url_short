import { useState } from "react";
import axios from "axios";

export default function App(){
  const [urlOriginal, setUrlOriginal] = useState('');
  const [urlShort, setUrlShort] = useState('');

  const handleShorten = async (e) => {
    e.preventDefault();
    //alert(`O usuário quer encurtar: ${urlOriginal}`);

    try {
      const apiUrl = import.meta.env.API_URL;

      const response = await axios.post('/shorten', {
        urlOriginal: urlOriginal
      });

      const urlCreate = response.data.urlShort;

      setUrlShort(urlCreate);
    }catch (error) {
      console.error("Erro ao comunicar com backend:", error);
      alert("Erro ao encurtar a URL, verifique se o backend está rodando.")
    }
  }

  return(
    <div className="container">
      <h1>Encurtador de URL</h1>
      <p>Cole sua URL para ser encurtada</p>

      <form onSubmit={handleShorten}>
        <input
          type="url"
          placeholder="https://exemplo.com/caminho-longo"
          required
          value={urlOriginal}
          onChange={(e) => setUrlOriginal(e.target.value)}
        />
        <button type="submit">Encurtar URL</button>
      </form>

      {urlShort && (
        <div className="result">
          <p>Seu link encurtado está pronto!</p>
          <a href={urlShort} target="_blank" rel="noreferrer">
            {urlShort}
          </a>
        </div>
      )}
    </div>
  );
}