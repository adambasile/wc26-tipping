import { redirect } from "next/navigation";
import { extendToLeaf, specTree } from "@/lib/specTree";

export default function Home() {
  const leafPath = extendToLeaf(specTree);
  redirect(`/${leafPath.map((node) => node.slug).join("/")}`);
}
