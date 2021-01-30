import React from 'react';
import { Jumbotron } from 'reactstrap'
import i18n from '../i18n';

const Landing = () => (
    <Jumbotron 
        className="col-xs-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-3 col-lg-6 jumbotron">
        <h5 className="text-center display-3">{i18n.t('welcome.title')}</h5>
        <p className="lead" style={{textAlign: 'center'}}>
            {i18n.t('welcome.message')}
        </p>
    </Jumbotron>
)

export default Landing;