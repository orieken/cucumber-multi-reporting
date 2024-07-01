import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export class Podman {
  async pullImage(imageName: string): Promise<void> {
    await this.execute(`podman pull ${imageName}`);
  }

  async startContainer(imageName: string, publish: string): Promise<string> {
    const { stdout } = await this.execute(`podman run -d -p ${publish} ${imageName}`);
    return stdout.trim();
  }

  async stopAndRemoveContainer(containerId: string): Promise<void> {
    await this.execute(`podman stop ${containerId}`);
    await this.execute(`podman rm ${containerId}`);
  }

  protected async execute(command: string): Promise<{ stdout: string; stderr: string }> {
    return execPromise(command);
  }
}
