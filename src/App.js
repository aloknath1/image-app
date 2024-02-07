import { useState, useEffect } from 'react';
import './App.css';

function App() {
  //const accesskey = process.env.API_KEY;
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  
  const fetchRequest = async () => {    
    //console.log(`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${accesskey}&per_page=20`);
    const data = await fetch(`http://localhost:5000/load-images/`);
    const results = await data.json();
    setRes(results);
  }
  useEffect(() => {
    fetchRequest();    
  }, []);

  useEffect(() => {
    fetchRequest();    
  }, [img]);

  const Submit = () => {
    const result = res.map((dt) =>{
        let val = dt.split(".")[0];
        //console.log("val", val);
        if(val === img || val.includes(img)){
          return dt;
        }
        return "";
    });
    const data = result.filter(function( element ) {
        return element !== undefined;
    });
    //console.log("resule", data);
    setRes(data);   
  }
  return (
    <>
      <div className="App">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center input">
            <input
              className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
              type="text"
              placeholder="Search Anything..."
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />         
            <input type='submit' name="submit" onClick={Submit} value="Search" />
          </div>
        </div>
        <div className='row'>
          {
            res && res.map((data, index) => {              
              return <div className='image-box'>
                      <img className='unsplash-images' key={index} alt={data} src={require(`/images/${data}`)} width={200} height={200} />
                      <div className='image-name'>{data}</div>
                    </div>
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;
