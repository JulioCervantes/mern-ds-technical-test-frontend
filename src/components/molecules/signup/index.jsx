import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Styles from './styles';
import client from '../../../client';
import { useState } from 'react';
import { STRING_ERROR_CODES } from '../../../utils/constants';
import sessionActions from '../../../redux/actions/sessionActions';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Signup({userRole}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ clientError, setClientError ] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFromRegister = async (token) => {
    const decodedToken = jwtDecode(token);
    dispatch({type: sessionActions.SET_SESSION, payload: {
      user: {
        id: decodedToken.userId,
        username: decodedToken.username,
        email: decodedToken.email,
      },
      role: decodedToken.role,
      token
    }});
    navigate('/', {replace: true});
  }

  const onSubmit = async (data) => {
    console.log('Registrando usuario...');
    setClientError({});
    try {
      const response = await client.auth.register({...data});
      if(response.data.created){
        // history.push('/login');
        return loginFromRegister(response.data.token);
      }
    } catch (error) {
      if(error.name === 'AxiosError'){
        const errorData = error.response.data;
        const errorMessage = STRING_ERROR_CODES[errorData?.code]?.user;
        if(errorMessage){
          return setClientError({error: errorMessage});
        }
        return setClientError({error: 'Hubo un error al intentar registrarse'});
      }
      setClientError(error);
      console.log({error});
    }
  };

  return (
    <div className={Styles.container}>
      <form className={Styles.form} onSubmit={handleSubmit(onSubmit, (errors)=>{
        console.log(errors);
        return;
      })}>
        <label>Nombre de usuario:</label>
        <input id='username' {...register('username', { required: 'Este campo es requerido' })} />
        {errors.username && <p>{errors.username.message}</p>}

        <label>Email:</label>
        <input id='email' {...register('email', { required: 'Este campo es requerido', pattern: /^\S+@\S+$/i })} />
        {errors.email && <p>{errors.email.message}</p>}
        {errors.email && errors.email.type === 'pattern' && <p>Ingrese una dirección de correo válida</p>}

        <label>Password:</label>
        <input id='password' {...register('password', { required: 'Este campo es requerido' })} type="password" />
        {errors.password && <p>{errors.password.message}</p>}

        <div>
          {clientError && <p>{clientError?.error}</p>}
        </div>

        <input {...register('role',{ value: userRole })} type="hidden" />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}

Signup.propTypes = {
  userRole: PropTypes.string,
};

Signup.defaultProps = {
  userRole: 'reader',
};