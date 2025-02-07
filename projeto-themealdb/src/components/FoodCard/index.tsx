import { ReceitaType } from "../FoodCarousel";

import { useRouter } from 'next/navigation'; 

import './index.scss';

export interface Props {
    food: ReceitaType;
}

function FoodCard({ food }: Props) {

    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/recipes/${food.id}`);
    }

    return (
        <div className="food-card">
            <div className="food-img" >
            {food.image ? (
                    <img src={food.image} alt={food.title} className="food-image" />
                ) : (
                    <p>Imagem não disponível</p> 
                )}
            </div>
            <main className="food-info">
                <h1>{food.title}</h1>
                <p className="ingredients-less-than-600px">
                Ingredientes:{" "}
                {food.ingredients.length > 0
                    ? food.ingredients.join(", ").length > 100
                    ? food.ingredients.join(", ").slice(0, 50) + "..."
                    : food.ingredients.join(", ")
                    : "Sem ingredientes disponíveis"}
                </p>
                <p className="ingredients-greater-than-600px">
                    {food.ingredients.length > 0 ? food.ingredients.join(', ') : 'Sem ingredientes disponíveis'}
                </p>
                

                <button className="btn" onClick={handleViewDetails} >VEJA MAIS</button>
            </main>
        </div>
    );
}

export default FoodCard;