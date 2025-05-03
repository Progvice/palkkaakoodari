import { Employee } from "../types";
import { cn } from "../lib/utils";
import ActionMenu from "./ActionMenu";
import { useLang } from "../context/lang.context";
import { MenuIcon } from "lucide-react";
import { pages } from "../pages/pages";
import { PencilIcon, UsersIcon } from "lucide-react";

type EmployeeListProps = {
  employee: Employee,
  className?: string
}

const EmployeeList : React.FC<EmployeeListProps> = (props) => {

  const {employee, className} = props;
  const {t} = useLang();

  const classes = cn('flex flex-row justify-between w-100 h-[90px] bg-theme-element px-5 items-center', className ?? '');

  return (
    <div className={classes}>
      <p className="text-base">{employee.firstName} {employee.lastName}</p>
      <ActionMenu text={t('actions')} actions={[
        {
          action: {
            text: <><PencilIcon size={16}/>&nbsp;{t('editDetails')}</>,
            link: pages.employees + '/' + employee.uuid
          }
        },
        {
          action: {
            text: <><UsersIcon size={16}/>&nbsp;{t('controlTeams')}</>,
            link: '#'
          }
        }
      ]} icon={<MenuIcon size={16}/>}/>
    </div>
  )
}

export default EmployeeList;
