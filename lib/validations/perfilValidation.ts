import { userOwnerID } from "@/Types/types";
import { Perfil } from "@/lib/domain";
import { t } from "i18next";
import { ObjectSchema, boolean, number, object, setLocale, string } from "yup";

interface PerfilI {
  name: string;
}

export const PervilValidationSquema: ObjectSchema<PerfilI> = object({
  name: string().required("name_required").min(5, "name_min").max(50, "name_max"),
});
