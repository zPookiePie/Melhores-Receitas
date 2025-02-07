'use client'

import FoodCarousel from "../FoodCarousel";
import Menu from "../Menu";
import Banner from "../Banner";

function FoodList() {
    return (
        <main>
            <Menu />
            <Banner />
            
            <FoodCarousel apiUrl="https://api-receitas-pi.vercel.app/receitas/todas" title="PARA VOCÊ" />
            <FoodCarousel apiUrl="https://api-receitas-pi.vercel.app/receitas/tipo/salgado" title="PRATO PRINCIPAL" />
            <FoodCarousel apiUrl="https://api-receitas-pi.vercel.app/receitas/tipo/doce" title="SOBREMESA" />
        </main>
    );
}

export default FoodList;