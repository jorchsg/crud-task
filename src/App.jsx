import React, { useState } from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, setTarea] = useState('');

  const [tareas, setTareas] = useState([]);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [id, setId] = useState('');

  const [error, setError] = useState(null);

  // Funcion para agregar tarea
  const agregarTarea = e => {

    e.preventDefault();

    // Validar que el input no este vacio
    if (!tarea.trim()) {
      setError('Escriba algo por favor')
      return;
    }

    // Agregar Tareas 
    setTareas([
      ...tareas,
      { id: shortid.generate(), nombreTarea: tarea }
    ]);

    // Limpiar Formulario
    setTarea('');

    setError(null);

  }

  // Función para eliminar una tarea por medio del id
  const eliminarTarea = id => {
    // Si el ID coincide lo eliminamos del arreglo filtrado, en caso de que sean distintos lo conservamos en el arreglo.
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  // Función para cambiar los elementos del formulario al editar una tarea
  const editar = item => {

    setModoEdicion(true);
    // Le pasamos al input el valor del elemento al hacer clic en editar
    setTarea(item.nombreTarea);

    // Obtenemos el ID
    setId(item.id)
  }

  // Funcion para editar una tarea
  const editarTarea = e => {

    e.preventDefault();

    // Validar que el input no este vacio
    if (!tarea.trim()) {
      setError('Escriba algo por favor');
      return;
    }

    // Obtener el emento que queremos editar con Map
    const arrayEditado = tareas.map(
      // Si el ID es correcto, devolvemos el objeto con sus valores en caso contrario retornamos todas las tareas
      item => item.id === id ? { id: id, nombreTarea: tarea } : item
    )
    setTareas(arrayEditado)
    setModoEdicion(false);
    setTarea('');
    setId('');
    setError(null);
  }


  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="text-center">CRUD TASK</h1>
        <hr></hr>
        <div className="row">
          <div className="col-8">
            <h4 className="text-center">Lista de Tareas</h4>
            <ul className="list-group">
              {
                tareas.length === 0 ? (
                  <li className="list-group-item">No Tienes Tareas</li>
                ) : (

                    tareas.map(item => (
                      <li className="list-group-item" key={item.id}>
                        <span className="lead">{item.nombreTarea}</span>
                        <button
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => eliminarTarea(item.id)}
                        >Eliminar
                        </button>

                        <button
                          className="btn btn-warning btn-sm float-right"
                          onClick={() => editar(item)}
                        >Editar
                        </button>
                      </li>
                    ))

                  )
              }
            </ul>
          </div>
          <div className="col-4">
            <h4 className="text-center">
              {modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}
            </h4>
            <form
              onSubmit={modoEdicion ? editarTarea : agregarTarea}
            >
              {
                error ? <span className="text-danger">{error}</span> : null
              }
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese Tarea"
                onChange={e => setTarea(e.target.value)}
                value={tarea}
              />
              {modoEdicion ?
                (
                  <button
                    className="btn btn-warning btn-block"
                    type="submit"
                  >Guardar Cambios</button>
                )
                : (
                  <button
                    className="btn btn-dark btn-block"
                    type="submit"
                  >Agregar</button>
                )}
            </form>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
