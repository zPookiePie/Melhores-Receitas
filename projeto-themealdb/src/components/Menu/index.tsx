import './index.scss'

function Menu() {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="menu">
            <button onClick={() => scrollToSection("foodlist")}>Para Você</button>
            <button onClick={() => scrollToSection("salty")}> Prato Principal</button>
            <button onClick={() => scrollToSection("dessert")}>Sobremesa</button>
        </nav>
    );
}

export default Menu