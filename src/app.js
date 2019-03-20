import React from 'react';
import { Helmet } from 'react-helmet';
import Routes from "./routes";
import GlobalStyle from "./globalStyles";

export default function App() {
    return (
        <>
            <Helmet
                titleTemplate="%s - React.js Boilerplate"
                defaultTitle="Works"
            >
                <meta name="description" content="A React.js Boilerplate application" />
            </Helmet>
            <Routes />
            <GlobalStyle />
        </>
    );
}