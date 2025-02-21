"use client";
import { Star } from "lucide-react";
import React, { useState } from "react";
interface ProductReviewProps {
  activeTab: string;
}

export default function ProductReview({ activeTab }: ProductReviewProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");

//   const handleStarClick = (starRating: number) => {
//     setRating(starRating);
//   };

  const handleSubmitReview = (event: React.FormEvent) => {
    event.preventDefault();
    // Giả sử bạn có logic để xử lý đánh giá ở đây
    console.log("Review submitted:", { rating, review, author, email });
  };

  const isActive = activeTab === "reviews";
  return (
    <div
      className="tab-pane"
      id="tab-reviews"
      role="tabpanel"
      style={{ display: isActive ? "block" : "none" }}
    >
      <div className="techmarket-advanced-reviews" id="reviews">
        <div className="advanced-review row">
          <div className="advanced-review-rating">
            <h2 className="based-title">Review (1)</h2>
            <div className="avg-rating">
              <span className="avg-rating-number">5.0</span>
              <div className="d-flex gap-0">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index}></Star>
                ))}
                {Array.from({ length: 5 - 5 }).map((_, index) => (
                  <Star key={index} color="#e4e4e4"></Star>
                ))}

                {/* 
                
                    {Array(Math.floor(product.rating))
                      .fill(0)
                      .map((_, i) => (
                        <Star strokeWidth={1} key={`full-${i}`} />
                      ))}

                    {product.rating % 1 !== 0 && (
                      <StarHalf strokeWidth={1} key="half-star" />
                    )}
                */}
              </div>
            </div>
            <div className="rating-histogram">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="rating-bar">
                  <div className="d-flex gap-0">
                    {Array.from({ length: star }).map((_, index) => (
                      <Star key={index}></Star>
                    ))}
                    {Array.from({ length: 5 - star }).map((_, index) => (
                      <Star key={index} color="#e4e4e4"></Star>
                    ))}
                  </div>

                  <div className="rating-count">{star === 5 ? 1 : 0}</div>
                  <div className="rating-percentage-bar">
                    <span
                      className="rating-percentage"
                      style={{ width: `${(star / 5) * 100}%` }}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="advanced-review-comment">
            <div id="review_form_wrapper">
              <div id="review_form">
                <div className="comment-respond" id="respond">
                  <h3 className="comment-reply-title" id="reply-title">
                    Add a review
                  </h3>
                  <form
                    onSubmit={handleSubmitReview}
                    className="comment-form"
                    id="commentform"
                  >
                    <div className="comment-form-rating">
                      <label>Your Rating</label>
                      {/* <p className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <a
                            key={star}
                            href="#"
                            className={`star-${star}`}
                            onClick={() => handleStarClick(star)}
                          >
                            {star}
                          </a>
                        ))}
                      </p> */}
                    </div>

                    <p className="comment-form-comment">
                      <label htmlFor="comment">Your Review</label>
                      <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        aria-required="true"
                        rows={8}
                        cols={45}
                        name="comment"
                        id="comment"
                      />
                    </p>

                    <p className="comment-form-author">
                      <label htmlFor="author">
                        Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        aria-required="true"
                        size={30}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        name="author"
                        id="author"
                      />
                    </p>

                    <p className="comment-form-email">
                      <label htmlFor="email">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        aria-required="true"
                        size={30}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="email"
                      />
                    </p>

                    <p className="form-submit">
                      <input
                        type="submit"
                        value="Add Review"
                        className="submit"
                        id="submit"
                        name="submit"
                      />
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="comments">
          <ol className="commentlist">
            <li
              id="li-comment-83"
              className="comment byuser comment-author-admin bypostauthor even thread-even depth-1"
            >
              <div className="comment_container" id="comment-83">
                <div className="comment-text">
                  <div className="star-rating">
                    <span style={{ width: "100%" }}>
                      Rated <strong className="rating">5</strong> out of 5
                    </span>
                  </div>
                  <p className="meta">
                    <strong
                      itemProp="author"
                      className="woocommerce-review__author"
                    >
                      first last
                    </strong>
                    <span className="woocommerce-review__dash">–</span>
                    <time
                      dateTime="2017-06-21T08:05:40+00:00"
                      itemProp="datePublished"
                      className="woocommerce-review__published-date"
                    >
                      June 21, 2017
                    </time>
                  </p>
                  <div className="description">
                    <p>Wow great product</p>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
