import { Category } from "@prisma/client";

// Cuando defines los schemas de prisma, ya sea category o product, ellos tambien generan los types, toma el type de @prisma/client
type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  // Muestra en pantalla los nombres de categoria
  return <div>{category.name}</div>;
}
