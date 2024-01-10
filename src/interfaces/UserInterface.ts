import { ApiResponseInterface } from ".";

export interface UserInterface {
  Authorized: boolean;
  ChangePwdNextLogin: boolean;
  CreatedBy: string | null;
  CreatedDate: Date;
  Deleted: boolean;
  DeletedDate: Date | null;
  DisplayName: string;
  Email: string;
  EmailConfirmed: boolean;
  EmailConfirmedDate: Date | null;
  Id: string;
  LastAccessDate: Date | null;
  LastIpAccess: string | null;
  LastModifiedBy: string | null;
  LastModifiedDate: Date | null;
  LastPwdChangedDate: Date | null;
  Locked: boolean;
  LockedDate: Date | null;
  Phone: string | null;
  PhoneConfirmed: boolean;
  PhoneConfirmedDate: Date | null;
  Picture: string | null;
  Seq: number;
  UserName: string;
  UserRole: {
    Name: string
  } | null
  UserProfile: {
    FirstName: string
    LastName: string
    NickName: string
    Gender: string
  } | null
  UserRoleId: string | null;
}

export interface UserApiResponseInterface extends ApiResponseInterface {
  data: {
    user: UserInterface | null;
    token?: string | null;
  };
}
