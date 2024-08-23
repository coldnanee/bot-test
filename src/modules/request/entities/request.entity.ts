import { API_REQUEST_TIME } from '../request.constants';
import { IRequest } from '../request.interface';

export class RequestEntity {
  constructor(
    private readonly req: IRequest,
    private readonly finish: (result: string) => void,
  ) {
    this.imit();
  }

  public async imit() {
    await new Promise((res) => {
      setTimeout(() => {
        res('OK');
      }, API_REQUEST_TIME);
    })
      .then((res: string) => this.format(res))
      .then((res) => this.finish(res));
  }

  private format(res: string) {
    return `
Request ${this.req.requestId} has been completed:

Result: ${res}
    `;
  }
}
