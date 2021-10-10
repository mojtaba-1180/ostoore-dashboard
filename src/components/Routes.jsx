import '../assets/css/AnimateRoute.css'

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
// categoris 
import Categoris from '../pages/Categoris/Categoris'
import ChildCategoris from '../pages/Categoris/Child'
import EditCategoris from '../pages/Categoris/Edit'

// Peoducts
import Product from '../pages/Product/Product'
import ProductEdit from '../pages/Product/Edit'
import ProductAdd from '../pages/Product/Add'
// Gallery
import gallery from '../pages/Gallery/gallery'
// Tags
import Tags from '../pages/Tags/Tags'
import AddTags from '../pages/Tags/Add'
import EditTags from '../pages/Tags/Edit'
const Routes = () => {
    return (
    
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/customers' exact component={Customers} />
                    {/* Route Categoris */}
                    <Route path='/categories' exact component={Categoris} />
                    <Route path='/categories/:id' exact component={ChildCategoris} />
                    <Route path='/categories/:parnt/:id' component={ChildCategoris} />
                    <Route path='/edit/categories/:id' exact render={EditCategoris} />
                    {/* Route Products */}
                    <Route path='/products' exact component={Product} />
                    <Route path='/products/edit/:id' exact component={ProductEdit} />
                    <Route path='/products/add/' exact component={ProductAdd} />
                    {/* Route Gallery  */}
                    <Route path="/gallery" exact component={gallery} />
                    {/* Route Products Tags */}
                    <Route path="/tags" exact component={Tags}  />
                    <Route path='/tags/add' exact component={AddTags} />
                    <Route path='/tags/edit/:id' exact component={EditTags} />

                </Switch>

    )
}

export default Routes
