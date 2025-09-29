import type { PropsWithChildren } from "react";
import Footer from "./Footer";
import Logo from "./Logo";
import Nav from "./Nav";

type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
    const { children } = props;


    return (
        <>
            <section id='top-header'>
                <Logo />

                <Nav />
            </section>
            
            <main className="container"> {children} </main>

            <Footer />
        </>
    );
}