import { Podman } from './podman';

// this is a decorator
export class SudoPodman extends Podman {
  protected async execute(command: string): Promise<{ stdout: string; stderr: string }> {
    return super.execute(`sudo ${command}`);
  }
}

// async function main() {
//     const podman = new Podman();
//     await podman.pullImage('nginx:latest');
//     const sudoPodman = new SudoPodman();
//     await sudoPodman.pullImage('nginx:latest');
// }
