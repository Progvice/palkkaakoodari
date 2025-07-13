import { useEffect, useState } from "react";
import { Employee } from "../../types";
import Input from "../general/Input";
import Button from "../general/Button";
import { useLang } from "../../context/lang.context";
import { numberParser } from "../../utils/numberParser";
import Textarea from "../general/Textarea";
import TagPicker from "../TagPicker";
import { Tag } from "../../types";
import { modifyEmployee } from "../../api/auth/employees";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/queryKeys";



type EmployeeFormType = {
  employee?: Employee,
  method: 'insert'|'update'
}

const EmployeeForm : React.FC<EmployeeFormType> = (props) => {

  const {employee: initializationEmployee, method} = props;
  const [employee, setEmployee] = useState<Partial<Employee>>(initializationEmployee ?? {});
  const [firstName, setFirstName] = useState<string>(initializationEmployee?.firstName ?? '');
  const [lastName, setLastName] = useState<string>(initializationEmployee?.lastName ?? '');
  const [hourlyRate, setHourlyRate] = useState<number|''>(initializationEmployee?.hourlyRate ?? '');
  const [description, setDescription] = useState<string>(initializationEmployee?.description ?? '');
  const [tags, setTags] = useState<Tag[]>(initializationEmployee?.tags ? initializationEmployee?.tags : [])
  const {t} = useLang();

  const {data: updatedEmployee, refetch: updateEmployeeQuery} = useQuery({
    queryKey: [queryKeys.updateEmployee, ''],
    queryFn: async () => await modifyEmployee(employee as Employee),
    enabled: false
  });

  useEffect(() => {
    console.log(updatedEmployee);
  }, [updatedEmployee])

  return (
    <form className="w-full flex flex-row flex-wrap" onSubmit={(e) => {
      e.preventDefault();

      const updatedEmployee = {
        ...employee,
        firstName: firstName,
        lastName: lastName,
        hourlyRate: hourlyRate !== '' ? hourlyRate : employee?.hourlyRate,
        description: description,
        tags: tags
      }

      console.log(updatedEmployee);

      setEmployee(updatedEmployee);

      // if (method === 'insert') insertEmployee(e);
      if (method === 'update') updateEmployeeQuery();
    }}>
      <div className="w-7/12 flex flex-row flex-wrap">
        <div className="w-full flex flex-row gap-4">
          <Input
            className={{div: 'w-6/12'}}
            label={t('firstname')}
            field={t('firstname')}
            value={firstName}
            onChange={(val) => setFirstName(val)}
          />
          <Input
            className={{div: 'w-6/12'}}
            label={t('lastname')}
            field={t('lastname')}
            value={lastName}
            onChange={(val) => setLastName(val)}
          />
        </div>
        <Textarea
          className={{div: 'w-full', textarea: 'w-full max-w-full min-w-full h-[250px] resize-none'}}
          label={t('description')}
          field={t('description')}
          value={description}
          onChange={(val) => setDescription(val)}
        />
        <TagPicker employeeTags={tags} setEmployeeTags={setTags} />
        <div className="w-full flex flex-row gap-4">
          <Input
            className={{div: 'w-6/12', input: 'mb-0'}}
            label={t('hourlyrate', ['€'])}
            field={t('hourlyrate', ['€'])}
            value={hourlyRate}
            onChange={(val) => setHourlyRate(numberParser(hourlyRate, val))}
          />
          <Button className="self-end w-6/12" type="submit">{t('updateEmployee')}</Button>
        </div>
      </div>

    </form>
  )

}

export default EmployeeForm;
