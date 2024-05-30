import './RecipeGrid.css';
import Card from '../Card/Card';


export default function RecipeGrid({ items }) {

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