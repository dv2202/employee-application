import { useState } from 'react'
import reactLogo from './assets/react.svg'
import EmployeeTable from './components/EmployeeTable'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EmployeeTable/>
    </>
  )
}

export default App
