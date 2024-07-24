import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAll(): Array<Number> {
    return [1, 2, 3, 4, 5, 6, 7, 7];
  }
}
