// ProductsTable.jsx

import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Importamos el componente Sidebar
import Modal from './modal';     // Importamos el componente Modal

const ProductsTable = () => {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para el producto que se está editando
  const [editingProduct, setEditingProduct] = useState(null);
  // Estado para el nuevo producto a crear
  const [newProduct, setNewProduct] = useState({
    nombre_producto: '',
    descripcion: '',
    precio: 0,
    stock: 0,
  });

  // Estados para controlar la visibilidad de los modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Estados para el modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // useEffect para obtener los productos al montar el componente
  useEffect(() => {
    fetch('/api/productos')
      .then((response) => response.json())
      .then((data) => setProducts(data)) // Actualizamos el estado con los productos obtenidos
      .catch((error) =>
        console.error('Error al obtener los productos:', error)
      );
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Función para manejar la creación de un nuevo producto
  const handleCreateProduct = () => {
    fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct), // Enviamos el nuevo producto en el cuerpo de la solicitud
    })
      .then((response) => response.json())
      .then((product) => {
        setProducts([...products, product]); // Agregamos el nuevo producto a la lista
        // Reiniciamos el formulario de creación
        setNewProduct({
          nombre_producto: '',
          descripcion: '',
          precio: 0,
          stock: 0,
        });
        setIsCreateModalOpen(false); // Cerramos el modal de creación
      })
      .catch((error) => console.error('Error al crear el producto:', error));
  };

  // Función para manejar la eliminación de un producto
  const handleDeleteProduct = (id) => {
    fetch(`/api/productos/${id}`, { method: 'DELETE' })
      .then(() => {
        // Actualizamos la lista de productos excluyendo el eliminado
        setProducts(products.filter((product) => product.id_producto !== id));
        setIsDeleteModalOpen(false); // Cerramos el modal de confirmación
      })
      .catch((error) => console.error('Error al eliminar el producto:', error));
  };

  // Función para manejar la actualización de un producto
  const handleUpdateProduct = () => {
    fetch(`/api/productos/${editingProduct.id_producto}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProduct), // Enviamos el producto editado en el cuerpo de la solicitud
    })
      .then(() => {
        // Actualizamos la lista de productos con el producto editado
        setProducts(
          products.map((product) =>
            product.id_producto === editingProduct.id_producto
              ? editingProduct
              : product
          )
        );
        setEditingProduct(null); // Reiniciamos el estado de edición
        setIsModalOpen(false);   // Cerramos el modal de edición
      })
      .catch((error) =>
        console.error('Error al actualizar el producto:', error)
      );
  };

  // Función para abrir el modal de edición
  const openEditModal = (product) => {
    setEditingProduct(product); // Establecemos el producto que se va a editar
    setIsModalOpen(true);       // Abrimos el modal de edición
  };

  // Función para abrir el modal de confirmación de eliminación
  const openDeleteModal = (product) => {
    setProductToDelete(product);    // Establecemos el producto que se va a eliminar
    setIsDeleteModalOpen(true);     // Abrimos el modal de confirmación
  };

  return (
    <div className="admin-layout">
      <Sidebar /> {/* Componente de la barra lateral */}
      <div
        className="admin-table-container"
        style={{
          width: '90vw',
          padding: '20px 70px',
        }}
      >
        <h2 style={{ color: '#ffffff', display: 'inline-block' }}>
          Gestión de Productos
        </h2>
        <button
          onClick={() => setIsCreateModalOpen(true)} // Abrimos el modal de creación
          className="generic-crud-button"
        >
          Crear Producto
        </button>

        {/* Tabla de productos */}
        <table className="table" style={{ width: '100%', color: '#ffffff' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th style={{ width: '150px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Iteramos sobre la lista de productos para mostrar cada uno */}
            {products.map((product) => (
              <tr key={product.id_producto}>
                <td>{product.id_producto}</td>
                <td>{product.nombre_producto}</td>
                <td>{product.descripcion}</td>
                <td>${product.precio}</td>
                <td>{product.stock}</td>
                <td>
                  {/* Icono para editar el producto */}
                  <span
                    className="material-symbols-outlined generic-icon"
                    onClick={() => openEditModal(product)}
                  >
                    edit
                  </span>
                  {/* Icono para eliminar el producto */}
                  <span
                    className="material-symbols-outlined generic-icon"
                    onClick={() => openDeleteModal(product)}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear un nuevo producto */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)} // Función para cerrar el modal
        title="Crear Producto"
      >
        <div>
          <label>
            Nombre:
            <input
              type="text"
              className="modal-input"
              value={newProduct.nombre_producto}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  nombre_producto: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Descripción:
            <textarea
              className="modal-input"
              value={newProduct.descripcion}
              onChange={(e) =>
                setNewProduct({ ...newProduct, descripcion: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Precio:
            <input
              type="number"
              className="modal-input"
              value={newProduct.precio}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  precio: parseFloat(e.target.value),
                })
              }
            />
          </label>
          <br />
          <label>
            Stock:
            <input
              type="number"
              className="modal-input"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  stock: parseInt(e.target.value),
                })
              }
            />
          </label>
          <br />
          <button className="generic-button" onClick={handleCreateProduct}>
            Guardar
          </button>
        </div>
      </Modal>

      {/* Modal para editar un producto existente */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Función para cerrar el modal
        title="Editar Producto"
      >
        {editingProduct && (
          <div>
            <label>
              Nombre:
              <input
                type="text"
                className="modal-input"
                value={editingProduct.nombre_producto}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    nombre_producto: e.target.value,
                  })
                }
              />
            </label>
            <br />
            <label>
              Descripción:
              <textarea
                className="modal-input"
                value={editingProduct.descripcion}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    descripcion: e.target.value,
                  })
                }
              />
            </label>
            <br />
            <label>
              Precio:
              <input
                type="number"
                className="modal-input"
                value={editingProduct.precio}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    precio: parseFloat(e.target.value),
                  })
                }
              />
            </label>
            <br />
            <label>
              Stock:
              <input
                type="number"
                className="modal-input"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: parseInt(e.target.value),
                  })
                }
              />
            </label>
            <br />
            <button className="generic-button" onClick={handleUpdateProduct}>
              Guardar
            </button>
          </div>
        )}
      </Modal>

      {/* Modal para confirmar la eliminación de un producto */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)} // Función para cerrar el modal
        title="Confirmar Eliminación"
      >
        <div>
          <p>
            ¿Está seguro de que desea eliminar el producto "
            {productToDelete?.nombre_producto}"?
          </p>
          <button
            className="generic-button"
            onClick={() => {
              handleDeleteProduct(productToDelete.id_producto); // Llamamos a la función de eliminar
              setIsDeleteModalOpen(false); // Cerramos el modal
            }}
          >
            Sí, eliminar
          </button>
          <button
            className="generic-button"
            onClick={() => setIsDeleteModalOpen(false)} // Cerramos el modal sin eliminar
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsTable; // Exportamos el componente para usarlo en otras partes de la aplicación
