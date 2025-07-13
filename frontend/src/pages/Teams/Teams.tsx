import { useState } from "react";
import AccountActions from "../../components/layouts/AccountActions";
import withAuthCheck from "../../components/middleware/AuthCheck";
import { useLang } from "../../context/lang.context";
import useSearchTeams from "../../hooks/useSearchTeams";
import Input from "../../components/general/Input";
import Button from "../../components/general/Button";
import { PlusIcon } from "lucide-react";
import SearchTeams from "../../components/search/SearchTeams";
import { debounce } from "lodash";

const Teams = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const {t} = useLang();

  const { searchVisible, data, isLoading, setSearchVisible } = useSearchTeams(searchVal);

  const SearchBar = <Input onClick={() => setSearchVisible(!searchVisible)} className={{input: "my-0"}} field={t("searchTeams")} onChange={debounce(setSearchVal, 800)}/>
  const customBtn = <Button onClick={() => {}}>{t("addTeam")}&nbsp;&nbsp;<PlusIcon size={16}/></Button>


  return (
    <AccountActions searchBar={SearchBar} customButton={customBtn}>
      {searchVisible && searchVal.length > 0 ? <SearchTeams isLoading={isLoading} teams={data}/> : null}
    </AccountActions>
  )
}

const TeamsPage = () => withAuthCheck(Teams);

export default TeamsPage;
