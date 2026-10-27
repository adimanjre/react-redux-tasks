const seeds = [
  "forest",
  "CAR",
  "chair",
  "bride",
  "friend",
  "job",
  "boss",
  "nurse",
  "doctor",
  "sport",
  "swim",
];

export default function LazyLoading() {
  return (
    <div className="flex flex-col gap-8">
      {seeds.map((seed) => (
        <img
          key={seed}
          src={`https://picsum.photos/seed/${seed}/1920/1080`}
          alt={seed}
          width={1920}
          height={1080}
          className="w-full h-[80vh] object-cover bg-gray-200"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}
