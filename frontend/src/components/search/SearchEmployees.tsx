import { Employee } from "../../types"
import { searchStyle } from "../../constants/styles";
import Loading from "../general/Loading";
import { useNavigate } from "react-router-dom";

type SearchEmployeesProps = {
  employees: Employee[] | undefined,
  isLoading: boolean,
};

const SearchEmployees : React.FC<SearchEmployeesProps> = (props) => {

  const {employees, isLoading} = props;

  const navigate = useNavigate();

  return (
    <div className={searchStyle}>
      {employees && employees.length > 0 ? (
        <>
          {employees.map((employee, index) => {
            return (
              <div onClick={() => {
                navigate(`/employees/${employee.uuid}`);
              }} className="flex flex-row w-full p-3 border-b border-theme-grey hover:cursor-pointer hover:bg-theme-element" key={index}>
                <p>{employee.firstName} {employee.lastName}</p>
              </div>
            )
          })}
        </>
      ) : (!isLoading ? <p className="self-center my-auto">No results</p> : null)}

      {isLoading ? <Loading className="self-center my-auto" iconSize={32}/> : null}
    </div>
  )
}

export default SearchEmployees;
