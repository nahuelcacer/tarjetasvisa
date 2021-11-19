import React, { useState, useEffect } from 'react'
import db from './configFirebase/configFirebase'
import { collection, addDoc, getDocs } from "firebase/firestore";



function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    
    const Consulta = async () => {
      const datos = []
      const documentos = await getDocs(collection(db, "escribanosVisa"));
      documentos.forEach(doc => {
        datos.push(doc.data())
      })
      setData(datos)
    }
    Consulta();
  }, [])

    
  
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
      tarjeta:escribano.tarjeta,
      tipotarjeta:escribano.tipotarjeta,
      ref:data.length + 1

    });
    console.log("Document written with ID: ", docRef.id);
    /*AGREGAR ALGO PARA QUE ACTUALICE DATOS DE HOOK DATA*/
  }

  return (
    <div className="container">
      <div className="input-group mb-3">
        <form onSubmit={hanledSubmit}>
          <label className="form-label">Agrega un escribano</label>
          <input onChange={(e)=>{hanledEscribano(e)}} className="form-control" name="nombre" placeholder="Nombre"></input>
          <input onChange={(e)=>{hanledEscribano(e)}} className="form-control" name="tarjeta" placeholder="Tarjeta"></input>
          <input onChange={(e)=>{hanledEscribano(e)}} className="form-control" name="tipotarjeta" placeholder="Tipo de tarjeta"></input>

          <button className="btn btn-primary mt-3">Agregar</button>
        </form>
      </div>
      <div>
        <div>PARAMETROS DE DEBITO AUTOMATICO</div>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ref</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tarjeta</th>
              <th scope="col">Tipo</th>

            </tr>
          </thead>
          <tbody>
            {
              data.map(escribano => {
                var tarjeta = escribano.tarjeta.match(/.{1,4}/g)
                var cardNumber = tarjeta[0]+" "+tarjeta[1]+" "+tarjeta[2]+" "+tarjeta[3]
                return (
                  <tr key={escribano.id}>
                    <td>{escribano.ref} </td>
                    <td>{escribano.nombre}</td>
                    <td>{cardNumber}</td>
                    <td>{escribano.tipotarjeta}</td>

                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>
      
      
    </div>
  );
}

export default App;
