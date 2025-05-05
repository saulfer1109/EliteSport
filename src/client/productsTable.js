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
    imagen: null,
  });

  // Estados para controlar la visibilidad de los modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Estados para el modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Agrega estos estados al inicio del componente
  const [availableSizes, setAvailableSizes] = useState([]); // Tallas disponibles
  const [selectedSizes, setSelectedSizes] = useState([]);   // Tallas seleccionadas

  // useEffect para obtener los productos al montar el componente
  useEffect(() => {
    fetch('/api/productos')
      .then((response) => response.json())
      .then((data) => setProducts(data)) // Actualizamos el estado con los productos obtenidos
      .catch((error) =>
        console.error('Error al obtener los productos:', error)
      );
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Función para manejar la subida de imágenes
  const handleImageChange = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (isEditing) {
      setEditingProduct({ ...editingProduct, imagen: file }); // Guarda la imagen en el estado de edición
    } else {
      setNewProduct({ ...newProduct, imagen: file }); // Guarda la imagen en el estado de creación
    }
  };

  // Función para manejar la creación de un nuevo producto
  const handleCreateProduct = () => {
    const formData = new FormData();
    formData.append('nombre_producto', newProduct.nombre_producto);
    formData.append('descripcion', newProduct.descripcion);
    formData.append('precio', newProduct.precio);
    formData.append('stock', newProduct.stock);
    if (newProduct.imagen) {
      formData.append('imagen', newProduct.imagen); // Agrega la imagen al FormData
    }

    fetch('/api/productos', {
      method: 'POST',
      body: formData, // Enviamos el FormData
    })
      .then((response) => response.json())
      .then((product) => {
        // Realiza una petición para asociar las tallas seleccionadas al producto
        if (selectedSizes.length > 0) {
          fetch(`/api/productos/${product.id_producto}/tallas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tallas: selectedSizes }),
          })
            .then(() => {
              console.log('Tallas asociadas correctamente');
            })
            .catch((error) => console.error('Error al asociar tallas:', error));
        }

        setProducts([...products, product]);
        setNewProduct({
          nombre_producto: '',
          descripcion: '',
          precio: 0,
          stock: 0,
          imagen: null,
        });
        setSelectedSizes([]); // Reinicia las tallas seleccionadas
        setIsCreateModalOpen(false);
      })
      .catch((error) => console.error('Error al crear el producto:', error));
  };

  // Función para manejar la eliminación de un producto
  const handleDeleteProduct = (id) => {
    fetch(`/api/productos/${id}/eliminar`, { method: 'DELETE' })
      .then(() => {
        // Actualizamos la lista de productos excluyendo el eliminado
        setProducts(products.filter((product) => product.id_producto !== id));
        setIsDeleteModalOpen(false); // Cerramos el modal de confirmación
      })
      .catch((error) => console.error('Error al eliminar el producto:', error));
  };

  const handleUpdateProduct = () => {
    const formData = new FormData();
    formData.append('nombre_producto', editingProduct.nombre_producto);
    formData.append('descripcion', editingProduct.descripcion);
    formData.append('precio', editingProduct.precio);
    formData.append('stock', editingProduct.stock);
    if (editingProduct.imagen) {
      formData.append('imagen', editingProduct.imagen); // Agrega la imagen al FormData
    }
  
    fetch(`/api/productos/${editingProduct.id_producto}`, {
      method: 'PUT',
      body: formData, // Enviamos el FormData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el producto');
        }
        return response.json();
      })
      .then((updatedProduct) => {
        console.log('Producto actualizado correctamente:', updatedProduct);
        setProducts(
          products.map((product) =>
            product.id_producto === updatedProduct.producto.id_producto
              ? updatedProduct.producto
              : product
          )
        );
        setEditingProduct(null);
        setIsModalOpen(false);
      })
      .catch((error) => console.error('Error al actualizar el producto:', error));
  };

  // Función para abrir el modal de edición
  const openEditModal = (product) => {
    setEditingProduct(product); // Establecemos el producto que se va a editar
    setSelectedSizes([]); // Reiniciamos las tallas seleccionadas
    setIsModalOpen(true);       // Abrimos el modal de edición

    // Obtener las tallas relacionadas con el producto
    fetch(`/api/productos/${product.id_producto}/tallas`)
      .then((response) => response.json())
      .then((data) => {
        const relatedSizes = data.map((size) => size.id_talla); // Extraemos los IDs de las tallas relacionadas
        setSelectedSizes(relatedSizes); // Actualizamos el estado con las tallas relacionadas
      })
      .catch((error) => console.error('Error al obtener las tallas relacionadas:', error));
  };

  // Función para abrir el modal de confirmación de eliminación
  const openDeleteModal = (product) => {
    setProductToDelete(product);    // Establecemos el producto que se va a eliminar
    setIsDeleteModalOpen(true);     // Abrimos el modal de confirmación
  };

  // Obtén las tallas disponibles al montar el componente
  useEffect(() => {
    fetch('/api/tallas') // Endpoint para obtener las tallas
      .then((response) => response.json())
      .then((data) => setAvailableSizes(data)) // Actualiza el estado con las tallas disponibles
      .catch((error) => console.error('Error al obtener las tallas:', error));
  }, []);

  // Maneja el cambio de selección de tallas
  const handleSizeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSelectedSizes(selectedOptions); // Actualiza las tallas seleccionadas
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
          onClick={() => {
            setIsCreateModalOpen(true); // Abrimos el modal de creación
            setSelectedSizes([]); // Reinicia las tallas seleccionadas
          }}  // Abrimos el modal de creación
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
          <br />
          <label>
            Imagen:
            <input
              type="file"
              className="modal-input"
              accept="image/*"
              onChange={(e) => handleImageChange(e)} // Maneja la subida de imágenes
            />
          </label>
          <br />
          {/* Campo de selección múltiple para tallas */}
          <label>
            Tallas:
            <div className="checkbox-group">
              {availableSizes.map((size) => (
                <div key={size.id_talla} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <input
                    type="checkbox"
                    id={`size-${size.id_talla}`}
                    value={size.id_talla}
                    checked={selectedSizes.includes(size.id_talla)} // Marca el checkbox si está seleccionado
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Agrega la talla seleccionada
                        setSelectedSizes([...selectedSizes, size.id_talla]);
                      } else {
                        // Elimina la talla deseleccionada
                        setSelectedSizes(selectedSizes.filter((id) => id !== size.id_talla));
                      }
                    }}
                  />
                  <label htmlFor={`size-${size.id_talla}`} style={{ marginLeft: '8px' }}>
                    {size.talla}
                  </label>
                </div>
              ))}
            </div>
          </label>
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
            <br />
            <label>
              Imagen:
              <input
                type="file"
                className="modal-input"
                accept="image/*"
                onChange={(e) => handleImageChange(e, true)} // Maneja la subida de imágenes en edición
              />
            </label>
            <br />
            {/* Campo de selección múltiple para tallas */}
            <label>
              Tallas:
              <div className="checkbox-group">
                {availableSizes.map((size) => (
                  <div key={size.id_talla} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <input
                      type="checkbox"
                      id={`size-${size.id_talla}`}
                      value={size.id_talla}
                      checked={selectedSizes.includes(size.id_talla)} // Marca el checkbox si está seleccionado
                      onChange={(e) => {
                        if (e.target.checked) {
                          // Agrega la talla seleccionada
                          setSelectedSizes([...selectedSizes, size.id_talla]);
                        } else {
                          // Elimina la talla deseleccionada
                          setSelectedSizes(selectedSizes.filter((id) => id !== size.id_talla));
                        }
                      }}
                    />
                    <label htmlFor={`size-${size.id_talla}`} style={{ marginLeft: '8px' }}>
                      {size.talla}
                    </label>
                  </div>
                ))}
              </div>
            </label>
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
        </div>
      </Modal>
    </div>
  );
};

export default ProductsTable; // Exportamos el componente para usarlo en otras partes de la aplicación
