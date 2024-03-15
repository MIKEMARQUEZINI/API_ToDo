export enum eStatusError {
  Error404 = 'Not found',
  Error500 = 'Internal server error',
}

export enum eCrud {
  CREATE = 'Tasks created!',
  READ = 'Tasks found',
  UPDATED = 'Tasks updated!',
  DELETED = 'Tasks deleted!',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
