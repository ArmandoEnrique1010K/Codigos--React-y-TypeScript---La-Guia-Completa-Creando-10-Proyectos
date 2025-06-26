import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";

// Pagina para crear un producto
export default function CreateProductPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>

      {/* Renderiza el componente ProductForm como componente hijo de AddProductForm */}
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
