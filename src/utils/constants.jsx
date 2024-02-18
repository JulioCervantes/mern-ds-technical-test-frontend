export const STRING_ERROR_CODES = {
  'DS-001': {
    user: 'El usuario ya existe',
  },
  'DS-002': {
    user: 'Nombre de usuario o contraseña incorrectos',
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