import login from '@/assets/image/other/login-bg.png'
import { getGoogleLogin, getGoogleURL, login as loginUser } from '@/service/action/register.action'
import { LoginFormdataType } from '@/types/formData.type'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ValidationError } from 'yup'
import { loginSchema } from '@/utils/yupSchema'
import { toast } from 'react-toastify'
import ErrorComponent from '../ErrorComponent'
import { addToCart } from '@/service/action/cart.action'
import { removeCartFromLocalstorage, removeWishlistFromLocalstorage } from '@/utils'
import { CartContext } from '@/context/cart'
import { addWishlist } from '@/service/action/wishlist.action'

const initialValue: LoginFormdataType = {
  email: '',
  password: '',
}

const Login = () => {
  const { setCartCount } = useContext(CartContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormdataType>(initialValue)
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    if (location.search.includes('code')) {
      const params = new URL(window.location.href).searchParams
      const code = params.get('code')
      if (code) {
        getGoogleLogin(code).then(res => {
          const toast2 = res.success ? toast.success : toast.error
          toast2(res.message)
          if (res.success) {
            localStorage.setItem('token', res.data.token)
            navigate('/')
          }
        })
      }
    }
  }, [location])

  useEffect(() => {
    const data = localStorage.getItem('login')
    if (data) {
      const credentials = JSON.parse(data)
      setFormData(credentials)
      setRememberMe(true);
    }
  }, [])

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      const validatedData: LoginFormdataType = await loginSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear previous errors

      const payload = { ...validatedData };
      await loginUser(payload).then(async (res) => {
        const toast2 = res.success ? toast.success : toast.error
        toast2(res.message)
        if (res.success) {
          if (rememberMe) {
            localStorage.setItem('login', JSON.stringify(payload));
          } else {
            localStorage.removeItem('login');
          }
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('_id', res.data._id)
          const cartData = JSON.parse(localStorage.getItem('cartData'))
          const cartPayload = cartData?.map(data => ({
            productId: data.productId._id,
            quantity: 1,
            weight: data.weight,
            price: data.price,
            mrp: data.mrp
          }))
          const wishlistData = JSON.parse(localStorage.getItem('wishlistData'))
          const promises = wishlistData?.map(item => addWishlist(item.productId._id)) || [];

          const results = await Promise.all([...promises, addToCart({ items: cartPayload })]);

          setCartCount(prev => prev + 1)
          removeCartFromLocalstorage()
          removeWishlistFromLocalstorage()

          setFormData(initialValue)
          navigate('/')
        } else {

        }
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorObj: { [key: string]: string } = {};
        error.inner.forEach(err => {
          if (err.path) errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      }
    } finally {
      setLoading(false)
    }
  };


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    try {
      await loginSchema.validateAt(name, { ...formData, [name]: value });
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleGoogleLogIn = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    getGoogleURL().then(res => {
      window.location.replace(res.data.url)
    })
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setRememberMe(checked)
  }

  return (
    <section className='login'>
      <Container>
        <Row>
          <Col md={6} sm={12} className='d-flex justify-content-center align-items-center'>
            <img src={login} alt="login" className='img-fluid' />
          </Col>
          <Col md={6} sm={12}>
            <Card>
              <p>WELCOME BACK</p>
              <h2>Login your Account</h2>
              <form action="">
                <label htmlFor="">Email</label>
                <input type="email" placeholder='Example@email.com' name='email' value={formData.email} onChange={handleChange} className={`${errors.email && 'error-border'}`} />
                {errors.email && <ErrorComponent message={errors.email} />}
                <label htmlFor="">Password</label>
                <div className="password-input-wrapper" style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='At least 8 characters'
                    style={{ paddingRight: '40px' }}
                    className={`${errors.password && 'error-border'}`}
                    name='password' value={formData.password} onChange={handleChange}
                  />
                  <span
                    className='eye-icon'
                    onClick={togglePassword}
                  >
                    <Icon width={22} height={22} icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} />
                  </span>
                  {errors.password && <ErrorComponent message={errors.password} />}
                </div>
                <div className="login-for">
                  <div className="d-flex align-items-center radio-box">
                    <input className="mb-0 w-auto" type="checkbox" name="remember" checked={rememberMe} onChange={handleCheck} />
                    <span>Remember me</span>
                  </div>
                  {/* <Link to="">Forgot Password?</Link> */}
                </div>

                <button className='btn-all' onClick={onSubmit}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>CONTINUE...
                    </>
                  ) : (
                    'CONTINUE'
                  )}
                </button>
              </form>
              <div className='orline'>
                <div className='line'></div>
                <div className='cemter-or'>Or</div>
                <div className='line'></div>
              </div>
              <div className='other-icon'>
                <Card onClick={handleGoogleLogIn}>
                  <a href="">
                    <Icon icon='logos:google-icon' />
                    <span> Sign up with Google</span>
                  </a>
                </Card>
                {/* <Card >
                  <a href="">
                    <Icon icon='logos:facebook' />
                    <span> Sign up with Facebook</span>
                  </a>
                </Card >
                <Card >
                  <a href="">
                    <Icon icon='logos:apple' />
                    <span> Sign up with Apple</span>
                  </a>
                </Card> */}
              </div>
              <span className='account'>New User? &nbsp;<Link to="/sign-up">SIGN UP HERE</Link></span>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login