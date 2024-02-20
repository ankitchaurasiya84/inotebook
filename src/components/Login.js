import {React,useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login =  () => {
    let navigate = useNavigate();
    const [cred,setCred] = useState({email:"", password:""})
   
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
             
            },
            body:JSON.stringify({email:cred.email,password:cred.password})
            
           
          });
          
          
          const json = await response.json()
          console.log(json);
          
          if(json.success){
            // save the auth token and rediredirect
            localStorage.setItem('token',json.authToken)
            navigate("/home")
           console.log("______________");
          }
          else{
            alert("Invalid cred under forward")
          }
    }
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
      }
    return (
        <div>


            <section className=" text-center text-lg-start">

                <div className="card mb-3">
                    <div className="row g-0 d-flex align-items-center">
                        <div className="col-lg-4 d-none d-lg-flex">
                            <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes"
                                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
                        </div>
                        <div className="col-lg-8">
                            <div className="card-body py-5 px-md-5">

                                <form onSubmit={handleSubmit}>

                                    <div className="form-outline mb-4">
                                        <input type="email" id="email" name="email" value={cred.email} onChange={onChange} className="form-control" />
                                        <label className="form-label" htmlFor="form2Example1" >Email address</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="password"  name="password" value={cred.password} onChange={onChange} className="form-control" />
                                        <label className="form-label"   htmlFor="form2Example2" >Password</label>
                                    </div>

                                    <button type="submit"  className="btn btn-primary btn-block mb-4">Sign in</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Login