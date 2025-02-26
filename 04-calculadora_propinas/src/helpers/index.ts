// Función auxiliar

// Formatea un número como moneda en dólares estadounidenses (USD)
export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(quantity)
}

// Ejemplo de salida: "$20.00"
