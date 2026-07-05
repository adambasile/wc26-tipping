"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { extendToLeaf, findPath, specTree } from "@/lib/specTree";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);

    for (let length = segments.length - 1; length >= 0; length--) {
      const prefix = segments.slice(0, length);
      const path = findPath(prefix);
      if (!path) continue;

      const continuation = extendToLeaf(path.at(-1)?.children ?? specTree);
      const target = [...prefix, ...continuation.map((node) => node.slug)];
      router.replace(`/${target.join("/")}`);
      return;
    }
  }, [pathname, router]);

  return null;
}
