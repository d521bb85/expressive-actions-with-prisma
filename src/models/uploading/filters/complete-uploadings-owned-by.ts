import { Prisma, User } from '@prisma/client';
import { UploadingStatus } from '../constants';

export interface CompleteUploadingsOwnedBy {
  owner: User;
}

export function completeUploadingsOwnedBy({
  owner
}: CompleteUploadingsOwnedBy): Prisma.UploadingWhereInput {
  return {
    owner: { id: owner.id },
    status: UploadingStatus.Complete
  };
}
