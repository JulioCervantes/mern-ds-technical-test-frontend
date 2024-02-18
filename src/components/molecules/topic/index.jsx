import PropTypes from 'prop-types';
import Button from '../../atoms/buttons/button';
import { Link } from 'react-router-dom';

export default function Topic({ coverImage, name }) {
  const generatedPath = `/topic/${name}`;
  return (
    <>
      <div className="w-full">
      </div>
      <div>
        <div className="flex flex-row flex-wrap justify-center items-center shadow-lg">
          <Link to={generatedPath}>
            <Button>
              <div className="w-48 h-40 shadow-lg">
                <img className="mx-auto h-32" src={coverImage} alt={`Imagen de ${name}`} />
                {name}
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

Topic.propTypes = {
  coverImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

Topic.defaultProps = {
  coverImage: "/src/assets/logo.png",
  name: "Unkonwn Topic"
}