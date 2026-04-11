import React from "react";
import { Link } from "react-router-dom";



const Navbar = () => (
    <div className="flex justify-between items-center px-6 md:px-16 py-4 bg-[#0F172A] text-white">
        <h1 className="text-xl font-bold">Sports Arena Booking</h1>
        <div className="space-x-6 hidden md:flex">
            <a href="#" className="hover:text-[#7C3AED]">Home</a>
            {/* <a href="#" className="hover:text-[#7C3AED]">Arenas</a> */}
           <Link to="/signup"><button className="bg-[#7C3AED] px-4 py-2 rounded-lg hover:bg-[#6D28D9]"> Register</button></Link>
        </div>
    </div>
);

const Hero = () => (
    <div className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-6 md:px-16 py-20 flex flex-col md:flex-row items-center">
        <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Book Your Favorite Sports Arena</h1>
            <p className="text-gray-200 mb-6">Check arena availability, reserve slots and enjoy sports without hassle.</p>
            <button className="bg-white text-[#2563EB] px-6 py-3 rounded-xl font-semibold hover:bg-gray-200">Browse Arenas</button>
        </div>
        <div className="flex-1 mt-10 md:mt-0">
            <img src="https://cdn-icons-png.flaticon.com/512/861/861512.png" alt="arena" className="w-full max-w-md mx-auto" />
        </div>
    </div>
);

const Card = ({ title, desc }) => (
    <div className="bg-[#E5E7EB] p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition">
        <h3 className="text-lg font-semibold text-[#1F2937] mb-2">{title}</h3>
        <p className="text-[#6B7280]">{desc}</p>
    </div>
);

const Section = ({ title, children }) => (
    <section className="py-12 px-6 md:px-16 bg-[#F3F4F6]">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#1F2937]">{title}</h2>
        {children}
    </section>
);

const Features = () => (
    <Section title="Our Key Features">
        <div className="grid md:grid-cols-3 gap-6">
            <Card title="Check Availability" desc="View available arenas and slots" />
            <Card title="Secure Booking" desc="Reserve and pay securely" />
            <Card title="Arena Management" desc="Managers control schedules" />
        </div>
    </Section>
);

const Roles = () => (
    <Section title="User Roles">
        <div className="grid md:grid-cols-4 gap-6">
            <Card title="Admin" desc="Manage users, arenas & reports" />
            <Card title="Arena Manager" desc="Approve bookings & schedules" />
            <Card title="Coach" desc="Manage training sessions" />
            <Card title="Player" desc="Book arenas & play" />
        </div>
    </Section>
);

const HowItWorks = () => (
    <Section title="How It Works">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
            <div>Arena Manager adds arenas</div>
            <div>Users browse arenas</div>
            <div>Players book slots</div>
            <div>Manager approves</div>
            <div>User gets confirmation</div>
        </div>
    </Section>
);

const Footer = () => (
    <div className="bg-[#0F172A] text-white text-center py-6">
        © 2026 Sports Arena Booking System
    </div>
);

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <Roles />
            <HowItWorks />
            <Footer />
        </div>
    );
}


