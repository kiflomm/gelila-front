// Coordinates for Gelila Manufacturing PLC
const latitude = 8.9602027;
const longitude = 38.8525587;

// Google Maps embed URL (satellite view)
const mapEmbedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed&t=k`;

export default function LocationMapSection() {
  return (
    <section className="w-full">
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden border border-primary/10 dark:border-primary/20">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Gelila Manufacturing PLC Location"
          className="w-full h-full"
        ></iframe>
      </div>
    </section>
  );
}

