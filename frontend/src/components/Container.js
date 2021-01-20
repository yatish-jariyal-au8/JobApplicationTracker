import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CustomToast from '../components/CustomToast'

const Container = (props) => {
    return (
        <div className="custom-container">
            <Header />
            <CustomToast />
            {props.children}
            <Footer />
        </div>
    );
};

export default Container;