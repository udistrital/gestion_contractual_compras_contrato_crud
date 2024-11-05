import { ResponseMetadata } from './response-metadata.interface';

export interface StandardResponse<T> {
  Success: boolean;
  Status: number;
  Message: string;
  Data: T | null;
  Metadata?: ResponseMetadata;
}
