import { useNavigate } from 'react-router-dom'
import { Envelope, Password, Eye, EyeSlash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import Loading from 'react-loading'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import Api from '../libs/Api'
import { useLocalStorage } from 'usehooks-ts'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [_, setToken] = useLocalStorage('auth_token', '')
  const navigate = useNavigate()



  const { getFieldProps, handleSubmit, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { data } = await Api.post('auth', values)
      if ('token' in data) {
        setToken(data.token)
        navigate('/')
      } else {
        toast.error('Credenciais inválidas')
        setFieldValue('password', '')
      }
    },
  })

  useEffect(() => {
    setToken('')
  }, [])

  return (
    <div className="w-full h-screen overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full gap-4 flex flex-col max-w-[25rem] mx-auto  mt-10"
      >
        <h1 className="font-extrabold text-4xl text-gray-700">Bem vindo!</h1>
        <h2 className="font-extrabold text-base text-gray-700 -mt-5">
          Informe suas credencias para autenticar
        </h2>
        <div className="flex flex-col relative">
          <label htmlFor="">Email</label>
          <input
            {...getFieldProps('email')}
            type="text"
            className="rounded pl-10"
            placeholder="E-mail"
          />
          <span className="absolute left-3 bottom-3">
            <Envelope />
          </span>
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="">Senha</label>
          <input
            {...getFieldProps('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            className="rounded px-10"
          />
          <span className="absolute left-3 bottom-3">
            <Password />
          </span>
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-3 bottom-3"
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </button>
        </div>
        <div className="flex mt-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center h-10 button primary"
          >
            {isSubmitting ? (
              <Loading type="spin" width={12} height={12} />
            ) : (
              'Entrar'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
