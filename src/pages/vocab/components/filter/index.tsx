import GroupButton from "@/components/button/GroupButton";
import { Checkbox } from "@/components/checkbox";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { statusList } from "../../constants";

type TFilter = {
  onClose: () => void;
};

export const Filter = ({ onClose }: TFilter) => {
  const { control } = useFormContext();

  return (
    <>
      <Separator className="my-4" />
      <p className="mb-2">Status</p>
      <div className="flex items-center justify-between">
        {statusList.map((item) => {
          return (
            <Controller
              key={item.label}
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Fragment key={item.label}>
                  <Checkbox
                    checked={field.value?.includes(item.value)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange(
                            field.value && [...field.value, item.value]
                          )
                        : field.onChange(
                            field.value?.filter(
                              (value: string) => value !== item.value
                            )
                          );
                    }}
                    label={item.label}
                  />
                </Fragment>
              )}
            />
          );
        })}
      </div>

      <Separator className="my-4" />
      <p className="mb-2">Status</p>
      <div className="flex items-center justify-between">
        {statusList.map((item) => {
          return (
            <Controller
              key={item.label}
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Fragment key={item.label}>
                  <Checkbox
                    checked={field.value?.includes(item.value)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange(
                            field.value && [...field.value, item.value]
                          )
                        : field.onChange(
                            field.value?.filter(
                              (value: string) => value !== item.value
                            )
                          );
                    }}
                    label={item.label}
                  />
                </Fragment>
              )}
            />
          );
        })}
      </div>

      <Separator className="my-4" />
      <div className="flex justify-end items-center mr-16">
        <GroupButton variantNo="ghost" onClose={onClose} />
      </div>
    </>
  );
};
