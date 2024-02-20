
import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate = useNavigate();
    const [cred, setCred] = useState({ name: "", email: "", password: "" })
    const { name, email, password } = cred;
    const handleSubmit = async (e) => {
        console.log("signup form clicking");
        e.preventDefault();
        const response = await fetch('http://localhost:5001/api/auth/createuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
           
            body: JSON.stringify({ name, email, password })

        });
       


        const json = await response.json()
        console.log(json);

        if (json.authToken) {
            // save the auth token and rediredirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")

        }
        else {
            alert("Email should me unique")
        }
    }
    const onChange = (e) => {

        setCred({ ...cred, [e.target.name]: e.target.value });
        console.log("onchange form clicking ");
    }


    return (
        <div>
            <div className="card-body py-5 px-md-5">

                <form onSubmit={handleSubmit}>

                <div className="form-outline mb-4">
                        <input type="text" id="name" name="name" value={cred.name} onChange={onChange} className="form-control" />
                        <label className="form-label" htmlFor="form2Example1" > Name</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="email" id="email" name="email" value={cred.email} onChange={onChange} className="form-control" />
                        <label className="form-label" htmlFor="form2Example1" >Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="password" name="password" value={cred.password} onChange={onChange} className="form-control" />
                        <label className="form-label" htmlFor="form2Example2" >Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Signup</button>

                </form>

            </div>

        </div>
    )
}

export default Signup