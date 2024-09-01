export const getLabelForValue = (
  value: string,
  options: { value: string; label: string }[]
) => {
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};
