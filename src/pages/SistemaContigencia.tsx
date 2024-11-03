import NavBar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import SisContigenciaForm from "@/components/SisContigenciaForm";

export default function Home() {
  return (
    <main>
      <NavBar/>

      <div className="AjusteSideBar"> {/* Novo contêiner para Flexbox */}
        <Sidebar />
        <SisContigenciaForm />
      </div>
    </main>
  );
}
