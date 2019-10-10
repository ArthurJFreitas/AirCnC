import React, { useState, useMemo } from 'react';
import {Router, browserHistory} from 'react-router';

import './styles.css';

import camera from '../../assets/camera.svg';
import api from '../../services/api';

export default function New({ history }) {

    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState('');
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(() =>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData();

        const user_id = localStorage.getItem('user');


        data.append('price', price);
        data.append('company', company);
        data.append('thumbnail', thumbnail);
        data.append('techs', techs);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={ thumbnail ? 'has-thumb': ''}
                >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Image"/>
            </label>

            <label htmlFor="company">Empresa *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrivel"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">Tecnologias * <span>(separadas por vírgular)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
               <label htmlFor="price">Preço * <span>(Em branco gratuito)</span></label>
            <input 
                id="price"
                placeholder="Quais tecnologias usam"
                value={price}
                onChange={event => setPrice(event.target.value)}
            /> 

            <button className="btn" type="submit">
                Cadastrar
            </button>
        </form>
    )
}