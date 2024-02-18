import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Styles from './styles';
import client from '../../../client';
import { useEffect, useState } from 'react';
import { STRING_ERROR_CODES } from '../../../utils/constants';
import Button from '../../atoms/buttons/button';
import { useSelector } from 'react-redux';

export default function ContentForm({ onSuccess, onAbort }) {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [clientError, setClientError] = useState({});
  const [topics, setTopics] = useState([]);
  const currentSession = useSelector((state) => state.session);
  const [fileSelected, setFileSelected] = useState(false);
  const [URLContent, setURLContent] = useState('');
  const [contentTypes, setContentTypes] = useState({});

  useEffect(() => {
    const getTopics = async () => {
      const response = await client.topic.getTopics();
      setTopics(response.data);
    };
    getTopics();
  }, []);

  const creationSuccess = async () => {
    onSuccess();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append('data', data.contentFile[0]);
    setClientError({});
    try {
      console.log(currentSession);
      const response = await client.content.create(formData,currentSession.token);
      if (response?.data?.created) {
        creationSuccess();
      }
    } catch (error) {
      if (error.name === 'AxiosError') {
        const errorData = error.response.data;
        const errorMessage = STRING_ERROR_CODES[errorData?.code]?.content;
        if (errorMessage) {
          return setClientError({ error: errorMessage });
        }
        return setClientError({ error: 'Hubo un error al intentar crear el contenido' });
      }
      setClientError(error);
      console.log({ error });
    }
  };

  const updateAvailableContentType = (topicId) => {
    console.log(topics, topicId);
    const selectedTopic = topics.find((topic) => topic._id === topicId);
    const availableContentTypes = selectedTopic?.contentTypes;
    if (availableContentTypes) {
      const types = availableContentTypes.reduce((acc, type) => {
        acc[type.sourceType] = type.sourceType;
        return acc;
      }, {});
      console.log({ types });
      setContentTypes(types);
    }
    console.log({ selectedTopic });
  };

  const getAcceptedFiles = () => {
    let acceptedFiles = [];
    if (contentTypes.image) {
      acceptedFiles.push('image/*');
    }
    if (contentTypes.text) {
      acceptedFiles.push('.txt');
    }
    return acceptedFiles.join(',');
  };

  return (
    <div className={Styles.container}>
      {topics.length === 0 && (
        <>
          <p>No hay temáticas registradas</p>
          {onAbort && (
            <Button onClick={() => onAbort()}>Cancelar</Button>
          )}
        </>
      ) || (
          <form className={Styles.form} onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log(errors);
            return;
          })}>
            <label>Título:</label>
            <input id='topic' {...register('title', { required: 'Este campo es requerido' })} />
            {errors.title && <p>{errors.title.message}</p>}

            <label>Temática:</label>
            <select className='w-full h-8' id='topic'
              {...register('topicId',
                {
                  required: 'Este campo es requerido',
                  onChange: (e) => {
                    updateAvailableContentType(e.target.value);
                  }
                })
              }
            >
              <option value="">Selecciona una temática</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>{topic.name}</option>
              ))}
            </select>

            <label>Resumen del contenido (Opcional):</label>
            <textarea className='w-full' id='summary' {...register('summary')} />
            {errors.title && <p>{errors.title.message}</p>}

            <input type="hidden" {...register('authorId')} value={currentSession.user.id} />
            <hr />
            <label>Contenido:</label>
            <br />
            {Object.keys(contentTypes).length > 0 && (
              <>
                <label>Agrega el contenido</label>

                {contentTypes?.video && (
                  <input className={`${fileSelected ? 'opacity-30' : 'opacity-100'}`} id='data' {...register('contentURL', {
                    onChange: (e) => {
                      setURLContent(e.target.value);
                    }
                  })} readOnly={fileSelected} />
                )}

                {(contentTypes?.image || contentTypes?.text) && (
                  <Controller
                    control={control}
                    name='contentFile'
                    rules={{ required: 'Este campo es requerido' }}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <input
                          {...field}
                          value={value?.fileName}
                          type='file'
                          onChange={(e) => {
                            const haveFile = e.target.files.length > 0;
                            console.log({ haveFile });
                            setFileSelected(haveFile);
                            onChange(e.target.files);
                          }}
                          accept={getAcceptedFiles()}
                          disabled={URLContent}
                        />
                      );
                    }}
                  />
                )}


              </>
            ) || (
                <p>Selecciona una temática válida para poder agregar contenido</p>
              )}

            <div>
              {clientError && <p>{clientError?.error}</p>}
            </div>

            {onAbort && (
              <Button onClick={() => onAbort()}>Cancelar</Button>
            )}
            <button type="submit" disabled={Object.keys(contentTypes).length == 0}>Registrar</button>
          </form>
        )
      }
    </div>
  );
}

ContentForm.propTypes = {
  onSuccess: PropTypes.func,
  onAbort: PropTypes.func,
};
