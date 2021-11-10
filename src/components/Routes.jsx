import '../assets/css/AnimateRoute.css'

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// Auth
import Login from '../pages/Auth/Login'
// Dashboard
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
// categoris 
import Categoris from '../pages/Categoris/Categoris'
import ChildCategoris from '../pages/Categoris/Child'
import EditCategoris from '../pages/Categoris/Edit'
import AddCategori from '../pages/Categoris/Add'
// Peoducts
import Product from '../pages/Product/Product'
import ProductEdit from '../pages/Product/Edit'
import ProductAdd from '../pages/Product/Add'
// Gallery
import Gallery from '../pages/Gallery/gallery'
// Tags
import Tags from '../pages/Tags/Tags'
import AddTags from '../pages/Tags/Add'
import EditTags from '../pages/Tags/Edit'
import PrivateRoute from '../container/PrivateRoute'
import Brands from '../pages/Brands/Brands'
import AddBrands from '../pages/Brands/Add'
import { EditBrands } from '../pages/Brands/Edit'
const Routes = () => {
    return (

        <Switch>

            <Route path="/login" exact component={Login} />

            <Route path='/' exact>
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            </Route>
            <Route path='/customers' exact >
                <PrivateRoute>
                    <Customers />
                </PrivateRoute>
            </Route>
            {/* Route Categoris */}
            <Route path='/categories' exact >
                <PrivateRoute>
                    <Categoris />
                </PrivateRoute>
            </Route>
            <Route path='/categories/:id' exact >

            </Route>
            <Route path='/categories/:parnt/:id' >
                <PrivateRoute>
                    <ChildCategoris />
                </PrivateRoute>
            </Route>
            <Route path='/edit/categories/:id' exact >
                <PrivateRoute>
                    <EditCategoris />
                </PrivateRoute>
            </Route>
            <Route path='/add/categories/' exact >
                <PrivateRoute>
                    <AddCategori />
                </PrivateRoute>
            </Route>
            {/* Route Products */}
            <Route path='/products' exact >
                <PrivateRoute>
                    <Product />
                </PrivateRoute>
            </Route>
            <Route path='/products/edit/:id' exact >
                <PrivateRoute>
                    <ProductEdit />
                </PrivateRoute>
            </Route>
            <Route path='/products/add/' exact>
                <PrivateRoute>
                    <ProductAdd />
                </PrivateRoute>
            </Route>
            {/* Route Gallery  */}
            <Route path="/gallery" exact >
                <PrivateRoute>
                    <Gallery />
                </PrivateRoute>
            </Route>
            {/* Route Products Tags */}
            <Route path="/tags" exact >
                <PrivateRoute>
                    <Tags />
                </PrivateRoute>
            </Route>
            <Route path='/tags/add' exact >
                <PrivateRoute>
                    <AddTags />
                </PrivateRoute>
            </Route>
            <Route path='/tags/edit/:id' exact >
                <PrivateRoute>
                    <EditTags />
                </PrivateRoute>
            </Route>
            {/* Brands Routing  */}
            <Route path="/brands" exact >
                <PrivateRoute>
                    <Brands />
                </PrivateRoute>
            </Route>
            <Route path='/brands/add' exact >
                <PrivateRoute>
                    <AddBrands />
                </PrivateRoute>
            </Route>
            <Route path='/brands/edit/:id' exact >
                <PrivateRoute>
                    <EditBrands />
                </PrivateRoute>
            </Route>
            <Route
                exact
                strict
                sensitive
                path='/:url([a-z/]*[A-Z]+[a-z/]*)/'
                render={props => {
                    console.log('salam')
                    const path = props.location.pathname
                    return <Redirect to={`${path.toLowerCase()}`} />
                }}
            />
            <Route>
                <Redirect to="/" />

            </Route>
        </Switch>

    )
}

export default Routes
