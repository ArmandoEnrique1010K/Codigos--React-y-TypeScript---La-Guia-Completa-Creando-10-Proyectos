import AddProductForm from "@/components/products/AddProductForm";
import Heading from "@/components/ui/Heading";

// Pagina para crear un producto
export default function CreateProductPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>
      <AddProductForm />
    </>
  );
}
