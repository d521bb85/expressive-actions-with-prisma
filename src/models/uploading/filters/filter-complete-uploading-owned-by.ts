import { Prisma, User } from '@prisma/client';
import { UploadingStatus } from '../constants';

export interface CompleteUploadingOwnedBy {
  owner: User;
}

export function filterCompleteUploadingOwnedBy({
  owner
}: CompleteUploadingOwnedBy): Prisma.UploadingWhereInput {
  return {
    owner: { id: owner.id },
    status: UploadingStatus.Complete
  };
}
