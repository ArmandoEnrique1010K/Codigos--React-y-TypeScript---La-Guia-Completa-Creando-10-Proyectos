import { Dispatch } from 'react'
import type { Guitar } from '../types'
import type { CartActions } from '../reducers/cart-reducer'

// Type para las props del componente
type GuitarProps = {
    guitar: Guitar,
    dispatch: Dispatch<CartActions> // Función dispatch para manejar acciones del carrito
}

export default function Guitar({ guitar, dispatch }: GuitarProps) {

    const { name, image, description, price } = guitar

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>

                {/* Botón para agregar la guitarra al carrito */}
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    // Ejecuta el dispatch para agregar el item al carrito, en el payload, se pasa el objeto guitar como valor de item
                    onClick={() => dispatch({ type: 'add-to-cart', payload: { item: guitar } })}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}
