import React, { useState, FormEvent} from "react";
import { OnChangeModel } from "../../common/types/Form.types";
import TextInput from "../../common/components/TextInput";
import {Button} from "react-bootstrap";
//import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [formState, setFormState] = useState({
    email: { error: "", value: "" },
    password: { error: "", value: "" }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if(isFormInvalid()) { return; }
  }

  function isFormInvalid() {
    return (formState.email.error || formState.password.error
      || !formState.email.value || !formState.password.value);
  }
  
  // function getDisabledClass(): string {
  //   let isError: boolean = isFormInvalid() as boolean;
  //   return isError ? "disabled" : "";
  // }

  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-9">

              <div className="row justify-content-center" style={{height:"100vh"}}>
              {/* <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{marginRight:50}}></div> */}
                <div className="col-lg-6" style={{margin: 'auto'}}>
                  <div className="p-4">
                  <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-10">
                    <div className="text-center">
                      <img src='./Teache.png' alt="logo" width="200px" height="35px"/>
                      <h4 style={{color: '#554DF1', marginTop:10 , fontSize:20}}>Welcome Back!</h4>
                      <p style={{fontSize:14}}>Forgot Password</p>
                    </div>
                  
                    <form  className="user" style={{marginTop:40
                    }} onSubmit={submit}>
                      <div className="form-group" >

                        <TextInput id="input_email"
                          field="email"
                          value={formState.email.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          label=""
                          placeholder="Enter Email" />
                      </div>
      
                      <div className="form-group">
                        <div className="btn">
                          {/* <label className="custom-control-label"
                            htmlFor="customCheck"></label> */}
  
                        </div>
                      </div>
                      <div style={{display:'flex', justifyContent:'center'}}>
                      
                      <Button style={{marginRight:15,backgroundColor:'#FF827A', border:'none'}} >Submit</Button>
                      <Button style={{backgroundColor:'#A7A6CE',color:'#554DF1'}} ><a style={{textDecoration:'none'}} href="/login">Cancel</a></Button>
                      </div>
                  
                    </form>
                  </div>
                  </div>
                    </div>
                </div>
              </div>
         
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
