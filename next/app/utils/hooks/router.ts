import { useRouter } from 'next/navigation';

function useNavigateWithQuery() {
  const router = useRouter();

  return function navigateWithQuery({
    from,
    page,
    pathname,
    to,
    tz,
    userId,
  }: {
    from: string;
    page: number;
    pathname: string;
    to: string;
    tz: number;
    userId: number;
  }) {
    router.push(
      `${pathname}/?userId=${userId}&from=${from}&to=${to}&page=${page}&tz=${tz}`,
    );
  };
}

export default useNavigateWithQuery;
