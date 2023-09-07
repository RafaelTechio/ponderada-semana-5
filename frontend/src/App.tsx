import { useEffect, useState } from 'react'
import apiService from './services/ApiService';
import './App.css';
 
function App() {
  
  const [isLoadingQuery, setIsLoadingQuery] = useState<boolean>(false);
  const [queries, setQueries] = useState<any[]>([]);
  
  const [isLoadingEmployees, setIsLoadingEmployees] = useState<boolean>(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [employee, setEmployee] = useState<{name?: string, address?: string}>({})

  useEffect(() => {
    (async () => {
      setIsLoadingQuery(true);
      try {
        setQueries(await apiService.listQueries());
      } catch(error){
        console.log(error);
      }
      setIsLoadingQuery(false);
    })();
    
    (async () => {
      setIsLoadingEmployees(true);
      try {
        setEmployees(await apiService.listEmployees());
      } catch(error){
        console.log(error);
      }
      setIsLoadingEmployees(false);
    })()
  }, [])


  async function handleCreateEmployee() {
    try {
      const result = await apiService.createEmployee({...employee});
      if(result){
        setEmployees([...employees, result])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='system'>
      <section className='bg-dark'>
        <aside>
          <h2>Queries</h2>
          <ul>
            {queries.map(query => <li>
              #{query.id} - {String(query.query).substring(0, 15)}
            </li>)}
          </ul>
        </aside>
        <main></main>
      </section>
      <section className='bg-light'>
        <aside>
          <h2>Employees</h2>
          <ul>
            {employees.map(employee => <li>
              #{employee.id} - {employee.name}
            </li>)}
          </ul>
        </aside>
        <main>
          <input type='text' value={employee.name} placeholder='Name' onChange={(event) => setEmployee({...employee, name: event.target.value })}></input>
          <input type='text' value={employee.address} placeholder='Address' onChange={(event) => setEmployee({...employee, address: event.target.value })}></input>
          <button onClick={handleCreateEmployee}>Criar!</button>
        </main>
      </section>
    </div>
  )
}

export default App
