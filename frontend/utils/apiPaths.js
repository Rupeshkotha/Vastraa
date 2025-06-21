export const BASE_URL = "http://localhost:5000";
export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/auth/login`,
    SIGNUP: `/api/auth/signup`,
    GET_USER: `/api/auth/getUser`,
    UPDATE_PASSWORD: `/api/auth/updatePassword`,
    FORGOT_PASSWORD: `/api/auth/forgotPassword`,
    GOOGLE: `/api/auth/google`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `/api/users/imageUpload`,
  },
  USER: {
    CREATE_USER: `/api/users/`,
    USER_ALLOPS: (userId) => `/api/users/${userId}`,
    CHECK_ONBOARDING: (userId) => `/api/users/checkOnboarding/${userId}`,
  },
};
