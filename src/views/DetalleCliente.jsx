import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Box, Typography } from '@mui/material'
import clienteService from '../services/clienteService'  


const DetalleCliente = () => {
  
  const { id } = useParams()

  const [cliente, setCliente] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

   
  useEffect(() => {
    
    const fetchCliente = async () => {
      try {
        setCargando(true)
        const data = await clienteService.obtenerClientePorId(id)
        if (!data) throw new Error('Cliente no encontrado')
        setCliente(data)
      } catch (err) {
        setError('No se pudo cargar el cliente.')
        console.error(err)
      } finally {
        setCargando(false)
      }
    }

    fetchCliente()
  }, [id])
  

  if (cargando) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

   if (error) {
    return (
      <Box p={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }


    const {
    name: { firstname, lastname },
    address: { street, number, zipcode, city },
    username,
    password,
  } = cliente

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Ficha del Cliente
      </Typography>

      <Typography variant="h6">{firstname} {lastname}</Typography>

      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="bold">Dirección</Typography>
        <Typography>Calle: {street}</Typography>
        <Typography>Número: {number}</Typography>
        <Typography>Código Postal: {zipcode}</Typography>
        <Typography>Ciudad: {city}</Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="bold">Credenciales</Typography>
        <Typography>Usuario: {username}</Typography>
        <Typography>Contraseña: {password}</Typography>
      </Box>
    </Box>
  )
}

export default DetalleCliente