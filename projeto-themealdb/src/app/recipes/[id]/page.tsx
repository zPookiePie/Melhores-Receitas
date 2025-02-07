'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

import './index.scss';

interface ReceitaType {
    id: number;
    receita: string;
    ingredientes: string;
    modo_preparo: string;
    link_imagem: string;
    tipo: string;
}

function RecipeDetailsPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<ReceitaType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof id !== 'string') return;

        const controller = new AbortController(); // controlador de requisição
        fetchRecipeDetails(id, controller.signal);

        return () => controller.abort();
    }, [id]);

    const fetchRecipeDetails = async (recipeId: string, signal: AbortSignal) => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`https://api-receitas-pi.vercel.app/receitas/${recipeId}`, { signal });
            setRecipe(res.data);
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Requisição cancelada:', err.message);
            } else {
                console.error('Erro ao buscar os detalhes da receita:', err);
                setError('Erro ao carregar os detalhes da receita.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>Receita não encontrada.</p>;

    return (
        <div className="recipe-details">
            <div
                className="background-overlay"
                style={{ backgroundImage: `url(${recipe.link_imagem})` }}
            >
                <h1> {recipe.receita} </h1>
            </div>
            <main className="recipe-information">
                <div className="line"></div>
                <div>
                    <h2>Ingredientes:</h2>
                    <ul>
                        {recipe.ingredientes.split(",").map((ingrediente, index) => (
                            <li key={index}>{ingrediente.trim()}</li>
                        ))}
                    </ul>
                    <div className="line"></div>
                    <h2>Modo de Preparo:</h2>
                    <ol>
                        {recipe.modo_preparo
                            .split(/\d+\./)
                            .filter(step => step.trim() !== "")
                            .map((step, index) => (
                                <li key={index}><span className="li-text">{step.trim()}</span></li>
                        ))}
                    </ol>
                    <div className="line"></div>
                    <button onClick={() => window.history.back()} className="reset">
                        Voltar
                    </button>
                    <div className="line"></div>
                </div>
            </main>
        </div>
    );
}

export default RecipeDetailsPage;
