import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  private isStatusValue(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValue(value)) {
      throw new BadRequestException(`the status "${value}" is invalid`);
    }

    return value;
  }
}
