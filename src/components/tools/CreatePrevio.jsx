import React, { useState } from 'react';
import { createPrevio } from '../api/palcoService';

const CreatePrevio = () => {
  const [formData, setFormData] = useState({
    guiaHouse: '',
    guiaMaster: '',
    cliente: '',
    pesoBruto: '',
    noDeBultos: '',
    fechaEntrada: '',
    fechaReconocimientoPrevio: '',
    recintoFiscal: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Enviar los datos al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createPrevio(formData);
      alert('Previo creado con éxito!');
      // Resetear formulario
      setFormData({
        guiaHouse: '',
        guiaMaster: '',
        cliente: '',
        pesoBruto: '',
        noDeBultos: '',
        fechaEntrada: '',
        fechaReconocimientoPrevio: '',
        recintoFiscal: '',
      });
    } catch (err) {
      setError('Hubo un error al crear el registro. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Crear Nuevo Previo</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="guiaHouse" className="block text-sm font-medium">Guía House</label>
          <input
            type="text"
            id="guiaHouse"
            name="guiaHouse"
            value={formData.guiaHouse}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="guiaMaster" className="block text-sm font-medium">Guía Master</label>
          <input
            type="text"
            id="guiaMaster"
            name="guiaMaster"
            value={formData.guiaMaster}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
          />
        </div>

        <div>
          <label htmlFor="cliente" className="block text-sm font-medium">Cliente</label>
          <input
            type="text"
            id="cliente"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="pesoBruto" className="block text-sm font-medium">Peso Bruto</label>
          <input
            type="number"
            id="pesoBruto"
            name="pesoBruto"
            value={formData.pesoBruto}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="noDeBultos" className="block text-sm font-medium">Número de Bultos</label>
          <input
            type="text"
            id="noDeBultos"
            name="noDeBultos"
            value={formData.noDeBultos}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="fechaEntrada" className="block text-sm font-medium">Fecha de Entrada</label>
          <input
            type="datetime-local"
            id="fechaEntrada"
            name="fechaEntrada"
            value={formData.fechaEntrada}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="fechaReconocimientoPrevio" className="block text-sm font-medium">Fecha de Reconocimiento Previo</label>
          <input
            type="datetime-local"
            id="fechaReconocimientoPrevio"
            name="fechaReconocimientoPrevio"
            value={formData.fechaReconocimientoPrevio || ''}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
          />
        </div>

        <div>
          <label htmlFor="recintoFiscal" className="block text-sm font-medium">Recinto Fiscal</label>
          <input
            type="text"
            id="recintoFiscal"
            name="recintoFiscal"
            value={formData.recintoFiscal}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Previo'}
        </button>
      </form>
    </div>
  );
};

export default CreatePrevio;
