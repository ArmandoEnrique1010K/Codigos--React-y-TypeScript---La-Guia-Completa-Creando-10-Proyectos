// Función auxiliar para aplicar el formato de moneda a un número
export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(quantity)
}

// Posible valor retornado: $ 20.00