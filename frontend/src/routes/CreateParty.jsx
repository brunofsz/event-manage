import partyFetch from '../axios/config'

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import useToast from '../hooks/useTost'

import './form.css'

const CreateParty = () => {
    const [services, setServices] = useState([])

    const [title, setTitle] = useState("")
    const [autor, setAutor] = useState("")
    const [description, setDescription] = useState("")
    const [budget, setBudget] = useState(0)
    const [image, setImage] = useState("")
    const [partyServices, setPartyServices] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        const loadServices = async () => {
            const res = await partyFetch.get("/service")

            setServices(res.data)
        }

        loadServices()

    }, [])

    const handleServices = (e) => {
        const checked = e.target.checked

        const value = e.target.value

        const thisService = services.filter((s) => s._id === value)

        if (checked) {
            setPartyServices((services) => [...services, thisService[0]])
        } else {
            setPartyServices((services) => services.filter((s) => s._id !== value))
        }
    }


    const CreateParty = async (e) => {
        e.preventDefault();

        try {
            const party = {
                title, autor, description, budget, image, services: partyServices,
            }

            const res = await partyFetch.post("/parties", party)

            if (res.status === 201) {
                navigate("/")
                useToast(res.data.msg)
            }
        } catch (error) {
            useToast(error.response.data.msg, "error")

        }

    }


    return (
        <div className='formPage'>
            <h2>Crie sua próxima festa</h2>
            <p>Defina o seu orçamento e escolha os serviços</p>
            <form onSubmit={(e) => CreateParty(e)}>
                <label>
                    <span>Nome da festa:</span>
                    <input type="text" placeholder='Seja criativo...' required onChange={(e) => setTitle(e.target.value)} value={title} />
                </label>
                <label>
                    <span>Anfitrião:</span>
                    <input type="text" placeholder='Quem está dando a festa?' required onChange={(e) => setAutor(e.target.value)} value={autor} />
                </label>
                <label>
                    <span>Descrição:</span>
                    <textarea placeholder='Conte mais sobre a festa...' required onChange={(e) => setDescription(e.target.value)} value={description} />
                </label>
                <label>
                    <span>Orçamento:</span>
                    <input type="number" placeholder='Quanto você pretende investir?' required onChange={(e) => setBudget(e.target.value)} value={budget} />
                </label>
                <label>
                    <span> Imagem:</span>
                    <input type="text" placeholder='Insira a URL de uma imagem' required onChange={(e) => setImage(e.target.value)} value={image} />
                </label>
                <div>
                    <h2>Escolha os serviços</h2>
                    <div className="servicesContainer">
                        {services.length === 0 && <p>Carregando...</p>}
                        {services.length > 0 && services.map((service) => (
                            <div className="service" key={service._id}>
                                <img src={service.image} alt={service.name} />
                                <p className='serviceName'>{service.name}</p>
                                <p className="servicePrice">R${service.price}</p>
                                <div className="checkboxContainer">
                                    <input type="checkbox" value={service._id} onChange={(e) => handleServices(e)} />
                                    <p>Marque para solicitar</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <input type="submit" value="Criar Evento" className='btn' />
            </form>
        </div>
    )
}

export default CreateParty