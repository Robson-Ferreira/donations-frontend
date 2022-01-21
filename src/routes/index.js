import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import ListDonations from '../containers/Donation/ListDonations';
import CreateDonation from '../containers/Donation/CreateDonation';

import Success from '../containers/Success';
import NotFound from '../components/NotFound';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" element={<ListDonations />} />
                <Route path="/create" element={<CreateDonation />} />
                <Route path="/success-upload" element={<Success />} />
                <Route path='*' element={<NotFound />} />
            </Switch>
        </Router>        
    );
}

export default Routes;
