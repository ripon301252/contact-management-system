import React from 'react';
import System from './System';
import Banner from './Banner';

const Home = ({contacts, setPage }) => {
    return (
        <div>
            <Banner />
            <System contacts={contacts} setPage={setPage} />
        </div>
    );
};

export default Home;