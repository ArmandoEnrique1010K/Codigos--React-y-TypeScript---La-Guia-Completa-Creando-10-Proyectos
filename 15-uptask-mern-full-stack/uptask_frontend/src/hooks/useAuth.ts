import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

// Custom hook para el manejo de autenticación
export const useAuth = () => {

  // Llama a useQuery
  const { data, isError, isLoading } = useQuery({
    // Se crea un nuevo queryKey y tambien se llama a la función getUser
    queryKey: ['user'],
    queryFn: getUser,
    // Solamente realiza 1 re-intento
    // retry: 1,

    // O no volver a reintentar
    retry: false,
    // Evita que se haga un refetch si el usuario se va hacia otra pestaña del navegador
    // Puedes observar que si colocas false, ya no realiza la misma solicitud varias veces (status 304 porque no se ha modificado los datos de la respuesta)
    refetchOnWindowFocus: false
  })

  return { data, isError, isLoading }
}