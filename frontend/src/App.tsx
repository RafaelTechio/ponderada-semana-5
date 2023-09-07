import { useEffect, useState } from 'react'
import apiService from './services/ApiService';
import './App.css';
 
function App() {
  
  const [isLoadingQuery, setIsLoadingQuery] = useState<boolean>(false);
  const [queries, setQueries] = useState<any[]>([]);
  const [query, setQuery] = useState<{query: string, returnedRows?: number, message?: string, returnedValue?: any, createdAt?: string}>({query: '',});
  
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
      setIsLoadingEmployees(true);
      const result = await apiService.createEmployee({...employee});
      if(result){
        setEmployees([...employees, result])
      }
      setIsLoadingEmployees(false);
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCreateQuery() {
    try {
      setIsLoadingQuery(true);
      const result = await apiService.createQuery({...query});
      if(result){
        setQueries([...queries, result])
        setQuery(result);
      }
      setIsLoadingQuery(false);
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
            {queries.map(query => <li onClick={() => {setQuery(query)}}>
              #{query.id} - {String(query.query).substring(0, 15)}
            </li>)}
          </ul>
        </aside>
        <main className='column'>
          {isLoadingQuery ? null : <>
            <div>
            {query.message ? <span>Message: {query.message}</span> : null}
            {query.createdAt ? <span>Criado em: {new Date(query.createdAt).toISOString()}</span> : null}
            {query.returnedRows ? <span>Quantidade de Linhas retornadas: {query.returnedRows}</span> : null}
          </div>
          <div className='row-query'>
            <textarea onChange={(event) => setQuery({...query, query: event.target.value})} value={query.query}>
              {query.query}
            </textarea>
            <div>
            {query.returnedValue ? <table>
              <tr>
                  {Array.isArray(query.returnedValue) ? query.returnedValue.length ? Object.keys(query.returnedValue[0]).map(val => <th>{val}</th>) : null: Object.keys(query.returnedValue).map(val => <th>{val}</th>)}
              </tr>
              {
                Array.isArray(query.returnedValue) ? 
                  query.returnedValue.map(value => <tr>{Object.values(value).map(valuevalue => <td>{valuevalue as string}</td>)}</tr>) : 
                  <tr>{Object.values(query.returnedValue).map(valuevalue => <td>{valuevalue as string}</td>)}</tr>
              }
            </table>: null}
            </div>
          </div>
          <div>
            <button onClick={handleCreateQuery}>Enviar!</button>
          </div>
          </>}
        </main>
      </section>
      <section className='bg-light'>
        <aside>
          <h2>Employees</h2>
          <ul>
            {employees.map(employee => <li onClick={() => {setEmployee({name: employee.name, address: employee.address})}}>
              #{employee.id} - {employee.name}
            </li>)}
          </ul>
        </aside>
        <main>
          {isLoadingEmployees ? null : <>
            <input type='text' value={employee.name} placeholder='Name' onChange={(event) => setEmployee({...employee, name: event.target.value })}></input>
            <input type='text' value={employee.address} placeholder='Address' onChange={(event) => setEmployee({...employee, address: event.target.value })}></input>
            <button onClick={handleCreateEmployee}>Criar!</button>
          </>}
        </main>
      </section>
    </div>
  )
}

export default App
