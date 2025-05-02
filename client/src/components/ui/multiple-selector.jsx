// import React from 'react';
// import Select from 'react-select';

// export default function MultipleSelector({ defaultOptions, value, onChange, placeholder, className }) {
//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: '#2c2e3b',
//       border: 'none',
//       color: 'white',
//       cursor: 'pointer',
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       color: 'white',
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isFocused ? '#4b5563' : '#2c2e3b',
//       color: 'white',
//       cursor: 'pointer',
//     }),
//     multiValue: (provided) => ({
//       ...provided,
//       backgroundColor: '#6b21a8',
//     }),
//     multiValueLabel: (provided) => ({
//       ...provided,
//       color: 'white',
//     }),
//     placeholder: (provided) => ({
//       ...provided,
//       color: '#9ca3af',
//     }),
//   };

//   return (
//     <Select
//       isMulti 
//       options={defaultOptions}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className={className}
//       styles={customStyles}
//       getOptionLabel={(e) => (
//         <div className="flex items-center gap-2">
//           <img src={e.profilePicture} alt="pfp" className="w-6 h-6 rounded-full object-cover" />
//           <span>{e.label}</span>
//         </div>
//       )}
//       getOptionValue={(e) => e.value} 
//     />
//   );
// }


// import React from 'react';
// import Select from 'react-select';

// export default function MultipleSelector({ defaultOptions, value, onChange, placeholder, className }) {
//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: '#2c2e3b',
//       border: 'none',
//       color: 'white',
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isFocused ? '#4b5563' : '#2c2e3b',
//       color: 'white',
//     }),
//     multiValue: (provided) => ({
//       ...provided,
//       backgroundColor: '#6b21a8',
//     }),
//     multiValueLabel: (provided) => ({
//       ...provided,
//       color: 'white',
//     }),
//     placeholder: (provided) => ({
//       ...provided,
//       color: '#9ca3af',
//     }),
//   };

//   return (
//     <Select
//       isMulti
//       options={defaultOptions}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className={className}
//       styles={customStyles}
//       getOptionLabel={(e) => (
//         <div className="flex items-center gap-2">
//           <img src={e.profilePicture} alt="pfp" className="w-6 h-6 rounded-full object-cover" />
//           <span>{e.label}</span>
//         </div>
//       )}
//       getOptionValue={(e) => e.value}
//     />
//   );
// }


import React from 'react';
import AsyncSelect from 'react-select/async';

export default function MultipleSelector({ value, onChange, placeholder, className }) {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2c2e3b',
      border: 'none',
      color: 'white',
      cursor : "text",
    }),
    input: (provided) => ({
        ...provided,
        color: 'white', 
        cursor: 'text',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4b5563' : '#2c2e3b',
      color: 'white',
      cursor: "pointer"
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#6b21a8',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#2c2e3b', // outer wrapper of dropdown
        zIndex: 10,
    }),
    menuList: (provided) => ({
        ...provided,
        backgroundColor: '#2c2e3b', // inner list area
        padding: 0,
    }),    
    noOptionsMessage: (provided) => ({
        ...provided,
        backgroundColor: '#2c2e3b', // <--- fixes white background
        color: '#9ca3af',
    }),
    loadingMessage: (provided) => ({
        ...provided,
        backgroundColor: '#2c2e3b',
        color: '#9ca3af',
        textAlign: 'left',
        padding: 10,
    }),
  };

  const loadOptions = async (inputValue) => {
    if (!inputValue) return [];
    const res = await fetch('/api/contacts/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchTerm: inputValue }),
    });
    const data = await res.json();
    return data.contacts.map((contact) => ({
      label: contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email,
      value: contact._id,
      profilePicture: contact.profilePicture,
    }));
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={false}
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      styles={customStyles}
      getOptionLabel={(e) => (
        <div className="flex items-center gap-2">
          <img src={e.profilePicture} alt="pfp" className="w-6 h-6 rounded-full object-cover" />
          <span>{e.label}</span>
        </div>
      )}
      getOptionValue={(e) => e.value}
    />
  );
}
