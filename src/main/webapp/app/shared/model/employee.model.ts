import dayjs from 'dayjs';
import { IJob } from 'app/shared/model/job.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string | null;
  hireDateTime?: string | null;
  zonedHireDateTime?: string | null;
  hireDate?: string | null;
  salary?: number | null;
  commissionPct?: number | null;
  duration?: string | null;
  pictContentType?: string | null;
  pict?: string | null;
  comments?: string | null;
  cvContentType?: string | null;
  cv?: string | null;
  active?: boolean | null;
  jobs?: IJob[] | null;
  manager?: IEmployee | null;
  department?: IDepartment | null;
  employees?: IEmployee[] | null;
}

export const defaultValue: Readonly<IEmployee> = {
  active: false,
};
