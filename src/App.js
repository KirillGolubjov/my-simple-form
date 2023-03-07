import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [markdown, setMarkdown] = useState({
    firstName: '',
    lastName: '',
    age: '',
  });
  const [countries, setCountries] = useState([]);

  const fetchCountry = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      const countryNames = data.map((country) => country.name.common);
      return setCountries(countryNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMarkdown(parsedData);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setMarkdown({ ...markdown, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = document.getElementById('country').value;
    const formData = { ...markdown, country };
    const { firstName, lastName, age } = markdown;
    if ((!firstName, !lastName, !age)) {
      toast.error('please fill out all fields');
      return;
    }
    localStorage.setItem('formData', JSON.stringify(formData));
    setMarkdown({
      firstName: '',
      lastName: '',
      age: '',
    });
    toast.success('All good');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const pdfData = e.target.result;
      setMarkdown({ ...markdown, pdfData });
    };
    reader.readAsDataUrl(file);
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className='form'>
        <h3
          style={{
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Just a Form
        </h3>
        <div className='form-div'>
          <label htmlFor='firstName'>
            <h4>First Name:</h4>
          </label>
          <input
            className='input-style'
            type='text'
            name='firstName'
            value={markdown.firstName}
            onChange={handleChange}
          />
        </div>
        <div className='form-div'>
          <label htmlFor='lastName'>
            <h4>Last Name:</h4>
          </label>
          <input
            className='input-style'
            type='text'
            name='lastName'
            value={markdown.lastName}
            onChange={handleChange}
          />
        </div>
        <div className='form-div'>
          <label htmlFor='age'>
            <h4>Age:</h4>
          </label>
          <input
            className='input-style'
            type='text'
            name='age'
            value={markdown.age}
            onChange={handleChange}
          />
        </div>
        <div className='form-div'>
          <label htmlFor='country'>
            <h4>Country:</h4>
          </label>
          <select name='country' id='country' className='select-country'>
            {countries.map((country, index) => {
              return <option key={index}>{country}</option>;
            })}
          </select>
        </div>
        <div className='form-div'>
          <label htmlFor='pdf'>
            <h4>Your resume (PDF format):</h4>
          </label>
          <input
            className='input-style'
            type='file'
            name='pdf'
            onChange={handleFileChange}
          />
        </div>
        <button
          className='btn'
          type='submit'
          style={{
            width: '14rem',
            height: '6rem',
            fontSize: '3rem',
            color: '#434522',
            backgroundColor: '#999999',
            margin: '2rem auto',
            fontFamily: 'inherit',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
          }}
        >
          Submit
        </button>
      </form>
      <ToastContainer position='top-center' autoClose={3000} />
    </main>
  );
}

export default App;
