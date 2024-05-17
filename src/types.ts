export interface RecipeGridItem {
  id: string;
  name: string;
  description: string;
  cookTime: string;
  image: string;
  details: string;
  nutrient: string;
  favoriteIcon: string;
  frontButtonText: string;
  backButtonText: string;
  ingredients: string[];
  instructions: string[];
}

export interface Recipe {
  id: number,
  type: string,
  attributes: Attributes
}

export interface Attributes {
  name: string,
  time_to_cook: number,
  nutrient: string,
  image: string,
  description: string,
  ingredients: string[],
  instructions: string[]
  }
  


// they are all strings right now, but we should make them more specific once we know what they are
