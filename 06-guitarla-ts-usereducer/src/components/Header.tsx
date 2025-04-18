import { useMemo, Dispatch } from "react"
import type { CartItem } from "../types"
import type { CartActions } from "../reducers/cart-reducer"

type HeaderProps = {
    cart: CartItem[]
    dispatch: Dispatch<CartActions> // Función dispatch para manejar las acciones del carrito
}

// Componente Header: muestra la cabecera y el carrito de compras
export default function Header({ cart, dispatch }: HeaderProps) {

    // Recordar que como los estados derivados solamente se utilizan en 1 componente, entonces se puede optar por traer los estados derivados a este componente

    // Determina si el carrito está vacío
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    // Calcula el total a pagar sumando (precio * cantidad) de cada producto en el carrito
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    {/* Logo de la tienda */}
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>

                    {/* Sección del carrito */}
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {/* Si el carrito está vacío, muestra un mensaje, de lo contrario, muestra la lista de productos */}
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        {/* Tabla con los productos en el carrito */}
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(guitar => (
                                                    <tr key={guitar.id}>
                                                        <td>
                                                            <img
                                                                className="img-fluid"
                                                                src={`/img/${guitar.image}.jpg`}
                                                                alt="imagen guitarra"
                                                            />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">
                                                            ${guitar.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            {/* Botones para disminuir y aumentar la cantidad de un producto por su ID, llama al dispatch y en el payload se pasa el id del producto */}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => dispatch({ type: 'decrease-quantity', payload: { id: guitar.id } })}
                                                            >
                                                                -
                                                            </button>
                                                            {guitar.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => dispatch({ type: 'increase-quantity', payload: { id: guitar.id } })}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            {/* Botón para eliminar un producto del carrito por su ID, llama al dispatch pasando el id del producto como payload */}
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => dispatch({ type: 'remove-from-cart', payload: { id: guitar.id } })}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {/* Total a pagar */}
                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                    </>
                                )}

                                {/* Botón para limpiar el carrito, en este caso solamente se especifica el type, no pasa ni envia nada como payload, solamente ejecuta una acción */}
                                <button
                                    className="btn btn-dark w-100 mt-3 p-2"
                                    onClick={() => dispatch({ type: 'clear-cart' })}
                                >Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
