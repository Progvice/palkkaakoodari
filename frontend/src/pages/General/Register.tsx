import { useMemo } from "react";
import type { RegisterFormData } from "../../validators/register";
import { registerSchema } from "../../validators/register";
import {useForm} from "react-hook-form";
import { useLang } from "../../context/lang.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

const RegisterPage = () => {

  const {t, lang} = useLang();

  const schema = useMemo(() => registerSchema(t), [lang]);

  const {
    data
  } = useQuery({
    queryKey: ['asdasd'],
    queryFn: async () => await
  });

  const {
    register,
    handleSubmit
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema)
  });

  return (
    <div className="flex flex-col w-full max-w-sm mx-auto">
        <h1 className="h1 my-6 text-center">{t("login")}</h1>
        <form className="border p-4 border-theme-grey" onSubmit={handleSubmit()}></form>
      </div>
  )
}

export default RegisterPage;
