import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { FileType } from 'app/shared/model/enumerations/file-type.model';

export interface IFiles {
  id?: number;
  uuid?: string | null;
  filename?: string | null;
  fileType?: FileType | null;
  fileSize?: number | null;
  createDate?: string | null;
  filePath?: string | null;
  version?: string | null;
  mime?: string | null;
  parent?: IFiles | null;
  createdBy?: IUser | null;
  children?: IFiles[] | null;
}

export const defaultValue: Readonly<IFiles> = {};
