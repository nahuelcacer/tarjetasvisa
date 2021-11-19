import React, { useState, useEffect } from 'react'
import db from './configFirebase/configFirebase'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { saveAs } from 'file-saver';



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
  const [periodo,setPeriodo] = useState("")
  const [date,setDate] = useState("")
  const Fecha = (fecha) => {
    var fecha1 = fecha.split('-')
    return fecha1[2] + fecha1[1] + fecha1[0].slice(2)
  }
  const [importe, setImporte] = useState([]);
  const hanledImport = (e) => {
    setImporte({
      ...importe,
      [e.target.name]: e.target.value
    })
  }
  function Total() {
    var total = []
    for (let obj in importe) {
      total.push(parseFloat(importe[obj]))
    }

    // importe.map(item=> {
    //   total.push(parseFloat(item))
    // })
    var total1 = total.reduce((a, b) => a + b, 0)
    var total2 = total1.toFixed(2).split(".");
    var totalt = total2[0] + total2[1]
    return totalt


  }
  const datos = () => {
    let cadena = ""

    data.map(item => {
      var total = parseFloat(importe[item.ref])
      var total1 = total.toFixed(2).split(".");
      var totalt = total1[0] + total1[1]
      cadena += "28341931" + "2" + item.tarjeta + item.ref.padStart(12, "0") + "00100101" + totalt.padStart(11, "0") + periodo+ " "  + " " + Fecha(date) + item.nombre.padEnd(40, " ") + " ".repeat(20) + "\n"
    })
    return cadena;
  }

  const CreateFile = () => {
    var comercio = "28341931"
    var header = comercio + "1" + Fecha(date) + data.length.toString().padStart(7, "0") + "0" + Total().padStart(14,"0") + " ".repeat(91) + "\n"

    const file = new Blob([header + datos()], {type: 'text/plain'});
    saveAs(file, "file.txt");
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
      <div className="row">
        <div>PARAMETROS DE DEBITO AUTOMATICO</div>
        <div className="col-3"><input placeholder="MMAA" onChange={(e)=>{setPeriodo(e.target.value)}}></input></div>
        <div className="col-3"><input type="date" onChange={(e)=>{setDate(e.target.value)}}></input></div>

        <div className="col-3"><label>Importe total</label></div>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ref</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tarjeta</th>
              <th scope="col">Tipo</th>
              <th scope="col">Importe</th>


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
                    <td><input name={escribano.ref} onChange={(e) => { hanledImport(e) }} placeholder="$"></input></td>


                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>
      <button onClick={CreateFile} className="btn btn-primary">Crear archivo</button>
      
      
    </div>
  );
}

export default App;
