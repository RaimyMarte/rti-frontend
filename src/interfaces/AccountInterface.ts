export interface AccountInterface {
    Id: string;
    No: null | string;
    ExcelNo: null | string;
    TypeId: number;
    Enabled: boolean;
    CreatedBy: string | null;
    CreatedDate: string;
    ModifiedBy: null | string;
    ModifiedDate: null | string;
    AccountType: {
        Name: string;
    } | null;
    Physician: {
        Id: string;
        AccountId: string;
        FirstName: string;
        MiddleName: null | string;
        LastName: string;
        FullName: string;
        NickName: null | string;
        DOB: string | null;
        Age: number | null;
        SSN: string | null;
        AddressLine1: string | null;
        AddressLine2: null | string;
        CountryId: number | null;
        StateId: number | null;
        CityId: number | null;
        CityCustom: null | string;
        Picture: null | string;
        PrimaryEmail: null | string;
        PrimaryPhone: null | string;
    };
    Facility: {
        Id: number;
        AccountId: string;
        Name: string | null;
        AddressLine1: string | null;
        AddressLine2: string | null;
        Phone: string | null;
    } | null;
    AccountCreatedBy: {
        DisplayName: string;
    } | null;
    AccountModifiedBy: null | string;
}