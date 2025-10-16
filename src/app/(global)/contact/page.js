// pages/contact.js
import Head from 'next/head';
import { 
  Email, 
  Phone, 
  LocationOn, 
  AccessTime, 
  Facebook, 
  Twitter, 
  Instagram,
  Send,
  WhatsApp,
  Chat,
  Store
} from '@mui/icons-material';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Head>
        <title>Contact Us | BookHaven</title>
        <meta name="description" content="Get in touch with BookHaven - your trusted online bookstore" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4d321d] to-[#6b4423] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 style={{color:"white"}} className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h3>
              <p className="text-xl max-w-lg">
                Have questions or need assistance? Our team is here to help you with all your book-related needs.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center text-black">
              <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <Phone className="text-3xl mr-3" />
                  <div>
                    <p className="font-bold">Call Us Now</p>
                    <p className="text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Email className="text-3xl mr-3" />
                  <div>
                    <p className="font-bold">Email Us</p>
                    <p className="text-lg">support@bookhaven.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#4d321d]">Send Us a Message</h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d] focus:border-[#4d321d] outline-none transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d] focus:border-[#4d321d] outline-none transition"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <select 
                      id="subject" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d] focus:border-[#4d321d] outline-none transition"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="return">Return/Exchange</option>
                      <option value="product">Product Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d] focus:border-[#4d321d] outline-none transition"
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-[#4d321d] hover:bg-[#3a2415] text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    <Send className="mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Contact Channels */}
              <div className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#4d321d]">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Phone className="text-[#4d321d]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Phone</h4>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500">Mon-Fri: 9am-6pm EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Email className="text-[#4d321d]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Email</h4>
                        <p className="text-gray-600">support@bookhaven.com</p>
                        <p className="text-sm text-gray-500">24/7 Support</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <LocationOn className="text-[#4d321d]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Headquarters</h4>
                        <p className="text-gray-600">123 Book Street</p>
                        <p className="text-gray-600">Portland, OR 97204</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Live Support */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#4d321d]">Live Support</h3>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-3 bg-green-100 hover:bg-green-200 rounded-lg transition">
                      <div className="flex items-center">
                        <WhatsApp className="text-green-600 mr-3" />
                        <span className="font-medium text-gray-800">WhatsApp</span>
                      </div>
                      <span className="text-green-600 font-medium">Chat Now</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition">
                      <div className="flex items-center">
                        <Chat className="text-blue-600 mr-3" />
                        <span className="font-medium text-gray-800">Live Chat</span>
                      </div>
                      <span className="text-blue-600 font-medium">Start Chat</span>
                    </button>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#4d321d]">Follow Us</h3>
                  <p className="text-gray-600 mb-4">Stay updated with new releases and offers</p>
                  <div className="flex space-x-3">
                    <a href="#" className="bg-[#4d321d] hover:bg-[#3a2415] text-white p-2 rounded-full transition">
                      <Facebook />
                    </a>
                    <a href="#" className="bg-[#4d321d] hover:bg-[#3a2415] text-white p-2 rounded-full transition">
                      <Twitter />
                    </a>
                    <a href="#" className="bg-gradient-to-r from-[#4d321d] to-[#6b4423] hover:from-[#3a2415] hover:to-[#5a3420] text-white p-2 rounded-full transition">
                      <Instagram />
                    </a>
                    <a href="#" className="bg-[#4d321d] hover:bg-[#3a2415] text-white p-2 rounded-full transition">
                      <WhatsApp />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#4d321d]">Visit Our Store</h2>
            
            <div className="bg-amber-100 rounded-xl overflow-hidden shadow-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <LocationOn className="text-5xl text-[#4d321d] mx-auto mb-4" />
                <p className="text-[#4d321d] font-medium text-xl">Interactive Map</p>
                <p className="text-gray-600">123 Book Street, Portland, OR 97204</p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-3">
                  <Store className="text-[#4d321d] mr-2" />
                  <h3 className="font-bold text-lg text-[#4d321d]">Main Store</h3>
                </div>
                <p className="text-gray-600 mb-2">123 Book Street</p>
                <p className="text-gray-600 mb-2">Portland, OR 97204</p>
                <p className="text-gray-600">Mon-Sat: 9am-8pm</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-3">
                  <Store className="text-[#4d321d] mr-2" />
                  <h3 className="font-bold text-lg text-[#4d321d]">Downtown Branch</h3>
                </div>
                <p className="text-gray-600 mb-2">456 Literature Lane</p>
                <p className="text-gray-600 mb-2">Portland, OR 97205</p>
                <p className="text-gray-600">Mon-Sat: 10am-7pm</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-3">
                  <Store className="text-[#4d321d] mr-2" />
                  <h3 className="font-bold text-lg text-[#4d321d]">University Store</h3>
                </div>
                <p className="text-gray-600 mb-2">789 Campus Avenue</p>
                <p className="text-gray-600 mb-2">Eugene, OR 97403</p>
                <p className="text-gray-600">Mon-Fri: 9am-6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#4d321d]">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="font-bold text-lg text-[#4d321d]">How long does shipping take?</h3>
                  <span className="text-[#4d321d]">+</span>
                </div>
                <div className="px-6 pb-6 text-gray-600">
                  <p>Standard shipping takes 3-5 business days. We also offer expedited shipping options at checkout that deliver within 1-2 business days.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="font-bold text-lg text-[#4d321d]">What is your return policy?</h3>
                  <span className="text-[#4d321d]">+</span>
                </div>
                <div className="px-6 pb-6 text-gray-600">
                  <p>We offer a 30-day return policy for books in original condition. Please contact our support team to initiate a return. E-books and audiobooks are non-returnable.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="font-bold text-lg text-[#4d321d]">Do you offer international shipping?</h3>
                  <span className="text-[#4d321d]">+</span>
                </div>
                <div className="px-6 pb-6 text-gray-600">
                  <p>Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. Customs fees may apply.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="font-bold text-lg text-[#4d321d]">How can I track my order?</h3>
                  <span className="text-[#4d321d]">+</span>
                </div>
                <div className="px-6 pb-6 text-gray-600">
                  <p>Once your order ships, you will receive a tracking number via email. You can also track your order in your account dashboard on our website.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="font-bold text-lg text-[#4d321d]">Do you have a loyalty program?</h3>
                  <span className="text-[#4d321d]">+</span>
                </div>
                <div className="px-6 pb-6 text-gray-600">
                  <p>Yes! Join our BookHaven Rewards program to earn points with every purchase, enjoy exclusive discounts, and get early access to new releases and author events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4d321d] to-[#6b4423] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Our customer service team is ready to assist you with any inquiries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#4d321d] hover:bg-amber-50 font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center">
              <Phone className="mr-2" />
              Call Us Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#4d321d] text-white font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center">
              <Email className="mr-2" />
              Email Support
            </button>
          </div>
        </div>
      </section>


    </div>
  );
}