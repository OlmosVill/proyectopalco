import React, { useState } from "react";
import { createPrevio } from "../api/palcoService";

const CreatePrevio = () => {
  const [formData, setFormData] = useState({
    guiaHouse: "",
    guiaMaster: "",
    cliente: "",
    pesoBruto: "",
    noDeBultos: "",
    fechaEntrada: "",
    fechaReconocimientoPrevio: "",
    recintoFiscal: "",
    previoRows: [], // Agregar para manejar las filas
  });

  const [row, setRow] = useState({
    noPiezas: "",
    kilos: "",
    descripcion: "",
    origen: "",
    marca: "",
    modelo: "",
    noSerie: "",
    noFoto: "",
    noParte: "",
    fraccionArancelaria: "",
    idGuiaHouse: ""
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

  // Manejar cambios en los inputs de las filas
  const handleRowChange = (e) => {
    const { name, value } = e.target;
    setRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  // Agregar una fila al listado
  const addRow = () => {
    if (!row.descripcion || !row.kilos || !row.noPiezas) {
      alert(
        "Los campos descripción, kilos y número de piezas son obligatorios."
      );
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      previoRows: [...prevData.previoRows, row],
    }));
    setRow({
      noPiezas: "",
      kilos: "",
      descripcion: "",
      origen: "",
      marca: "",
      modelo: "",
      noSerie: "",
      noFoto: "",
      noParte: "",
      fraccionArancelaria: "",
    });
  };

  // Eliminar una fila del listado
  const removeRow = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      previoRows: prevData.previoRows.filter((_, i) => i !== index),
    }));
  };

  // Enviar los datos al servidor (valida si hay filas agregadas)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validar que al menos haya una fila agregada
    if (formData.previoRows.length === 0) {
      setError('Debe agregar al menos una fila antes de enviar.');
      setLoading(false);
      return;
    }
    formData.previoRows.forEach(element => {
      element.idGuiaHouse = formData.guiaHouse
    });

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
        previoRows: [],
      });
    } catch (err) {
      console.log(err);
      setError('Hubo un error al crear el registro. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
  // Manejar la carga de imagen
  const handleFileChange = (e, rowId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setFormData((prevData) => ({
          ...prevData,
          filas: prevData.filas.map((row) =>
            row.id === rowId ? { ...row, noFoto: base64Image } : row
          ),
        }));
      };
      reader.readAsDataURL(file); // Convierte la imagen a Base64
    }
  };
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Crear Nuevo Previo
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex">
          <div className="flex-1 mx-10">
            <div>
              <label htmlFor="guiaHouse" className="block text-sm font-medium">
                Guía House
              </label>
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
              <label htmlFor="guiaMaster" className="block text-sm font-medium">
                Guía Master
              </label>
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
              <label htmlFor="cliente" className="block text-sm font-medium">
                Cliente
              </label>
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
              <label htmlFor="pesoBruto" className="block text-sm font-medium">
                Peso Bruto
              </label>
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
              <label htmlFor="noDeBultos" className="block text-sm font-medium">
                Número de Bultos
              </label>
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
              <label
                htmlFor="fechaEntrada"
                className="block text-sm font-medium"
              >
                Fecha de Entrada
              </label>
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
              <label
                htmlFor="fechaReconocimientoPrevio"
                className="block text-sm font-medium"
              >
                Fecha de Reconocimiento Previo
              </label>
              <input
                type="datetime-local"
                id="fechaReconocimientoPrevio"
                name="fechaReconocimientoPrevio"
                value={formData.fechaReconocimientoPrevio || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 text-black rounded"
              />
            </div>

            <div>
              <label
                htmlFor="recintoFiscal"
                className="block text-sm font-medium"
              >
                Recinto Fiscal
              </label>
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
          </div>

          <div className="flex-1">
            <div>
              <h3 className="text-lg font-bold mb-2">Agregar Filas</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="noPiezas"
                  value={row.noPiezas}
                  onChange={handleRowChange}
                  placeholder="Número de Piezas"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="number"
                  name="kilos"
                  value={row.kilos}
                  onChange={handleRowChange}
                  placeholder="Kilos"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="text"
                  name="descripcion"
                  value={row.descripcion}
                  onChange={handleRowChange}
                  placeholder="Descripción"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="text"
                  name="origen"
                  value={row.origen}
                  onChange={handleRowChange}
                  placeholder="Origen"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="text"
                  name="marca"
                  value={row.marca}
                  onChange={handleRowChange}
                  placeholder="Marca"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="text"
                  name="modelo"
                  value={row.modelo}
                  onChange={handleRowChange}
                  placeholder="Modelo"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="text"
                  name="noSerie"
                  value={row.noSerie}
                  onChange={handleRowChange}
                  placeholder="No. Serie"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="text"
                  name="noFoto"
                  value={row.noFoto}
                  onChange={handleRowChange}
                  placeholder="No. Foto"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="text"
                  name="noParte"
                  value={row.noParte}
                  onChange={handleRowChange}
                  placeholder="No. Parte"
                  className="p-2 border border-gray-300 text-black rounded"
                />
                <input
                  type="text"
                  name="fraccionArancelaria"
                  value={row.fraccionArancelaria}
                  onChange={handleRowChange}
                  placeholder="Fraccion Arancelaria"
                  className="p-2 border border-gray-300 text-black rounded"
                />
              </div>
              <button
                type="button"
                onClick={addRow}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Agregar Fila
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Filas Agregadas</h3>
              {formData.previoRows.length === 0 ? (
                <p className="text-gray-500">No hay filas agregadas.</p>
              ) : (
                <ul className="list-disc pl-5">
                  {formData.previoRows.map((row, index) => (
                    <li key={index} className="mb-2">
                      {`Piezas: ${row.noPiezas}, Kilos: ${row.kilos}, Descripción: ${row.descripcion}`}
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="ml-4 text-red-500"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Previo"}
        </button>
      </form>
    </div>
  );
};

export default CreatePrevio;
