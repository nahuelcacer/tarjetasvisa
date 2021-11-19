import React, { useState } from 'react'
import db from './configFirebase/configFirebase'
import { collection, addDoc } from "firebase/firestore";


function App() {
  const [escribano, setEscribano] = useState({})
  const hanledEscribano = (e) => {
    setEscribano({
      ...escribano,
      [e.target.name] : e.target.value
    })
  }

  const hanledSubmit = (e) => {
    e.preventDefault()
    addEscribano(escribano)
  }
  const addEscribano = async (escribano) => {
    const docRef = await addDoc(collection(db,"escribanosVisa"), {
      nombre:escribano.nombre,
      tarjeta:escribano.tarjeta
    });
    console.log("Document written with ID: ", docRef.id);
  }
  return (
    <div className="container">
      <div className="input-group mb-3">
        <form onSubmit={hanledSubmit}>
          <label className="form-label">Agrega un escribano</label>
          <input onChange={(e)=>{hanledEscribano(e)}} className="form-control" name="nombre" placeholder="Nombre"></input>
          <input onChange={(e)=>{hanledEscribano(e)}} className="form-control" name="tarjeta" placeholder="Tarjeta"></input>
          <button className="btn btn-primary">Agregar</button>
        </form>
      </div>

      
      
    </div>
  );
}

export default App;
