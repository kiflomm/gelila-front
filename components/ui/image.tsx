import NextImage, { type ImageProps } from "next/image";

function shouldSkipCacheBust(url: string): boolean {
  return url.startsWith("data:") || url.startsWith("blob:");
}

function appendCacheBust(url: string, timestamp: number): string {
  if (shouldSkipCacheBust(url)) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}t=${timestamp}`;
}

export type { ImageProps };

export default function Image(props: ImageProps) {
  const { src, ...rest } = props;
  const timestamp = Date.now();

  const bustedSrc =
    typeof src === "string"
      ? appendCacheBust(src, timestamp)
      : src && typeof src === "object" && "src" in src
        ? { ...src, src: appendCacheBust(String(src.src), timestamp) }
        : src;

  return <NextImage src={bustedSrc} {...rest} />;
}
