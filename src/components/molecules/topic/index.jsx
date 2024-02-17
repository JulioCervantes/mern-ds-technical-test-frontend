import PropTypes from 'prop-types';

export default function Topic({coverImage,name}) {
  return (
    <div>
      <div>Hola mundo</div>
    </div>
  )
}

Topic.propTypes = {
  coverImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

Topic.defaultProps = {
  coverImage: "logo.svg",
  name: "Unkonwn Topic"
}