import './RecipeGrid.css';
import Card from '../Card/Card';
interface AllRecipe {
  id: number;
  name: string;
  image: string;
  details: string;
  favoriteIcon: string;
  frontButtonText: string;
  backButtonText: string;
  description: string;
  cookTime: string;
  nutrient: string;
  ingredients: string[];
  instructions: string[];
}

interface ItemProps {
  items: AllRecipe[]
}

export default function RecipeGrid({ items }: ItemProps) {

  return (
    <div className='recipe-grid'>
      {items.map(item => (
        <Card
         name={item.name}
         id={item.id}
         image={item.image}
        />

      ))}
    </div>
  );
}