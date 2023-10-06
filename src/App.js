import React from 'react';
import './App.css';


function App() {
const [search, setSearch] = React.useState('');
const [result, setResult] = React.useState([])
const [isLoading, setIsLoading] = React.useState(false)
const [isError, setIsError] = React.useState(false)

const handleChange = (e) =>{
  setSearch(e.target.value);
}

var url = "https://en.wikipedia.org/w/api.php"; 
var params = {
    action: "opensearch",
    search: search,
    limit: "10",
    namespace: "0",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

const handleClick = () =>{
  if (search === '') alert('Input field should not be empty')
  else{
    setIsError(false)
    setIsLoading(true)
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResult(data)
        setIsLoading(false)
      })
      .catch(function(error) {
        setIsError(true)
        setIsLoading(false)
        console.log(error);
      });
    setSearch('')
  }
}

const handleClear = () =>{
  setResult([])
}

  return (
    <div className="container">
      <div className={result.length < 1 ? 'random-input_container' : null}>
        <p className='random-p'><a className='random-link' href='https://en.wikipedia.org/wiki/Special:Random' target='_blank' rel="noreferrer">Click here to search random Wikipedia post</a></p>
        <div className='input-container'>
          <input placeholder='Type your search query' className='input' value={search} onChange={handleChange}/>
          <button className='btn' onClick={handleClick} type='button'>Search</button>
          {result.length > 0 && <button className='clear-btn' onClick={handleClear} type='button'>Clear</button>}
        </div>
      </div>

        {isLoading ? (
          <p className='loading'>Retrieving data..</p>
        ) : result.length < 1 ? (<div></div>) : isError ? (<p className='loading'>Oops! an error occurred</p>) : (
          result[1].map((item, i) =>{
        return <div key={i} className='link-container'><a className='link' href={result[3][i]} target="_blank" rel="noreferrer"><p className='link-div'>{item}</p></a></div>
      })
        )}
    </div>
  );
}

export default App;
