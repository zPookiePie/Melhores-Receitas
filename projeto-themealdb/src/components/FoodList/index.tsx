'use client'

import FoodCarousel from "../FoodCarousel";
import Menu from "../Menu";
import Banner from "../Banner";

function FoodList() {
    return (
        <main>
            <Menu />
            <Banner />
            <div id="foodlist">
                <FoodCarousel apiUrl="https://api-receitas-pi.vercel.app/receitas/todas" title="PARA VOCÊ" />
            </div>

            <div id="salty">
                <FoodCarousel apiUrl="https://api-receitas-pi.vercel.app/receitas/tipo/salgado" title="PRATO PRINCIPAL" />
            </div>

            <div id="dessert">
                <FoodCarousel apiUrl="https://api-receitas-pi.vercel.app/receitas/tipo/doce" title="SOBREMESA" />
            </div>
        </main>
    );
}

export default FoodList;