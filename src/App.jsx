import React, { useState } from 'react';
import CreatePrevio from './components/tools/CreatePrevio';
import HomeScreen from './components/tools/HomeScreen'; // Asegúrate de importar HomeScreen
import Login from './components/tools/Login';

const App = () => {
  const [view, setView] = useState(''); // Controla qué vista mostrar (home o create)

  const handleViewChange = (viewName) => {
    setView(viewName);
  };

  return (
    <div className="p-6">
      {/* Botones para cambiar entre vistas */}
      <div className="mb-6">
        <Login/>
        {/* <button
          onClick={() => handleViewChange('home')}
          className="py-2 px-4 bg-blue-500 text-white rounded mr-4"
        >
          Ver Previos
        </button>
        <button
          onClick={() => handleViewChange('create')}
          className="py-2 px-4 bg-green-500 text-white rounded"
        >
          Crear Nuevo Previo
        </button> */}
      </div>

      {/* Mostrar componente según la vista seleccionada */}
      {view === 'home' && <HomeScreen />}
      {view === 'create' && <CreatePrevio />}
    </div>
  );
};

export default App;
