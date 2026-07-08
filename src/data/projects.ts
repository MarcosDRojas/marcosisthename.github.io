export interface Project {
  name: string
  description: string
}

export const projects: Project[] = [
  {
    name: 'blockchain-ledger',
    description:
      'Built a blockchain-inspired ledger system to track peer-to-peer money transfers, focusing on immutability, hashing, and transaction validation.',
  },
  {
    name: 'lineage-ui',
    description:
      'Developed a Blazor-based internal tool to manage service account permissions across lower and production environments, improving access visibility and security auditing.',
  },
]
