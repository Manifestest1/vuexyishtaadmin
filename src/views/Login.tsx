'use client'

// React Imports
import { useState, useContext } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel' 

// Type Imports
import { useForm, Controller } from 'react-hook-form'

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

// Third-party Imports

type FormValues = {
  email: string
  password: string
}

const Login = () => {
  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { login } = useContext(AuthContext)

  const onSubmit = async (data: FormValues) => {
    try 
    {
      await login(data.email, data.password)
    } catch (error) {
      // Handle error
      setErrorMessage('Invalid email or password. Please try again.')
      console.error(error)
    }
  }

  // Hooks
  const { lang: locale } = useParams()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <ProtectedLoginRoute>
      <Grid container spacing={80}>
        <Grid item xs={12} md={4}></Grid>

        <Grid item xs={12} md={4} sx={{ mt: 36, alignItems: 'center' }}>
          <AuthIllustrationWrapper>
            <Card className='flex flex-col sm:is-[450px]'>
              <CardContent className='sm:!p-12'>
                <div className='flex justify-center mbe-6'>
                  <Logo />
                </div>
                <div className='flex flex-col gap-1 mbe-6'>
                  <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
                  <Typography>Please sign-in to your account and start the adventure</Typography>
                </div>
                {errorMessage && (
                  <Typography color='error' className='mbe-6'>
                    {errorMessage}
                  </Typography>
                )}
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Email'
                        placeholder='Enter your email'
                        error={!!errors.email}
                        helperText={errors.email ? 'This field is required.' : ''}
                      />
                    )}
                  />
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Password'
                        id='outlined-password'
                        placeholder='············'
                        type={isPasswordShown ? 'text' : 'password'}
                        error={!!errors.password}
                        helperText={errors.password ? 'This field is required.' : ''}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={e => e.preventDefault()}
                                aria-label='toggle password visibility'
                              >
                                <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
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
