import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from '../utils/recipes-schema'
import { Drink, SearchFilter } from '../types'
import api from '../lib/axios'


// const api = axios.create({
//     baseURL: 'https://www.thecocktaildb.com/api/json/v1/1'
// })


export default {
    async getCategories() {
        const url = '/list.php?c=list'
        const { data } = await api(url)
        const result = CategoriesAPIResponseSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    },

    async getRecipes(filters: SearchFilter) {
        const ingredientUrl = `/filter.php?i=${filters.ingredient}`;
        const categoryUrl = `/filter.php?c=${filters.category}`;

        const { data: ingredientData } = await api.get(ingredientUrl);
        const ingredientResult = DrinksAPIResponse.safeParse(ingredientData);

        const { data: categoryData } = await api.get(categoryUrl);
        const categoryResult = DrinksAPIResponse.safeParse(categoryData);

        if (!ingredientResult.success || !categoryResult.success) {
            console.log("Error al recibir los datos");
            return;
        }

        const filteredDrinks = ingredientResult.data.drinks.filter((drink) =>
            categoryResult.data.drinks.some((catDrink) => catDrink.idDrink === drink.idDrink)
        );

        return {
            drinks: filteredDrinks,
        };
    },


    async getRecipeById(id: Drink['idDrink']) {
        const url = `/lookup.php?i=${id}`
        const { data } = await api(url)
        const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
        if (result.success) {
            return result.data
        }
    }
}


// export async function getCategories() {
//     const url = 'https://www.thecocktaildb.com/api/json/v1/1'
//     const { data } = await axios(url)
//     const result = CategoriesAPIResponseSchema.safeParse(data)
//     if (result.success) {
//         return result.data
//     }
// }

// export const getRecipes = async (filters: SearchFilter) => {

//     try {
//         const ingredientUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}`;
//         const { data: ingredientData } = await axios.get(ingredientUrl);
//         const ingredientResult = DrinksAPIResponse.safeParse(ingredientData);

//         const categoryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}`;
//         const { data: categoryData } = await axios.get(categoryUrl); const categoryResult = DrinksAPIResponse.safeParse(categoryData);

//         if (!ingredientResult.success || !categoryResult.success) {
//             console.log("Error al recibir los datos");
//             return;
//         }

//         const filteredDrinks = ingredientResult.data.drinks.filter((drink) => categoryResult.data.drinks.some((catDrink) => catDrink.idDrink === drink.idDrink));

//         return {
//             drinks: filteredDrinks,
//         };
//     }
//     catch (error) {
//         console.log(error);
//     }

// };


// export async function getRecipeById(id: Drink['idDrink']) {
//     const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
//     const { data } = await axios(url)
//     const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
//     if (result.success) {
//         return result.data
//     }
// }