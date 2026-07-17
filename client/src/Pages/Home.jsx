import React from 'react';
import System from './System';

const Home = ({contacts, setPage }) => {
    return (
        <div>
            <System contacts={contacts} setPage={setPage}></System>
        </div>
    );
};

export default Home;