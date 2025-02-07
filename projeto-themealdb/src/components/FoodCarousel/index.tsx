'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import FoodCard from "../FoodCard";
import "./index.scss";

export interface ReceitaType {
    id: number;
    title: string;
    image: string | null;
    ingredients: string[];
}

interface CarouselProps {
    apiUrl: string;
    title: string;
}

interface Ingrediente {
    nomesIngrediente: string[];
}

interface ReceitaAPI {
    id: number;
    receita: string;
    link_imagem?: string;
    IngredientesBase?: { nomesIngrediente: string[] }[];
}

function FoodCarousel({ apiUrl, title }: CarouselProps) {
    const [foods, setFoods] = useState<ReceitaType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    async function getFoods() {
        try {
            setLoading(true);
            const response = await axios.get(apiUrl);
            const receitas = Array.isArray(response.data) ? response.data : [];

            const receitasFormatadas = receitas.map((recipe: ReceitaAPI) => ({
                id: recipe.id,
                title: recipe.receita, 
                image: recipe.link_imagem ?? "",
                ingredients: recipe.IngredientesBase 
                    ? recipe.IngredientesBase.flatMap((ing: Ingrediente) => ing.nomesIngrediente) 
                    : [],
            }));

            setFoods(receitasFormatadas);
        } catch (error) {
            console.error("Erro ao buscar as receitas:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFoods();
    }, []);

    const nextItem = () => {
        if (currentIndex < foods.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevItem = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            nextItem();
        } else if (touchStart - touchEnd < -50) {
            prevItem();
        }
    };

    return (
        <div>
            <div className="title-container">
                <div className="line"></div>
                <h1>{title}</h1>
                <div className="line"></div>
            </div>

            <div className="carousel-container">
                {!loading && (
                    <button className="carousel-button prev" onClick={prevItem}>‹</button>
                )}
                <div 
                    className="carousel-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <ul className="food-grid">
                        {loading ? (
                            <p>Carregando receitas...</p>
                        ) : (
                            <li className="food-card-container"  
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {foods.map((food) => (
                                    <FoodCard key={food.id} food={food} />
                                ))}
                            </li>
                        )}
                    </ul>
                </div>
                {!loading && (
                    <button className="carousel-button next" onClick={nextItem}>›</button>
                )}
            </div>

            <div className="carousel-indicators">
                {foods.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default FoodCarousel;