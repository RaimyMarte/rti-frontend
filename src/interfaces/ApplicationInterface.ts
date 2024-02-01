export interface ApplicationInterface {
    Id: string;
    Seq: number;
    Code: string;
    FirstName: string;
    MiddleName: string | null;
    LastName: string;
    NickName: string | null;
    FullName: string;
    Gender: string | null;
    AddressLine1: string;
    AddressLine2: string | null;
    CountryId: string | null;
    StateId: string | null;
    CityId: string | null;
    NationalityId: string | null;
    PostalCode: string | null;
    DateOfBirth: Date;
    Age: number;
    PreferredLanguageId: string;
    EmailAddress: string | null;
    PhoneNumber: string;
    AttendingAnySchools: boolean;
    AttendingAnySchoolsId: string | null;
    AttendingAnySchoolsExplain: string | null;
    USAVeteran: boolean;
    NYCHAResident: boolean;
    HowDidYouHearAboutUsId: string | null;
    HearABoutUsOther: string | null;
    AdditionalComments: string | null;
    ApplicationDate: Date;
    Way: string | null;
    StatusId: string;
    OrientationTalk: boolean;
    OrientationTalkDate: Date | null;
    CreatedBy: string | null;
    CreatedDate: Date;
    LastUpdatedBy: string | null;
    LastUpdatedDate: Date | null;
    Verified: boolean;
    PDF: string | null;
    VerifiedDate: Date | null;
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
    ApplicationStatus: {
        Name: string
    } | null,
    ApplicationPreviousEducation: {
        Id: number;
        PreviousEducationId: number;
    }[];
}