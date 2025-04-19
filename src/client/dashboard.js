import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [monthlySales, setMonthlySales] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    // Obtener estadísticas totales al cargar la vista
    const fetchTotalStats = async () => {
      try {
        const response = await fetch('/api/dashboard/total-stats');
        const data = await response.json();
        if (response.ok) {
          setTotalSales(data.totalSales);
          setTotalOrders(data.totalOrders);
        } else {
          console.error('Error al obtener estadísticas totales:', data.message);
        }
      } catch (error) {
        console.error('Error al obtener estadísticas totales:', error);
      }
    };

    fetchTotalStats();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    if (selectedMonth) {
      const fetchMonthlySales = async () => {
        try {
          const response = await fetch(`/api/dashboard/monthly-sales?month=${selectedMonth}`);
          const data = await response.json();
          if (response.ok) {
            setMonthlySales(data.monthlySales);
          } else {
            console.error('Error al obtener ventas mensuales:', data.message);
            setMonthlySales(null);
          }
        } catch (error) {
          console.error('Error al obtener ventas mensuales:', error);
          setMonthlySales(null);
        }
      };

      fetchMonthlySales();
    }
  }, [selectedMonth]);

  return (
    <div
      className="dashboard-container"
      style={{
        display: 'flex',
        width: '100vw',
        minHeight: '100vh',
        paddingTop: '80px', // Para evitar que la navbar cubra el contenido
        boxSizing: 'border-box',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'Oswald, sans-serif',
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, padding: '40px', marginLeft: '250px' }}>
        <h1 style={{ color: '#fff' }}>DASHBOARD DE VENTAS</h1>

        <div className="total-stats" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          <div
            className="stat-box"
            style={{
              backgroundColor: '#36fff1',
              padding: '20px',
              margin: '10px',
              borderRadius: '8px',
              flex: '1 1 200px',
              maxWidth: '250px',
              height: '150px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>VENTAS TOTALES</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${totalSales.toFixed(2)}</p>
          </div>
          <div
            className="stat-box"
            style={{
              backgroundColor: '#36fff1',
              padding: '20px',
              margin: '10px',
              borderRadius: '8px',
              flex: '1 1 200px',
              maxWidth: '250px',
              height: '150px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>ÓRDENES TOTALES</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalOrders}</p>
          </div>
        </div>

        <div className="monthly-stats" style={{ marginTop: '30px' }}>
          <h2 style={{ marginBottom: '15px' }}>VENTAS MENSUALES</h2>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '4px',
              backgroundColor: '#000',
              color: '#fff',
              border: '1px solid #36fff1',
            }}
          >
            <option value="">SELECCIONAR MES</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
          {selectedMonth && (
            <div
              className="stat-box"
              style={{
                backgroundColor: '#36fff1',
                padding: '20px',
                margin: '20px 0',
                borderRadius: '8px',
                maxWidth: '300px',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>VENTAS EN EL MES SELECCIONADO</h2>
              {monthlySales !== null ? (
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${monthlySales.toFixed(2)}</p>
              ) : (
                <p style={{ fontSize: '18px' }}>No hay registros del mes seleccionado</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
