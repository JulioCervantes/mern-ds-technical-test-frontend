export const STRING_ERROR_CODES = {
  'DS-001': {
    user: 'El usuario ya existe',
    category: 'La categoría ya existe',
    topic: 'La temática ya existe',
    content: 'El contenido ya existe',
  },
  'DS-002': {
    user: 'Nombre de usuario o contraseña incorrectos',
    category: 'Ocurrió un problema al intentar crear la categoría',
    topic: 'Ocurrió un problema al intentar crear la temática',
    content: 'Ocurrió un problema al intentar crear el contenido',
  },
};

export const SESSION_TYPES = {
  guest: {
    name: 'guest',
  },
  reader: {
    name: 'reader',
  },
  creator: {
    name: 'creator',
  },
  admin: {
    name: 'admin',
  },
};

export const DEFAULT_USER = SESSION_TYPES.guest.name;
export const ADMIN_USER = SESSION_TYPES.admin.name;
export const CREATOR_USER = SESSION_TYPES.admin.name;