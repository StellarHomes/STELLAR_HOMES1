import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexSH from './components/IndexSH'; 
import LoginPage from './components/LoginPage'; 
import RegisterInm from './components/RegisterInm'; 
import RegisterCli from './components/RegisterCli'; 
import IndexUsu from './components/IndexUsu'; 
import InmobiliariaPerfil from './components/InmobiliariaPerfil';
import Publicar from './components/Publicar';  
import InmueblesList from './components/InmueblesList';
import EditarInmueble from './components/EditarInmueble';  // Importa el componente EditarInmueble

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<IndexSH />} /> 
          <Route path="/indexUsu" element={<IndexUsu />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/registerInm" element={<RegisterInm />} /> 
          <Route path="/registerCli" element={<RegisterCli />} /> 
          <Route path="/perfil" element={<InmobiliariaPerfil />} />
          <Route path="/publicar" element={<Publicar />} />
          <Route path="/inmuebles" element={<InmueblesList />} />
          {/* Ruta para la página de edición de un inmueble */}
          <Route path="/editarInmueble/:idInmueble" element={<EditarInmueble />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;