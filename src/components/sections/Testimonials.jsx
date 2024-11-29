import Image from "next/image";
import React from "react";

const testimonials = [
  {
    content:
      "Pulse AI has transformed how we manage patient care. The real-time monitoring and AI insights have helped us make faster, more accurate decisions.",
    author: "Dr. Sarah Chen",
    role: "Chief of Medicine, Metro Hospital",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    content:
      "The integration with our existing systems was seamless. Our staff adapted quickly, and we've seen significant improvements in patient outcomes.",
    author: "James Wilson",
    role: "Healthcare Administrator",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
];

export function Testimonials() {
  return (
    <section className="py-12 bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Healthcare Professionals
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            See what our users have to say about Pulse AI
          </p>
        </div>
        <div className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="lg:col-span-1">
              <div className="h-full flex flex-col justify-between bg-white rounded-lg shadow-lg p-8">
                <div className="flex-1">
                  <p className="text-lg text-gray-600 italic">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <Image
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
