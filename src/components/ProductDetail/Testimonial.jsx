"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxios from "@/customHook/fetch-hook";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Helper to calculate review statistics
const calculateReviewStats = (reviews) => {
  const totalReviews = reviews?.length;
  let totalRatingSum = 0;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews?.forEach((review) => {
    totalRatingSum += review.rating;
    ratingCounts[review.rating]++;
  });

  const averageRating =
    totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(1) : "0.0";

  const ratingPercentages = {};
  for (let i = 1; i <= 5; i++) {
    ratingPercentages[i] =
      totalReviews > 0 ? (ratingCounts[i] / totalReviews) * 100 : 0;
  }

  return {
    averageRating,
    totalReviews,
    ratingCounts,
    ratingPercentages,
  };
};

// StarRatingInput component for the popup
const StarRatingInput = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-300 text-gray-300"
          }`}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
};

// ReviewStatistics component
const ReviewStatistics = ({ stats }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-[22px] font-medium">Customer Reviews</h2>
      <p className="text-sm font-medium mb-[30px]">
        Average rating: {stats.averageRating} ({stats.totalReviews})
      </p>
      <div className="grid gap-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>{star}</span>
              <Star className="w-4 h-4 stroke-gray-700 fill-transparent" />
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-[#FF8A00]"
                style={{ width: `${stats.ratingPercentages[star]}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {stats.ratingCounts[star] > 1000
                ? `${(stats.ratingCounts[star] / 1000).toFixed(2)}K`
                : stats.ratingCounts[star]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// CustomerReviewCard component
const CustomerReviewCard = ({ review }) => {
  return (
    <div className="grid gap-2">
      <h3 className="font-medium text-sm">{review.name}</h3>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= review.rating
                ? "fill-[#FF8A00] text-[#FF8A00]"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-sm">{review.comment}</p>
    </div>
  );
};

// ErrorComponent for validation messages
const ErrorComponent = ({ message, id }) => (
  <p id={id} className="text-red-500 text-sm mt-1">
    {message}
  </p>
);

export default function CustomerReviews() {
  const { id } = useParams();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { data, fetchData } = useAxios({
    method: "GET",
    url: `/review/getAllReviewByProductId/${id}`,
  });

  const { fetchData: addReview } = useAxios({
    method: "POST",
    url: `/review/addReview`,
  });

  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewReview((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Clear error when input changes
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
    setErrors((prev) => ({ ...prev, rating: "" })); // Clear error when rating changes
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    if (!newReview.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (newReview.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      isValid = false;
    }

    if (!newReview.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newReview.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!newReview.comment.trim()) {
      newErrors.comment = "Review comment is required.";
      isValid = false;
    } else if (newReview.comment.trim().length < 10) {
      newErrors.comment = "Review comment must be at least 10 characters.";
      isValid = false;
    }

    if (newReview.rating === 0) {
      newErrors.rating = "Please select a star rating.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      addReview({ data: { ...newReview, productId: id } }).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          fetchData();
          setNewReview({ name: "", email: "", comment: "", rating: 0 });
          setErrors({}); // Clear all errors on successful submission
          setIsPopupOpen(false);
        }
      });
    }
  };

  const reviewStats = calculateReviewStats(data);
  const displayedReviews = showAllReviews ? data : data?.slice(0, 2);

  return (
    <div className="grid grid-cols-3 gap-[64px]">
      {/* Left Section: Review Statistics and Add Review Button */}
      <div className="flex flex-col gap-6">
        <ReviewStatistics stats={reviewStats} />
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogTrigger asChild>
            <button className="w-fit cursor-pointer rounded-[6.62px] bg-[#333333] text-white text-lg py-[15px] px-[30px]">
              Write A Product Review
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Your Review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitReview} className="grid gap-4 py-4">
              {/* Name Field */}
              <div className="group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    newReview.name
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={newReview.name}
                  placeholder="Your Name"
                  onChange={handleInputChange}
                  className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                    errors.name ? "border-red-500" : "border-light-gray"
                  } ${
                    newReview.name
                      ? "opacity-100 !border-[#333333]"
                      : "opacity-50 focus:opacity-100"
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <ErrorComponent message={errors.name} id="name-error" />
                )}
              </div>

              {/* Email Field */}
              <div className="group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    newReview.email
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={newReview.email}
                  placeholder="Example@email.com"
                  onChange={handleInputChange}
                  className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                    errors.email ? "border-red-500" : "border-light-gray"
                  } ${
                    newReview.email
                      ? "opacity-100 !border-[#333333]"
                      : "opacity-50 focus:opacity-100"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <ErrorComponent message={errors.email} id="email-error" />
                )}
              </div>

              {/* Content Field */}
              <div className="group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    newReview.comment
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Review Content
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  placeholder="Write your review here..."
                  onChange={handleInputChange}
                  className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 min-h-[100px] ${
                    errors.comment ? "border-red-500" : "border-light-gray"
                  } ${
                    newReview.comment
                      ? "opacity-100 !border-[#333333]"
                      : "opacity-50 focus:opacity-100"
                  }`}
                  aria-describedby="comment-error"
                />
                {errors.comment && (
                  <ErrorComponent message={errors.comment} id="comment-error" />
                )}
              </div>

              {/* Rating Field */}
              <div className="group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    newReview.rating
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Rating
                </label>
                <div className="flex items-center">
                  <StarRatingInput
                    rating={newReview.rating}
                    onRatingChange={handleRatingChange}
                  />
                </div>
                {errors.rating && (
                  <ErrorComponent message={errors.rating} id="rating-error" />
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 px-5 rounded-[6px] cursor-pointer mt-4 bg-green text-white"
              >
                Submit Review
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Right Section: Customer Reviews */}
      <div className="flex flex-col col-span-2 gap-6">
        <h2 className="text-[22px] font-medium">Customers say</h2>
        <div className="grid gap-8">
          {displayedReviews?.map((review) => (
            <CustomerReviewCard key={review._id} review={review} />
          ))}
        </div>
        {data?.length > 2 && ( // Only show toggle if there are more than 2 reviews
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="underline font-medium cursor-pointer text-left text-lg mt-4"
          >
            {showAllReviews ? "Show Less Reviews <" : "See All Reviews >"}
          </button>
        )}
      </div>
    </div>
  );
}
