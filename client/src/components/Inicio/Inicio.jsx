import React from 'react';
import { Link } from 'react-router-dom';
export default function Inicio() {
    return (
        <section className="Inicio">
            <h1>Bienvenidos</h1>
            <Link to='/home'>Ingresar</Link>
        </section>
    )
}