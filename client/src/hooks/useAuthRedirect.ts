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

      const isValid = await new Promise((resolve) =>
        setTimeout(async () => {
          const result = await validateToken();
          resolve(result);
        }, 1500)
      );

      if (!isValid && isLogin) {
        setTimeout(() => {
          toast({
            title: "Token expired",
            description: "Please Sign In",
          });
        }, 500);
      }

      if (!isValid && !isLogin) {
        toast({
          title: "Token expired",
          description: "Redirecting to login page...",
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
        return;
      }

      if (isLogin && isValid) {
        toast({
          title: "Welcome back!",
          description: "Redirecting to dashboard...",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    };

    checkToken();
  }, [isLogin, router, toast]);
};

export default useAuthRedirect;
