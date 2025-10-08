/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const ReviewsTab = () => {
  return (
    <div className="tab-pane fade active show" id="Reviews">
      {/* Comments Section */}
      <div className="comments-area">
        <div className="grid grid-cols-12 gap-[30px]">
          {/* Left: Comments */}
          <div className="col-span-8">
            <h4 className="mb-[30px]">Customer questions &amp; answers</h4>
            <div className="comment-list">
              {/* Comment 1 */}
              <div className="single-comment justify-between flex mb-[30px]">
                <div className="user justify-between flex">
                  <div className="thumb text-center">
                    <img src='https://nest-frontend-v6.vercel.app/assets/imgs/blog/author-2.png' alt="Sienna" />
                    <a href="#" className="font-heading text-brand">
                      Sienna
                    </a>
                  </div>
                  <div className="desc">
                    <div className="flex justify-between mb-10">
                      <div className="flex items-center">
                        <span className="font-xs text-muted">
                          December 4, 2024 at 3:12 pm
                        </span>
                      </div>
                      <div className="product-rate d-inline-block">
                        <div className="product-rating" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <p className="mb-10">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus, suscipit exercitationem accusantium obcaecati quos
                      voluptate nesciunt facilis itaque modi commodi dignissimos
                      sequi repudiandae minus ab deleniti totam officia id incidunt?
                      <a href="#" className="reply"> Reply </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Comment 2 */}
              <div className="single-comment justify-between flex mb-[30px] ml-30">
                <div className="user justify-between flex">
                  <div className="thumb text-center">
                    <img src="https://nest-frontend-v6.vercel.app/assets/imgs/blog/author-2.png" alt="Brenna" />
                    <a href="#" className="font-heading text-brand">
                      Brenna
                    </a>
                  </div>
                  <div className="desc">
                    <div className="flex justify-between mb-10">
                      <div className="flex items-center">
                        <span className="font-xs text-muted">
                          December 4, 2024 at 3:12 pm
                        </span>
                      </div>
                      <div className="product-rate d-inline-block">
                        <div className="product-rating" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <p className="mb-10">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus, suscipit exercitationem accusantium obcaecati quos
                      voluptate nesciunt facilis itaque modi commodi dignissimos
                      sequi repudiandae minus ab deleniti totam officia id incidunt?
                      <a href="#" className="reply"> Reply </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Comment 3 */}
              <div className="single-comment justify-between flex">
                <div className="user justify-between flex">
                  <div className="thumb text-center">
                    <img src="https://nest-frontend-v6.vercel.app/assets/imgs/blog/author-2.png" alt="Gemma" />
                    <a href="#" className="font-heading text-brand">
                      Gemma
                    </a>
                  </div>
                  <div className="desc">
                    <div className="flex justify-between mb-10">
                      <div className="flex items-center">
                        <span className="font-xs text-muted">
                          December 4, 2024 at 3:12 pm
                        </span>
                      </div>
                      <div className="product-rate d-inline-block">
                        <div className="product-rating" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <p className="mb-10">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus, suscipit exercitationem accusantium obcaecati quos
                      voluptate nesciunt facilis itaque modi commodi dignissimos
                      sequi repudiandae minus ab deleniti totam officia id incidunt?
                      <a href="#" className="reply"> Reply </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Ratings Summary */}
          <div className="col-span-4">
            <h4 className="mb-[30px]">Customer reviews</h4>
            <div className="flex mb-[30px]">
              <div className="product-rate d-inline-block mr-[15px]">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
              <h6>4.8 out of 5</h6>
            </div>

            {/* Ratings Breakdown */}
            {[
              { stars: 5, percent: 50 },
              { stars: 4, percent: 25 },
              { stars: 3, percent: 45 },
              { stars: 2, percent: 65 },
              { stars: 1, percent: 85 },
            ].map((item) => (
              <div className="progress mb-2" key={item.stars}>
                <span>{item.stars} star</span>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${item.percent}%` }}
                  aria-valuenow={item.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {item.percent}%
                </div>
              </div>
            ))}e

            <a href="#" className="font-xs text-muted">
              How are ratings calculated?
            </a>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      <div className="comment-form mt-4">
        <h4 className="mb-[15px]">Add a review</h4>
        <div className="product-rate d-inline-block mb-[30px]"></div>
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <form className="form-contact comment_form" id="commentForm">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control w-full"
                      name="comment"
                      id="comment"
                      cols={30}
                      rows={9}
                      placeholder="Write Comment"
                    ></textarea>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="website"
                      id="website"
                      type="text"
                      placeholder="Website"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="button button-contactForm">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;
