export interface NewsItem {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
}

// Map filter category IDs to news item category names
export const categoryMap: Record<string, string> = {
  "press-releases": "Press Releases",
  "company-milestones": "Company Milestones",
  "corporate-events": "Corporate Events",
  "industry-insights": "Industry Insights",
};

export const newsItems: NewsItem[] = [
  {
    id: "1",
    slug: "gelila-manufacturing-announces-q3-production-milestones",
    category: "Company Milestones",
    date: "Oct 26, 2023",
    title: "Gelila Manufacturing Announces Q3 Production Milestones",
    description:
      "A detailed look into our record-breaking third quarter performance and what it means for the future.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEKw5PLOp17z6w_G8asfm04adRSWpwofGfgQSrNOyw2Q4LF3SbhMs5yBBeYgVZNexmLs1NSQ3ioRHrmK1xFCEeUhl_2I2UeLF564a9vufreQKTIRcjaiN7-6BR0dWTJ2VICtIpobxH4KOTlK88YCaqffHhTtgVnjZW00ySfzlJ5c86iKBvHeLxTH89LUHfo1bPhbxMMUmeiaEiyeaHwEEwVkSa-Z4NFy7zkNcgnWDrotx4z0Bnw5R2tNOMoGtw5zMPR7PZ-ZsUfg9x",
    imageAlt: "Workers in a modern factory setting",
    href: "/news/gelila-manufacturing-announces-q3-production-milestones",
    author: {
      name: "Sarah Johnson",
      avatar: undefined,
    },
    content: `
      <p>We are thrilled to announce that Gelila Manufacturing has achieved record-breaking production milestones in the third quarter of 2023. This achievement represents a significant step forward in our commitment to excellence and innovation in the manufacturing industry.</p>
      
      <h2>Record-Breaking Performance</h2>
      <p>Our Q3 results demonstrate exceptional growth across all key metrics. Production output increased by 35% compared to the same period last year, while maintaining our industry-leading quality standards. This performance is a testament to the dedication of our team and the effectiveness of our recent operational improvements.</p>
      
      <h2>Key Achievements</h2>
      <ul>
        <li>35% increase in production output year-over-year</li>
        <li>Zero quality incidents across all production lines</li>
        <li>98.5% on-time delivery rate</li>
        <li>Implementation of three new automated production lines</li>
        <li>Expansion of our workforce by 150 skilled professionals</li>
      </ul>
      
      <h2>Looking Ahead</h2>
      <p>These milestones position us well for continued growth in Q4 and beyond. We remain committed to investing in technology, our people, and sustainable manufacturing practices. Our focus on innovation and quality will continue to drive our success in the global marketplace.</p>
      
      <p>We extend our gratitude to our employees, partners, and customers who have made this achievement possible. Together, we are building a stronger future for manufacturing excellence.</p>
    `,
  },
  {
    id: "2",
    slug: "new-partnership-to-enhance-sustainable-practices",
    category: "Press Releases",
    date: "Oct 15, 2023",
    title: "New Partnership to Enhance Sustainable Practices",
    description:
      "We're excited to partner with industry leaders to drive sustainability and eco-friendly manufacturing.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZvCrWbxoMzHcjzaCYi-hlsIBy_RCsvhZywESILzhoQJeCxKFVZTx9Ol8VMHP2ol4ezh1-zeqjjQTct2FHpFJSVsnjv3EYWJFdUJ2BaTOyoTVNFxNLbsxRxyicziazwwv8eNnlovJ4wkM1EX2bkL5egXMegZyDZFfpYkOlBRa8hm5ikEKH-fUTsMsD57M30TVoXw8GzUZz_KGNK4YK7Wb8djzFexdKXFpa5ckiEpTrB9IKwCUfAsjqWTXFsHk1HUKc_5w6iKKn9qCY",
    imageAlt: "Close up on green leaves, symbolizing sustainability",
    href: "/news/new-partnership-to-enhance-sustainable-practices",
    author: {
      name: "Michael Chen",
      avatar: undefined,
    },
    content: `
      <p>Gelila Manufacturing is proud to announce a groundbreaking partnership with leading sustainability organizations to enhance our eco-friendly manufacturing practices. This collaboration represents a significant commitment to environmental stewardship and sustainable business operations.</p>
      
      <h2>A Commitment to Sustainability</h2>
      <p>This partnership will enable us to implement cutting-edge sustainable manufacturing technologies and processes. We are committed to reducing our carbon footprint, minimizing waste, and promoting circular economy principles throughout our operations.</p>
      
      <h2>Partnership Benefits</h2>
      <p>The collaboration will focus on several key areas:</p>
      <ul>
        <li>Implementation of renewable energy solutions</li>
        <li>Advanced waste reduction and recycling programs</li>
        <li>Water conservation and treatment initiatives</li>
        <li>Sustainable sourcing of raw materials</li>
        <li>Employee training on environmental best practices</li>
      </ul>
      
      <h2>Our Environmental Goals</h2>
      <p>Through this partnership, we aim to achieve:</p>
      <ul>
        <li>50% reduction in carbon emissions by 2025</li>
        <li>Zero waste to landfill by 2026</li>
        <li>100% renewable energy usage by 2027</li>
        <li>Certification in leading environmental standards</li>
      </ul>
      
      <p>We believe that sustainable manufacturing is not just a responsibility but an opportunity to create value for our stakeholders while protecting our planet for future generations.</p>
    `,
  },
  {
    id: "3",
    slug: "celebrating-25-years-of-industrial-excellence",
    category: "Corporate Events",
    date: "Sep 28, 2023",
    title: "Celebrating 25 Years of Industrial Excellence",
    description:
      "Reflecting on a quarter-century of growth, innovation, and commitment to our clients and community.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4wUayWeOJfZKQWKfcERvmogxp5Aovi-1jumQZa9q--bbmewHeeDpHjFv3sod8w6Hlpk6koBQARmK_HqWxHJRVk7o5bGhuMrfuUjjhTa1BPUAFDNNdPqcVjcfvk2gXkKsybg3QpxPBU1LSsWJGR2hxoE7J6PbjFY1PVGBRCDwy7GNDVLs9uVo_t_vRbZwyG7f7Z-kAkPFjYDS3EbpahQccrUIfMXJ_o3gA72AOWfWyZNfXNiMovJKmRUBaf3cS8D5AzB62v42ErE_L",
    imageAlt: "A corporate event with people networking",
    href: "/news/celebrating-25-years-of-industrial-excellence",
    author: {
      name: "Alemayehu Tekle",
      avatar: undefined,
    },
    content: `
      <p>This year marks a significant milestone for Gelila Manufacturing PLC as we celebrate 25 years of industrial excellence. What began as a small manufacturing operation has grown into a leading force in the industry, serving clients across the globe.</p>
      
      <h2>Our Journey</h2>
      <p>Since our founding in 1998, we have remained committed to our core values of quality, innovation, and customer satisfaction. Over the past quarter-century, we have:</p>
      <ul>
        <li>Expanded from a single facility to multiple state-of-the-art manufacturing plants</li>
        <li>Grown our workforce from 50 to over 2,000 dedicated professionals</li>
        <li>Expanded our product portfolio to serve diverse industries</li>
        <li>Established a global presence with exports to over 40 countries</li>
        <li>Maintained ISO certifications and industry-leading quality standards</li>
      </ul>
      
      <h2>Celebrating Our People</h2>
      <p>Our success would not have been possible without the dedication and hard work of our employees, many of whom have been with us for over a decade. We are proud of the culture we've built—one that values integrity, teamwork, and continuous improvement.</p>
      
      <h2>Looking Forward</h2>
      <p>As we celebrate this milestone, we are also looking ahead to the next 25 years. We are investing in new technologies, expanding our capabilities, and continuing to innovate. Our commitment to excellence remains as strong as ever, and we are excited about the opportunities that lie ahead.</p>
      
      <p>Thank you to all our employees, partners, customers, and the communities we serve. Here's to the next 25 years of growth and success!</p>
    `,
  },
  {
    id: "4",
    slug: "ceo-speaks-at-annual-manufacturing-summit",
    category: "Industry Insights",
    date: "Sep 12, 2023",
    title: "Our CEO Speaks at the Annual Manufacturing Summit",
    description:
      "Insights from our leadership on the future of manufacturing and digital transformation in the industry.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQJRljtcMJ1aoKr-abud1O3ab7p4LXD9jd5Zdd0ukNEd05qOIlvuI8o9ka1h4JLqxdFfl5nmFLrLpvpDUII2Rvx01jcA55iejXeJhGBhnkog4bQ5yZB0iN5dO5nW3u76xb4MF95ZZu7IeYi-7yjQD-r3vmujdGcgEyRUMkd3hBy5HIXlEhXSOvypa9lHP5bZJr7Vu9nnZqA5FsrsHss0WoHZFZkrXNkMW7bbJBl75aAYug3wiHTvny-A0qGZfOsnCkZ2rWAkjJnkUj",
    imageAlt: "CEO speaking at a podium during a summit",
    href: "/news/ceo-speaks-at-annual-manufacturing-summit",
    author: {
      name: "Editorial Team",
      avatar: undefined,
    },
    content: `
      <p>Our CEO, Dr. Mesfin Gebremariam, delivered a keynote address at the Annual Manufacturing Summit, sharing insights on the future of manufacturing and the critical role of digital transformation in our industry.</p>
      
      <h2>Embracing Digital Transformation</h2>
      <p>In his address, Dr. Gebremariam emphasized the importance of embracing digital transformation to remain competitive in today's rapidly evolving manufacturing landscape. He highlighted how technologies such as artificial intelligence, IoT, and advanced analytics are reshaping the industry.</p>
      
      <h2>Key Themes from the Address</h2>
      <ul>
        <li><strong>Smart Manufacturing:</strong> The integration of IoT sensors and AI-driven analytics to optimize production processes</li>
        <li><strong>Sustainability:</strong> How digital technologies enable more sustainable manufacturing practices</li>
        <li><strong>Supply Chain Resilience:</strong> Building robust supply chains through digital visibility and predictive analytics</li>
        <li><strong>Workforce Development:</strong> Preparing the next generation of manufacturing professionals for a digital future</li>
        <li><strong>Innovation Culture:</strong> Fostering a culture of continuous innovation and learning</li>
      </ul>
      
      <h2>Gelila's Digital Journey</h2>
      <p>Dr. Gebremariam shared examples from Gelila Manufacturing's own digital transformation journey, including our recent implementation of predictive maintenance systems and real-time production monitoring. These initiatives have resulted in:</p>
      <ul>
        <li>20% reduction in unplanned downtime</li>
        <li>15% improvement in overall equipment effectiveness</li>
        <li>Enhanced quality control through automated inspection systems</li>
      </ul>
      
      <h2>The Path Forward</h2>
      <p>The address concluded with a call to action for industry leaders to collaborate on standards, share best practices, and invest in the technologies and people that will drive the future of manufacturing. Dr. Gebremariam emphasized that the future belongs to those who are willing to adapt, innovate, and invest in digital capabilities.</p>
      
      <p>The summit brought together over 500 manufacturing leaders from around the world, providing an excellent platform for networking and knowledge sharing.</p>
    `,
  },
  {
    id: "5",
    slug: "groundbreaking-on-new-state-of-the-art-facility",
    category: "Company Milestones",
    date: "Aug 25, 2023",
    title: "Groundbreaking on New State-of-the-Art Facility",
    description:
      "Construction has begun on our next-generation plant, set to increase capacity by 40% in 2025.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8gKmn2FeR70XKe5L_1W_Hqn20goyNai-n1QMrfnlSTOQqnNZbel0UHiXjMKBDXA21YNsD8qJhdIY7rPjXtCUJBQ4ZjYSC5fWQtV6ER9xWaoMXcbJuN0LnAVjB9UE22hFCn-IqL7iinIE1GzImdUY5xQ6yhK0_DCrnXyEgZ7IyR1GOQd_zpvvrkWRwNVFlvpOInggxMp6aPe7LM8Og0cFtFCEwfn8gDE0hZcYi08wJw8ZsCuOzsemC0C677ux7-mq6SyqU6SThp86Y",
    imageAlt: "Construction site of a new industrial facility",
    href: "/news/groundbreaking-on-new-state-of-the-art-facility",
    author: {
      name: "David Williams",
      avatar: undefined,
    },
    content: `
      <p>Gelila Manufacturing PLC has officially broken ground on a new state-of-the-art manufacturing facility that will significantly expand our production capacity and capabilities. The new facility represents a $50 million investment in our future growth.</p>
      
      <h2>Facility Overview</h2>
      <p>The new facility, located on a 50-acre site, will feature:</p>
      <ul>
        <li>200,000 square feet of manufacturing space</li>
        <li>Advanced automation and robotics systems</li>
        <li>LEED-certified sustainable building design</li>
        <li>Dedicated research and development laboratories</li>
        <li>Employee training and development centers</li>
        <li>State-of-the-art quality control facilities</li>
      </ul>
      
      <h2>Capacity Expansion</h2>
      <p>Upon completion in 2025, the new facility will increase our overall production capacity by 40%, enabling us to serve more customers and enter new markets. The facility is designed to be highly flexible, allowing us to adapt to changing market demands and product requirements.</p>
      
      <h2>Job Creation</h2>
      <p>The new facility will create approximately 500 new jobs, including positions in manufacturing, engineering, quality control, logistics, and administration. We are committed to hiring locally and providing comprehensive training programs for all new employees.</p>
      
      <h2>Sustainability Features</h2>
      <p>The facility has been designed with sustainability at its core, featuring:</p>
      <ul>
        <li>Solar panel arrays to generate renewable energy</li>
        <li>Rainwater harvesting and water recycling systems</li>
        <li>Energy-efficient lighting and HVAC systems</li>
        <li>Waste reduction and recycling programs</li>
        <li>Green spaces and sustainable landscaping</li>
      </ul>
      
      <h2>Timeline</h2>
      <p>Construction is expected to be completed in late 2024, with production beginning in early 2025. We are working with leading construction and engineering firms to ensure the highest quality standards throughout the project.</p>
      
      <p>This investment demonstrates our long-term commitment to growth, innovation, and serving our customers with excellence.</p>
    `,
  },
  {
    id: "6",
    slug: "gelila-plc-receives-industry-award-for-innovation",
    category: "Press Releases",
    date: "Aug 03, 2023",
    title: "Gelila PLC Receives Industry Award for Innovation",
    description:
      "We are honored to be recognized for our pioneering work in automation and quality control systems.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-NNs1acupZZgtbi3PVljsmmpnn2oi_PsUkwY9TfPlTZT3SaYOQnhZAsPCTyuFLpwks3d3UvCqMjZ2Rp-Pw4I9oVku2BnWorcZkwYxDJikj4xkBwXZnUSPDlwXxi3LT7k62ONT4Vx_W7n87qf-84fxFdlOjRYT8sx3Z3ogr3GjuQiDCj5HmfNA_rs3XImG4qUvBVj4n-0Y2adYPhCVh_8CYG_mGV1pnudsQvs85BeQf-UH-5ZhjCme1pI0ANYzR4qTFoBjTGMXtAyz",
    imageAlt: "A person holding a trophy award",
    href: "/news/gelila-plc-receives-industry-award-for-innovation",
    author: {
      name: "Lisa Anderson",
      avatar: undefined,
    },
    content: `
      <p>Gelila Manufacturing PLC is honored to announce that we have received the prestigious Industry Innovation Award for our groundbreaking work in automation and quality control systems. This recognition highlights our commitment to technological excellence and continuous improvement.</p>
      
      <h2>Recognition for Innovation</h2>
      <p>The award recognizes our development and implementation of an advanced automated quality control system that has revolutionized our manufacturing processes. This system combines artificial intelligence, machine learning, and advanced sensor technologies to ensure the highest quality standards.</p>
      
      <h2>Innovation Highlights</h2>
      <p>Our award-winning system features:</p>
      <ul>
        <li>Real-time quality monitoring across all production lines</li>
        <li>AI-powered defect detection with 99.9% accuracy</li>
        <li>Predictive analytics to prevent quality issues before they occur</li>
        <li>Automated data collection and analysis</li>
        <li>Integration with our ERP systems for seamless operations</li>
      </ul>
      
      <h2>Impact on Operations</h2>
      <p>Since implementing this system, we have achieved:</p>
      <ul>
        <li>95% reduction in quality-related defects</li>
        <li>60% faster quality inspection processes</li>
        <li>Significant cost savings through early defect detection</li>
        <li>Enhanced customer satisfaction with consistently high-quality products</li>
      </ul>
      
      <h2>Industry Recognition</h2>
      <p>The award was presented at the annual Manufacturing Excellence Conference, where industry leaders recognized our innovative approach to quality control. This award is particularly meaningful as it comes from our peers in the manufacturing industry.</p>
      
      <h2>Looking Forward</h2>
      <p>This recognition motivates us to continue pushing the boundaries of innovation. We are already working on the next generation of our quality control systems, incorporating even more advanced technologies to further improve our operations.</p>
      
      <p>We extend our gratitude to our engineering team, whose dedication and expertise made this innovation possible. This award belongs to all our employees who contribute to our culture of excellence and innovation every day.</p>
    `,
  },
];

/**
 * Get a news item by its slug
 */
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}

/**
 * Get all news items
 */
export function getAllNews(): NewsItem[] {
  return newsItems;
}

/**
 * Get related news items (same category, excluding the current item)
 */
export function getRelatedNews(
  currentSlug: string,
  limit: number = 3
): NewsItem[] {
  const currentItem = getNewsBySlug(currentSlug);
  if (!currentItem) return [];

  return newsItems
    .filter(
      (item) =>
        item.slug !== currentSlug && item.category === currentItem.category
    )
    .slice(0, limit);
}
