import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import { Goal, Workout } from '@/types';

interface SocialShareButtonProps {
  goal?: Goal;
  workout?: Workout;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ goal, workout }) => {
  const router = useRouter();
  const { user } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setShareModalData } = useStore();

  const handleShareClick = () => {
    if (goal) {
      setShareModalData({
        type: 'goal',
        data: goal,
      });
    } else if (workout) {
      setShareModalData({
        type: 'workout',
        data: workout,
      });
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleShareClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Share
      </button>

      {/* Modal for sharing content */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-gray-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Share your progress!
                    </h3>
                    <div className="mt-2">
                      {/* Display shareable content based on type */}
                      {user && (
                        <>
                          <p className="text-gray-500">
                            Your progress will be shared with your connections.
                          </p>
                          {goal && (
                            <p className="mt-2 text-gray-900">
                              {goal.name} - Target: {goal.target} - Deadline:
                              {goal.deadline}
                            </p>
                          )}
                          {workout && (
                            <p className="mt-2 text-gray-900">
                              Activity: {workout.name} - Duration:
                              {workout.duration} minutes
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="mt-4 sm:mt-6">
                      {/* Social media sharing buttons */}
                      <button
                        onClick={() => {
                          // Handle Facebook sharing
                          setIsModalOpen(false);
                        }}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
                      >
                        Facebook
                      </button>
                      <button
                        onClick={() => {
                          // Handle Twitter sharing
                          setIsModalOpen(false);
                        }}
                        className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
                      >
                        Twitter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialShareButton;