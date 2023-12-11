import React from 'react'
import axios from 'axios';
import { useHistory, } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
// import NotLoggedInModal from '../NotLoggedInModal';
import host from '../config.json'
import NotLoggedInModal from './NotLoggedInModal';
function AboutUs() {
    let history = useHistory();

    const initialValues = {
        labNumber: "",
    }

    const validationSchema = Yup.object().shape({

        labNumber: Yup.string().required("This field is required!"),

    })

    const onSubmit = async (data) => {
        await axios.get(`http://${host.ip}:3001/order/getorder/${data.labNumber}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if(response.data.error){
                alert("You are not logged in. Please log-in!");
                history.push('/login');
            }
            if(response.data.length > 0){
                history.push(`/order/${response.data[0].labNumber}`);
            }else{
                alert("No orders found in that lab number!")
            }
        })
    }
 
    return (
            <div className="container">
                <NotLoggedInModal />
                <h3>About us</h3>

                <div class="container">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Monali Surani</h5>
                    <p class="card-text">CDAC Mumbai</p>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Siddhesh Khairnar</h5>
                    <p class="card-text">CDAC Mumbai</p>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Niranjan Khandekar</h5>
                    <p class="card-text">CDAC Mumbai</p>
                </div>
            </div>
        </div>
    </div>
</div>
                
               
                        

                    
                
            </div>
    )
}

export default AboutUs
