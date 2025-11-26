"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
}

interface NewsGridSectionProps {
  activeCategory: string;
}

// Map filter category IDs to news item category names
const categoryMap: Record<string, string> = {
  "press-releases": "Press Releases",
  "company-milestones": "Company Milestones",
  "corporate-events": "Corporate Events",
  "industry-insights": "Industry Insights",
};

const newsItems: NewsItem[] = [
  {
    id: "1",
    category: "Company Milestones",
    date: "Oct 26, 2023",
    title: "Gelila Manufacturing Announces Q3 Production Milestones",
    description:
      "A detailed look into our record-breaking third quarter performance and what it means for the future.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEKw5PLOp17z6w_G8asfm04adRSWpwofGfgQSrNOyw2Q4LF3SbhMs5yBBeYgVZNexmLs1NSQ3ioRHrmK1xFCEeUhl_2I2UeLF564a9vufreQKTIRcjaiN7-6BR0dWTJ2VICtIpobxH4KOTlK88YCaqffHhTtgVnjZW00ySfzlJ5c86iKBvHeLxTH89LUHfo1bPhbxMMUmeiaEiyeaHwEEwVkSa-Z4NFy7zkNcgnWDrotx4z0Bnw5R2tNOMoGtw5zMPR7PZ-ZsUfg9x",
    imageAlt: "Workers in a modern factory setting",
    href: "#",
  },
  {
    id: "2",
    category: "Press Releases",
    date: "Oct 15, 2023",
    title: "New Partnership to Enhance Sustainable Practices",
    description:
      "We're excited to partner with industry leaders to drive sustainability and eco-friendly manufacturing.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZvCrWbxoMzHcjzaCYi-hlsIBy_RCsvhZywESILzhoQJeCxKFVZTx9Ol8VMHP2ol4ezh1-zeqjjQTct2FHpFJSVsnjv3EYWJFdUJ2BaTOyoTVNFxNLbsxRxyicziazwwv8eNnlovJ4wkM1EX2bkL5egXMegZyDZFfpYkOlBRa8hm5ikEKH-fUTsMsD57M30TVoXw8GzUZz_KGNK4YK7Wb8djzFexdKXFpa5ckiEpTrB9IKwCUfAsjqWTXFsHk1HUKc_5w6iKKn9qCY",
    imageAlt: "Close up on green leaves, symbolizing sustainability",
    href: "#",
  },
  {
    id: "3",
    category: "Corporate Events",
    date: "Sep 28, 2023",
    title: "Celebrating 25 Years of Industrial Excellence",
    description:
      "Reflecting on a quarter-century of growth, innovation, and commitment to our clients and community.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4wUayWeOJfZKQWKfcERvmogxp5Aovi-1jumQZa9q--bbmewHeeDpHjFv3sod8w6Hlpk6koBQARmK_HqWxHJRVk7o5bGhuMrfuUjjhTa1BPUAFDNNdPqcVjcfvk2gXkKsybg3QpxPBU1LSsWJGR2hxoE7J6PbjFY1PVGBRCDwy7GNDVLs9uVo_t_vRbZwyG7f7Z-kAkPFjYDS3EbpahQccrUIfMXJ_o3gA72AOWfWyZNfXNiMovJKmRUBaf3cS8D5AzB62v42ErE_L",
    imageAlt: "A corporate event with people networking",
    href: "#",
  },
  {
    id: "4",
    category: "Industry Insights",
    date: "Sep 12, 2023",
    title: "Our CEO Speaks at the Annual Manufacturing Summit",
    description:
      "Insights from our leadership on the future of manufacturing and digital transformation in the industry.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQJRljtcMJ1aoKr-abud1O3ab7p4LXD9jd5Zdd0ukNEd05qOIlvuI8o9ka1h4JLqxdFfl5nmFLrLpvpDUII2Rvx01jcA55iejXeJhGBhnkog4bQ5yZB0iN5dO5nW3u76xb4MF95ZZu7IeYi-7yjQD-r3vmujdGcgEyRUMkd3hBy5HIXlEhXSOvypa9lHP5bZJr7Vu9nnZqA5FsrsHss0WoHZFZkrXNkMW7bbJBl75aAYug3wiHTvny-A0qGZfOsnCkZ2rWAkjJnkUj",
    imageAlt: "CEO speaking at a podium during a summit",
    href: "#",
  },
  {
    id: "5",
    category: "Company Milestones",
    date: "Aug 25, 2023",
    title: "Groundbreaking on New State-of-the-Art Facility",
    description:
      "Construction has begun on our next-generation plant, set to increase capacity by 40% in 2025.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8gKmn2FeR70XKe5L_1W_Hqn20goyNai-n1QMrfnlSTOQqnNZbel0UHiXjMKBDXA21YNsD8qJhdIY7rPjXtCUJBQ4ZjYSC5fWQtV6ER9xWaoMXcbJuN0LnAVjB9UE22hFCn-IqL7iinIE1GzImdUY5xQ6yhK0_DCrnXyEgZ7IyR1GOQd_zpvvrkWRwNVFlvpOInggxMp6aPe7LM8Og0cFtFCEwfn8gDE0hZcYi08wJw8ZsCuOzsemC0C677ux7-mq6SyqU6SThp86Y",
    imageAlt: "Construction site of a new industrial facility",
    href: "#",
  },
  {
    id: "6",
    category: "Press Releases",
    date: "Aug 03, 2023",
    title: "Gelila PLC Receives Industry Award for Innovation",
    description:
      "We are honored to be recognized for our pioneering work in automation and quality control systems.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-NNs1acupZZgtbi3PVljsmmpnn2oi_PsUkwY9TfPlTZT3SaYOQnhZAsPCTyuFLpwks3d3UvCqMjZ2Rp-Pw4I9oVku2BnWorcZkwYxDJikj4xkBwXZnUSPDlwXxi3LT7k62ONT4Vx_W7n87qf-84fxFdlOjRYT8sx3Z3ogr3GjuQiDCj5HmfNA_rs3XImG4qUvBVj4n-0Y2adYPhCVh_8CYG_mGV1pnudsQvs85BeQf-UH-5ZhjCme1pI0ANYzR4qTFoBjTGMXtAyz",
    imageAlt: "A person holding a trophy award",
    href: "#",
  },
];

export default function NewsGridSection({
  activeCategory,
}: NewsGridSectionProps) {
  // Filter news items based on active category
  const filteredItems =
    activeCategory === "all"
      ? newsItems
      : newsItems.filter(
          (item) => item.category === categoryMap[activeCategory]
        );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredItems.map((item) => (
        <article
          key={item.id}
          className="flex flex-col gap-4 group cursor-pointer"
        >
          <div className="w-full aspect-video rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 relative">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-primary font-semibold">
                {item.category}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">
                {item.date}
              </span>
            </div>
            <h3 className="text-zinc-900 dark:text-zinc-100 text-xl font-bold leading-normal group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-normal leading-normal">
              {item.description}
            </p>
            <Link
              href={item.href}
              className="text-primary text-sm font-bold mt-2 inline-flex items-center gap-1 group/link"
            >
              Read More
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
