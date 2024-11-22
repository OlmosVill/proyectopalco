import React, { useEffect, useState } from 'react';
import { getPrevios } from '../api/palcoService';

const HomeScreen = () => {
  const [previos, setPrevios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

   return (
    <div>
      {/* Tarjetas */}
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <h1 className="col-span-full text-3xl font-bold text-center mb-6">Previos</h1>
        {previos.map((item) => (
          <div
            key={item.guiaHouse}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleCardClick(item)}
          >
            <h2 className="text-xl font-semibold mb-2">Guía House: {item.guiaHouse}</h2>
            <p className="text-gray-700"><strong>Cliente:</strong> {item.cliente}</p>
            <p className="text-gray-700"><strong>Peso Bruto:</strong> {item.pesoBruto}</p>
            <p className="text-gray-700"><strong>No. de Bultos:</strong> {item.noDeBultos}</p>
            <p className="text-gray-700"><strong>Recinto Fiscal:</strong> {item.recintoFiscal}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-5xl w-full">
            
            <h2 className="text-2xl font-bold mb-4">Detalles del previo</h2>
            <p><strong>Guía House:</strong> {selectedItem.guiaHouse}</p>
            <p><strong>Cliente:</strong> {selectedItem.cliente}</p>
            <p><strong>Peso Bruto:</strong> {selectedItem.pesoBruto}</p>
            <p><strong>No. de Bultos:</strong> {selectedItem.noDeBultos}</p>
            <p><strong>Recinto Fiscal:</strong> {selectedItem.recintoFiscal}</p>

            

            {/* Tabla de PreviosRow */}
            <h3 className="text-xl font-semibold mt-6 mb-2">Previos</h3>
            <table className="min-w-full bg-white border border-gray-300 pb-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Numero de piezas</th>
                  <th className="border px-4 py-2">Kilos</th>
                  <th className="border px-4 py-2">Descripcion</th>
                  <th className="border px-4 py-2">Origen</th>
                  <th className="border px-4 py-2">Marca</th>
                  <th className="border px-4 py-2">Modelo</th>
                  <th className="border px-4 py-2">No. de serie</th>
                  <th className="border px-4 py-2">No. de foto</th>
                  <th className="border px-4 py-2">No. de parte</th>
                  <th className="border px-4 py-2">Fraccion Arancelaria</th>

                  {/* Agrega más columnas según sea necesario */}
                </tr>
              </thead>
              <tbody>
                {selectedItem.previoRows.map((row, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{row.noPiezas}</td>
                    <td className="border px-4 py-2">{row.kilos}</td>
                    <td className="border px-4 py-2">{row.descripcion}</td>
                    <td className="border px-4 py-2">{row.origen}</td>
                    <td className="border px-4 py-2">{row.marca}</td>
                    <td className="border px-4 py-2">{row.modelo}</td>
                    <td className="border px-4 py-2">{row.noSerie}</td>
                    <td className="border px-4 py-2">{row.noFoto}</td>
                    <td className="border px-4 py-2">{row.noParte}</td>

                    {/* Agrega más celdas según sea necesario */}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="w-full py-2 bg-blue-500 text-white font-bold rounded top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
               Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
