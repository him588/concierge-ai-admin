export function handleChangeState<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  key: string
) {
  setForm((prev) => {
    const updatedValue = { ...prev, [key]: e.target.value };
    return updatedValue;
  });
}
