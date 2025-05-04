import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";
import { getEmployee } from "../../api/auth/employees";
import Loading from "../../components/general/Loading";
import withAuthCheck from "../../components/middleware/AuthCheck";
import AccountActions from "../../components/layouts/AccountActions";
import { useLang } from "../../context/lang.context";
import { useAuth } from "../../context/auth.context";
import { Employee } from "../../types";
import EmployeeForm from "../../components/forms/EmployeeForm";

const SingleEmployee = () => {
  const params = useParams();
  const {t} = useLang();
  const auth = useAuth();

  const id = params.id as string;

  const {data, isLoading, isFetched} = useQuery({
    queryKey: [queryKeys.singleEmployee, id],
    queryFn: async () => getEmployee(id),
    enabled: typeof auth?.token === "string"
  });

  const employee : Employee | undefined = data && data.length > 0 ? data[0] : undefined;

  if (isLoading) return (
    <AccountActions title={t("employee")}><Loading iconSize={64} /></AccountActions>
  )

  return (
    <AccountActions title={!isLoading && isFetched ? (`${employee?.firstName} ${employee?.lastName}`) : t("employee")}>
      {employee ? (
        <EmployeeForm method="update" employee={employee}/>
      ) : null}
    </AccountActions>
  )
}

const SingleEmployeePage = () => withAuthCheck(SingleEmployee);

export default SingleEmployeePage;
