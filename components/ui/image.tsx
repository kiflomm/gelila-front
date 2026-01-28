import NextImage, { type ImageProps } from "next/image";

function appendCacheBust(url: string, timestamp: number): string {
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
