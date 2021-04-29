import React  from 'react';
import classes from './LoadingPage.module.scss';

const LoadingPage = (props) => {
    return(
        <div className={classes.mask}>
            Loading...
        </div>
    )
}

export default LoadingPage;