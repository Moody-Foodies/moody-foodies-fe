export interface CarouselItem {
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

// they are all strings right now, but we should make them more specific once we know what they are