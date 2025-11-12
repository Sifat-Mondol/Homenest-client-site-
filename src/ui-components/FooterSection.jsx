import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-2">HomeNest</h2>
          <p>Real estate portal to find or post properties easily.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <p>Email: support@homenest.com</p>
          <p>Phone: +880 123 456 789</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
          </div>
        </div>
      </div>
      <p className="text-center mt-4 text-gray-400">© 2025 HomeNest. All rights reserved.</p>
    </footer>
  );
};

export default FooterSection;
