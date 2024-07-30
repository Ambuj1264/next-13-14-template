import { useAuth } from "@/context/auth/authContext";
import { BOARD_DATA } from "@/lib/graphql/queries/KanbanBoard";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkEmptydataArray } from "../helperUtils";

interface Props {
  params: any;
}

const withPrivateRoute = (Component: React.FC<Props>) => {
  return function ProtectedRoute({ ...props }: Props) {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const { data } = useQuery(BOARD_DATA, {
      fetchPolicy: "network-only",
    });

    if (isLoggedIn && data?.kanbanBoard) {
      const isEmpty = checkEmptydataArray(data?.kanbanBoard || []);
      if (isEmpty) {
        router.push("/deals");
      }
    }

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }, [isLoggedIn, router]);

    return <Component {...props} />;
  };
};

export default withPrivateRoute;
