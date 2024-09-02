import React, { useState, useEffect, useRef } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const timelineEvents = [
  {
    year: 1960,
    event: "Space Race",
    dates: [
      { year: 1961, label: "First Human in Space" },
      { year: 1962, label: "Mercury Program" },
      { year: 1967, label: "Apollo 1 Fire" },
      { year: 1969, label: "Moon Landing" },
    ],
    slides: [
      {
        title: "Yuri Gagarin's Flight",
        image: "/api/placeholder/800/600",
        description:
          "On April 12, 1961, Soviet cosmonaut Yuri Gagarin became the first human to journey into outer space.",
        additionalElement: (
          <span className="text-amber-400">
            Fun fact: Gagarin's flight lasted 108 minutes and orbited Earth
            once.
          </span>
        ),
      },
      {
        title: "Apollo 11 Mission",
        image: "/api/placeholder/800/600",
        description:
          "On July 20, 1969, American astronauts Neil Armstrong and Buzz Aldrin became the first humans to land on the Moon.",
        additionalElement: (
          <div className="bg-stone-800 p-3 rounded-lg">
            Crew: Neil Armstrong, Buzz Aldrin, Michael Collins
          </div>
        ),
      },
    ],
  },
  {
    year: 1970,
    event: "Environmental Movement",
    dates: [
      { year: 1970, label: "First Earth Day" },
      { year: 1972, label: "Clean Water Act" },
      { year: 1973, label: "Endangered Species Act" },
      { year: 1979, label: "Three Mile Island Accident" },
    ],
    slides: [
      {
        title: "First Earth Day",
        image: "/api/placeholder/800/600",
        description:
          "On April 22, 1970, millions of people gathered to promote environmental protection in the first Earth Day celebration.",
        additionalElement: (
          <span className="text-amber-400">
            Impact: Earth Day is now observed globally by more than a billion
            people every year.
          </span>
        ),
      },
    ],
  },
  {
    year: 1980,
    event: "Space Race",
    dates: [
      { year: 1961, label: "First Human in Space" },
      { year: 1962, label: "Mercury Program" },
      { year: 1967, label: "Apollo 1 Fire" },
      { year: 1969, label: "Moon Landing" },
    ],
    slides: [
      {
        title: "Yuri Gagarin's Flight",
        image: "/api/placeholder/800/600",
        description:
          "On April 12, 1961, Soviet cosmonaut Yuri Gagarin became the first human to journey into outer space.",
        additionalElement: (
          <span className="text-amber-400">
            Fun fact: Gagarin's flight lasted 108 minutes and orbited Earth
            once.
          </span>
        ),
      },
      {
        title: "Apollo 11 Mission",
        image: "/api/placeholder/800/600",
        description:
          "On July 20, 1969, American astronauts Neil Armstrong and Buzz Aldrin became the first humans to land on the Moon.",
        additionalElement: (
          <div className="bg-stone-800 p-3 rounded-lg">
            Crew: Neil Armstrong, Buzz Aldrin, Michael Collins
          </div>
        ),
      },
    ],
  },
  {
    year: 1990,
    event: "Space Race",
    dates: [
      { year: 1961, label: "First Human in Space" },
      { year: 1962, label: "Mercury Program" },
      { year: 1967, label: "Apollo 1 Fire" },
      { year: 1969, label: "Moon Landing" },
    ],
    slides: [
      {
        title: "Yuri Gagarin's Flight",
        image: "/api/placeholder/800/600",
        description:
          "On April 12, 1961, Soviet cosmonaut Yuri Gagarin became the first human to journey into outer space.",
        additionalElement: (
          <span className="text-amber-400">
            Fun fact: Gagarin's flight lasted 108 minutes and orbited Earth
            once.
          </span>
        ),
      },
      {
        title: "Apollo 11 Mission",
        image: "/api/placeholder/800/600",
        description:
          "On July 20, 1969, American astronauts Neil Armstrong and Buzz Aldrin became the first humans to land on the Moon.",
        additionalElement: (
          <div className="bg-stone-800 p-3 rounded-lg">
            Crew: Neil Armstrong, Buzz Aldrin, Michael Collins
          </div>
        ),
      },
    ],
  },
];

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDateIndex, setActiveDateIndex] = useState(0);
  const [activeSlides, setActiveSlides] = useState(timelineEvents.map(() => 0));
  const sectionRefs: any = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      let newActiveIndex = -1;
      let newActiveDateIndex = -1;

      sectionRefs.current.forEach(
        (ref: { offsetTop: any; offsetHeight: any }, index: number) => {
          if (!ref) return;

          const { offsetTop, offsetHeight } = ref;
          const sectionStart = offsetTop;
          const sectionEnd = offsetTop + offsetHeight;
          const sectionMiddle = (sectionStart + sectionEnd) / 2;

          if (
            scrollPosition + windowHeight / 2 >= sectionStart &&
            scrollPosition + windowHeight / 2 < sectionEnd
          ) {
            newActiveIndex = index;

            // Calculate active date within the section
            const dateCount = timelineEvents[index].dates.length;
            const dateHeight = offsetHeight / (dateCount + 1);
            newActiveDateIndex =
              Math.floor(
                (scrollPosition + windowHeight / 2 - sectionStart) / dateHeight
              ) - 1;
            newActiveDateIndex = Math.max(
              0,
              Math.min(newActiveDateIndex, dateCount - 1)
            );
          }
        }
      );

      if (
        newActiveIndex !== -1 &&
        (newActiveIndex !== activeIndex ||
          newActiveDateIndex !== activeDateIndex)
      ) {
        setActiveIndex(newActiveIndex);
        setActiveDateIndex(newActiveDateIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex, activeDateIndex]);

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

      <div className="fixed left-0 top-0 bottom-0 w-32 flex items-center">
        <div className="h-full w-0.5 bg-stone-700 mx-auto relative">
          {timelineEvents.map((event, eventIndex) => (
            <React.Fragment key={event.year}>
              <button
                className={`absolute w-6 h-6 rounded-full -left-2.5 transition-all duration-300 ${
                  eventIndex === activeIndex
                    ? "bg-amber-500 scale-125"
                    : "bg-stone-800 border border-stone-600"
                }`}
                style={{
                  top: `${(eventIndex / (timelineEvents.length - 1)) * 100}%`,
                }}
                onClick={() => scrollToSection(eventIndex)}
              >
                <span
                  className={`absolute left-10 top-1/2 -translate-y-1/2 text-sm font-semibold transition-all duration-300 ${
                    eventIndex === activeIndex
                      ? "text-amber-500"
                      : "text-stone-400"
                  }`}
                >
                  {event.year}
                </span>
              </button>
              {event.dates.map((date, dateIndex) => (
                <div
                  key={date.year}
                  className={`absolute w-3 h-3 rounded-full -left-1 transition-all duration-300 ${
                    eventIndex === activeIndex && dateIndex === activeDateIndex
                      ? "bg-amber-400 scale-125"
                      : eventIndex === activeIndex
                      ? "bg-amber-400"
                      : "bg-stone-600"
                  }`}
                  style={{
                    top: `${
                      ((eventIndex +
                        (dateIndex + 1) / (event.dates.length + 1)) /
                        (timelineEvents.length - 1)) *
                      100
                    }%`,
                  }}
                >
                  <span
                    className={`absolute left-6 top-1/2 -translate-y-1/2 text-xs font-semibold transition-all duration-300 ${
                      eventIndex === activeIndex &&
                      dateIndex === activeDateIndex
                        ? "text-amber-400"
                        : "text-stone-400"
                    }`}
                  >
                    {date.year}: {date.label}
                  </span>
                </div>
              ))}
            </React.Fragment>
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

      <div className="ml-32 p-8">
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
