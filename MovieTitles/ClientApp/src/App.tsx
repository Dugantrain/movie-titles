import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import TitleSearch from './components/title-search';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={TitleSearch} />
    </Layout>
);
