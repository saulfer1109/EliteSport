import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleShopNowClick = () => {
        navigate('/shop');
    };

    return (
        <>
            <div className="homepage-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div className="welcome-message" style={{ color: '#ffffff', fontSize: '6rem', fontFamily: 'Oswald', fontWeight: 700, zIndex: 20, textAlign: 'center', marginBottom: '20px' }}>
                    BIENVENIDO A ELITE SPORT
                </div>
                <button className="shop-now-button" onClick={handleShopNowClick}>
                    COMPRAR AHORA
                </button>
                <img src="/images/babckground.jpeg" alt="Background Photo" className="background-photo" style={{ position: 'fixed', right: 0, top: 0, height: '200vh', width: 'auto', objectFit: 'cover', zIndex: 1 }} />
            </div>
        </>
    );
};

export default HomePage;
