import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ArticleStatus } from "../article-status.enum";

export class ArticleStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ArticleStatus.DELETED,
    ArticleStatus.DRAFT,
    ArticleStatus.PUBLISHED
  ];

  transform(value: any) {
    const statusToUppercase = value.toUpperCase();
    if (!this.isStatusValid(statusToUppercase)) {
      throw new BadRequestException(`${statusToUppercase} is an invalid status`);
    }
    return statusToUppercase;
  }

  private isStatusValid(status: ArticleStatus): boolean {
    const statusIndex = this.allowedStatuses.indexOf(status);
    return statusIndex !== -1;
  }
}