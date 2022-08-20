import { ValidationErrorResponse } from "../../models/common/ValidationErrorResponse";

interface Props {
  error?: ValidationErrorResponse;
}

export function ErrorMessage({ error }: Props) {
  return (
    <ul className="error-messages">
      {error?.errors &&
        Object.entries(error.errors).map(([field, fieldErrors], index) => (
          <li key={index}>
            {field} {fieldErrors}
          </li>
        ))}
    </ul>
  );
}
