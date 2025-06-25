import React, { useEffect, useState } from 'react'

function Dashboard() {
    const [ feedbacks, setFeebacks ] = useState([]);
    const [ error, setError ] = useState("");
    const [ temp, setTemp ] = useState([]);

    const getFeedbacks = () => {
        fetch(import.meta.env.VITE_FEEDBACK_URL)
        .then((response) => {
            if(!response.ok) {
                throw new Error("Network status was not Ok");
            }
            return response.json();
        })
        .then((data) => {
            setFeebacks(data);
            setTemp(data);
        })
        .catch((err) => {
            setError(err.message);
        })
    };

    useEffect(() => {
        getFeedbacks();
    }, []);

    const handleChangeCategory = (e) => {
        const type = e.target.value;
        if(e.target.value === "all") {
            const filteredData = feedbacks;
            setTemp(filteredData);
        }
        else {
            const filteredData = feedbacks.filter(item => item.category === e.target.value);
            setTemp(filteredData);
        } 
    }

    const handleChangeTime = (e) => {
        const type = e.target.value;
        setTemp((pre) => {
            const sorted = [...pre].sort((a, b) => {
                if(type === 'newest') {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }else {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                }
            });
            return sorted;
        })
    };

  return (
    <div className='container border border border-5 mt-4'>
        {error && 
        (<div className='alert alert-danger alert-dismissible fade show m-2'>
            {error}
            <button className="btn-close" onClick={() => setError("")}></button>
        </div>)}
        <div className="mb-3">
            <label htmlFor="dropdown" className="form-label">Category:</label>
            <select className="form-select mb-3 border border-2" aria-label=".form-select-lg example" id="dropdown" name='category' required onChange={handleChangeCategory}>
                <option value="all">All</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="suggestion">Suggestion</option>
              <option value="bug report">Bug report</option>
              <option value="feature request">Feature request</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="sort" className='form-label'>Sort</label>
            <select className='form-select mb-3 border border-2' name="" id="sort" onChange={handleChangeTime}>
                <option value="oldest">Oldest</option>
                <option value="newest">Newest</option>
            </select>
          </div>

        <div className='row'>
            {temp.map((feedback, index)=> (
            <div key={index} className='col-12 col-md-6 col-lg-4"'>
                <div className="card-body border border-2 border-secondary rounded m-2 bg-light text-dark">
                    <h5 className="card-title p-1" mb-3>Category: {feedback.category}</h5>
                    <p className="card-text mb-1 p-1">UserName: {feedback.username}</p>
                    <p className="card-text mb-1 p-1">Email: {feedback.email}</p>
                    <p className="card-text mb-1 p-1">Time: {(feedback.createdAt).split("T")[0]}, {(feedback.createdAt).split("T")[1].split('.')[0]}</p>
                    <p className="card-text mb-1 p-1">Feedback: {feedback.feedback}</p>
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Dashboard;