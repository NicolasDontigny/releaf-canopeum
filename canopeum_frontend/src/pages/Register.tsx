import { AuthenticationContext } from '@components/context/AuthenticationContext';
import { AuthUser } from '@services/api'
import getApiClient from '@services/apiInterface'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'

import useLogin from '../hooks/LoginHook';

const isLoginEntryValid = (entry: string | undefined) => entry !== undefined && entry !== ''

const Register = () => {
  const navigate = useNavigate()
  const { authenticateUser } = useLogin()
  const { t: translate } = useTranslation()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [userNameInError, setUserNameInError] = useState(false)
  const [passwordInError, setPasswordInError] = useState(false)

  const [loginError, setLoginError] = useState<string | undefined>(undefined)

  const { isAuthenticated } = useContext(AuthenticationContext)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const onLoginClick = async () => {
    if (!userName) {
      setUserNameInError(true)
    }

    if (!password) {
      setPasswordInError(true)
    }

    if (isLoginEntryValid(userName) && isLoginEntryValid(password)) {
      try {
        const response = await getApiClient().authenticationClient.login(
          new AuthUser({
            email: userName,
            password,
          }),
        )
        sessionStorage.setItem('token', response.access)
        sessionStorage.setItem('refreshToken', response.refresh)

        authenticateUser(response.access)
      } catch {
        setLoginError('Error while login')
      }
    }
  }

  return (
    <div className='d-flex bg-primary' style={{ height: '100vh' }}>
      <div className='login-background' style={{ width: '55%' }} />
      <div className='d-flex flex-column bg-white px-3 py-2' style={{ width: '45%', alignItems: 'center' }}>
        <div style={{ flexGrow: '0.3', display: 'flex', alignItems: 'center' }}>
          <h1 style={{ textAlign: 'center' }}>{translate('auth.log-in-header-text')}</h1>
        </div>

        <div className='d-flex flex-column' style={{ width: '60%' }}>
          <div style={{ width: '100%', margin: '20px 0px 20px 0px' }}>
            <label htmlFor='exampleInputEmail1'>{translate('auth.log-in-header-text')}</label>
            <input
              aria-describedby='emailHelp'
              className={`form-control ${userNameInError && !isLoginEntryValid(userName) && 'is-invalid'} `}
              id='exampleInputEmail1'
              onChange={event => setUserName(event.target.value)}
              type='email'
            />
            {userNameInError && !isLoginEntryValid(userName) && (
              <span className='help-block text-danger'>
                Please enter a email address
              </span>
            )}
          </div>

          <div style={{ width: '100%', margin: '20px 0px 20px 0px' }}>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              className={`form-control ${passwordInError && !isLoginEntryValid(password) && 'is-invalid'} `}
              id='exampleInputPassword1'
              onChange={event => setPassword(event.target.value)}
              type='password'
            />
            {passwordInError && !isLoginEntryValid(password) && (
              <span className='help-block text-danger'>Please enter a password</span>
            )}
          </div>
          {loginError && <span className='help-block text-danger'>{loginError}</span>}

          <button
            className='btn btn-primary'
            onClick={onLoginClick}
            style={{ margin: '40px 0px 10px' }}
            type='submit'
          >
            {translate('auth.log-in')}
          </button>

          <Link className='w-100' to='/register'>
            <button
              className='btn btn-outline-primary w-100'
              style={{ margin: '10px 0px 10px' }}
              type='button'
            >{translate('auth.sign-up')}</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
