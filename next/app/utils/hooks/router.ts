import { useRouter } from "next/navigation";

function useNavigateWithQuery() {
  const router = useRouter();

  return function navigateWithQuery({
    pathname,
    userId,
    from,
    to,
    page,
    tz,
  }: {
    pathname: string;
    userId: number;
    from: string;
    to: string;
    page: number;
    tz: number;
  }) {
    router.push(
      `${pathname}/?userId=${userId}&from=${from}&to=${to}&page=${page}&tz=${tz}`
    );
  };
}

export default useNavigateWithQuery;
