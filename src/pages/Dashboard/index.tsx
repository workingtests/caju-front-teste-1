import { useRegistrations } from "~/hooks/use-registrations";

import { Collumns } from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";
import { Skeleton } from "~/components/Skeleton";

export const DashboardPage = () => {
  const { registrations, isLoading } = useRegistrations();

  return (
    <S.Container>
      <SearchBar />
      {isLoading ? <Skeleton /> : <Collumns registrations={registrations} />}
    </S.Container>
  );
};
