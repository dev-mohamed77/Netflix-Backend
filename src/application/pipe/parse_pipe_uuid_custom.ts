import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class ParseUUIDPipeCustom implements PipeTransform<string> {
  transform(value: string) {
    console.log(value);
    if (!validate(value)) {
      throw new BadRequestException('Invalid UUID');
    }
    return value;
  }
}
