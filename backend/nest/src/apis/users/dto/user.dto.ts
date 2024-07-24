import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';


export default class RegisterDto{
  // constructor(fullname: string, email: string, password: string) {
  //   this.fullname = fullname;
  //   this.email = email;
  //   this.password = password;
  // }
  @Expose()
  @IsNotEmpty({message : "Họ và tên  không được để trống"})
  public fullname: string;
  @Expose()

  @IsNotEmpty({message : "Email không được để trống"})
  @IsEmail({},{message : "Email sai định dạng"})
  public email: string;
  @Expose()

  @IsNotEmpty({message : "Mật khẩu  không được để trống"})
  @MinLength(6 , {message : "Tên không được ít hơn $constraint1 ký tự"})
  @MaxLength(32, {message : "Tên không được vượt quá $constraint1 ký tự"})
  public password: string;
}
