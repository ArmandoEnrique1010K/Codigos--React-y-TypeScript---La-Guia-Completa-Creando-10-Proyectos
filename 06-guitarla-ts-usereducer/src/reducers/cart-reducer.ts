import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

// Definición de tipos para las acciones del carrito
export type CartActions =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
    { type: 'decrease-quantity', payload: { id: Guitar['id'] } } |
    { type: 'increase-quantity', payload: { id: Guitar['id'] } } |
    { type: 'clear-cart' }

// Definición del tipo para el estado del carrito
export type CartState = {
    data: Guitar[]; // Lista de productos disponibles
    cart: CartItem[]; // Lista de productos en el carrito
}

// Función para obtener el estado inicial del carrito desde localStorage
const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');
    // Si hay datos en localStorage, los parsea; si no, devuelve un arreglo vacío
    return localStorageCart ? JSON.parse(localStorageCart) : [];
};

// Estado inicial del carrito
export const initialState: CartState = {
    data: db, // Datos de productos disponibles (importados desde db)
    cart: initialCart() // Inicializa el carrito con los datos de localStorage
}

// Constantes para límites de cantidad (unidades permitidas por producto)
const MIN_ITEMS = 1
const MAX_ITEMS = 5

// Función reducer para manejar las acciones del carrito
export const cartReducer = (
    state: CartState = initialState, // Estado actual
    action: CartActions // Acción a ejecutar
) => {

    // Acción: Añadir un producto al carrito
    if (action.type === "add-to-cart") {

        // Conviene usar el metodo find que findIndex, porque find puede devover el elemento que existe o un undefined, findIndex devuelve el indice en el que se encuentra el elemento o un "-1" si no lo encuentra

        // Verifica si el producto ya existe en el carrito
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)

        let updatedCart: CartItem[] = []

        if (itemExists) {
            // Si el producto ya está en el carrito, incrementa su cantidad (si no supera el límite)
            updatedCart = state.cart.map(item => {
                // Si el ID de uno de los productos del carrito coincide con el id recibido como payload
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        return { ...item, quantity: item.quantity + 1 }; // Incrementa la cantidad
                    } else {
                        return item; // Mantiene los demás productos sin cambios
                    }
                } else {
                    return item
                }
            })
        } else {
            // Si el producto no está en el carrito, lo añade con cantidad 1
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            updatedCart = [...state.cart, newItem]
        }

        // Retorna el nuevo estado con el carrito actualizado
        return {
            ...state,
            cart: updatedCart
        }
    }

    // Acción: Eliminar un producto del carrito
    if (action.type === 'remove-from-cart') {
        // Filtra el carrito para eliminar el producto con el ID especificado
        const cart = state.cart.filter(item => item.id !== action.payload.id)

        // Retorna el nuevo estado con el carrito actualizado
        return {
            ...state,
            cart
        }
    }

    // Acción: Disminuir la cantidad de un producto en el carrito
    if (action.type === 'decrease-quantity') {
        // Reemplaza cart por state.cart
        const cart = state.cart.map(item => {
            // Si el producto coincide y su cantidad es mayor que el mínimo, disminuye la cantidad
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item; // Mantiene los demás productos sin cambios
        })

        // Retorna el nuevo estado con el carrito actualizado
        return {
            ...state,
            cart
        };
    }

    // Acción: Aumentar la cantidad de un producto en el carrito
    if (action.type === 'increase-quantity') {
        const cart = state.cart.map(item => {
            // Si el producto coincide y su cantidad es menor que el máximo, aumenta la cantidad
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item; // Mantiene los demás productos sin cambios
        })

        // Retorna el nuevo estado con el carrito actualizado
        return {
            ...state,
            cart
        }
    }

    // Acción: Vaciar el carrito por completo
    if (action.type === 'clear-cart') {
        return {
            ...state,
            cart: [] // Establece el carrito como un arreglo vacío
        }
    }

    // Si no se reconoce la acción, retorna el estado actual sin cambios
    return state
}
