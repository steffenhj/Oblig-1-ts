import type { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
    const { children } = props;


    return (
        <>
            
            
            <main className="container"> {children} </main>

            <Footer />
        </>
    );
}