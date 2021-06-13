import React, { Component} from 'react';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import {Register} from './Register';
import {Home} from '../Home';

export class Login extends Component {

    constructor(props){
        super(props);
    }

    state = {
        credentials: {username: '',password: ''},
        redirect:false
    }


    login(){
        console.log(this.state.credentials);
        fetch(process.env.REACT_APP_API+'auth/',{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.credentials)
        })
        .then(data=>data.json())
        .then(
            data=>{
                console.log(data);
                
                if(data['token']){
                    this.setState({ redirect: true });
                }
                else{
                    alert("Invalid");
                }
            }
        ).catch(error =>console.error(error)
        )
    }

   


    inputChanged=event=>{
        const cred=this.state.credentials;
        cred[event.target.name]= event.target.value;
        this.setState({credentials:cred});
    }
    
    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/home'/>;
          }
        return (
            <div className="bg-primary">
                <h1 className="mt-3 d-flex justify-content-center">Login User</h1>    

                <label className="mt-5 d-flex justify-content-center">
                    Username:
                    <input type="text" name="username" value={this.state.credentials.username}
                    onChange={this.inputChanged}/>   
                </label>  
                <br/>
                <label className="mt-3 d-flex justify-content-center">
                    Password:
                    <input type="password" name="password" value={this.state.credentials.password}
                    onChange={this.inputChanged}/>   
                </label>   
                <ButtonToolbar>     
                <Button style={{marginLeft:"auto"}} onClick={()=>this.login()}>Login</Button>
                {/* <Button style={{marginLeft:"auto"}} onClick={()=>this.register()}>SignUp</Button> */}
                </ButtonToolbar>
               
            </div>
            )
    }
}