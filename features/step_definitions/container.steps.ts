import { CustomWorld } from '../support/world/custom-world';
import { Given, Then, When } from '@cucumber/cucumber';
import { SSHClient } from '../../lib/ssh-client';
import assert from 'assert';
import { KubeClient } from '../../lib/kube-client';
import { Podman } from '../../lib/podman';
import axios from 'axios';
import { V1Namespace, V1NamespaceList } from '@kubernetes/client-node';

const sshClient = new SSHClient();
let output: string;

Then('I should generate a step code', async function (this: CustomWorld) {
  // const { page }: CustomWorld = this;

  // Write code here that turns the phrase above into concrete actions

  return 'pending';
});

Given('I am not implemented', async function (this: CustomWorld) {
  // const { page }: CustomWorld = this;

  // Write code here that turns the phrase above into concrete actions

  return 'pending';
});

Given('I am connected to the server', async function () {
  await sshClient.connect({
    host: 'your-server-ip',
    username: 'your-username',
    privateKey: 'path/to/private/key',
  });
});

When('I fetch all namespaces and their statuses', async function () {
  output = await sshClient.executeCommand('kubectl get namespaces --output=json');
});

Then('I should receive the list of namespaces', function () {
  const namespaces = JSON.parse(output);
  assert(namespaces.items.length > 0);
  console.log(namespaces.items);
});

When('I fetch the secrets', async function () {
  output = await sshClient.executeCommand('kubectl get secrets --output=json');
});

Then('I should receive the secrets list', function () {
  const secrets = JSON.parse(output);
  assert(secrets.items.length > 0);
  console.log(secrets.items);
});

const kubeClient: KubeClient = new KubeClient();
let namespaces: V1NamespaceList;

When('I retrieve all namespaces', async function () {
  namespaces = await kubeClient.getNamespaces();
});

Then('I should get the list of all namespaces', function () {
  assert(namespaces.items.length > 0, 'No namespaces found!');
  console.log(
    'Namespaces:',
    namespaces.items.map((ns: V1Namespace) => ns.metadata?.name),
  );
});

const podman = new Podman();
let containerId: string;

Given('a container {string} is pulled', async function (imageName: string) {
  await podman.pullImage(imageName);
});

When('the container is started and exposes port 5000', async function () {
  containerId = await podman.startContainer('myimage:latest', '5000:5000');
});

Then(
  'I should be able to GET {string} at {string} and receive a 200 status',
  async function (path: string, url: string) {
    const response = await axios.get(`${url}${path}`);
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
  },
);

Then('the container is shut down', async function () {
  await podman.stopAndRemoveContainer(containerId);
});
