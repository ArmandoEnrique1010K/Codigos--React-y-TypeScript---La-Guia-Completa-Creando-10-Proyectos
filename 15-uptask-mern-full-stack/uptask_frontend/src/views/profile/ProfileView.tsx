import { useAuth } from "@/hooks/useAuth";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfileView() {
  const { data, isLoading } = useAuth();

  if (isLoading) return "Cargando...";

  // Pasa los datos del usuario autenticado como prop de ProfileForm
  if (data) return <ProfileForm data={data} />;
}
