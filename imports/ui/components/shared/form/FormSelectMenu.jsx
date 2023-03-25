import React from "react";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Listbox, Transition } from "@headlessui/react";
import { RiCheckFill } from "@react-icons/all-files/ri/RiCheckFill";
import { HiChevronDown } from "@react-icons/all-files/hi/HiChevronDown";

import { classNames } from "/imports/ui/utils/helper";

export const FormSelectMenu = (props) => {
  const [selected, setSelected] = React.useState(props?.defaultSelected || null);
  const handleSelectedItem = (item) => {
    setSelected(item);
    if (props?.idx !== undefined || props?.idx !== null) {
      props?.handleSelection({ name: props?.name, value: item?.toString() }, props?.idx);
    } else {
      props?.handleSelection({ name: props?.name, value: item?.toString() });
    }
  };
  return (
    <Listbox value={selected} onChange={handleSelectedItem} disabled={props?.loading} name={props?.name}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label> */}
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white text-sm md:text-base border border-gray-200 pl-1 pr-10 py-2 text-left dark:focus:border-orange-300 focus:shadow-soft-primary-outline focus:ring-opacity-40 rounded-lg  transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow">
              <span className="flex items-center w-3/4">
                <span className="ml-3 block truncate">{selected || props?.placeHolder}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <HiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition show={open} as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options
                id={props?.id}
                className="absolute z-100 mt-1 w-full bg-white shadow-lg max-h-56  py-1 text-sm md:text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {/* <FormInput /> */}
                {props &&
                  props?.selection.map((item, index) => (
                    <Listbox.Option key={index} className={({ active }) => classNames(active ? "text-white bg-orange-300" : "text-gray-900", "select-none relative py-2 pl-3 pr-9")} value={item}>
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span className={classNames(selected ? "font-semibold text-slate-700" : "font-normal", "ml-3 block truncate")}>{item}</span>
                          </div>

                          {selected ? (
                            <span className={classNames(active ? "text-white" : "text-orange-700", "absolute inset-y-0 right-0 flex items-center pr-4")}>
                              <RiCheckFill className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
