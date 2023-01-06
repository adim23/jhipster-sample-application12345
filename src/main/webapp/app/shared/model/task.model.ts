import dayjs from 'dayjs';
import { IJob } from 'app/shared/model/job.model';

export interface ITask {
  id?: number;
  title?: string;
  description?: string | null;
  startDate?: string;
  endDate?: string | null;
  percentCompleted?: number | null;
  dependsOn?: ITask | null;
  dependents?: ITask[] | null;
  jobs?: IJob[] | null;
}

export const defaultValue: Readonly<ITask> = {};
