import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './header';

function Layout(props){
    return(
        <Container>
            <Header></Header>
            {props.children}
        </Container>
    );

}
export default Layout;