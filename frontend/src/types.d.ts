export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
  avatar: string;
}

export interface RegisterMutation {
  email: string;
  displayName: string;
  password: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

//errors & responses
export interface RegisterResponse {
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
