import React, { useEffect, useState } from 'react';
import { getPrevios } from '../api/palcoService';

const HomeScreen = () => {
  const [previos, setPrevios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener datos al cargar el componente
  useEffect(() => {
    const fetchPrevios = async () => {
      try {
        const data = await getPrevios();
        setPrevios(data);
      } catch (error) {
        console.error('Error obteniendo datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrevios();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <h1 className="col-span-full text-3xl font-bold text-center mb-6">Previos</h1>
      {previos.map((item) => (
        <div key={item.guiaHouse} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Guía House: {item.guiaHouse}</h2>
          <p className="text-gray-700"><strong>Cliente:</strong> {item.cliente}</p>
          <p className="text-gray-700"><strong>Peso Bruto:</strong> {item.pesoBruto}</p>
          <p className="text-gray-700"><strong>No. de Bultos:</strong> {item.noDeBultos}</p>
          <p className="text-gray-700"><strong>Recinto Fiscal:</strong> {item.recintoFiscal}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
