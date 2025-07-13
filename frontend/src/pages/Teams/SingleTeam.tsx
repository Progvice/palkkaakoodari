import { useParams } from "react-router-dom";
import AccountActions from "../../components/layouts/AccountActions";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
import { getTeam } from "../../api/auth/teams";
import Loading from "../../components/general/Loading";
import { Team } from "../../types";
import { useLang } from "../../context/lang.context";
import withAuthCheck from "../../components/middleware/AuthCheck";
import { useAuth } from "../../context/auth.context";

const SingleTeam = () => {
  const params = useParams();
  const {t} = useLang();
  const auth = useAuth();

  const id = params.id as string;

  const {data, isLoading} = useQuery({
    queryKey: [queryKeys.singleTeam, id],
    queryFn: async () => getTeam(Number(id)),
    enabled: typeof auth?.token === "string"
  });

  const team : Team | undefined = data && data.length > 0 ? data[0] : undefined;

  console.log(data);

  if (isLoading && !team) return (
    <AccountActions><Loading iconSize={64} /></AccountActions>
  )

  return (
    <AccountActions title={team ? (`${team.name}`) : t("team")}>
      {team ? (
        team.name
      ) : null}
    </AccountActions>
  )
}

const SingleTeamPage = () => withAuthCheck(SingleTeam);

export default SingleTeamPage;
