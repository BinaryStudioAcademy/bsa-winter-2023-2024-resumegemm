import { Footer } from './footer/footer';
import { Header } from './header/header';

type Properties = {
    children: React.ReactNode;
};

const Layout: React.FC<Properties> = ({ children }) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

export { Layout };
