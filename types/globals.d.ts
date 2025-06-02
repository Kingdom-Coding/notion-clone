export {};

declare global {
  interface CustomJwtSessionClaims {
    email?: string;
    fullname?: string;
    image?: string;
  }
}
