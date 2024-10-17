import type { PropsWithChildren } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
    const { children } = props;


    return (
        <>
            <header>
                <Nav />
            </header>
            
            <main className="container"> {children} </main>

            <Footer />
        </>
    );
}