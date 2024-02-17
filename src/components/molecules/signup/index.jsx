import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './styles';
import client from '../../../client';

export default function Signup({userRole}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const history = useHistory();

  const onSubmit = async (data) => {
    console.log('Registrando usuario...');
    try {
      const response = await client.auth.register({...data});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={Styles.container}>
      <form className={Styles.form} onSubmit={handleSubmit(onSubmit, (errors)=>{
        console.log(errors);
        return;
      })}>
        <label>Nombre de usuario:</label>
        <input {...register('username', { required: 'Este campo es requerido' })} />
        {errors.username && <p>{errors.username.message}</p>}

        <label>Email:</label>
        <input {...register('email', { required: 'Este campo es requerido', pattern: /^\S+@\S+$/i })} />
        {errors.email && <p>{errors.email.message}</p>}
        {errors.email && errors.email.type === 'pattern' && <p>Ingrese una dirección de correo válida</p>}

        <label>Password:</label>
        <input {...register('password', { required: 'Este campo es requerido' })} type="password" />
        {errors.password && <p>{errors.password.message}</p>}

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