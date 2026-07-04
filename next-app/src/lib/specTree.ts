import { results } from "@/data/results";
import type { ResultSet } from "@/data/results.types";
import { slugify } from "./slug";

export type SpecNode = {
  slug: string;
  label: string;
  children: SpecNode[];
  resultSet?: ResultSet;
};

function buildTree(resultSets: ResultSet[]): SpecNode[] {
  const root: SpecNode[] = [];

  for (const resultSet of resultSets) {
    let siblings = root;
    let node: SpecNode | undefined;

    for (const label of resultSet.spec) {
      const slug = slugify(label);
      node = siblings.find((n) => n.slug === slug);
      if (!node) {
        node = { slug, label, children: [] };
        siblings.push(node);
      }
      siblings = node.children;
    }

    if (node) {
      node.resultSet = resultSet;
    }
  }

  return root;
}

export const specTree = buildTree(results);

export function findPath(slugs: string[]): SpecNode[] | undefined {
  const path: SpecNode[] = [];
  let siblings = specTree;

  for (const slug of slugs) {
    const node = siblings.find((n) => n.slug === slug);
    if (!node) return undefined;
    path.push(node);
    siblings = node.children;
  }

  return path;
}

export function extendToLeaf(siblings: SpecNode[]): SpecNode[] {
  const path: SpecNode[] = [];
  let level = siblings;

  while (level.length > 0) {
    const node = level[0];
    path.push(node);
    level = node.children;
  }

  return path;
}

export function allNodeSlugPaths(): string[][] {
  const paths: string[][] = [];

  function walk(nodes: SpecNode[], prefix: string[]) {
    for (const node of nodes) {
      const path = [...prefix, node.slug];
      paths.push(path);
      walk(node.children, path);
    }
  }

  walk(specTree, []);
  return paths;
}
