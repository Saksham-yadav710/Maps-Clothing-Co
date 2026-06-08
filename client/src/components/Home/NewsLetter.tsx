import { MailIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-white py-18 px-4 sm:px-6 lg:px-8 rounded-3xl mx-auto shadow-xs mt-32 mb-20">
      <div className="max-w-2xl mx-auto text-center ">
        <div className="size-16 bg-white rounded-xl flex-center mx-auto mb-6 shadow">
          <MailIcon className="size-8 text-navy-deep" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-semibold text-navy-deep mb-4">
          Subscribe to our NewsLetter
        </h2>
        <p className="text-app-text-light mb-8 text-base">
          Get weekly updates on our fresh produce, seasonal offers and exclusive
          discounts right to your inbox.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("You have successfully subscribed to our newsletter");
            setEmail("");
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-5 py-3.5 rounded-xl border border-[#DDD8CE] focus:border-gold focus:ring focus:ring-gold/20 bg-white text-sm transition-all outline-none"
          />
          <button
            type="submit"
            className="btn-gold shadow-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
