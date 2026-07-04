import { notFound, redirect } from "next/navigation";
import {
  allNodeSlugPaths,
  extendToLeaf,
  findPath,
  specTree,
  type SpecNode,
} from "@/lib/specTree";
import SpecDropdowns, { type SpecDropdownLevel } from "./SpecDropdowns";

export function generateStaticParams() {
  return allNodeSlugPaths().map((spec) => ({ spec }));
}

function buildLevels(
  path: SpecNode[],
  siblingsAtRoot: SpecNode[],
): SpecDropdownLevel[] {
  return path.map((node, index) => {
    const siblings = index === 0 ? siblingsAtRoot : path[index - 1].children;
    const prefix = path.slice(0, index).map((n) => n.slug);

    return {
      selectedSlug: node.slug,
      options: siblings.map((sibling) => ({
        slug: sibling.slug,
        label: sibling.label,
        targetPath: [
          ...prefix,
          sibling.slug,
          ...extendToLeaf(sibling.children).map((n) => n.slug),
        ],
      })),
    };
  });
}

export default async function SpecPage({
  params,
}: {
  params: Promise<{ spec: string[] }>;
}) {
  const { spec } = await params;
  const path = findPath(spec);

  if (!path) {
    notFound();
  }

  const leaf = path.at(-1);

  if (!leaf?.resultSet) {
    const continuation = extendToLeaf(leaf?.children ?? specTree);
    redirect(
      `/${[...spec, ...continuation.map((node) => node.slug)].join("/")}`,
    );
  }

  const levels = buildLevels(path, specTree);

  return (
    <>
      <SpecDropdowns levels={levels} />
      <p>{path.map((node) => node.label).join(" / ")}</p>
    </>
  );
}
