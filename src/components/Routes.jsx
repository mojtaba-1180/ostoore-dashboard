import '../assets/css/AnimateRoute.css'

import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
// import {
//     TransitionGroup,
//     CSSTransition
// } from "react-transition-group";
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
// categoris Component
import Categoris from '../pages/Categoris/Categoris'
import ChildCategoris from '../pages/Categoris/Child'
import EditCategoris from '../pages/Categoris/Edit'

const Routes = () => {
    // let location = useLocation();

    return (
        // <TransitionGroup>
        //     <CSSTransition
        //         key={location.key}
        //         classNames="fade"
        //     >
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/customers' exact component={Customers} />
                    <Route path='/categories' exact component={Categoris} />
                    {/* Route Cilde Categoris */}
                    <Route path='/categories/:id' component={ChildCategoris} />
                    {/* <Route path='/categories/:parnt/:id' component={ChildCategoris} /> */}
                    <Route path='/categories/edit/:id' exact render={EditCategoris} />
                </Switch>
        //     </CSSTransition>
        // </TransitionGroup>
    )
}

export default Routes
