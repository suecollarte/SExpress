import  fs from 'fs';

export class ProductManager{
  constructor(path,producto){
  //this.cuenta=0
  this.path=path
 
  
  }
  static producto=[]

generaID = () => (this.producto.length === 0) ? 1: this.producto[this.producto.length -1].id +1

abreArchivo = () => {
  
 
  try{ 
    if(fs.existsSync(this.path))
    {
      this.producto= JSON.parse(fs.readFileSync(this.path,'utf-8'));
      const datos = this.producto;
      //console.log(this.producto);
      return datos;
    } 
      return false
  }
  catch(error){
    console.log(error);
  }
 
  
  
}


encuentraCode = async(code,id) =>{
  //const todo= this.producto;
  try{
      if (id >1)
      {
          const p1= await this.producto.find(element => element.codigo === code );
          if(p1 != undefined)
          {
            console.log("no es posible ya existe codigo",p1.codigo);
            return false
          }
          
      }
      return true
}
catch(error){
     console.log(error)
}
}

addproducto=async(product)=>{
        
  try{
          let code=product['codigo'];

          
          this.abreArchivo(); 
          let id = this.generaID(); 
         
          if (this.encuentraCode(code,id))
          {
          
          product['id']=id;
          console.log("grabando",this.producto); 
           
          this.producto.push(product);
        
          fs.writeFileSync(this.path, JSON.stringify(this.producto), (error) => {
              if (error)
                return console.log("error");
            }); 
          }
  }
  catch(error){
    console.log(error);
  }

 }


traeProductsBy =async(id) =>
 {

      try{
          if (this.abreArchivo()){
          const producto = this.producto.find(item => item.id === id)
          if(producto === undefined)
          { 
            return `${id} NO EXISTE `;
          }

          else
          {
          return producto;
          }
          
          }

    }
    catch(error){
      console.log(error);
    }
 }

 BorrarProducto = async(id) =>{
  try{
    if (this.abreArchivo()){
         
    const arr=this.producto.map(function(obj){
        return obj;
    });
    
    let arr2=[];
    
    for(let i=0;i< arr.length;i++)
    {
      
        if(arr[i]['id']==id){
           console.log("revisando item", arr[i]['id']);
            console.log('se borra el elemento',id); 
        }else{
        let productoArray=arr[i];
        arr2.push(productoArray);
       }
    }
    this.producto=arr2;
    console.log('Largo Nuevo array',this.producto.length);
    try {
    
        fs.writeFileSync(this.path,JSON.stringify(this.producto,null,2));
    
        } 
        catch (err){
    
        console.log('error',err);
    
        }

    
      }
  }
  catch(error){
    console.log(error);
  }

 }


ModificarProducto = async(id,description) =>{
  try{

    if (this.abreArchivo()){
         
      const arr=ProductManager.producto.map(function(obj){
          return obj;
      });
      
      let arr2=[];
      
      for(let i=0;i< arr.length;i++)
      {
        
          if(arr[i]['id']==id){
             console.log("revisando item", arr[i]['id']);
             arr[i]['description']=description;
              console.log('modificando',id, "descripcion", description); 
          }
          let productoArray=arr[i];
          arr2.push(productoArray);
         
      }
      ProductManager.producto=arr2;
      
      try {
      
          fs.writeFileSync(this.path,JSON.stringify(ProductManager.producto,null,2));
      
          } 
          catch (err){
      
          console.log('error',err);
      
          }
  
      
        }

  }
  catch(error){
    console.log(error);
  }

 }
}

