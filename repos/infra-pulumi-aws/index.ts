import * as pulumi from "@pulumi/pulumi";

// Entry point placeholder.
// In a real setup, select a stack module by config or use Pulumi stack directories.

const project = pulumi.getProject();
const stack = pulumi.getStack();

export const info = {
  project,
  stack,
  message: "Pulumi scaffold: add ECS/EKS/Lambda components under components/"
};
