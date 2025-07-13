import { useState } from "react";
import { useLang } from "../../context/lang.context";
import AccountActions from "../../components/layouts/AccountActions";
import Input from "../../components/general/Input";
import Button from "../../components/general/Button";
import { PlusIcon } from "lucide-react";
import { debounce } from "lodash";
import useSearchEmployees from "../../hooks/useSearchEmployee";
import withAuthCheck from "../../components/middleware/AuthCheck";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../api/auth/employees";
import { useAuth } from "../../context/auth.context";
import EmployeeList from "../../components/EmployeeList";
import Loading from "../../components/general/Loading";
import { useDialog } from "../../context/dialog.context";
import NewEmployeeDialog from "../../components/dialogs/NewEmployeeDialog";
import Dialog from "../../components/general/Dialog";

const Employees = () => {

  const [searchVal, setSearchVal] = useState<string>("");
  const {t} = useLang();
  const auth = useAuth();
  const {openDialog} = useDialog();
  const {data: employees} = useQuery({
    queryKey: ['employees', auth?.account?.uuid],
    queryFn: async () => await getEmployees()
  });

  const { searchVisible, data: employeeSearchData, isLoading, setSearchVisible } = useSearchEmployees(searchVal);

  const SearchBar = <Input onClick={() => setSearchVisible(!searchVisible)} className={{input: "my-0"}} field={t("searchUsers")} onChange={debounce(setSearchVal, 800)}/>
  const customBtn = <Button onClick={() => openDialog(<Dialog component={<NewEmployeeDialog/>}/>)}>{t("addEmployee")}&nbsp;&nbsp;<PlusIcon size={16}/></Button>

  return (
    <AccountActions searchBar={SearchBar} customButton={customBtn}>
      {/* {searchVisible && searchVal.length > 0 ? <SearchEmployees isLoading={isLoading} employees={employeeSearchData}/> : null} */}

      {employees && employees.length > 0 && searchVal.length < 1
        ? employees.map((employee, index) => {
        return <EmployeeList employee={employee} key={index}/>
      })
        : (
        <>
          {employeeSearchData && employeeSearchData.length > 0 && searchVal.length > 0
          ? employeeSearchData.map((employee, index) => {
              return <EmployeeList employee={employee} key={index}/>
            })
          : (<>
              {!isLoading
                ? (
                  <div className="relative h-[100px] top-[calc(50%-50px)] flex flex-col items-center">
                    <p className="text-2xl text-theme-grey my-3">{searchVal.length > 0 ? t('employeesNotFound') : t('noEmployeesAdded')}</p>
                    {customBtn}
                </div>
                )
                : null
              }
            </>
          )

        }</>
      )}

      {isLoading ? (
        <div className="relative h-[100px] top-[calc(50%-50px)] flex flex-col items-center">
          <Loading iconSize={64}/>
        </div>
      ) : null}

    </AccountActions>
  )

}

const EmployeesPage = () => withAuthCheck(Employees);

export default EmployeesPage;
