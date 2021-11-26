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
import AddChildCategori from '../pages/Categoris/AddChild'
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
import Sizes from '../pages/Size/Size'
import AddSize from '../pages/Size/Add'
import EditSize from '../pages/Size/Edit'
//  Logout 
import { useHistory } from "react-router"
import Cookies from "universal-cookie/es6"
import Logout from '../pages/Auth/logout'
import ChildCategorisTwo from '../pages/Categoris/ChildTwo'
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
            <PrivateRoute>
                    <ChildCategoris />
                </PrivateRoute>
            </Route>
            <Route path='/categories/:parnt/:id' >
                <PrivateRoute>
                    <ChildCategorisTwo />
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
            <Route path='/add/categories-child/:id' exact >
                <PrivateRoute>
                    <AddChildCategori />
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
            {/* Size Routing  */}
            <Route path="/size" exact >
                <PrivateRoute>
                    <Sizes />
                </PrivateRoute>
            </Route>
            <Route path='/size/add' exact >
                <PrivateRoute>
                    <AddSize />
                </PrivateRoute>
            </Route>
            <Route path='/size/edit/:id' exact >
                <PrivateRoute>
                    <EditSize />
                </PrivateRoute>
            </Route>
            <Route
                exact
                strict
                sensitive
                path='/:url([a-z/]*[A-Z]+[a-z/]*)/'
                render={props => {
                    const path = props.location.pathname
                    return <Redirect to={`${path.toLowerCase()}`} />
                }}
            />
            <Route path="/logout" exact>
                <Logout />
            </Route>
            <Route>
                <Redirect to="/" />

            </Route>
            {/* logout Router */}
            
        </Switch>

    )
}

export default Routes
