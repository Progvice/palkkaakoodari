import { searchStyle } from "../../constants/styles";
import Loading from "../general/Loading";
import { useNavigate } from "react-router-dom";
import { Team } from "../../types";

type SearchTeamsProps = {
  teams: Team[] | undefined,
  isLoading: boolean
};

const SearchTeams : React.FC<SearchTeamsProps> = (props) => {

  const {teams, isLoading} = props;

  const navigate = useNavigate();

  return (
    <div className={searchStyle}>
      {teams && teams.length > 0 ? (
        <>
          {teams.map((team, index) => {
            return (
              <div onClick={() => {
                navigate(`/teams/${team.id}`);
              }} className="flex flex-row w-full p-3 border-b border-theme-grey hover:cursor-pointer hover:bg-theme-element" key={index}>
                <p>{team?.name}</p>
              </div>
            )
          })}
        </>
      ) : (!isLoading ? <p className="self-center my-auto">No results</p> : null)}

      {isLoading ? <Loading className="self-center my-auto" iconSize={32}/> : null}
    </div>
  )
}

export default SearchTeams;
