import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Styles from './styles';
import client from '../../../client';
import { useEffect, useState } from 'react';
import { STRING_ERROR_CODES } from '../../../utils/constants';
import Button from '../../atoms/buttons/button';

export default function TopicForm({ onSuccess, onAbort }) {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [clientError, setClientError] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await client.category.getCategories();
      setCategories(response.data);
    };
    getCategories();
  }, []);

  const creationSuccess = async () => {
    onSuccess();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    formData.append('data', data.coverImage[0]);
    setClientError({});
    try {
      const response = await client.topic.create(formData);
      if (response?.data?.created) {
        creationSuccess();
      }
    } catch (error) {
      if (error.name === 'AxiosError') {
        const errorData = error.response.data;
        const errorMessage = STRING_ERROR_CODES[errorData?.code]?.topic;
        if (errorMessage) {
          return setClientError({ error: errorMessage });
        }
        return setClientError({ error: 'Hubo un error al intentar crear la temática' });
      }
      setClientError(error);
      console.log({ error });
    }
  };

  return (
    <div className={Styles.container}>
      {categories.length === 0 && (
        <>
          <p>No hay categorías registradas</p>
          {onAbort && (
            <Button onClick={() => onAbort()}>Cancelar</Button>
          )}
        </>
      ) || (
          <form className={Styles.form} onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log(errors);
            return;
          })}>
            <label>Nombre de la temática:</label>
            <input id='topic' {...register('name', { required: 'Este campo es requerido' })} />
            {errors.name && <p>{errors.name.message}</p>}

            <label>Categorías</label>
            {categories.map((category) => (
              <div key={category._id} className='flex gap-0'>
                <input className='max-w-4 ml-0 mr-2' type="checkbox" id={category._id} {...register('categories', { required: 'Este campo es requerido' })} value={category._id} />
                <label  className='w-96 p-0'>{category.name}</label>
              </div>
            ))}

            <label>Cáratula de la temática</label>
            <Controller
              control={control}
              name='coverImage'
              rules={{ required: 'Este campo es requerido' }}
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <input
                    {...field}
                    value={value?.fileName}
                    type='file'
                    onChange={(e) => {
                      console.log(e.target.files);
                      onChange(e.target.files);
                    }}
                  />
                );
              }}
            />

            <div>
              {clientError && <p>{clientError?.error}</p>}
            </div>

            {onAbort && (
              <Button onClick={() => onAbort()}>Cancelar</Button>
            )}
            <button type="submit">Registrar</button>
          </form>
        )
      }
    </div>
  );
}

TopicForm.propTypes = {
  onSuccess: PropTypes.func,
  onAbort: PropTypes.func,
};
