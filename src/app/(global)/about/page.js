// pages/about.js
import Head from 'next/head';
import { 
  LocalLibrary, 
  LocalShipping, 
  VerifiedUser, 
  EmojiPeople, 
  Groups, 
  Star 
} from '@mui/icons-material';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>About Us | Nonggor</title>
        <meta name="description" content="Learn about Nonggor - your trusted online bookstore" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4d321d] to-[#3a6051] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 style={{color:"white"}} className="text-4xl md:text-5xl font-bold mb-4 text-white">About Nonggor</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your trusted destination for books since 2025. We connect readers with stories that inspire, educate, and transform.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At Nonggor, we believe in the power of books to change lives. Our mission is to make reading accessible 
              to everyone by providing an extensive collection of books at affordable prices, combined with exceptional 
              customer service and fast delivery.
            </p>
            <div className="flex justify-center space-x-4">
              <Star className="text-yellow-500 text-4xl" />
              <Star className="text-yellow-500 text-4xl" />
              <Star className="text-yellow-500 text-4xl" />
              <Star className="text-yellow-500 text-4xl" />
              <Star className="text-yellow-500 text-4xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Nonggor</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <LocalLibrary className="text-blue-600 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Extensive Collection</h3>
              </div>
              <p className="text-gray-600">
                Over 2 million titles across all genres, from bestsellers to rare finds. 
                We have something for every reader.
              </p>
            </div>
            
            {/* Value Card 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <LocalShipping className="text-green-600 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Fast Delivery</h3>
              </div>
              <p className="text-gray-600">
                Get your books delivered within 2-3 business days with our express shipping options.
              </p>
            </div>
            
            {/* Value Card 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <VerifiedUser className="text-purple-600 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Quality Guaranteed</h3>
              </div>
              <p className="text-gray-600">
                All books are carefully inspected for quality. 30-day return policy on all purchases.
              </p>
            </div>
            
            {/* Value Card 4 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <EmojiPeople className="text-yellow-600 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Personalized Service</h3>
              </div>
              <p className="text-gray-600">
                Our book experts provide personalized recommendations based on your reading preferences.
              </p>
            </div>
            
            {/* Value Card 5 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Groups className="text-red-600 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Reading Community</h3>
              </div>
              <p className="text-gray-600">
                Join our community of book lovers with author events, book clubs, and reading challenges.
              </p>
            </div>
            
            {/* Value Card 6 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Star className="text-indigo-600 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Loyalty Rewards</h3>
              </div>
              <p className="text-gray-600">
                Earn points with every purchase and enjoy exclusive discounts and early access to new releases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Story</h2>
            
            <div className="bg-white rounded-xl shadow-md p-8 mb-12">
              <p className="text-lg text-gray-600 mb-6">
                Nonggor began in 2010 as a small independent bookstore in downtown Portland. 
                Founded by Sarah and Michael Johnson, two passionate book lovers, our first store was just 500 square feet 
                but filled with carefully curated titles and a cozy reading nook that became a community gathering spot.
              </p>
              
              <p className="text-lg text-gray-600 mb-6">
                As demand grew, we expanded our physical presence to three locations across the Pacific Northwest. 
                In 2018, we launched our online platform to bring our book selection to readers nationwide. 
                Today, were proud to be one of the fastest-growing online bookstores in the country.
              </p>
              
              <p className="text-lg text-gray-600">
                Despite our growth, weve maintained our commitment to personalized service and community engagement. 
                We partner with local schools and libraries, host author events, and donate thousands of books annually 
                to literacy programs. Every book we sell helps support our mission to spread the joy of reading.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block bg-blue-100 rounded-full p-4 mb-6">
                <div className="bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center">
                  <span className="text-3xl font-bold">13+</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Years of Excellence</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Serving book lovers with passion and dedication since 2010
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4d321d] to-[#3a6051] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Reading Community</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Discover your next favorite book and connect with fellow readers
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300">
              Browse Books
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Join Newsletter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}