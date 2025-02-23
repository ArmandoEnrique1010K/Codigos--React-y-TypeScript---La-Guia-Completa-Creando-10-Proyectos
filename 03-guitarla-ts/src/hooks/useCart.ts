import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { Guitar, CartItem } from '../types'

export const useCart = () => {

    // Se asigna el type CartItem al resultado de la función initialCart
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // Se asigna el type al argumento item que se recibe al momento de llamar a la función
    function addToCart(item: Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            // En lugar de agregar una nueva propiedad al objeto item, se opta por crear un nuevo objeto que contiene una copia de items y se agrega la propiedad quantity

            // Se asigna el type CartItem a la constante newItem
            const newItem: CartItem = { ...item, quantity: 1 }
            setCart([...cart, newItem])
        }
    }

    // En el argumento de la función, se utiliza un lookup type para acceder al tipo de dato definido en la propiedad id del type Guitar
    function removeFromCart(id: Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    // Se repite el mismo procedimiento con las demás funciones
    function decreaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function increaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    // Recuerda que Visual Studio Code infiere en el tipo de dato cuando se trabaja con TypeScript, coloca el cursor sobre una de la siguientes propiedades para ver tipo de dato
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}