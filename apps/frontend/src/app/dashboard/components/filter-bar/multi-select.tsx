import Select from 'react-select';

type OptionsType = { label: string; value: string };

interface MultiSelectProps {
  options: OptionsType[] | undefined;
  selectedOptions: OptionsType[];
  isPending: boolean;
  onChange: (value: string[]) => void;
  name: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  isPending,
  onChange,
  name,
}) => {
  return (
    <Select
      onChange={(value) => onChange(value.map((item) => item.value))}
      defaultValue={selectedOptions}
      value={selectedOptions}
      isMulti
      isLoading={isPending}
      name={name}
      options={options}
      className="basic-multi-select"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: 0,
          borderColor: state.isFocused ? 'grey' : '#2b2930',
          background: '#2b2930',
          boxShadow: 'none',
          width: '210px',
        }),
      }}
      classNamePrefix="select"
    />
  );
};
