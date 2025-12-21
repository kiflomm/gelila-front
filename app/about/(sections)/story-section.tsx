import Image from "next/image";
import storyData from "@/data/about-story.json";

export default function StorySection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/50 dark:via-black/20 to-transparent -z-10"></div>
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-1 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 w-fit">
            <div className="size-1.5 rounded-full bg-primary"></div>
            <span>{storyData.badge}</span>
          </div>
          <h2 className="text-[#181411] dark:text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
            {storyData.title}
          </h2>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl border border-primary/10 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-primary/10 p-1">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={storyData.image.src}
              alt={storyData.image.alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-7">
          {storyData.paragraphs.map((paragraph, index) => {
            const className =
              paragraph.type === "highlight"
                ? "text-lg md:text-xl font-medium text-[#495057] dark:text-white/80 leading-relaxed max-w-5xl"
                : paragraph.type === "quote"
                ? "text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed pl-4 border-l-2 border-primary/20 dark:border-primary/30 max-w-5xl"
                : paragraph.type === "emphasis"
                ? "text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed font-medium max-w-5xl"
                : "text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed max-w-5xl";
            return (
              <p key={index} className={className}>
                {paragraph.content}
              </p>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {storyData.stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-6 rounded-2xl bg-white dark:bg-black/20 border border-primary/10 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <p className="text-3xl lg:text-4xl font-black text-[#181411] dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-[#495057] dark:text-white/70 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
