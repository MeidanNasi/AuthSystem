
import React, { Component } from 'react';
import { register } from '../services/userService'
import { login } from '../services/authService'
class auth extends Component{
    state = { 
        name: '',
        email: '',             
        password: '' ,
        isRegistered: true,
        error: ''
    }

    handleLogin = async ()=>{
        // send data to server ... 
        const { email , password } = this.state;
        try{ 
            const response = await login(email,password);
            console.log("-:", response); // delete it
            this.props.history.push('/home')
        } catch (err) {
             console.log(err.response.data);
             this.setState({ error : err.response.data });
             } 
        
    }
    handleSignup = async ()=>{
        // send data to server ... 
        const { name, email, password } = this.state;
        try {
            await register({ name, email, password });
            this.props.history.push('/home')
        }
        catch (err) {
            console.log(err.response.data)
            this.setState({ error : err.response.data });
        }
    }
    
    render(){
        const {isRegistered, error} = this.state;
        return (
            <div className="card">
                { 
                    isRegistered ?
                    <div>
                        <h3> Log in </h3>
                        <a  className="App-link"
                            onClick={()=> this.setState( { isRegistered: !isRegistered })}
                        >
                            New to this App? create a new account !  
                        </a>
                        <div className="input-group">
                            <form>
                            <input className="input" placeholder="Email..." onChange={t => this.setState({ email : t.target.value })}/>
                            <input className="input" type="password" placeholder="Password..." onChange={t => this.setState({ password : t.target.value })}/>
                            </form>
                            <a  className="App-link">
                             {error} 
                            </a>
                        </div>
                        <button className="button" onClick={()=>this.handleLogin()}>submit</button>
                    </div>
                    :
                    <div>
                        <h3> Sign up </h3>
                        <a className="App-link"
                            onClick={()=> this.setState( { isRegistered: !isRegistered })}
                        >
                            Already registered? click here to log in !  
                        </a>
                        <div className="input-group">
                            <form>
                            <input className="input" placeholder="Name..." onChange={t => this.setState({ name : t.target.value })}/>
                            <input className="input" placeholder="Email..." onChange={t => this.setState({ email : t.target.value })}/>
                            <input className="input" type="password" placeholder="Password..." onChange={t => this.setState({ password : t.target.value })}/>
                            </form>
                            <a  className="App-link">
                            {error} 
                            </a>
                        </div>
                        <button className="button" onClick={()=>this.handleSignup()}>submit</button>
                    </div>
                }

            </div>
        )}
}
export default auth