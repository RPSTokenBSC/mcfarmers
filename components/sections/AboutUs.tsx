import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="bg-accent text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-2/3 lg:pr-12 mb-8 lg:mb-0">
          <h2 className="text-5xl font-bold mb-6">About Us</h2>
          <p className="text-lg mb-8">
            Welcome to McFarmers, where cryptocurrency meets fast, efficient,
            and fun farming! Inspired by the iconic McDonald's, McFarmers brings
            the world of crypto trading to your fingertips, offering a playful
            and user- friendly platform designed to make earning digital assets
            easy and accessible for everyone. Whether you're a seasoned crypto
            farmer or new to the space, McFarmers is your go-to place for fast,
            reliable, and rewarding crypto experiences.
          </p>
          <Link href="#get-hired" passHref>
            <button className="bg-accent2 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition duration-300">
              Get hired
            </button>
          </Link>
        </div>
        <div className="lg:w-1/3 flex justify-center">
          <Image
            src="/McFarmers.png"
            alt="McFarmers Logo"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
