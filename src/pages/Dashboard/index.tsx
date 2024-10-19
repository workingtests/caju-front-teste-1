import { useRegistrations } from "~/hooks/use-registrations";

import { Collumns } from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";

export const DashboardPage = () => {
  const { registrations } = useRegistrations();

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
