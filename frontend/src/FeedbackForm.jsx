import React from 'react'
import { useState } from 'react'

function FeedbackForm() {
    const [ feedback, setFeedback ] = useState({
        username : "",
        email : "",
        category : "",
        feedback : ""
    });
    
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");

    const sumbit = () => {
        fetch(import.meta.env.VITE_FEEDBACK_URL, {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(feedback),
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Error submitting data!");
            }
            console.log(response.json());
            setError("");
            setSuccess("Thank you for you feedback");
        })
        .catch((err) => {
            setSuccess("");
            setError(err.message);
        })
    }

    const handleChange = (e) => {
        setFeedback((pre) => ({...pre, [e.target.name] : e.target.value}));
        console.log(feedback);
    }

  return (
    <div className="container mb-5 border border-3 p-5 mt-5 rounded">

        {success && 
        (<div className='alert alert-success alert-dismissible fade show'>
            {success}
            <button className="btn-close" onClick={() => setSuccess("")}></button>
        </div>)}

        {error && 
        (<div className='alert alert-danger alert-dismissible fade show'>
            {error}
            <button className="btn-close" onClick={() => setError("")}></button>
        </div>)}

        <form method='post' onSubmit={(e) => {
            e.preventDefault();
            sumbit();
        }}>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control border border-2" id="username" placeholder="username" name='username' onChange={handleChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control border border-2" id="email" placeholder="email" name='email' onChange={handleChange} required/>
          </div>

          <div className="mb-3">
            <label htmlFor="dropdown" className="form-label">Category:</label>
            <select className="form-select mb-3 border border-2" aria-label=".form-select-lg example" id="dropdown" name='category' onChange={handleChange} required>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="suggestion">Suggestion</option>
              <option value="bug report">Bug report</option>
              <option value="feature request">Feature request</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">Feedback</label>
            <textarea className="form-control border border-2" aria-label="With textarea" onChange={handleChange} name='feedback' required></textarea>
          </div>
          
          <div className='d-grid gap-2 col-6 mx-auto'>
            <button type="submit" className="btn btn-dark">Sumbit</button>
          </div>
        </form>
      </div>
  )
}

export default FeedbackForm