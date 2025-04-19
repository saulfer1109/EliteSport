import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import Modal from '../modal';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    password: '',
    roletype_id: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Agregar estados para el modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Obtener usuarios
  useEffect(() => {
    fetch('/api/usuarios')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error('Error al obtener los usuarios:', error)
      );
  }, []);

  // Manejar creación de usuario
  const handleCreateUser = () => {
    fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((user) => {
        setUsers([...users, user]);
        setNewUser({
          nombre: '',
          email: '',
          password: '',
          roletype_id: null,
        });
        setIsCreateModalOpen(false);
      })
      .catch((error) => console.error('Error al crear usuario:', error));
  };

  // Manejar edición de usuario
  const handleUpdateUser = () => {
    fetch(`/api/usuarios/${editingUser.id_usuario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingUser),
    })
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id_usuario === editingUser.id_usuario ? editingUser : user
          )
        );
        setEditingUser(null);
        setIsModalOpen(false);
      })
      .catch((error) => console.error('Error al actualizar usuario:', error));
  };

  // Manejar eliminación de usuario
  const handleDeleteUser = (id) => {
    fetch(`/api/usuarios/${id}`, { method: 'DELETE' })
      .then(() => {
        setUsers(users.filter((user) => user.id_usuario !== id));
        setIsDeleteModalOpen(false); // Cerrar el modal después de eliminar
      })
      .catch((error) => console.error('Error al eliminar usuario:', error));
  };

  // Abrir el modal para editar un usuario
  const openEditModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Abrir el modal para confirmar eliminación
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div
        className="admin-table-container"
        style={{
          width: '90vw',
          paddingTop: '20px',
          padding: '70px',
          paddingLeft: '100px',
        }}
      >
        <h2 style={{ color: '#ffffff', display: 'inline-block' }}>
          Gestión de Usuarios
        </h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="generic-crud-button"
        >
          Crear Usuario
        </button>
        {/* Tabla de usuarios */}
        <table className="table" style={{ width: '100%', color: '#ffffff' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th style={{ width: '150px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usuario}>
                <td>{user.id_usuario}</td>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.roletype_id || 'N/A'}</td>
                <td>
                  <span
                    className="material-symbols-outlined generic-icon"
                    onClick={() => openEditModal(user)}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined generic-icon"
                    onClick={() => openDeleteModal(user)}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear usuario */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Usuario"
      >
        <div>
          <label>
            Nombre:
            <input
              type="text"
              className="modal-input"
              value={newUser.nombre}
              onChange={(e) =>
                setNewUser({ ...newUser, nombre: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              className="modal-input"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              className="modal-input"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Rol:
            <input
              type="number"
              className="modal-input"
              value={newUser.roletype_id || ''}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  roletype_id: parseInt(e.target.value) || null,
                })
              }
            />
          </label>
          <br />
          <button className="generic-button" onClick={handleCreateUser}>
            Guardar
          </button>
        </div>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Usuario"
      >
        {editingUser && (
          <div>
            <label>
              Nombre:
              <input
                type="text"
                className="modal-input"
                value={editingUser.nombre}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, nombre: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                className="modal-input"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Rol:
              <input
                type="number"
                className="modal-input"
                value={editingUser.roletype_id || ''}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    roletype_id: parseInt(e.target.value) || null,
                  })
                }
              />
            </label>
            <br />
            <button className="generic-button" onClick={handleUpdateUser}>
              Guardar
            </button>
          </div>
        )}
      </Modal>

      {/* Modal para confirmar eliminación de usuario */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminación"
      >
        <div>
          <p>
            ¿Está seguro de que desea eliminar al usuario "
            {userToDelete?.nombre}"?
          </p>
          <button
            className="generic-button"
            onClick={() => {
              handleDeleteUser(userToDelete.id_usuario);
              setIsDeleteModalOpen(false);
            }}
          >
            Sí, eliminar
          </button>
          <button
            className="generic-button"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UsersTable;
