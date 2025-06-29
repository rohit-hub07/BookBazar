import React, { useEffect } from 'react';
import useReviewStore from '../store/useReviewStore';
import { useParams } from 'react-router-dom';
import { Star, User, Loader } from 'lucide-react';

const AllReviews = () => {
  const { reviews, getAllReviews, isReviewsLoading } = useReviewStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) getAllReviews(id);
  }, [id, getAllReviews]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">All Reviews</h1>

      {isReviewsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin w-12 h-12 text-blue-500" />
        </div>
      ) : reviews?.length > 0 ? (
        reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="text-blue-500" size={20} />
                <span className="font-medium text-gray-700">{review.user?.name}</span>
              </div>
              <div className="flex items-center text-yellow-500">
                <Star size={18} />
                <span className="ml-1 font-semibold">{review.rating}/10</span>
              </div>
            </div>
            <p className="text-gray-600">{review.description}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default AllReviews;
