import * as k8s from '@kubernetes/client-node';

export class KubeClient {
  private kc = new k8s.KubeConfig();
  private k8sApi: k8s.CoreV1Api;

  constructor() {
    this.kc.loadFromDefault(); // Loads current context in kubeconfig file
    this.k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
  }

  async getNamespaces(): Promise<k8s.V1NamespaceList> {
    const namespaces = await this.k8sApi.listNamespace();
    return namespaces.body;
  }
}
