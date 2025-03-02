// type para un gasto
export type Expense = {
    id: string // Identificador único del gasto
    expenseName: string
    amount: number
    category: string // Categoría a la que pertenece el gasto
    date: Value // Fecha del gasto, utiliza el tipo Value definido abajo
}

// Tipo para un gasto temporal antes de ser guardado
// Hereda de Expense pero omite la propiedad 'id'
export type DraftExpense = Omit<Expense, 'id'>

// Tipo para representar la fecha en React Calendar
// Puede ser una única fecha (Date | null) o un rango de fechas ([inicio, fin])
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// Tipo para definir una categoría de gasto
export type Category = {
    id: string
    name: string
    icon: string // Ícono representativo
}