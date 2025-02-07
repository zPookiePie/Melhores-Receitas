import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1>404 - Página não encontrada</h1>
            <p>A página que você tentou acessar não existe.</p>
            <Link href="/">Voltar para Página Inicial</Link>
        </div>
    )
}
