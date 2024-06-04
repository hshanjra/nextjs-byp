import { getUserAction } from "@/actions/AuthAction";
import { GetUserSchema } from "@/types/AuthSchema";
import { useEffect, useState } from "react";

const useAuthUser = () => {
  const [userData, setUserData] = useState<GetUserSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserAction(); // Call the action creator to fetch user data
        setUserData(userData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    // Clean-up function to cancel any ongoing requests or timers
    return () => {
      // Add clean-up logic here if needed
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return { userData, error, isLoading };
};

export default useAuthUser;
