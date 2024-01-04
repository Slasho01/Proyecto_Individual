import React from 'react';
import { Link } from 'react-router-dom';
import style from './ini.module.css'
export default function Inicio() {
    return (
        <>
        <section className={style.section}>
            <h1>Bienvenidos</h1>
            <Link to='/home'>Ingresar</Link>
        </section>
        </>
    )
}