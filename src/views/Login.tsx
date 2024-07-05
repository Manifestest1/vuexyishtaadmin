'use client'

// React Imports
import { useState,useContext } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

import Grid from '@mui/material/Grid'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from './pages/auth/AuthIllustrationWrapper'
import AuthContext from '@/context/AuthContext'
import ProtectedLoginRoute from '../context/ProtectedLoginRoute'

const Login = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error,setError] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
  };

  const handleSubmit = async (e:any) => {
      e.preventDefault();

      if(!email || !password)
      {
        setError("Please enter both email and password.");

           return
      }

      if (!validateEmail(email))
      {
        setError("Please enter a valid email address.");

        return ;
      }

        setError(" ")

        try
        {
          await login(email, password);

        }
        catch (error)
        {
          setError("Please enter right credential.")

          //setError(error.message); // Set the error message from the API
        }

  };


  // Hooks
  const { lang: locale } = useParams()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
   <ProtectedLoginRoute>
    <Grid container spacing={80}>
      <Grid item xs={12} md={4}></Grid>

      <Grid item xs={12} md={4} sx={{mt:36,alignItems:'center'}}>
        <AuthIllustrationWrapper>
          <Card className='flex flex-col'>
            <CardContent className='sm:!p-12'>
              <div className='flex justify-center mbe-6'>
                <Logo />
              </div>
              <div className='flex flex-col gap-1 mbe-6'>
                <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
                <Typography>Please sign-in to your account and start the adventure</Typography>
              </div>
              <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <CustomTextField autoFocus fullWidth label='Email or Username' placeholder='Enter your email or username' onChange={(e) => setEmail(e.target.value)}/>
                <CustomTextField
                  fullWidth
                  label='Password'
                  placeholder='············'
                  id='outlined-adornment-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {error && <span className='input-error'>{error}</span>}
                <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                  <FormControlLabel control={<Checkbox />} label='Remember me' />
                  <Typography
                    className='text-end'
                    color='primary'
                    component={Link}
                    href={getLocalizedUrl('pages/auth/forgot-password-v1', locale as Locale)}
                  >
                    Forgot password?
                  </Typography>
                </div>
                <Button fullWidth variant='contained' type='submit'>
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </AuthIllustrationWrapper>
      </Grid>

    </Grid>
   </ProtectedLoginRoute>
  )
}

export default Login
