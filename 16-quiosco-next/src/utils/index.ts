// Funciones auxiliares

// Formatear de numero a moneda
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Verifica si la URL de una imagen es de cloudinary, importante porque verifica si la imagen viene de cloudinary o de la carpeta public
export function getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = 'https://res.cloudinary.com'

  // Si el nombre de la URL comienza con...
  if (imagePath.startsWith(cloudinaryBaseUrl)) {
    return imagePath
  } else {
    return `/products/${imagePath}.jpg`
  }
}