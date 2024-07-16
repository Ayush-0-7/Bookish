import { useEffect, useRef, useState } from 'react'
import './App.css'
import Card from './components/Card';
function App() {
   
   const  book = useRef();
   const [recommendBook,setrecommendBook] = useState([]);
   const [allbook,setallbook] = useState([])
   const handleclick = async() => {
     const response = await fetch('http://localhost:5000/api/predict',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({bookName:book.current.value})
     })
     console.log(book.current.value);
     if(response.ok==true){
      const json = await response.json();
      if(json.predictions.length!=0){
        setrecommendBook([...json.predictions]);
      }
     }
     else{
       console.log("Error fetching recommendations.");
     }
   }
   useEffect(() => {
    const fetchBookNames = async () => {
      const response = await fetch('http://localhost:5000/api/booknames', {
        method: 'GET',
      });
      if (response.ok) {
        const json = await response.json();
        console.log('Fetched book names:', json.booknames); // Debugging line
        if (json.booknames.length != 0) {
          const sortedBookNames = json.booknames.sort((a, b) => a.localeCompare(b));
          setallbook([...json.booknames]);
        }
      } else {
        console.log('Error fetching book data.');
      }
    };
    fetchBookNames();
  }, []);

  return (
    <>
      <h1 className='m-2 p-2 font-bold text-3xl font-serif'>BOOKISH</h1>
      <div className='mx-56 mt-3'>
        <input
          name='booknames'
          list='books'
          ref={book}
          type="list"
           className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <datalist id='books'>
          {
            allbook.map((data,index)=>{
              
              return(
                <option key={index} value={data}/>
              )
            })
          }

        </datalist>
        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
          "
        
          onClick={handleclick}
        >
          Submit
        </button>
      </div>
      <div className='m-3'>
        <div className='w-[300px] m-3'>
        {
          recommendBook.map((data,index)=>{
            if(index==0){

              data = data.replace(/'/g,'"')
              return (
               
                  <Card title={JSON.parse(data).bookName} img={JSON.parse(data).img} author={JSON.parse(data).author} yop={JSON.parse(data).yop||'1999'}/>
                
                 
               )
            }
          })
        }
        </div>
        <h1 className='font-bold text-3xl underline italic m-3'>{recommendBook.length==0?``:`Recommended Books:`}</h1>
        <div className='grid grid-cols-4 gap-4 m-2'>

        {
          recommendBook.map((data,index)=>{
            if(index==0){
             return null;
            } 
            data = data.replace(/'/g,'"')
            return (
             
                <Card title={JSON.parse(data).bookName} img={JSON.parse(data).img} author={JSON.parse(data).author} yop={JSON.parse(data).yop||'1999'}/>
              
               
             )
          })
        }
        </div>
      </div>
    </>
  );
}

export default App
