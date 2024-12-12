import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
function App() {

    const [index, setIndex] = useState(0);
    const slides = [
        "/diseno-de-casas-modernas-1_0.jpg",
        "/13232908_1604013343248088_6302168264450648482_n.jpg",
        "/luxury-beach-house-sea-view-600nw-2313357873.webp"
    ];

    const nextSlide = () => setIndex((index + 1) % slides.length);
    const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length);

    const [searchData, setSearchData] = useState({
        tipo: '',
        estado: '',
        zona: '',
        precio: ''
    });

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            {/* Header Component */}
            <header>
                <img src="/sh_blanco-removebg-preview.png" alt="Logo" className="logo" />
            </header>

            {/* MenuBar Component */}
            <div className="menu-bar">
                <a href="./inmueblesIN.php"><button className="volverindex">Inmuebles</button></a>
                <Link to="/login"><button className="volverindex">Iniciar Sesión</button></Link>
            </div>

            {/* Carousel Component */}
            <section className="carousel">
                <div className="carousel-container" style={{ transform: `translateX(-${index * 100}%)` }}>
                    {slides.map((src, i) => (
                        <div key={i} className="carousel-slide">
                            <img src={src} alt={`Imagen ${i + 1}`} />
                            <div className="caption">Encuentra el lugar de tus sueños</div>
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={prevSlide}>&#10094;</button>
                <button className="next" onClick={nextSlide}>&#10095;</button>
                <div className="carousel-indicators">
                    {slides.map((_, i) => (
                        <span key={i} className={`indicator ${i === index ? 'active' : ''}`} />
                    ))}
                </div>
            </section>

            {/* Search Component */}
            <section className="search">
                <h2>Buscar Inmueble</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="tipo">Tipo de Inmueble:</label>
                        <select id="tipo" name="tipo" value={searchData.tipo} onChange={handleChange}>
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                            <option value="oficina">Oficina</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado:</label>
                        <select id="estado" name="estado" value={searchData.estado} onChange={handleChange}>
                            <option value="venta">Venta</option>
                            <option value="arriendo">Arriendo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="zona">Zona:</label>
                        <input type="text" id="zona" name="zona" value={searchData.zona} onChange={handleChange} placeholder="Ingrese la zona" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio:</label>
                        <input type="number" id="precio" name="precio" value={searchData.precio} onChange={handleChange} placeholder="Ingrese el precio" />
                    </div>
                    <button type="submit">Buscar</button>
                </form>
            </section>

            {/* Footer Component */}
            <footer>
                <nav>
                    <a href="./inmueblesIN.php"><button className="volverindex">Inmuebles</button></a>
                    <Link to="/login"><button className="volverindex">Iniciar Sesión</button></Link> 
                </nav>
                <img src="/sh_blanco-removebg-preview.png" alt="Logo2" className="logo2" />
                <p>&copy; 2024 Inmobiliaria. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default App;
