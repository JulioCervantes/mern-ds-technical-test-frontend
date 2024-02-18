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

export default function SigninForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ clientError, setClientError ] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (token) => {
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
    setClientError({});
    try {
      const response = await client.auth.login({...data});
      if(response?.data?.token){
        return login(response.data.token);
      }
    } catch (error) {
      if(error.name === 'AxiosError'){
        const errorData = error.response.data;
        const errorMessage = STRING_ERROR_CODES[errorData?.code]?.user;
        if(errorMessage){
          return setClientError({error: errorMessage});
        }
        return setClientError({error: 'Hubo un error al intentar iniciar sesión'});
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

        <label>Password:</label>
        <input id='password' {...register('password', { required: 'Este campo es requerido' })} type="password" />
        {errors.password && <p>{errors.password.message}</p>}

        <div>
          {clientError && <p>{clientError?.error}</p>}
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

SigninForm.propTypes = {
  userRole: PropTypes.string,
};

SigninForm.defaultProps = {
  userRole: 'reader',
};