import bcrypt from 'bcrypt';

const comparePassword = (password, hash)=>{
    return bcrypt.compareSync(password, hash);
}

export default comparePassword;