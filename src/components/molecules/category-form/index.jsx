import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Styles from './styles';
import client from '../../../client';
import { useState } from 'react';
import { STRING_ERROR_CODES } from '../../../utils/constants';
import Button from '../../atoms/buttons/button';
import { SOURCE_TYPES } from './constants';

export default function Categoryform({ onSuccess, onAbort }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [clientError, setClientError] = useState({});

  const creationSuccess = async () => {
    onSuccess();
  };

  const onSubmit = async (data) => {
    setClientError({});
    try {
      const response = await client.category.create({ ...data });
      if (response?.data?.created) {
        creationSuccess();
      }
    } catch (error) {
      if (error.name === 'AxiosError') {
        const errorData = error.response.data;
        const errorMessage = STRING_ERROR_CODES[errorData?.code]?.category;
        if (errorMessage) {
          return setClientError({ error: errorMessage });
        }
        return setClientError({ error: 'Hubo un error al intentar crear la categoría' });
      }
      setClientError(error);
      console.log({ error });
    }
  };

  return (
    <div className={Styles.container}>
      <form className={Styles.form} onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log(errors);
        return;
      })}>
        <label>Nombre de la categoría:</label>
        <input id='category' {...register('name', { required: 'Este campo es requerido' })} />
        {errors.name && <p>{errors.name.message}</p>}

        <label>Tipo de contenido</label>
        <select className={Styles.select} id='sourceType' {...register('sourceType', { required: 'Este campo es requerido' })}>
          <option value="">Selecciona un tipo</option>
          {SOURCE_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div>
          {clientError && <p>{clientError?.error}</p>}
        </div>

        {onAbort && (
          <Button onClick={() => onAbort()}>Cancelar</Button>
        )}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

Categoryform.propTypes = {
  onSuccess: PropTypes.func,
  onAbort: PropTypes.func,
};
