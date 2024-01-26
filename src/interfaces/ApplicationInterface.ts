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
    PreferredLanguageId: string;
    EmailAddress: string | null;
    PhoneNumber: string;
    AttendingAnySchools: boolean;
    AttendingAnySchoolsExplain: string | null;
    USAVeteran: boolean;
    NYCHAResident: boolean;
    HowDidYouHearAboutUsId: string | null;
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
    Verified: boolean;
    VerifiedDate: Date | null;
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
    ApplicationAcademyProgram: {
        Id: number;
        AcademyProgramId: string;
    }[];
    ApplicationPreviousEducation: {
        Id: number;
        PreviousEducationId: number;
    }[];
}