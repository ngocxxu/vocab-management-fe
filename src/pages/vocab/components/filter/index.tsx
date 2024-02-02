import GroupButton from "@/components/button/GroupButton";
import { Checkbox } from "@/components/checkbox";
import MultiSelect from "@/components/multiselect";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { statusList, subjectList } from "../../constants";

type TFilter = {
  onClose: () => void;
};

export const Filter = ({ onClose }: TFilter) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="mb-2">Subject</p>
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <MultiSelect options={subjectList} {...field} />
          )}
        />
      </div>

      <div>
        <p className="mb-2">Status</p>
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            return (
              <div className="flex items-center justify-between">
                {statusList.map(({ label, value }) => (
                  <Fragment key={label}>
                    <Checkbox
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange(
                              field.value && [...field.value, value]
                            )
                          : field.onChange(
                              field.value?.filter(
                                (val: string) => val !== value
                              )
                            );
                      }}
                      label={label}
                      {...field}
                    />
                  </Fragment>
                ))}
              </div>
            );
          }}
        />
      </div>

      <Separator className="my-2" />
      <div className="flex justify-end items-center mr-16">
        <GroupButton variantNo="ghost" onClose={onClose} />
      </div>
    </div>
  );
};
