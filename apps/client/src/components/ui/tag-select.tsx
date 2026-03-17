"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from "@/components/ui/combobox";
import clsx from "clsx";
import { getTagColor } from "@/lib/utils";
import type { TagOption } from "@/lib/types";
import { useTags } from "@/hooks/use-tags";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Tags } from "lucide-react";

interface TagsSelectProps {
  value?: string[];
  onChange?: (values: string[]) => void;
  className?: string;
  isIcon?: boolean;
}

export function TagsSelect({
  value,
  onChange,
  className,
  isIcon = true
}: TagsSelectProps) {
  const anchor = useComboboxAnchor();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);
  const { data } = useTags(debouncedSearch);

  const fetchedOptions = useMemo<TagOption[]>(
    () =>
      data?.tags
        ? data.tags.map((tag) => ({ value: tag.name, label: tag.name }))
        : [],
    [data?.tags]
  );

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const selectedValues = isControlled ? value! : internalValue;

  const setValue = (vals: string[]) => {
    if (!isControlled) setInternalValue(vals);
    onChange?.(vals);
  };

  const allOptions = useMemo<TagOption[]>(() => {
    const map = new Map(fetchedOptions.map((o) => [o.value, o]));
    selectedValues.forEach((val) => {
      if (!map.has(val)) map.set(val, { value: val, label: val });
    });
    return Array.from(map.values());
  }, [fetchedOptions, selectedValues]);

  const selectedOptions = allOptions.filter((o) =>
    selectedValues.includes(o.value)
  );

  const handleAddTag = (inputValue: string) => {
    const trimmed = inputValue.trim();
    if (!trimmed || trimmed.includes(",")) return;
    if (selectedValues.includes(trimmed)) return;

    setValue([...selectedValues, trimmed]);
  };

  return (
    <Combobox
      multiple
      autoHighlight
      items={allOptions}
      value={selectedOptions}
      onValueChange={(selected: TagOption[]) =>
        setValue(selected.map((s) => s.value))
      }
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(values: TagOption[]) => (
            <>
              {values.map((val) => (
                <ComboboxChip
                  key={val.value}
                  className={clsx(
                    "rounded-full text-xs",
                    getTagColor(val.value)
                  )}
                >
                  {val.label}
                </ComboboxChip>
              ))}

              <div className="relative flex-1">
                {isIcon && (
                  <Tags className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <ComboboxChipsInput
                  onChange={(e) => setSearch(e.target.value)}
                  className={clsx(isIcon && "pl-6", className)}
                  placeholder="Search for tags..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      e.preventDefault();
                      handleAddTag(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>

        <ComboboxList>
          {(item: TagOption) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
