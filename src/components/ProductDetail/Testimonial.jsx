"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Dummy data for reviews
const initialReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 4,
    title: "Perfect Combination!!",
    content:
      "This review was collected as part of a promotion. I forgot to post my photos from my review! So here is my review again. A perfect combination of softness, strength, and proper friction to make any user leaving clean and spotless!! I have been purchasing for years and Angel Soft isn't too thick where you think you are using a towel and it's not too thin leaving you with unexpected tears during use!! Some say I have an addition to Angel Soft, I say it's dedication for a great product!! See the attached photos from my last purchase!",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 5,
    title: "Excellent Product!",
    content:
      "Absolutely love this product! It exceeded my expectations in every way. Highly recommend it to everyone looking for quality and durability. Will definitely buy again!",
  },
  {
    id: 3,
    name: "Alice Johnson",
    rating: 3,
    title: "Good, but could be better",
    content:
      "It's a decent product, but I expected a bit more for the price. The quality is okay, but there are some minor issues. Overall, it gets the job done.",
  },
  {
    id: 4,
    name: "Bob Williams",
    rating: 5,
    title: "Fantastic!",
    content:
      "Couldn't be happier with my purchase. This is exactly what I needed. The features are great and it's very easy to use. Five stars!",
  },
  {
    id: 5,
    name: "Charlie Brown",
    rating: 2,
    title: "Disappointed",
    content:
      "Not what I was hoping for. The product felt cheap and broke after a few uses. I would not recommend this to others. Very disappointed with the quality.",
  },
]

// Helper to calculate review statistics
const calculateReviewStats = (reviews) => {
  const totalReviews = reviews.length
  let totalRatingSum = 0
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  reviews.forEach((review) => {
    totalRatingSum += review.rating
    ratingCounts[review.rating]++
  })

  const averageRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(1) : "0.0"

  const ratingPercentages = {}
  for (let i = 1; i <= 5; i++) {
    ratingPercentages[i] = totalReviews > 0 ? (ratingCounts[i] / totalReviews) * 100 : 0
  }

  return {
    averageRating,
    totalReviews,
    ratingCounts,
    ratingPercentages,
  }
}

// StarRatingInput component for the popup
const StarRatingInput = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
          }`}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  )
}

// ReviewStatistics component
const ReviewStatistics = ({ stats }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[22px] font-medium">Customer Reviews</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Average rating: {stats.averageRating} ({stats.totalReviews})
      </p>
      <div className="grid gap-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
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
  )
}

// CustomerReviewCard component
const CustomerReviewCard = ({ review }) => {
  return (
    <div className="grid gap-2">
      <h3 className="font-bold">{review.title}</h3>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= review.rating ? "fill-[#FF8A00] text-[#FF8A00]" : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{review.content}</p>
    </div>
  )
}

// ErrorComponent for validation messages
const ErrorComponent = ({ message, id }) => (
  <p id={id} className="text-red-500 text-sm mt-1">
    {message}
  </p>
)

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(initialReviews)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    content: "",
    rating: 0,
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewReview((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: "" })) // Clear error when input changes
  }

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }))
    setErrors((prev) => ({ ...prev, rating: "" })) // Clear error when rating changes
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    const newErrors = {}
    let isValid = true

    if (!newReview.name.trim()) {
      newErrors.name = "Name is required."
      isValid = false
    } else if (newReview.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters."
      isValid = false
    }

    if (!newReview.email.trim()) {
      newErrors.email = "Email is required."
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(newReview.email)) {
      newErrors.email = "Invalid email format."
      isValid = false
    }

    if (!newReview.content.trim()) {
      newErrors.content = "Review content is required."
      isValid = false
    } else if (newReview.content.trim().length < 10) {
      newErrors.content = "Review content must be at least 10 characters."
      isValid = false
    }

    if (newReview.rating === 0) {
      newErrors.rating = "Please select a star rating."
      isValid = false
    }

    setErrors(newErrors)

    if (isValid) {
      const reviewToAdd = {
        id: reviews.length + 1,
        ...newReview,
        title: `Review by ${newReview.name}`,
      }
      setReviews((prev) => [reviewToAdd, ...prev])
      setNewReview({ name: "", email: "", content: "", rating: 0 })
      setErrors({}) // Clear all errors on successful submission
      setIsPopupOpen(false)
    }
  }

  const reviewStats = calculateReviewStats(reviews)
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2) // Show first 2 or all

  return (
    <div className="grid grid-cols-3 gap-[64px]">
      {/* Left Section: Review Statistics and Add Review Button */}
      <div className="flex flex-col gap-6">
        <ReviewStatistics stats={reviewStats} />
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogTrigger asChild>
            <Button className="w-fit bg-gray-800 text-white hover:bg-gray-700">Write A Product Review</Button>
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
                    errors.name ? "border-red-500" : "border-[#D1D5DB]"
                  } ${newReview.name ? "opacity-100 !border-[#333333]" : "opacity-50 focus:opacity-100"}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                {errors.name && <ErrorComponent message={errors.name} id="name-error" />}
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
                    errors.email ? "border-red-500" : "border-[#D1D5DB]"
                  } ${newReview.email ? "opacity-100 !border-[#333333]" : "opacity-50 focus:opacity-100"}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                {errors.email && <ErrorComponent message={errors.email} id="email-error" />}
              </div>

              {/* Content Field */}
              <div className="group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    newReview.content
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Review Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newReview.content}
                  placeholder="Write your review here..."
                  onChange={handleInputChange}
                  className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 min-h-[100px] ${
                    errors.content ? "border-red-500" : "border-[#D1D5DB]"
                  } ${newReview.content ? "opacity-100 !border-[#333333]" : "opacity-50 focus:opacity-100"}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  aria-invalid={!!errors.content}
                  aria-describedby="content-error"
                />
                {errors.content && <ErrorComponent message={errors.content} id="content-error" />}
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
                  <StarRatingInput rating={newReview.rating} onRatingChange={handleRatingChange} />
                </div>
                {errors.rating && <ErrorComponent message={errors.rating} id="rating-error" />}
              </div>

              <Button type="submit" className="w-full mt-4 bg-gray-800 text-white hover:bg-gray-700">
                Submit Review
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Right Section: Customer Reviews */}
      <div className="flex flex-col col-span-2 gap-6">
        <h2 className="text-[22px] font-medium">Customers say</h2>
        <div className="grid gap-8">
          {displayedReviews.map((review) => (
            <CustomerReviewCard key={review.id} review={review} />
          ))}
        </div>
        {reviews.length > 2 && ( // Only show toggle if there are more than 2 reviews
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="underline text-left mt-4"
          >
            {showAllReviews ? "Show Less Reviews <" : "See All Reviews >"}
          </button>
        )}
      </div>
    </div>
  )
}
