import { useNavigate } from 'react-router-dom'
import PageComponent from '../components/page'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <PageComponent>
      <button className='border'>Ação</button>
    </PageComponent>
  )
}
