export default interface IUser{
    _id: string;
    email: string;
    password: string;
    fullname: string;
    address: string;
    birthday: Date;
    phone: string;
    avatar: string;
    description: string;
    refreshToken: string;
    passwordResetToken: string;
    passwordResetExpires? : string;
    slug?: string;
    role?:[];
    generateSlug?: () => void;
}