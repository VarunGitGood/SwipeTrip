import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { validateToken } from "../utils/validateToken";
import { useToast } from "../components/ui/hooks/use-toast";

const useAuthRedirect = () => {
  const router = useRouter();
  const { toast } = useToast();
  const isLogin = usePathname() === "/";

  useEffect(() => {
    const checkToken = async () => {
      if (isLogin) {
        toast({
          title: "Verifying token",
          description: "Please wait...",
        });
      }
      const isValid = await validateToken();
      if (!isValid) {
        toast({
          title: "Token expired",
          description: "Redirecting to login page",
        });
        router.push("/");
        return;
      }
      if (isLogin) {
        toast({
          title: "Signing in",
          description: "Redirecting to dashboard",
        });
      }
      router.push("/dashboard");
    };

    checkToken();
  }, [router, toast]);
};

export default useAuthRedirect;
