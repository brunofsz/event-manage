import partyFetch from "../axios/config"

import { useState, useEffect } from "react"

import { useParams, Link, useNavigate } from "react-router-dom"

import useToast from "../hooks/useTost"

import './party.css'

const Party = () => {

    const { id } = useParams()

    const [party, setParty] = useState(null)

    const navigate = useNavigate()


    const handleDelete = async () => {
        const res = await partyFetch.delete(`/parties/${id}`)
        if (res.status === 200) {
            navigate("/")
            useToast(res.data.msg)
        }
    }


    useEffect(() => {

        const loadParty = async () => {
            const res = await partyFetch.get(`/parties/${id}`)

            console.log(res.data)

            setParty(res.data)
        }

        loadParty()
    }, [])


    if (!party) return <p>Carregando...</p>

    return (
        <div className="party">
            <h1>{party.title}</h1>
            <div className="actionsContainer">
                <Link to={`/party/edit/${id}`} className="btn">Editar</Link>
                <button className="btn2" onClick={handleDelete}>Excluir</button>

            </div>
            <p>Orçamento: R${party.budget}</p>
            <h3>Serviços contratados:</h3>
            <div className="servicesContainer">
                {party.services.map((s) => (
                    <div className="service" key={s._id}>
                        <img src={s.image} alt={s.name} />
                        <p>{s.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Party