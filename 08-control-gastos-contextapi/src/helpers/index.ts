// Función para formatear un número como moneda en dólares estadounidenses (USD)
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

// Posible valor: $ 20.00


// Función para formatear una fecha en formato legible en español
export function formatDate(dateStr: string): string {
    const dateObj = new Date(dateStr)

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Nombre completo del día (ej. "lunes")
        year: 'numeric', // Año con cuatro dígitos (ej. "2025")
        month: 'long', // Nombre completo del mes (ej. "enero")
        day: 'numeric' // Día del mes (ej. "1")
    }

    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}

// Posible valor: miercoles, 1 de enero de 2025