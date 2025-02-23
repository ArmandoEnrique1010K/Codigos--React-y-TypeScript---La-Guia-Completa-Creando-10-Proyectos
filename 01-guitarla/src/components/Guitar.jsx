// Componente funcional que representa una guitarra individual
// Recibe dos props: 'guitar' (objeto con los datos de la guitarra) y 'addToCart' (función para agregarla al carrito)
export default function Guitar({ guitar, addToCart }) {

    // Extrae las propiedades del objeto 'guitar' mediante desestructuración
    const { name, image, description, price } = guitar

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                {/* La ruta de la imagen se genera dinámicamente a partir del atributo 'image' */}
                <img className="img-fluid" src={`/img/${image}.jpg`} alt={`Imagen de la guitarra ${name}`} />
            </div>

            {/* Información del producto */}
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>

                {/* Botón para agregar el producto al carrito */}
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    // Al hacer clic, llama a 'addToCart' y le pasa el objeto 'guitar' como argumento
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}
