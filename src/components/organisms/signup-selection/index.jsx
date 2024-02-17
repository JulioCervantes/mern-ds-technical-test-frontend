import { useState } from 'react';
import Styles from './styles';
import Signup from '../../molecules/signup';

const signupOptions = [
  {
    id: 1,
    name: 'Lector',
    role: 'reader',
    description: 'Este registro te permite acceder al contenido multimedia del sitio.',
    benefits: ['Accede a imágenes de diferentes temáticas', 'Accede a videos de youtube exclusivos', 'Accede a documentos de texto antes que nadie'],
  },
  {
    id: 2,
    name: 'Creador',
    role: 'creator',
    description: 'Este registro te permite agregar contenido multimedia al sitio.',
    benefits: ['Crea contenido en diferentes categorías y temáticas', 'Crea nuevas temáticas', 'Accede a estadísticas de tus contenidos (Próximamente)'],
  },
];

export default function SignupSelection() {
  const [SignupSelection, setSignupSelection] = useState(0);

  const handleSelection = (selection) => {
    setSignupSelection(selection);
  };

  const filterSelection = (option) => {
    if (SignupSelection === 0) return true;
    return option.id === SignupSelection;
  };

  return (
    <div className={Styles.container}>
      {SignupSelection !== 0 && (
        <div className={Styles.buttonContainer}>
          <button className={Styles.backArrow} onClick={() => handleSelection(0)}>
            &larr;
          </button>
        </div>
      )}
      {signupOptions.filter(filterSelection).map((option) => (
        <div key={option.id} className={Styles.registerBox} onClick={() => handleSelection(option.id)}>
          <h1 className={Styles.registerBoxHeader}>Registrarme cómo {option.name}</h1>
          {SignupSelection === 0 ?
            (
              <>
                <p className={Styles.registerBoxParagraph}>{option.description}</p>
                <p className={Styles.registerBoxParagraph}>Beneficios:</p>
                <ul className={Styles.registerBoxList}>
                  {option.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </>
            ) : <Signup userRole={option.role} />
          }
          
        </div>
      )
      )}
    </div>
  );
}