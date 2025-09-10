import { EditorialVideo, HeroVideo, InlineVideo, BackgroundVideo } from './EditorialVideo';

// Ejemplo 1: Reemplazar imagen hero en HomePage
export function VideoHomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Video - reemplaza cualquier imagen hero */}
      <HeroVideo 
        src="/videos/hero-video.mp4"
        poster="/images/hero-poster.jpg"
        className="mb-16"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-sans mb-6">
            Editado Studio
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            We shape stories, aesthetics, and strategies as gestures of clarity, care, and permanence
          </p>
        </div>
      </HeroVideo>

      {/* Resto del contenido */}
      <div className="container mx-auto px-6">
        {/* Contenido normal */}
      </div>
    </div>
  );
}

// Ejemplo 2: Video en About Page
export function VideoAboutPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-section-mono mb-6">About</h2>
          <div className="space-y-4 text-content">
            <p>
              Editado Studio is an editorial practice focused on publishing, 
              research, and narrative design.
            </p>
            <p>
              Our work spans building narrative frameworks, refining editorial voice, 
              and prototyping content ecosystems.
            </p>
          </div>
        </div>
        
        {/* Video reemplaza imagen del estudio */}
        <EditorialVideo
          src="/videos/studio-walkthrough.mp4"
          poster="/images/studio-poster.jpg"
          className="rounded-lg shadow-xl"
          controls={true}
          autoPlay={false}
          aspectRatio="4/3"
        />
      </div>
    </div>
  );
}

// Ejemplo 3: Video como fondo en Manifesto
export function VideoManifestoPage() {
  return (
    <BackgroundVideo
      src="/videos/abstract-background.mp4"
      poster="/images/manifesto-bg.jpg"
      opacity={0.2}
      className="min-h-screen"
    >
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl mb-12 text-center">Manifesto</h1>
          <div className="space-y-6 text-manifesto">
            <p>
              We believe in the power of thoughtful narrative design 
              to create lasting cultural impact.
            </p>
            {/* Más contenido del manifesto */}
          </div>
        </div>
      </div>
    </BackgroundVideo>
  );
}

// Ejemplo 4: Video inline en contenido editorial
export function VideoContentPage() {
  return (
    <article className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl mb-8">The Future of Editorial Design</h1>
      
      <div className="prose prose-lg">
        <p>
          In today's digital landscape, the role of editorial design 
          continues to evolve...
        </p>

        {/* Video inline reemplazando imagen */}
        <InlineVideo
          src="/videos/design-process.mp4"
          poster="/images/design-process-poster.jpg"
          caption="Our design process in action - from concept to execution"
        />

        <p>
          This approach allows us to create more dynamic and engaging 
          content experiences...
        </p>

        {/* Otro video inline */}
        <InlineVideo
          src="/videos/client-testimonial.mp4"
          poster="/images/testimonial-poster.jpg"
          caption="Client testimonial: How narrative design transformed their brand"
        />
      </div>
    </article>
  );
}

// Ejemplo 5: Gallery de videos (reemplaza galería de imágenes)
export function VideoGallery() {
  const videos = [
    {
      src: "/videos/project-1.mp4",
      poster: "/images/project-1-poster.jpg",
      title: "Brand Identity for Tech Startup"
    },
    {
      src: "/videos/project-2.mp4", 
      poster: "/images/project-2-poster.jpg",
      title: "Editorial Design for Magazine"
    },
    {
      src: "/videos/project-3.mp4",
      poster: "/images/project-3-poster.jpg", 
      title: "Digital Platform Architecture"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-section-mono mb-12 text-center">Recent Work</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <div key={index} className="space-y-4">
            <EditorialVideo
              src={video.src}
              poster={video.poster}
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              controls={true}
              autoPlay={false}
              aspectRatio="16/9"
            />
            <h3 className="text-content font-medium">{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// Ejemplo 6: Video modal/overlay
export function VideoModal({ 
  isOpen, 
  onClose, 
  videoSrc, 
  poster 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  videoSrc: string; 
  poster?: string; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Video container */}
      <div className="relative z-10 w-full max-w-4xl mx-4">
        <EditorialVideo
          src={videoSrc}
          poster={poster}
          controls={true}
          autoPlay={true}
          className="w-full rounded-lg shadow-2xl"
          aspectRatio="16/9"
        />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}