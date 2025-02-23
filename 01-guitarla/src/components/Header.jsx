import { useMemo } from 'react'

// Componente para la cabecera de la pagina, recibe el cart y 4 llamadas de funciones como props
export default function Header({ cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart }) {

    // Estado derivado para determinar si el carrito está vacío
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    // Estado derivado para calcular el total a pagar en el carrito
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {/* Si el carrito está vacío, muestra un mensaje. De lo contrario, renderiza la tabla con los productos */}
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        {/* Tabla que muestra los productos agregados al carrito */}
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
                                                {/* Recorre el array 'cart' y genera una fila para cada producto */}
                                                {cart.map(guitar => (
                                                    <tr key={guitar.id}>
                                                        {/* Columna de imagen del producto */}
                                                        <td>
                                                            <img
                                                                className="img-fluid"
                                                                src={`/img/${guitar.image}.jpg`}
                                                                alt="imagen guitarra"
                                                            />
                                                        </td>
                                                        {/* Nombre del producto */}
                                                        <td>{guitar.name}</td>
                                                        {/* Precio del producto */}
                                                        <td className="fw-bold">
                                                            ${guitar.price}
                                                        </td>
                                                        {/* Controles para modificar la cantidad del producto */}
                                                        <td className="flex align-items-start gap-4">
                                                            {/* Botón para disminuir la cantidad */}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(guitar.id)}
                                                            >
                                                                -
                                                            </button>
                                                            {/* Cantidad actual del producto en el carrito */}
                                                            {guitar.quantity}
                                                            {/* Botón para aumentar la cantidad */}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(guitar.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        {/* Botón para eliminar el producto del carrito */}
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(guitar.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {/* Muestra el total a pagar por los productos en el carrito */}
                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                    </>
                                )}

                                {/* Botón para vaciar completamente el carrito */}
                                <button
                                    className="btn btn-dark w-100 mt-3 p-2"
                                    onClick={clearCart}
                                >Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
