export interface ApplicationInterface {
    Id: string;
    Seq: number;
    Code: string;
    FirstName: string;
    MiddleName: string | null;
    LastName: string;
    NickName: string | null;
    FullName: string;
    AddressLine1: string;
    AddressLine2: string | null;
    CountryId: number | null;
    StateId: number | null;
    CityId: number | null;
    PostalCode: string | null;
    DateOfBirth: Date;
    Age: number;
    PreferredLanguageId: number;
    EmailAddress: string | null;
    PhoneNumber: string;
    AttendingAnySchools: boolean;
    AttendingAnySchoolsExplain: string | null;
    USAVeteran: boolean;
    NYCHAResident: boolean;
    HowDidYourHearAboutUsId: number | null;
    HearABoutUsOther: string | null;
    AdditionalComments: string | null;
    ApplicationDate: Date;
    Way: string | null;
    StatusId: number;
    OrientationTalk: boolean;
    OrientationTalkDate: Date | null;
    CreatedBy: string | null;
    CreatedDate: Date;
    LastUpdatedBy: string | null;
    LastUpdatedDate: Date | null;
    ApplicationStatus: {
        Name: string
    } | null,
    ApplicationPreferredLanguage: {
        Name: string
    } | null,
    ApplicationCreatedBy: {
        DisplayName: string
    } | null,
    ApplicationLastUpdatedBy: {
        DisplayName: string
    } | null,
}