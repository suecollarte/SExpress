import express from 'express'
import { ProductManager } from './src/ProductManager.js'

const productos = new ProductManager;
productos.path='./ejemplo1.txt';
console.log("path",productos.path);

const app= express()

const Archivo = productos.abreArchivo(); 
//console.log("Archivo productos:",Archivo);


app.get('/', (request,response) =>{
console.log('Productos')
response.send('<h1>Despliegue de productos</h1>');

})


/* app.get('/cursos', (request,response) =>{
    console.log('Recibida')
    response.send({cursos: ['hola','hola2' ]})
    
    }) */

app.get('/productos', (request,response) =>{
  // const id=2;
    //const id = request.params.id;
    const ilimitd= request.query.limite;
    if (!ilimitd){
        console.log('Desliegue productos')
        response.send(Archivo)
    
    }
    else
    {
      const Idmax= productos.generaID();
    
        let productoID =[];
      if (ilimitd <= Idmax)
      {
        let arr = Object.keys(Archivo).map(function (key) {return Archivo[key];});
        for(let id=0;id <= ilimitd;id++){
            productoID.push(arr[id]); 
             
        }
      } 
      else
      {
        productoID= Archivo;
      }
     
    if (!productoID)  return response.send({error: 'no contiene productos'})
    //response.send({curso})
    response.send(productoID)
    }
    })  

    
    app.get('/products/:pid', (request,response) =>{
        // const id=2;
          const pid = request.params.pid;
          const productoID= Archivo.find(item => item.id == pid)  
          if (!productoID)  return response.send({error: 'el producto no existe'})
          //response.send({curso})cd src

          response.send(productoID)
          
          })  

app.listen(8080, () => console.log('Arriba el servidor'))