import mysql2 from 'mysql2';

// Crear un pool de conexiones
const connectionPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "Bufetero21",
    port: 3307,
    database: "QuickRestaurant"
}).promise(); // Agrega .promise() para usar async/await

// Función para obtener las bebidas
export const getBebidas = async (req, res) => {
  try {
    const [bebidas] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Bebidas'");
    res.json(bebidas);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// Función para obtener los postres
export const getPostres = async (req, res) => {
  try {
    const [postres] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Postres'");
    res.json(postres);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// Función para obtener las entradas
export const getEntradas = async (req, res) => {
  try {
    const [entradas] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Entradas'");
    res.json(entradas);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// Función para obtener los platillos
export const getPlatillos = async (req, res) => {
  try {
    const [platillos] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Platillos'");
    res.json(platillos);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// Función para obtener las ordenes que estan borradas
export const getOrdenesBorradas = async (req, res) => {
  try {
    const [ordenesEND] = await connectionPool.query("SELECT * FROM orden WHERE estatus = 0");
    res.json(ordenesEND);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

export const getDetallesOrden = async (req,res) =>{
  const { id_orden } = req.params;
  try{
    const query = "select * from vista_detalle_orden where id_orden = ?;";
    const [pedidosEND] = await connectionPool.query(query,[id_orden]);
    res.json(pedidosEND);
  }catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
}
 
// Función para agregar un nuevo producto
export const postProductos = async (req, res) => {
  const { nombre, categoria, precio, stock, descripcion, imgFile } = req.body;
  const query = 'CALL new_producto(?, ?, ?, ?, ?, ?)';
  const params = [nombre, categoria, precio, stock, descripcion, imgFile];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('Producto agregado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al agregar el producto');
  }
};

// Función para agregar un nuevo pedido
export const postOrder = async (req, res) => {
  const {cantidad,comentario} = req.body;
  const {id_producto,id_orden} = req.params;
  const query = 'CALL agregar_pedido(?, ?, ?)';
  const params = [id_producto,cantidad,id_orden,comentario];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('pedido creado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al agregar el pedido');
  }
};

// Función para eliminar un producto
export const deletePedido = async (req, res) => {
  const { pedidoDelete } = req.params;
  const query = 'DELETE FROM pedido WHERE id_pedido = ?;';
  const params = [pedidoDelete];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('pedido eliminado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al eliminar el pedido');
  }
};

// Función para eliminar un producto
export const deleteProductos = async (req, res) => {
  const { producDelete } = req.params;
  const query = 'DELETE FROM producto WHERE id_producto = ?;';
  const params = [producDelete];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('Producto eliminado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al eliminar el producto');
  }
};

export const getMesa = async (req, res) => {
  const {id_mesa} = req.params;
  const query = 'SELECT nombre_mesa FROM mesa WHERE id_mesa = ?;';
  const params = [id_mesa];
  try {
    const [mesa] =  await connectionPool.query(query, params);
    res.status(200).send(mesa[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

/////////////////  CHRISTIAN  ////////////////////////////

//Obtener las comandas desde la base de datos
export const getComandas = async (req, res) => {
  try {
    const query = 'SELECT * FROM VistaComandas';
    const result = await connectionPool.query(query);

    const comandas = result[0]; // Estuve teniendo un problema para traer los datos
    // de la base de datos a la pantalla, ya que me los mandaba por columnas y se supone que
    //con esto se quita jaja

    // Asegurarse de que 'comandas' sea un array
    console.log("Datos obtenidos de la base de datos:", comandas);

    // Agrupar comandas por id_pedido
    const comandasAgrupadas = {};

    comandas.forEach(comanda => {
      if (!comandasAgrupadas[comanda.id_pedido]) {
        comandasAgrupadas[comanda.id_pedido] = {
          id_pedido: comanda.id_pedido,
          nombre_mesa: comanda.nombre_mesa,
          comentario: comanda.comentario_pedido || "Sin comentarios",
          fecha_pedido: comanda.fecha_pedido,
          total_pedido: comanda.total_pedido,
          productos: []
        };
      }

      // Agregar el producto a la lista de productos de ese pedido
      comandasAgrupadas[comanda.id_pedido].productos.push({
        nombre_producto: comanda.nombre_producto,
        cantidad: comanda.cantidad,
      });
    });

    const resultado = Object.values(comandasAgrupadas);
    console.log("Comandas agrupadas:", resultado);

    // Enviar las comandas agrupadas
    res.status(200).json(resultado);
  } catch (err) {
    console.error('Error al obtener las comandas:', err);
    res.status(500).send('Error al obtener las comandas');
  }
};