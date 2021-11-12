import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from 'universal-cookie/es6'
import * as Yup from "yup";

import './form.css'
import { useHistory } from 'react-router';
// import axios from 'axios';

const SignupSchema = Yup.object().shape({

    username: Yup.string()

        .min(2, 'Too Short!')

        .max(70, 'Too Long!')

        .required('  الزامی میباشد'),

    password: Yup.string()
        .required(' الزامی میباشد '),

});



const Login = (props) => {
    const cookies = new Cookies();
    const history = useHistory();
    return (
        <div className="container" >
            <div className="auth">
                <div className="row d-flex justify-content-start  align-items-center card-parent " >
                    <div className="card col-9  col-md-10 col-sm-11 animate-top d-flex  flex-wrap ">
                        <div className=" col-6 col-md-12">
                            <h2 className="page-header">
                                <div className="d-flex justify-center align-center">
                                    <div className="animate-top">
                                        ورود
                                    </div>
                                </div>
                            </h2>
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={(value) => {
                                    // axios.post()
                                    cookies.set('login', true)
                                    history.push("/")
                                }}
                            >
                                {() => (

                                    <Form className="d-flex" >
                                        <div>
                                            <div>
                                                <label htmlFor="username" >  نام کاربری </label>
                                                <span className="color-danger err">
                                                    <ErrorMessage name="username" />
                                                </span>
                                                <Field name="username" id="username" className="form-control" />
                                                <br />

                                            </div>
                                            <div>
                                                <label htmlFor="password"> رمز عبور </label>
                                                <span className="color-danger err" >
                                                    <ErrorMessage name="password" className="color-danger" />
                                                </span>
                                                <Field name="password" id="password" type="password" className="form-control" />

                                            </div>


                                        </div>
                                        <div className="bottom-bar" >
                                            <div>
                                                <input type="checkbox" name="" id="" />
                                                <span>
                                                    مرا فراموش نکن
                                                </span>
                                            </div>
                                            <button type="submit" className="button w-50" >ورود</button>
                                        </div>

                                    </Form >


                                )}

                            </Formik >
                        </div>
                        <div className="col-6 bg-image d-md-none ">

                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default Login

