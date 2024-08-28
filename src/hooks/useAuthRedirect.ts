import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "../utils/validateToken";

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateToken();

      if (!isValid) {
        router.push("/");
      }
    };

    checkToken();
  }, [router]);
};

export default useAuthRedirect;
