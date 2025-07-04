import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashBoardView from "@/views/DashBoardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./views/404/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* El proyecto consta de 2 Layouts, uno relacionado a los proyectos y el otro al sistema de autenticación del usuario */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashBoardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />

          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />

          {/* Ruta hacia la vista de miembros del proyecto */}
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamView />}
          />

          {/* Se requiere estar autenticado para ver el perfil del usuario */}
          {/* Rutas relacionadas al perfil */}

          {/* Puede tener layout anidados */}
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />

          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>

        {/* Ruta hacia la pagina de error */}
        <Route element={<AuthLayout />}>
          {/* El asterisco indica que si no se encuentra ninguna de las demás rutas, mostrara ese componente */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
