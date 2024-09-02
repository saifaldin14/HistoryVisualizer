import React, { useState, useEffect, useRef } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const timelineEvents = [
  {
    year: 1969,
    event: "Moon Landing",
    slides: [
      {
        title: "The Eagle Has Landed",
        image: "/api/placeholder/800/600",
        description:
          "On July 20, 1969, Neil Armstrong became the first human to step on the Moon.",
        additionalElement: (
          <span className="text-amber-400">
            Fun fact: The American flag planted on the Moon was knocked over by
            the exhaust from the lunar module during takeoff.
          </span>
        ),
      },
      {
        title: "Apollo 11 Mission",
        image: "/api/placeholder/800/600",
        description:
          "Apollo 11 was the spaceflight that first landed humans on the Moon.",
        additionalElement: (
          <div className="bg-stone-800 p-3 rounded-lg">
            Crew: Neil Armstrong, Buzz Aldrin, Michael Collins
          </div>
        ),
      },
      {
        title: "Impact on Science",
        image: "/api/placeholder/800/600",
        description:
          "The Moon landing led to significant advancements in technology and inspired a generation of scientists.",
        additionalElement: (
          <ul className="list-disc list-inside">
            <li>Improved computer technology</li>
            <li>Advancements in telecommunications</li>
            <li>Development of new materials</li>
          </ul>
        ),
      },
    ],
  },
  // ... (other events with multiple slides)
];

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlides, setActiveSlides] = useState(timelineEvents.map(() => 0));
  const sectionRefs: any = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const activeSection = sectionRefs.current.findIndex(
        (ref: any) =>
          ref.offsetTop <= scrollPosition + windowHeight / 2 &&
          ref.offsetTop + ref.offsetHeight > scrollPosition + windowHeight / 2
      );
      if (activeSection !== -1 && activeSection !== activeIndex) {
        setActiveIndex(activeSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };

  const changeSlide = (eventIndex: number, direction: number) => {
    setActiveSlides((prev) => {
      const newSlides = [...prev];
      newSlides[eventIndex] =
        (newSlides[eventIndex] +
          direction +
          timelineEvents[eventIndex].slides.length) %
        timelineEvents[eventIndex].slides.length;
      return newSlides;
    });
  };

  return (
    <div className="relative bg-stone-900 text-stone-200 min-h-screen font-serif">
      <div className="fixed inset-0 opacity-5 bg-texture"></div>

      <div className="fixed left-0 top-0 bottom-0 w-24 flex items-center">
        <div className="h-full w-0.5 bg-stone-700 mx-auto relative">
          {timelineEvents.map((event, index) => (
            <button
              key={event.year}
              className={`absolute w-6 h-6 rounded-full -left-2.5 transition-all duration-300 ${
                index <= activeIndex
                  ? "bg-amber-500"
                  : "bg-stone-800 border border-stone-600"
              }`}
              style={{ top: `${(index / (timelineEvents.length - 1)) * 100}%` }}
              onClick={() => scrollToSection(index)}
            >
              <span
                className={`absolute left-10 top-1/2 -translate-y-1/2 text-sm font-semibold transition-all duration-300 ${
                  index === activeIndex ? "text-amber-500" : "text-stone-400"
                }`}
              >
                {event.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button
          onClick={() => scrollToSection(Math.max(0, activeIndex - 1))}
          className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 transition-colors"
          disabled={activeIndex === 0}
        >
          <ChevronUp className="w-6 h-6 text-amber-500" />
        </button>
        <button
          onClick={() =>
            scrollToSection(
              Math.min(timelineEvents.length - 1, activeIndex + 1)
            )
          }
          className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 transition-colors"
          disabled={activeIndex === timelineEvents.length - 1}
        >
          <ChevronDown className="w-6 h-6 text-amber-500" />
        </button>
      </div>

      <div className="ml-24 p-8">
        {timelineEvents.map((event, eventIndex) => (
          <section
            key={event.year}
            ref={(el) => (sectionRefs.current[eventIndex] = el)}
            className="min-h-screen flex flex-col justify-center py-16 relative"
          >
            <h2 className="text-5xl font-bold mb-6 text-amber-500">
              {event.year}: {event.event}
            </h2>
            <div className="relative mb-6 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeSlides[eventIndex] * 100}%)`,
                }}
              >
                {event.slides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <h3 className="text-3xl font-semibold mb-4 text-stone-300">
                      {slide.title}
                    </h3>
                    <div className="relative group">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full max-w-4xl h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-60 rounded-lg"></div>
                    </div>
                    <p className="text-xl mt-4 mb-6 max-w-3xl leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="mb-6 max-w-3xl">
                      {slide.additionalElement}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => changeSlide(eventIndex, -1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-800 hover:bg-stone-700 transition-colors"
                disabled={activeSlides[eventIndex] === 0}
              >
                <ChevronLeft className="w-6 h-6 text-amber-500" />
              </button>
              <button
                onClick={() => changeSlide(eventIndex, 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-800 hover:bg-stone-700 transition-colors"
                disabled={activeSlides[eventIndex] === event.slides.length - 1}
              >
                <ChevronRight className="w-6 h-6 text-amber-500" />
              </button>
            </div>
            <div className="flex justify-center mt-4">
              {event.slides.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                    slideIndex === activeSlides[eventIndex]
                      ? "bg-amber-500"
                      : "bg-stone-600"
                  }`}
                  onClick={() =>
                    setActiveSlides((prev) => {
                      const newSlides = [...prev];
                      newSlides[eventIndex] = slideIndex;
                      return newSlides;
                    })
                  }
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default App;
