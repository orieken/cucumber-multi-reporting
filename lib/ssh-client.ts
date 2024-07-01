import { NodeSSH } from 'node-ssh';

export class SSHClient {
  private ssh = new NodeSSH();

  async connect(config: { host: string; username: string; privateKey: string }) {
    await this.ssh.connect(config);
  }

  async executeCommand(command: string): Promise<string> {
    const result = await this.ssh.execCommand(command);
    if (result.stderr) {
      throw new Error(`Error executing command: ${result.stderr}`);
    }
    return result.stdout;
  }

  async disconnect() {
    this.ssh.dispose();
  }
}
