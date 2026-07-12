import {AnimatedTestimonials} from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "AgreeWise AI summarized my internship agreement in seconds and highlighted risky clauses I completely missed.",
    name: "Harsh Kumar",
    designation: "B.Tech CSE Student",
    src: "https://imgs.search.brave.com/v0v6yqZFOLHQDbtpPC53Z6NNxFs1K25PtQT599qNNDA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvZGFyay1hbmlt/ZS1ib3kteTFvc3h3/aGFldWFzMGx4NC5q/cGc",
  },
  {
    quote:
      "The AI explained every legal clause in simple language. It saved me hours of reading.",
    name: "Rahul Sharma",
    designation: "Computer Science Student",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Our internship agreements are much easier to understand now. The risk analysis is amazing.",
    name: "Priya Verma",
    designation: "College Student",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "AgreeWise AI helped me identify risky payment terms before signing my freelance contract.",
    name: "Aman Gupta",
    designation: "Freelance Developer",
    src: "https://imgs.search.brave.com/ArQXq5rONXtD7r-Xpgyhvh1cgVjaXTn1VqRwEp_b6S4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS83NS85/NC84a0d6eDYuanBn",
  },
  {
    quote:
      "Beautiful interface with professional AI insights. I recommend it to every student.",
    name: "Sneha Kapoor",
    designation: "Business Student",
    src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop&q=80",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-black py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-(--brand-gold-soft)">
            Testimonials
          </span>

          <h2 className="font-display mt-4 text-4xl font-semibold text-white md:text-5xl">
            Trusted by Professionals
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">
            Thousands of students, professionals, HR teams, and freelancers
            trust AgreeWise AI to understand contracts before signing.
          </p>
        </div>

        <AnimatedTestimonials
          testimonials={testimonials}
          autoplay
        />
      </div>
    </section>
  );
};

export default Testimonials;