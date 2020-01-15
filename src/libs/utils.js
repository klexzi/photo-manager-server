import bcrypt from 'bcryptjs'

export const hashPassword = (password) => {
   const saltRounds = 10;
   return await bcrypt.hash(password, saltRounds);
}