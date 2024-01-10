export interface MaintenanceInterface {
    Id: number;
    Code: string | null;
    Name: string;
    Description: string | null;
    Enabled: boolean;
    OrderBy: number | null;
    CreatedBy: string | null;
    CreatedDate: Date;
    ModifiedBy: string | null;
    ModifiedDate: Date | null;
  }