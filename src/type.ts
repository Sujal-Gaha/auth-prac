// LoginUser

export type TLoginUserInput = {
  password: string;
  username: string;
};

export type TLoginUserOutput = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      __v: number;
      _id: string;
      avatar: {
        _id: string;
        localPath: string;
        url: string;
      };
      createdAt: string;
      email: string;
      isEmailVerified: boolean;
      loginType: string;
      role: string;
      updatedAt: string;
      username: string;
    };
  };
  message: string;
  statusCode: 200;
  success: boolean;
};

// RegisterUser

export type TRegisterUserInput = {
  email: string;
  password: string;
  role: string;
  username: string;
};

export type TRegisterUserOutput = {
  statusCode: 200;
  data: {
    user: {
      _id: string;
      avatar: {
        url: string;
        localPath: string;
        _id: string;
      };
      username: string;
      email: string;
      role: string;
      loginType: string;
      isEmailVerified: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
  message: string;
  success: boolean;
};
